import { Compass } from "../components/compass/compass";
import styles from "../components/compass/compass.module.css";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main className={styles.page}>
      <Compass />
    </main>
  );
}
