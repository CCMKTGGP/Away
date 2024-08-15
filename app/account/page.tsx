"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/Header/index";
import Banner from "../components/Banner/index";
import Tabs from "../components/Tabs/index";
import Form from "../components/AccountForm";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PlanDetails from "../components/PlanCard";
import { useUserContext } from "@/app/context/userContext";
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { user } = useUserContext();

  useEffect(() => {
    if (!session?.user) {
      return router.push("/login");
    }
  }, [session]);

  const [currentTab, setCurrentTab] = useState<string>("myAccount");

  return (
    <div className="w-full h-[100vh] overflow-y-auto bg-gradient-to-br from-gradientColor1 to-gradientColor2 py-4 px-8">
      <Header />
      <div className="w-[90%] mx-auto">
        <div className="inline-block">
          <Link href={`/view-calendar`}>
            <div className="flex items-center gap-2">
              <img
                src="/arrow-left.svg"
                alt="Arrow left icon"
                className="w-[20px]"
              />
              <p className="text-lg font-medium leading-sm text-heading">View Calendar</p>
            </div>
          </Link>
        </div>
        <div className="mb-14">
          {!user?.isPaidUser && <Banner />}
        </div>
        <div className="flex flex-col items-start mb-8 w-full">
          <div className="-ml-20">
            <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
          </div>
          <div className="mt-4 w-full">
            {currentTab === "myAccount" && <Form />}
            {currentTab === "billingInfo" && <PlanDetails />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
