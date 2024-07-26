import React, { useState, useEffect } from "react";
import PlanCard from "./plancard";

interface Plan {
  name: string;
  features: string[];
}

const PlanDetails: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch("/api/get-plan-details");
        const data = await response.json();
        setPlans(data);
      } catch (error) {
        console.error("Error fetching plan details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center space-x-4">
      {plans.map((plan, index) => (
        <PlanCard
          key={index}
          title={plan.name}
          features={plan.features}
          isPro={plan.name.toLowerCase().includes("pro")}
        />
      ))}
    </div>
  );
};

export default PlanDetails;
