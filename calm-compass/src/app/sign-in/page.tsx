import { SignInButton } from "../../components/sign-in-button";

export default function SignInPage() {
  return (
    <main>
      <p className="eyebrow">Private dashboard</p>
      <h1>Calm Compass sign-in</h1>
      <p>Only Elli’s approved Google account can open this dashboard.</p>
      <SignInButton />
    </main>
  );
}
