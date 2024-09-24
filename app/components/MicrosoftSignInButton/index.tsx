"use client";
import { useSession, signIn } from "next-auth/react";
import Button from "../Button";
import { useRouter } from "next/navigation";

export function MicrosoftSignInButton() {
    const router = useRouter();
    const session = useSession();

    const handleClick = async () => {
        if (session.status !== "authenticated") {
            await signIn("azure-ad", {
                redirect: true,
                callbackUrl: "/view-calendar", 
            }, { prompt: 'login' });
        } else {
            router.push("/login");
        }
    };

    return (
        <Button
            buttonText="Continue with Microsoft"
            buttonClassName="rounded-md shadow-button hover:shadow-buttonHover bg-blue-600 text-white text-base leading-base"
            onClick={handleClick}
            hasIcon
            icon={
                <img src="/microsoft-logo.png" alt="Microsoft icon" className="w-[20px]" />
            }
        />
    );
}
