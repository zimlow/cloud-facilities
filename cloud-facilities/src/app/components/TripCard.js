"use client";
import Link from "next/link";
import React from "react";

const TripCard = (props) => {
  return (
    <Link href={`trips/skydive/${props.trip_id}`}>
      <div className="flex flex-row mx-1 mt-10">
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-200">
          <img src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{props.city}</div>
            <div>
              {props.trip_start_date} TO {props.trip_end_date}
            </div>
            <p className="text-gray-700 text-base">Skydive San Diego gogo</p>
            <p className="text-gray-700 text-base">Available Slots: {props.trip_availability}</p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <button className="inline-block bg-yellow-200 px-3 py-1 text-sm font-semibold text-gray-700 hover:border-solid hover:border-2 hover:border-blue-500">
              Find out more!
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TripCard;
