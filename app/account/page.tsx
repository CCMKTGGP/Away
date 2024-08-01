"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/Header/index";
import Banner from "../components/Banner/index";
import Tabs from "../components/Tabs/index";
import Form from "../components/AccountForm";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PlanDetails from "../components/plancard";

const Page = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user) {
      return router.push("/login");
    }
  }, [session]);

  const [currentTab, setCurrentTab] = useState<string>("myAccount");

  return (
    <main className="w-full h-[100vh] overflow-y-auto bg-gradient-to-br from-gradientColor1 to-gradientColor2 py-4 px-8">
      <Header />
      <div className="mx-20 mb-14">
        <Banner />
      </div>
      <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="mx-20 my-8">
        {currentTab === "myAccount" && <Form />}
        {currentTab === "billingInfo" && <PlanDetails />}
      </div>
    </main>
  );
};

export default Page;
