"use client";

import { useEffect, useRef } from "react";
import styles from "./compass.module.css";

export type CompassDetail = {
  label: string;
  why: string;
  quickWin: string;
  continue: string;
};

const PLACEHOLDER_GUIDANCE: CompassDetail = {
  label: "",
  why: "This view is designed to explain what this area could help you choose next, without claiming a live recommendation.",
  quickWin: "Pick one small next step when you have the relevant information available.",
  continue: "Return when a private data source is connected and its freshness can be verified.",
};

type DetailSheetProps = {
  selectedLabel: string;
  detail?: CompassDetail;
  onClose: () => void;
};

export function DetailSheet({ selectedLabel, detail = PLACEHOLDER_GUIDANCE, onClose }: DetailSheetProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  return (
    <aside className={styles.detailSheet} aria-labelledby="compass-detail-title">
      <div className={styles.detailSheetHeader}>
        <p className={styles.kicker}>Selection details</p>
        <button className={styles.closeDetails} type="button" onClick={onClose}>
          Close details
        </button>
      </div>
      <h2 className={styles.detailTitle} id="compass-detail-title" ref={titleRef} tabIndex={-1}>
        {detail.label || selectedLabel}
      </h2>
      <p className={styles.placeholderNotice}>
        Placeholder guidance only — live personal data is unavailable in this preview.
      </p>

      <section className={styles.detailSection} aria-labelledby="compass-detail-why">
        <h3 id="compass-detail-why">Why this is recommended</h3>
        <p>{detail.why}</p>
      </section>
      <section className={styles.detailSection} aria-labelledby="compass-detail-evidence">
        <h3 id="compass-detail-evidence">Evidence</h3>
        <p>No live tasks, emails, calendar events, or account data were used to produce this guidance.</p>
      </section>
      <section className={styles.detailSection} aria-labelledby="compass-detail-status">
        <h3 id="compass-detail-status">Information status</h3>
        <p>Freshness is unknown because no private source is connected.</p>
      </section>
      <section className={styles.detailSection} aria-labelledby="compass-detail-quick-win">
        <h3 id="compass-detail-quick-win">Quick win</h3>
        <p>{detail.quickWin}</p>
      </section>
      <section className={styles.detailSection} aria-labelledby="compass-detail-continue">
        <h3 id="compass-detail-continue">Continue</h3>
        <p>{detail.continue}</p>
      </section>
    </aside>
  );
}
