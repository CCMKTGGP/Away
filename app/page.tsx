"use client"; 
import { signIn } from "next-auth/react";
import Link from "next/link";
import { GoogleSignInButton } from "./components/GoogleSignInButtom"; 

export default function Home() {
  return (
    <main className="w-full h-[100vh] flex justify-center items-center bg-white">
      <div className="text-center">
        <img
          src="/logo.png" 
          alt="AwayMe Logo"
          className="mx-auto mb-8"
          style={{ width: '150px', height: '50px' }} 
        />
        
        <>
          {/* Google Sign-In Button */}
          <div className="mb-4">
            <GoogleSignInButton />
          </div>

          {/* Microsoft Sign-In Button */}
          <div className="mb-4">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-text py-2 px-4 w-full rounded"
              onClick={() => signIn("azure-ad")}  
            >
             Continue with Microsoft
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
      </div>
    </main>
  );
}
