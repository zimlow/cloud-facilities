import { prisma } from "@/db";
import { redirect } from "next/navigation";
import { GET } from "@/app/api/mybooking/route.js";
import Link from "next/link";

async function getBooking(data) {
  "use server";
  const res = await prisma.bookings.findFirst({
    where: {
      AND: [
        { booking_reference: data.get("booking_reference").valueOf() },
        { lastName: data.get("lname").valueOf() },
      ],
    },
    include: {
      trip: true,
    },
  });
  console.log(res);
  redirect(`/managebooking/overview?booking=${res.booking_reference}`);
}

const managebooking = () => {
  return (
    <>
      <div className="text-center place-self-center text-9xl">Manage Booking</div>
      <br />
      <div className="justify-end w-full">
        <form action={getBooking} className="w-full">
          <input
            placeholder="Enter your Ten-character Booking Reference"
            name="booking_reference"
            className="w-4/12"
          ></input>
          <br />
          <input placeholder="Enter your last/family name" name="lname" className="w-4/12"></input>
          <br />

          <button type="submit" className="w-2/12 bg-blue-200">
            Manage Booking
          </button>
        </form>
        Already a user?{" "}
        <Link
          href="/login"
          className="text-teal-400 hover:underline hover:decoration-1 hover:decoration-inherit"
        >
          Log in to your account
        </Link>{" "}
        instead
      </div>
    </>
  );
};

export default managebooking;
