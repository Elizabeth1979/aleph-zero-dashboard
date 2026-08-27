import { notFound } from "next/navigation";
import { Compass } from "../../../components/compass/compass";

export default function CompassTestFixturePage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return <Compass />;
}
