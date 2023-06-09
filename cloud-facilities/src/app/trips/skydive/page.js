import Image from "next/image";
import { prisma } from "../../../db";
import TripCard from "@/app/components/TripCard";

const skydive = async () => {
  const oceaniaTrips = await prisma.trips.findMany({
    where: {
      destination: {
        region: "OCEANIA",
      },
    },
    include: {
      destination: true,
    },
  });

  const americasTrips = await prisma.trips.findMany({
    where: {
      destination: {
        region: "AMERICAS",
      },
    },
    include: {
      destination: true,
    },
  });
  const asiaTrips = await prisma.trips.findMany({
    where: {
      destination: {
        region: "ASIA",
      },
    },
    include: {
      destination: true,
    },
  });
  const europeTrips = await prisma.trips.findMany({
    where: {
      destination: {
        region: "EUROPE",
      },
    },
    include: {
      destination: true,
    },
  });

  return (
    <>
      <section className="relative block" style={{ height: "50vh" }}>
        <div
          className="absolute w-full h-full overflow-hidden bg-center bg-cover"
          style={{
            backgroundImage: "url('/destinations2.jpg')",
          }}
        >
          <div className="flex text-center justify-center items-center text-8xl font-bold text-amber-100 h-full">
            <p className="drop-shadow-2xl">Destinations</p>
          </div>
        </div>
      </section>
      <div className=" bg-black-300/50 w-full h-full mt-10">
        <div className="flex flex-row w-full pb-10">
          <p className="px-32 font-bold text-3xl">OCEANIA</p>
          {oceaniaTrips.map((trip) => {
            return <TripCard key={trip.trip_id} {...trip} />;
          })}
        </div>

        <div className=" bg-black-300/50 w-full h-full mt-10">
          <div className="flex flex-row w-full pb-10">
            <p className="px-32 font-bold text-3xl">AMERICA</p>
            {americasTrips.map((trip) => {
              return <TripCard key={trip.trip_id} {...trip} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default skydive;
