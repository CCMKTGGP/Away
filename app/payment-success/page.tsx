'use client';

// Import necessary modules and components
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";
import logo from "@/public/logo.png";

// Define the PaymentSuccess component using React Functional Component (React.FC)
const PaymentSuccess: React.FC = () => {
    // Initialize the router for navigation
    const router = useRouter();

    // Function to handle the button click and navigate to the calendar view
    const handleViewCalendar = () => {
        router.push("/view-calendar");
    };

    return (
        <div className="relative flex items-center justify-center w-full h-screen bg-gradient-to-br from-gradientColor1 to-gradientColor2">
            {/* Display the logo in the top-left corner */}
            <div className="absolute top-4 left-4">
                <Image src={logo} alt="AwayMe Logo" width={150} height={50} />
            </div>

            {/* Main content container */}
            <div className="bg-white px-24 pt-[115px] pb-[91px] rounded-[16px] shadow-lg text-center mx-3.5">
                {/* Success message */}
                <h2 className="font-roboto text-[32px] max-w-[328px] font-medium leading-[37.5px] mb-4 text-center">
                    Thank you for your purchase!
                </h2>

                {/* Subtext message */}
                <p className="font-openSans text-[16px] max-w-[328px] font-normal leading-[21.79px] text-center text-secondaryHeading mb-12">
                    You can now fill your calendar more than 20 hours
                </p>

                {/* Button to view the calendar */}
                <div className="flex justify-center">
                    <Button
                        buttonText="View your calendar"
                        buttonClassName="bg-accent text-white px-10 py-3 rounded-lg hover:bg-hover hover:text-accent shadow-button transition font-roboto font-medium"
                        onClick={handleViewCalendar}
                    />
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
