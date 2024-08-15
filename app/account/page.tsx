"use client";

// Import necessary modules and components
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
  // Initialize router for navigation
  const router = useRouter();
  
  // Get session data from next-auth's useSession hook
  const { data: session } = useSession();
  
  // Get user context using custom hook useUserContext
  const { user } = useUserContext();

  // Redirect to login page if the user is not authenticated
  useEffect(() => {
    if (!session?.user) {
      return router.push("/login");
    }
  }, [session]);

  // State to manage the current tab view
  const [currentTab, setCurrentTab] = useState<string>("myAccount");

  return (
    <div className="w-full h-[100vh] overflow-y-auto bg-gradient-to-br from-gradientColor1 to-gradientColor2 py-4 px-8">
      <Header />
      <div className="w-[90%] mx-auto">
        <div className="inline-block">
          {/* Link to the calendar view page */}
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
        
        {/* Display the Banner component if the user is not a paid user */}
        <div className="mb-14">
          {!user?.isPaidUser && <Banner />}
        </div>
        
        <div className="flex flex-col items-start mb-8 w-full">
          {/* Render the Tabs component for navigation between different sections */}
          <div className="-ml-20">
            <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
          </div>
          
          {/* Conditionally render components based on the selected tab */}
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
