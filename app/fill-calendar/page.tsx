"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Banner from "../components/Banner";
import MyCalendar from "../components/Calendar";
import FillCalendarCard from "../components/FillCalendarCard";
import Link from "next/link";
import { useUserContext } from "@/app/context/userContext";

export default function FillCalendar() {
  const router = useRouter();
  const { user } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [fillCalendarLoading, setFillCalendarLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const fetchComputedFill = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/fill-calendar");
      if (response.status === 401) {
        return router.replace("/login");
      }
      const { data } = await response.json();
      setEvents(data);
      const updatedEvents = data?.map((eventData: any, index: number) => ({
        id: index + 1,
        title: eventData?.summary,
        start: new Date(eventData?.start?.dateTime),
        end: new Date(eventData?.end?.dateTime),
      }));
      setFilteredEvents(updatedEvents);
      setLoading(false);
    } catch (err) {
      console.error("Error in fetching events:", err);
      setEvents([]);
      setLoading(false);
    }
  }, []);

  const handleFillCalendar = async () => {
    setFillCalendarLoading(true);
    try {
      const response = await fetch("/api/fill-calendar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ events }),
      });
      if (response.status === 401) {
        return router.replace("/login");
      }
      setFillCalendarLoading(false);
      if (response.status === 201) {
        router.push("/view-calendar");
      }
    } catch (err) {
      console.error("Error in creating events:", err);
      setFillCalendarLoading(false);
    }
  };

  useEffect(() => {
    fetchComputedFill();
  }, [fetchComputedFill]);

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center bg-hover">
        <p className="text-lg leading-lg text-heading">
          Fetching your fill percentage events...
        </p>
      </div>
    );
  }

  if (fillCalendarLoading) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center bg-hover">
        <p className="text-lg leading-lg text-heading">
          Filling your calendar. Please hang on a moment...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-[100vh] overflow-y-auto bg-gradient-to-br from-gradientColor1 to-gradientColor2 py-4 px-8">
      <Header />
      <div className="w-[90%] mx-auto">
        <div className="inline-block">
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
        {!user?.isPaidUser && <Banner />}
        <div className="my-12 flex items-start gap-4">
          <div className="w-[40%]">
            <FillCalendarCard
              onConfirm={() => {
                handleFillCalendar();
              }}
              onReFill={() => fetchComputedFill()}
            />
          </div>
          <div className="w-[60%]">
            <div className="bg-white p-4 rounded-[16px]">
              <MyCalendar events={filteredEvents} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
