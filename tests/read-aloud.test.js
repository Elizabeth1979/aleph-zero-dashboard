const test = require('node:test');
const assert = require('node:assert/strict');

const {
  createReadAloudController,
  detectTextLanguage,
  normalizeLanguage,
  splitIntoChunks,
} = require('../pages/read-aloud.js');

class FakeUtterance {
  constructor(text) {
    this.text = text;
    this.lang = '';
    this.rate = 1;
    this.onend = null;
    this.onerror = null;
  }
}

function createSpeechHarness() {
  const spoken = [];
  const calls = { cancel: 0, pause: 0, resume: 0 };
  const synthesis = {
    speak(utterance) { spoken.push(utterance); },
    cancel() { calls.cancel += 1; },
    pause() { calls.pause += 1; },
    resume() { calls.resume += 1; },
  };
  return { synthesis, spoken, calls };
}

test('splitIntoChunks keeps all words and limits long speech requests', () => {
  const text = `${'First sentence. '.repeat(20)}${'Second sentence. '.repeat(20)}`.trim();
  const chunks = splitIntoChunks(text, 180);

  assert.ok(chunks.length > 1);
  assert.ok(chunks.every(chunk => chunk.length <= 180));
  assert.equal(chunks.join(' ').replace(/\s+/g, ' '), text.replace(/\s+/g, ' '));
});

test('normalizeLanguage selects suitable English and Hebrew device voices', () => {
  assert.equal(normalizeLanguage('he'), 'he-IL');
  assert.equal(normalizeLanguage('he-IL'), 'he-IL');
  assert.equal(normalizeLanguage('en'), 'en-US');
  assert.equal(normalizeLanguage('en-GB'), 'en-GB');
});

test('detectTextLanguage uses displayed text instead of the original source language', () => {
  assert.equal(
    detectTextLanguage('This English blog was adapted from a Hebrew source.', 'he'),
    'en-US',
  );
  assert.equal(
    detectTextLanguage('זהו מאמר בעברית שנוצר ממקור באנגלית.', 'en'),
    'he-IL',
  );
});

test('read starts speech with the selected language and speed', () => {
  const { synthesis, spoken, calls } = createSpeechHarness();
  const states = [];
  const reader = createReadAloudController({
    synthesis,
    Utterance: FakeUtterance,
    onStateChange: state => states.push(state),
  });

  reader.read('שלום עולם. זהו מאמר לבדיקה.', { language: 'he', rate: 1.25 });

  assert.equal(calls.cancel, 1);
  assert.equal(spoken.length, 1);
  assert.equal(spoken[0].lang, 'he-IL');
  assert.equal(spoken[0].rate, 1.25);
  assert.equal(states.at(-1).status, 'speaking');
});

test('pause resume and stop control active speech', () => {
  const { synthesis, calls } = createSpeechHarness();
  const states = [];
  const reader = createReadAloudController({
    synthesis,
    Utterance: FakeUtterance,
    onStateChange: state => states.push(state),
  });

  reader.read('A short article.');
  reader.pause();
  reader.resume();
  reader.stop();

  assert.equal(calls.pause, 1);
  assert.equal(calls.resume, 1);
  assert.equal(calls.cancel, 2);
  assert.deepEqual(states.slice(-3).map(state => state.status), ['paused', 'speaking', 'idle']);
});

test('speech continues through chunks and returns to idle when finished', () => {
  const { synthesis, spoken } = createSpeechHarness();
  const states = [];
  const reader = createReadAloudController({
    synthesis,
    Utterance: FakeUtterance,
    maxChunkLength: 24,
    onStateChange: state => states.push(state),
  });

  reader.read('First sentence. Second sentence. Third sentence.');
  assert.ok(spoken.length > 0);

  while (states.at(-1).status !== 'idle') {
    const utterance = spoken.at(-1);
    utterance.onend();
  }

  assert.ok(spoken.length >= 2);
  assert.equal(states.at(-1).status, 'idle');
});

test('speech errors stop playback and expose a useful status', () => {
  const { synthesis, spoken } = createSpeechHarness();
  const states = [];
  const reader = createReadAloudController({
    synthesis,
    Utterance: FakeUtterance,
    onStateChange: state => states.push(state),
  });

  reader.read('A short article.');
  spoken[0].onerror({ error: 'synthesis-failed' });

  assert.equal(states.at(-1).status, 'error');
  assert.equal(states.at(-1).message, 'Read aloud stopped. Please try again.');
});
