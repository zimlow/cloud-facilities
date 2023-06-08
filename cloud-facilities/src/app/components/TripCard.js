"use client";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const TripCard = (props) => {
  const tripSlots = props.trip_availability <= 0 ? null : props.trip_availability;

  return (
    <div className="w-1/4 rounded overflow-hidden shadow-lg bg-slate-200">
      <Link href={`trips/skydive/${props.trip_id}`}>
        <img src={`${props.destination.destination_image[0]}`} />

        <div className="font-bold text-xl mb-2">{props.city}</div>
        <p className="text-gray-700 text-base">{props.trip_title}</p>
        <div>
          {props.trip_start_date} TO {props.trip_end_date}
        </div>

        {tripSlots ? (
          <>
            <p className="text-gray-700 text-base">Available Slots: {props.trip_availability}</p>
            <div className="px-6 pt-4 pb-2">
              <div className="inline-block bg-yellow-200 px-3 py-1 text-sm font-semibold text-gray-700 hover:border-solid hover:border-2 hover:border-blue-500">
                Find out more!
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-700 text-base">No more slots available</p>
        )}
      </Link>
    </div>
  );
};

export default TripCard;
