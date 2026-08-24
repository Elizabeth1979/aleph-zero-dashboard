(function exposeReadAloud(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.ReadAloud = api;
})(typeof window !== 'undefined' ? window : globalThis, function buildReadAloud() {
  'use strict';

  function normalizeLanguage(language) {
    const value = String(language || 'en').trim();
    if (/^he(?:-|$)/i.test(value)) return value.includes('-') ? value : 'he-IL';
    if (/^en(?:-|$)/i.test(value)) return value.includes('-') ? value : 'en-US';
    return value || 'en-US';
  }

  function splitLongSegment(segment, maxLength) {
    const words = segment.trim().split(/\s+/).filter(Boolean);
    const chunks = [];
    let current = '';

    words.forEach(word => {
      if (word.length > maxLength) {
        if (current) chunks.push(current);
        for (let index = 0; index < word.length; index += maxLength) {
          chunks.push(word.slice(index, index + maxLength));
        }
        current = '';
        return;
      }
      const candidate = current ? `${current} ${word}` : word;
      if (candidate.length > maxLength) {
        chunks.push(current);
        current = word;
      } else {
        current = candidate;
      }
    });

    if (current) chunks.push(current);
    return chunks;
  }

  function splitIntoChunks(text, maxLength = 220) {
    const normalized = String(text || '').replace(/\s+/g, ' ').trim();
    if (!normalized) return [];

    const sentences = normalized.match(/[^.!?。！？]+[.!?。！？]+|[^.!?。！？]+$/g) || [normalized];
    const chunks = [];
    let current = '';

    sentences.map(sentence => sentence.trim()).filter(Boolean).forEach(sentence => {
      if (sentence.length > maxLength) {
        if (current) chunks.push(current);
        chunks.push(...splitLongSegment(sentence, maxLength));
        current = '';
        return;
      }
      const candidate = current ? `${current} ${sentence}` : sentence;
      if (candidate.length > maxLength) {
        chunks.push(current);
        current = sentence;
      } else {
        current = candidate;
      }
    });

    if (current) chunks.push(current);
    return chunks;
  }

  function createReadAloudController(options) {
    const {
      synthesis,
      Utterance,
      onStateChange = () => {},
      maxChunkLength = 220,
    } = options || {};

    if (!synthesis || !Utterance) throw new Error('Speech synthesis is unavailable.');

    let chunks = [];
    let chunkIndex = 0;
    let language = 'en-US';
    let rate = 1;
    let runId = 0;
    let status = 'idle';

    function announce(nextStatus, message = '') {
      status = nextStatus;
      onStateChange({
        status,
        message,
        chunk: chunks.length ? chunkIndex + 1 : 0,
        totalChunks: chunks.length,
      });
    }

    function speakCurrent(activeRun) {
      if (activeRun !== runId) return;
      if (chunkIndex >= chunks.length) {
        announce('idle', 'Finished reading.');
        return;
      }

      const utterance = new Utterance(chunks[chunkIndex]);
      utterance.lang = language;
      utterance.rate = rate;
      utterance.onend = () => {
        if (activeRun !== runId) return;
        chunkIndex += 1;
        speakCurrent(activeRun);
      };
      utterance.onerror = event => {
        if (activeRun !== runId || event?.error === 'canceled') return;
        announce('error', 'Read aloud stopped. Please try again.');
      };
      synthesis.speak(utterance);
      announce('speaking', 'Reading aloud.');
    }

    function read(text, settings = {}) {
      runId += 1;
      synthesis.cancel();
      chunks = splitIntoChunks(text, maxChunkLength);
      chunkIndex = 0;
      language = normalizeLanguage(settings.language);
      rate = Number(settings.rate) || 1;

      if (!chunks.length) {
        announce('error', 'There is no article text to read.');
        return;
      }
      speakCurrent(runId);
    }

    function pause() {
      if (status !== 'speaking') return;
      synthesis.pause();
      announce('paused', 'Reading paused.');
    }

    function resume() {
      if (status !== 'paused') return;
      synthesis.resume();
      announce('speaking', 'Reading aloud.');
    }

    function stop() {
      runId += 1;
      synthesis.cancel();
      chunks = [];
      chunkIndex = 0;
      announce('idle', 'Reading stopped.');
    }

    return {
      read,
      pause,
      resume,
      stop,
      getStatus: () => status,
    };
  }

  return {
    createReadAloudController,
    normalizeLanguage,
    splitIntoChunks,
  };
});
