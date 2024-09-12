import React, { useState } from "react";
import Button from "../Button";
import { IFillCalendarFormProps } from "./interface";
import "./FillCalendarFormStyles.css";
import moment from "moment";

export default function FillCalendarForm(props: IFillCalendarFormProps) {
  const {
    onConfirm,
    onReFill,
    onPopulate,
    onCancel,
    areEventsPopulated,
    state,
    setState,
  } = props;

  const { fillPercentage, startDate, endDate } = state;
  return (
    <div className="p-6 bg-white shadow-card rounded-[16px]">
      <div className="flex flex-col gap-6">
        <div>
          <form className="flex flex-col gap-6 mt-4">
            <div>
              <label
                className="block mb-2 text-gray-500"
                htmlFor="fillPercentage"
              >
                Fill Percentage
              </label>
              <input
                disabled={areEventsPopulated}
                type="range"
                min="1"
                max="100"
                value={fillPercentage}
                className="slider"
                id="fillPercentage"
                name="fillPercentage"
                onChange={(event) =>
                  setState({ fillPercentage: Number(event.target.value) })
                }
              />
              <p className="mt-2 text-sm text-heading">{fillPercentage}%</p>
            </div>
            <div>
              <label className="block mb-2 text-gray-500" htmlFor="startDate">
                Start Date
              </label>
              <input
                disabled={areEventsPopulated}
                type="date"
                value={startDate}
                id="startDate"
                name="startDate"
                className="w-full px-3 py-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-gradientColor1 text-black font-medium"
                onChange={(event) =>
                  setState({ startDate: event.target.value })
                }
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-500" htmlFor="endDate">
                End Date
              </label>
              <input
                disabled={areEventsPopulated}
                type="date"
                id="endDate"
                name="endDate"
                value={endDate}
                className="w-full px-3 py-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-gradientColor1 text-black font-medium"
                onChange={(event) => setState({ endDate: event.target.value })}
              />
            </div>
          </form>
        </div>
        <div className="inline mt-4">
          {areEventsPopulated ? (
            <div className="flex items-center gap-8">
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
          ) : (
            <div className="flex items-center gap-8">
              <Button
                buttonText="Cancel"
                buttonClassName="bg-transparent text-gray-500 text-base leading-base"
                onClick={() => onCancel()}
              />
              <Button
                buttonText="Populate Events"
                buttonClassName="rounded-md shadow-button hover:shadow-buttonHover bg-accent hover:bg-hover text-white hover:text-accent text-base leading-base"
                onClick={() =>
                  onPopulate({ fillPercentage, startDate, endDate })
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
