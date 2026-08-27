import { Compass } from "../components/compass/compass";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main className="dashboard">
      <Compass />
    </main>
  );
}
