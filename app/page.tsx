import { auth, EnrichedSession } from "../auth";
import { GoogleSignInButton } from "./components/GoogleSignInButtom";

export default async function Home() {
  const session = (await auth()) as EnrichedSession;

  return (
    <main className="w-full h-[100vh] overflow-y-auto bg-gradient-to-br from-gradientColor1 to-gradientColor2">
      {session?.user?.name ? (
        <p>Welcome {session?.user?.name}</p>
      ) : (
        <p>Login to continue</p>
      )}
      <GoogleSignInButton />
    </main>
  );
}



