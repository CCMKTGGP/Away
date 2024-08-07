import React from "react";
import Button from "../Button";


export default function Banner() {
  return (
    <div className="my-4 w-full flex items-center justify-center gap-8 p-6 bg-accent border border-accent rounded-[16px]">
      <p className="text-base text-white">
        <span className="font-semibold">
          More Calendars. More Fill Options. Longer Timelines.
        </span>{" "}
        Upgrade to the full version of AwayMe.
      </p>
      <Button
        buttonText="Upgrade Now"
        buttonClassName="rounded-md shadow-button hover:shadow-buttonHover bg-hover text-accent text-base leading-base"
        onClick={() => console.log("upgrade now clicked!")}
      />
    </div>
  );
}

export default function Banner() {
  return (
    <BannerContextProvider>
      <BannerContent />
    </BannerContextProvider>
  );
}
