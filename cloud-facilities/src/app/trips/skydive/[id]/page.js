import { prisma } from "@/db";

import Link from "next/link";

const TripPage = async ({ params }) => {
  const getAccommo = await prisma.accommodation.findUnique({
    where: {
      trip_id: params.id,
    },
  });
  const getTrip = await prisma.trips.findUnique({
    where: {
      trip_id: params.id,
    },
  });
  const getDestination = await prisma.destinations.findUnique({
    where: {
      city: getTrip.city,
    },
  });

  const tripSlots = getTrip.trip_availability <= 0 ? null : getTrip.trip_availability;

  return (
    <div className="h-full w-full px-auto m-0 bg-slate-50">
      <div className="font-bold text-7xl italic text-center">{getTrip.city}</div>
      <div className="text-center text-xl">
        {getTrip.trip_start_date} TO {getTrip.trip_end_date}
      </div>
      {tripSlots ? (
        <Link
          href={`/booking/${getTrip.trip_id}`}
          className=" text-center justify-center items-center bg-yellow-300 w-20"
        >
          <p className="flex justify-center bg-yellow-300 font-bold">Book Now</p>
        </Link>
      ) : (
        <div className="bg-red-300 w-20">Sold Out</div>
      )}
      <br />
      <div className="font-semibold underline text-center text-xl">{getTrip.city} Highlights</div>
      <div className="flex w-full justify-center">
        {getDestination.destination_image.map((img) => {
          return (
            <img
              className="mx-5 rounded border-solid border-amber-100 border-4"
              src={img}
              width="20%"
              height="20%"
            ></img>
          );
        })}
      </div>
      <div className="flex w-full justify-center">
        {getDestination.destination_highlights.map((h) => {
          return <div className="mx-20 text-center">{h}</div>;
        })}
      </div>
      <br />
      <div className="price text-center text-xl">
        All inclusive Price:
        <span className="font-bold text-blue-700"> SGD${getTrip.trip_price}</span>
      </div>
      <br></br>
      <p className="font-semibold underline text-center text-xl">Accommodation Highlights</p>
      <div className="flex w-full justify-center">
        {getAccommo.accommo_pics.map((pic) => {
          return (
            <img
              className="mx-5 rounded border-solid border-amber-100 border-4"
              src={pic}
              width="20%"
              height="20%"
            ></img>
          );
        })}
      </div>
      <div className="flex w-full justify-center">
        {getAccommo.accommo_highlights.map((highlights) => {
          return <div className="mx-32 text-center">{highlights}</div>;
        })}
      </div>
    </div>
  );
};

export default TripPage;
