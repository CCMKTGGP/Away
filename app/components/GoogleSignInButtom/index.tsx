"use client";
import { useSession, signIn } from "next-auth/react";
import Button from "../Button";
import { useRouter } from "next/navigation";

export function GoogleSignInButton() {
  const router = useRouter();
  const session = useSession();

  const handleClick = async () => {
    if (session.status !== "authenticated") {
      await signIn("google", {
        redirect: true,
        callbackUrl: "/view-calendar",
      }); // will re-direct to sign in page
    } else {
      // navigate to view calendar page
      router.push("/view-calendar");
    }
  };

  return (
    <Button
      buttonText="Continue with Google"
      buttonClassName="rounded-md shadow-button hover:shadow-buttonHover bg-green-500 text-white text-base leading-base"
      onClick={() => handleClick()}
      hasIcon
      icon={
        <img src="/google-logo.png" alt="Google icon" className="w-[20px]" />
      }
    />
  );
}
