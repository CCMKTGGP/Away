import React, { useState, useEffect } from "react";
import Button from "../Button";
interface Plan {
  name: string;
  features: string[];
}

const PlanDetails: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch("/api/get-plan-details");
        const data = await response.json();
        setPlans(data);
      } catch (error) {
        console.error("Error fetching plan details:", error);
      }
    };

    fetchPlans();
  }, []);

  return (
    <div className="flex justify-center space-x-4">
      {plans.map(({ name, features }, index) => {
        const isPro = name.toLowerCase().includes("pro");
        return (
          <div
            key={index}
            className="w-[320px] p-6 bg-white shadow-card rounded-[16px]"
          >
            <div className="flex items-center gap-6">
              <p className="text-lg font-bold text-heading">{name}</p>
              {!isPro && (
                <div className="inline-block text-sm px-4 py-2 rounded-[12px] bg-heading text-white font-bold">
                  Current Plan
                </div>
              )}
            </div>
            <div className="pt-8 pb-4">
              {features.map((feature, index) => (
                <div className="flex items-center gap-4 py-2" key={index}>
                  <img src="./Checkmark.png" alt="" className="w-8 h-8" />
                  <p className="text-base leading-base text-heading font-semibold">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
            {isPro ? (
              <Button
                buttonText="Upgrade Now"
                buttonClassName="rounded-md shadow-button hover:shadow-buttonHover bg-accent hover:bg-hover text-white hover:text-accent text-base leading-base"
                onClick={() => console.log("Call the stripe api here!")}
              />
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PlanDetails;
