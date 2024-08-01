"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import Button from "../Button";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await signOut();
    setLoading(false);
    router.push("/login");
  }

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center bg-hover">
        <p className="text-lg leading-lg text-heading">Logging you out...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 mb-4 py-4">
      <img src="/logo.png" alt="Away me logo" className="h-[40px]" />
      <div className="ml-auto">
        <div className="group relative">
          <img
            src={session?.user?.image || ""}
            alt=" User avatar image"
            className="w-[40px] rounded-full bg-gray-200"
          />
          <div className="hidden group-hover:block">
            <div className="absolute top-6 right-0 m-4 w-[150px] bg-white rounded-[16px] shadow-card p-4">
              <div className="my-2">
                <Link
                  href="/account"
                  className="text-lg leading-lg text-secondaryHeading hover:text-heading font-medium text-right"
                >
                  My Account
                </Link>
              </div>
              <div className="flex justify-center my-4">
                <Button
                  buttonText="Logout"
                  buttonClassName="rounded-md shadow-button hover:shadow-buttonHover bg-[#FDE4E4] hover:bg-[#913838] text-[#913838] hover:text-white text-base leading-base"
                  onClick={() => handleLogout()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
