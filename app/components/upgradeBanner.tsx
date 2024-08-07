import React from 'react';

const UpgradeBanner: React.FC = () => {
  return (
    <div className="flex justify-between items-center p-5 bg-accent my-5 w-4/5 rounded-xl m-auto">
      <div className="text-lg text-white">
        <span className="font-bold">More Calendars. More Fill Options. Longer Timelines.</span> Upgrade to the full version of AwayMe.
      </div>
      <button className="bg-white text-accent py-2 px-4 rounded-lg font-bold">Upgrade Now</button>
    </div>
  );
};

export default UpgradeBanner;
