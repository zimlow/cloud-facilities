import { prisma } from "@/db";

import Image from "next/image";
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

  console.log(getTrip);

  return (
    <div className="items-center content-center justify-items-center justify-center p-0 m-0 text-center">
      <div>{getTrip.city}</div>
      <div>
        {getTrip.trip_start_date} TO {getTrip.trip_end_date}
      </div>
      <Link href={`/booking/${getTrip.trip_id}`} className="bg-yellow-300 w-20">
        Book Now
      </Link>
      <br />
      <div>{getTrip.city} Highlights</div>
      <div className="flex">
        {getDestination.destination_image.map((img) => {
          return <img src={img} width="20%" height="20%"></img>;
        })}
      </div>
      {getDestination.destination_highlights.map((h) => {
        return <div>{h}</div>;
      })}
      <br />
      <div className="price">All inclusive Price: SGD${getTrip.trip_price}</div>
      <br></br>
      Accommodation Highlights
      <div className="flex">
        {getAccommo.accommo_pics.map((pic) => {
          return <img src={pic} width="20%" height="20%"></img>;
        })}
      </div>
      {getAccommo.accommo_highlights.map((highlights) => {
        return <div className="flex">{highlights}</div>;
      })}
    </div>
  );
};

export default TripPage;
