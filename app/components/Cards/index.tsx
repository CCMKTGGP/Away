import { signIn } from "next-auth/react";
import Link from "next/link";
import { CardsProps } from "./interface";

export default function Cards({
  message,
  description,
  instructions,
  credentials,
  options,
  checkin,
  signInButton,
}: CardsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gradientColor1 to-gradientColor2">
      {/* Navigation with logo */}
      <nav className="p-4">
        <img src="/logo.png" alt="logo" className="h-12 inline-block" />
      </nav>

      {/* Card Container */}
      <div className="flex justify-center items-center min-h-screen inset-0">
        <div className="w-[520px] h-auto rounded-lg border border-gray-300 shadow-xl p-8 bg-white">
          
          {/* Message and Description */}
          <h1 className="font-roboto font-medium text-2xl leading-tight text-center mb-4">
            {message}
          </h1>
          <p className="font-open-sans font-normal text-base leading-6 text-center text-secondaryHeading mb-6">
            {description}
          </p>

          {/* Instructions */}
          <p className="font-open-sans font-normal text-base leading-6 text-center text-secondaryHeading mb-6">
            {instructions}
          </p>

          {/* Sign-in Buttons with logos */}
          <div className="flex flex-col space-y-4 items-center mb-6">
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 w-64 rounded flex items-center justify-center"
              onClick={() => signIn("google")}
            >
              <img
                src="/google-logo.png"
                alt="Google Logo"
                className="h-5 mr-2"
              />
              Sign in with Google
            </button>

            <button
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 w-64 rounded flex items-center justify-center"
              onClick={() => signIn("azure-ad")}
            >
              <img
                src="/microsoft-logo.png"
                alt="Microsoft Logo"
                className="h-5 mr-2"
              />
              Sign in with Microsoft
            </button>
          </div>

          {/* Check-in Options */}
          <p className="font-open-sans font-normal text-base leading-6 text-center text-secondaryHeading mb-4">
            <span>{options}</span>
            <Link
              className="font-open-sans font-bold text-accent underline"
              href={checkin === "Login" ? "/login" : "/sign-up"}
            >
              {checkin}
            </Link>
          </p>

          {/* Terms and Conditions / Privacy Policy */}
          <div className="text-secondaryHeading font-roboto font-medium text-xs text-center underline">
            <Link href="">Terms and Conditions</Link>
            <span className="mx-3">|</span>
            <Link href="">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
