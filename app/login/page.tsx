"use client";
import Cards from "@/app/components/Cards";
import { GoogleSignInButton } from "@/app/components/GoogleSignInButtom";
import { useSession } from "next-auth/react";
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
        description="AwayMe helps users set their free hours to make every day look busy"
        instructions="Please log in to your account"
        credentials="Log in using Google"
        options="New to AwayMe?"
        checkin="Sign up"
        signInButton={<GoogleSignInButton />}
      />
    </div>
  );
}
