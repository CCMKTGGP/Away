import React from 'react';

// Define the interface for the Tabs component props
interface TabsProps {
  currentTab: string; // Represents the currently selected tab
  setCurrentTab: (tab: string) => void; // Function to update the selected tab
}

// Define the Tabs component using React Functional Component (React.FC) with the TabsProps interface
const Tabs: React.FC<TabsProps> = ({ currentTab, setCurrentTab }) => {
  return (
    <div className="flex justify-left my-4 ml-20">
      {/* Tab for "My Account" */}
      <div
        className={`p-2 cursor-pointer border-b-2 ${currentTab === 'myAccount' ? 'border-accent font-bold text-accent' : 'border-transparent text-black'}`}
        // Update the currentTab state to "myAccount" when this tab is clicked
        onClick={() => setCurrentTab('myAccount')}
      >
        <span className="fontFamily-roboto">My Account</span>
      </div>

      {/* Separator between tabs */}
      <div className="p-2 fontFamily-roboto text-accent">
        |
      </div>

      {/* Tab for "Billing Info" */}
      <div
        className={`p-2 cursor-pointer border-b-2 ${currentTab === 'billingInfo' ? 'border-accent font-bold text-accent' : 'border-transparent text-black'}`}
        // Update the currentTab state to "billingInfo" when this tab is clicked
        onClick={() => setCurrentTab('billingInfo')}
      >
        <span className="fontFamily-roboto">Billing Info</span>
      </div>
    </div>
  );
};

export default Tabs;
