"use client";
import Cards from "@/app/components/Cards";
import { GoogleSignInButton } from "@/app/components/GoogleSignInButtom";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignupPage() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      return router.push("/view-calendar");
    }
  }, [session]);

  const handleMicrosoftSignIn = async () => {
    await signIn("azure-ad", { redirect: true, callbackUrl: "/view-calendar" }, { prompt: 'login' });
  };


  return (
    <div className="w-full overflow-y-auto bg-gradient-to-br from-gradientColor1 to-gradientColor2 py-4">
      <Cards
        message="Join Us Today!"
        description="Awayme helps users to set their free hours and make every look very busy"
        instructions="Create your account to get started"
        credentials="Sign up using Google or Microsoft"
        options="Already have an account?"
        checkin="Login"
        signInButton={
          <>
            <GoogleSignInButton />
            <button
              onClick={handleMicrosoftSignIn}
              className="mt-4 rounded-md shadow-button hover:shadow-buttonHover bg-blue-600 text-white text-base leading-base flex items-center"
            >
              <img src="/microsoft-logo.png" alt="Microsoft icon" className="w-[20px] mr-2" />
              Continue with Microsoft
            </button>
          </>
        }
      />
    </div>
  );
}
