import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

async function getBooking(data) {
  "use server";
  const res = await prisma.bookings.findFirst({
    where: {
      AND: [
        { booking_reference: data.get("booking_reference").valueOf().toUpperCase() },
        { lastName: data.get("lname").valueOf().toUpperCase() },
      ],
    },
    include: {
      trip: true,
    },
  });
  redirect(`/managebooking/overview?booking=${res.booking_reference}`);
}

const managebooking = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <section className="relative block" style={{ height: "40vh" }}>
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
          }}
        >
          <span id="tintOverlay" className="w-full h-full absolute opacity-20 bg-black"></span>

          <div className="flex text-center justify-center items-center text-8xl font-bold text-amber-100 h-full">
            Manage Booking
          </div>
        </div>
      </section>
      <br />
      <div className="flex flex-row w-full text-center justify-center items-center ">
        <div className="border-solid border-amber-100 border-4 p-4 pb-2 rounded-lg mb-3 shadow-lg">
          <form action={getBooking} className="w-full">
            <input
              placeholder="Enter your Seven-character Booking Reference"
              name="booking_reference"
              className="w-full border-2 border-solid border-slate-200 text-sm mb-5"
            ></input>
            <br />
            <input
              placeholder="Enter your last/family name"
              name="lname"
              className="w-full border-2 border-solid border-slate-200 text-sm mb-5"
            ></input>
            <br />

            <button type="submit" className="w-4/5 bg-blue-200 rounded mb-5">
              Submit
            </button>
          </form>
          {!session ? (
            <div className="relative mb-3">
              Already a user?{" "}
              <Link
                href="/login"
                className="text-teal-400 hover:underline hover:decoration-1 hover:decoration-inherit mb-5"
              >
                Log in to your account
              </Link>{" "}
              instead
            </div>
          ) : (
            <div className="relative mb-3">
              Logged in?{" "}
              <Link
                href="/profile/bookings"
                className="text-teal-400 hover:underline hover:decoration-1 hover:decoration-inherit mb-3"
              >
                Manage Booking in Profile
              </Link>{" "}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default managebooking;
