import React from "react";
import Button from "../Button";
import { IFillCalendarCardProps } from "./interface";

export default function FillCalendarCard(props: IFillCalendarCardProps) {
  const { onConfirm, onReFill, onCancel } = props;
  return (
    <div className="p-6 bg-white shadow-card rounded-[16px]">
      <div className="flex flex-col gap-6">
        <p className="text-base leading-base text-secondaryHeading">
          Only 20% fill is available on Free version
        </p>
        <div className="inline">
          <div className="flex items-center gap-8">
            <Button
              buttonText="Cancel"
              buttonClassName="bg-transparent text-gray-500 text-base leading-base"
              onClick={() => onCancel()}
            />
            <Button
              buttonText="Start Over"
              buttonClassName="rounded-md shadow-button hover:shadow-buttonHover bg-hover text-accent text-base leading-base"
              onClick={() => onReFill()}
            />
            <Button
              buttonText="Confirm"
              buttonClassName="rounded-md shadow-button hover:shadow-buttonHover bg-accent hover:bg-hover text-white hover:text-accent text-base leading-base"
              onClick={() => onConfirm()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
