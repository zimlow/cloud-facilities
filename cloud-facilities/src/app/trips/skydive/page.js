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
      <div className="p-5 bg-red-200 bg-origin-border text-center place-self-center text-9xl grow h-full">
        Eat Sleep Skydive
      </div>
      <div className="grid-cols-3 bg-black-500/50 z-50">
        {oceaniaTrips.map((trip) => {
          return <TripCard key={trip.trip_id} {...trip} />;
        })}
        {asiaTrips.map((trip) => {
          return <TripCard key={trip.trip_id} {...trip} />;
        })}
        {europeTrips.map((trip) => {
          return <TripCard key={trip.trip_id} {...trip} />;
        })}
        {americasTrips.map((trip) => {
          return <TripCard key={trip.trip_id} {...trip} />;
        })}
      </div>
    </>
  );
};

export default skydive;
