import { auth, EnrichedSession } from "../auth";
import { GoogleSignInButton } from "./components/GoogleSignInButtom";
import Link from "next/link";

export default async function Home() {
  const session = (await auth()) as EnrichedSession;

  return (
    <main className="w-full h-[100vh] flex justify-center items-center bg-white">
      <div className="text-center">
        {/* Logo placed at the top and centered */}
        <img
          src="/logo.png" // Ensure the logo is placed in the public folder
          alt="AwayMe Logo"
          className="mx-auto mb-8"
          style={{ width: '150px', height: '50px' }} // Adjust the size to match the layout in the image
        />
        
        {session?.user?.name ? (
          <p>Welcome {session?.user?.name}</p>
        ) : (
          <>
            {/* Google Sign-In Button */}
            <div className="mb-4">
              <GoogleSignInButton />
            </div>

            {/* Microsoft Sign-In Button (If needed, can be removed if not) */}
            <div className="mb-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-text py-2 px-4 w-full rounded">
                Sign in with Microsoft
              </button>
            </div>

            {/* Sign-Up Link */}
            <p className="text-gray-600">
              Need an account?{" "}
              <Link
                className="font-open-sans font-bold text-sm text-gray-700 underline"
                href="/sign-up"
              >
                Sign-up here.
              </Link>
            </p>
          </>
        )}
      </div>
    </main>
  );
}
