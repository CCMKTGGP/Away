"use client";
import Cards from "@/app/components/Cards";
import { GoogleSignInButton } from "@/app/components/GoogleSignInButtom";
import { useSession, signIn } from "next-auth/react"; // Add signIn
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      return router.push("/view-calendar");
    }
  }, [session]);

  return (
    <div className="w-full overflow-y-auto bg-gradient-to-br from-gradientColor1 to-gradientColor2 py-4">
      <Cards
        message="Welcome Back!"
        description="AwayMe lets users control how busy their calendar appears-even when it’s not."
        instructions="Please login to your account."
        credentials="Login using Google or Microsoft"
        options="Don't have an account?"
        checkin="Sign-up here."
        signInButton={
          <>
            <GoogleSignInButton />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-text py-2 px-4 w-full rounded mt-2"
              onClick={() => signIn("azure-ad")} // Microsoft login
            >
              Continue with Microsoft
            </button>
          </>
        }
      />
    </div>
  );
}
