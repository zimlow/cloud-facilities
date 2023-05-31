import React from "react";
import { PrismaClient } from "@prisma/client";

const skydive = async () => {
  const prisma = new PrismaClient();
  const skydivetrips = await prisma.Trips.findMany();

  return (
    <>
      <div className="text-center place-self-center text-9xl">Eat Sleep Skydive</div>
      <div className="flex flex-row p-1">
        {skydivetrips.map((trip) => {
          return (
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-200 m-20 ">
              <img
                src="https://v1.tailwindcss.com/img/card-top.jpg"
                alt="Sunset in the mountains"
              />
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{trip.city}</div>
                <div>
                  {trip.trip_start_date} TO {trip.trip_end_date}
                </div>
                <p class="text-gray-700 text-base">Skydive San Diego gogo</p>
                <p class="text-gray-700 text-base">Available Slots: {trip.trip_availability}</p>
              </div>
              <div class="px-6 pt-4 pb-2">
                <button class="inline-block bg-yellow-200 px-3 py-1 text-sm font-semibold text-gray-700 hover:border-solid hover:border-2 hover:border-blue-500">
                  Book Now!
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default skydive;
