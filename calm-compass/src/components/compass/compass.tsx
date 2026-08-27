"use client";

import { type KeyboardEvent } from "react";
import { useCompassState } from "../../hooks/use-compass-state";
import { DetailSheet } from "./detail-sheet";
import { calculateCompassLayout } from "./geometry";
import styles from "./compass.module.css";

const VIEW_BOX = { width: 900, height: 900 };

function ringClassName(label: string): string {
  if (label === "Your world") {
    return `${styles.ring} ${styles.ringWorld}`;
  }

  return label === "Setup" ? `${styles.ring} ${styles.ringSetup}` : styles.ring;
}

function labelLines(label: string): string[] {
  if (label.length <= 12) {
    return [label];
  }

  const words = label.split(" ");
  const splitAt = Math.ceil(words.length / 2);
  return [words.slice(0, splitAt).join(" "), words.slice(splitAt).join(" ")];
}

function labelPlacement(angle: number) {
  const radians = (angle * Math.PI) / 180;
  const horizontal = Math.cos(radians);
  const vertical = Math.sin(radians);

  return {
    x: Number((horizontal * 54).toFixed(3)),
    y: Number((vertical * 54).toFixed(3)),
    anchor: horizontal > 0.3 ? "start" : horizontal < -0.3 ? "end" : "middle",
  } as const;
}

function nodeClassName(label: string): string {
  if (label === "Your world") {
    return `${styles.node} ${styles.nodeWorld}`;
  }

  return label === "Setup" ? `${styles.node} ${styles.nodeSetup}` : styles.node;
}

export function Compass() {
  const { selectedLabel, select, close } = useCompassState();
  const layout = calculateCompassLayout(VIEW_BOX);

  function selectFromKeyboard(event: KeyboardEvent<SVGGElement>, label: string) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      select(label);
    }
  }

  return (
    <section className={`${styles.compass} ${selectedLabel ? styles.compassWithDetail : ""}`} aria-label="Elli’s Calm Compass">
      <div className={styles.compassContent}>
        <div className={styles.toolbar}>
        <div>
          <p className={styles.kicker}>Private dashboard</p>
          <h1 className={styles.title}>Elli’s Calm Compass</h1>
        </div>
        <button className={styles.fitAll} type="button" onClick={close}>
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
        <text className={styles.centreLabel} x={layout.centre.x} y={layout.centre.y - 24}>
          Start here
        </text>
        <text className={styles.centreText} x={layout.centre.x} y={layout.centre.y + 10}>
          Choose one
        </text>
        <text className={styles.centreText} x={layout.centre.x} y={layout.centre.y + 38}>
          clear next step
        </text>
        {layout.rings.flatMap((ring) =>
          ring.nodes.map((node) => {
            const selected = selectedLabel === node.label;
            const placement = labelPlacement(node.angle);
            const lines = labelLines(node.label);

            return (
              <g
                key={node.label}
                className={nodeClassName(ring.label)}
                transform={`translate(${node.x} ${node.y})`}
                role="button"
                tabIndex={0}
                aria-label={`${node.label}: ${node.value}`}
                aria-pressed={selected}
                onClick={() => select(node.label)}
                onKeyDown={(event) => selectFromKeyboard(event, node.label)}
              >
                <circle className={styles.nodeCircle} r={node.radius} />
                <text
                  className={styles.nodeText}
                  x={placement.x}
                  y={placement.y - ((lines.length - 1) * 14)}
                  textAnchor={placement.anchor}
                >
                  {lines.map((line, index) => (
                    <tspan key={line} x={placement.x} dy={index === 0 ? 0 : 28}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          }),
        )}
      </svg>
      </div>
      {selectedLabel ? <DetailSheet selectedLabel={selectedLabel} onClose={close} /> : null}
    </section>
  );
}
