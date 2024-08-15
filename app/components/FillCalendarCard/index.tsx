import React from "react";
import Button from "../Button";
import { IFillCalendarCardProps } from "./interface";

export default function FillCalendarCard(props: IFillCalendarCardProps) {
  const { onConfirm, onReFill } = props;
  return (
    <div className="p-6 bg-white shadow-card rounded-[16px]">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-semibold text-2xl leading-2xl text-heading">
            Fill Calendar
          </h1>
          <p className="text-base leading-base text-secondaryHeading">
            Only 20% fill is available on Free version
          </p>
        </div>
        <div className="inline">
          <div className="flex items-center gap-8">
            <Button
              buttonText="Repopulate"
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
