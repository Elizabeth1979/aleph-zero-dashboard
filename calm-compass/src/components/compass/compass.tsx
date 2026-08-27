"use client";

import { useState, type KeyboardEvent } from "react";
import { calculateCompassLayout } from "./geometry";
import styles from "./compass.module.css";

const VIEW_BOX = { width: 900, height: 900 };

function ringClassName(label: string): string {
  if (label === "Your world") {
    return styles.ringWorld;
  }

  return label === "Setup" ? styles.ringSetup : styles.ring;
}

function nodeClassName(label: string): string {
  if (label === "Your world") {
    return `${styles.node} ${styles.nodeWorld}`;
  }

  return label === "Setup" ? `${styles.node} ${styles.nodeSetup}` : styles.node;
}

export function Compass() {
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const layout = calculateCompassLayout(VIEW_BOX);

  function selectFromKeyboard(event: KeyboardEvent<SVGGElement>, label: string) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedLabel(label);
    }
  }

  return (
    <section className={styles.compass} aria-label="Elli’s Calm Compass">
      <div className={styles.toolbar}>
        <div>
          <p className={styles.kicker}>Private dashboard</p>
          <h1>Elli’s Calm Compass</h1>
        </div>
        <button className={styles.fitAll} type="button" onClick={() => setSelectedLabel(null)}>
          Fit all
        </button>
      </div>
      <h2 className={styles.screenReaderOnly}>Start here</h2>
      <svg
        className={styles.canvas}
        viewBox={`0 0 ${VIEW_BOX.width} ${VIEW_BOX.height}`}
        role="img"
        aria-labelledby="compass-title compass-description"
      >
        <title id="compass-title">Elli’s Calm Compass</title>
        <desc id="compass-description">Three stable rings for Today, Your world, and Setup.</desc>
        {layout.rings.map((ring) => (
          <circle
            key={ring.label}
            className={ringClassName(ring.label)}
            cx={layout.centre.x}
            cy={layout.centre.y}
            r={ring.radius}
          />
        ))}
        <circle className={styles.centreCircle} cx={layout.centre.x} cy={layout.centre.y} r="92" />
        <text className={styles.centreLabel} x={layout.centre.x} y={layout.centre.y - 10}>
          Start here
        </text>
        <text className={styles.centreText} x={layout.centre.x} y={layout.centre.y + 18}>
          Choose one clear next step
        </text>
        {layout.rings.flatMap((ring) =>
          ring.nodes.map((node) => {
            const selected = selectedLabel === node.label;

            return (
              <g
                key={node.label}
                className={nodeClassName(ring.label)}
                transform={`translate(${node.x} ${node.y})`}
                role="button"
                tabIndex={0}
                aria-label={`${node.label}: ${node.value}`}
                aria-pressed={selected}
                onClick={() => setSelectedLabel(node.label)}
                onKeyDown={(event) => selectFromKeyboard(event, node.label)}
              >
                <circle className={styles.nodeCircle} r={node.radius} />
                <text className={styles.nodeText} y="-7">
                  {node.label}
                </text>
                <text className={styles.nodeValue} y="15">
                  {node.value}
                </text>
              </g>
            );
          }),
        )}
      </svg>
    </section>
  );
}
