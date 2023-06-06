import { prisma } from "../../../db";
import TripCard from "@/app/components/TripCard";
import Link from "next/link";

const skydive = async () => {
  const skydiveTrips = await prisma.trips.findMany({
    include: {
      destination: true,
    },
    orderBy: {
      destination: {
        region: "desc",
      },
    },
  });

  return (
    <>
      <div className="text-center place-self-center text-9xl">Eat Sleep Skydive</div>
      {skydiveTrips.map((trip) => {
        return <TripCard key={trip.trip_id} {...trip} />;
      })}
    </>
  );
};

export default skydive;
