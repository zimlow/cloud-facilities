import CancelButton from "@/app/components/CancelButton";
import { redirect } from "next/navigation";
import { prisma } from "@/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const BookingPage = async ({ params }) => {
  let homeContacts;
  let mobileContacts;
  const session = await getServerSession(authOptions);

  const getTrip = await prisma.trips.findUnique({
    where: {
      trip_id: params.slug,
    },
  });

  if (session) {
    homeContacts = await prisma.UserContacts.findFirst({
      where: {
        AND: [{ user_id: session?.user.user_id }, { contact_type: "HOME" }],
      },
    });

    mobileContacts = await prisma.UserContacts.findFirst({
      where: {
        AND: [{ user_id: session?.user.user_id }, { contact_type: "MOBILE" }],
      },
    });
  }

  // async function checkDupes(data) {
  //   //check bookings where trip_id matches booking.trip_id
  //   //check if already have passport no.

  //   return Boolean(existingBooking);
  // }

  async function createBooking(data) {
    "use server";
    const existingBooking = await prisma.bookings.findFirst({
      where: {
        AND: [
          {
            trip_id: getTrip.trip_id,
          },
          {
            user: {
              user_passport_no: data.get("passport").valueOf(),
            },
          },
        ],
      },
    });

    if (existingBooking) {
      throw new Error("Existing Booking found");
    } else {
      const newBooking = await prisma.bookings.create({
        data: {
          booking_reference: Math.random().toString(36).substring(2, 9).toUpperCase(),
          trip: {
            connect: { trip_id: getTrip.trip_id },
          },
          lastName: data.get("lname").valueOf(),
          firstName: data.get("fname").valueOf(),
          email: data.get("email").valueOf(),
          passport_no: data.get("passport").valueOf(),
          dob: data.get("dob").valueOf(),
          address: data.get("address").valueOf(),
          address_country: data.get("country").valueOf(),
          address_postal: Number(data.get("postal").valueOf()),
          home_no: Number(data.get("home").valueOf()),
          mobile_no: Number(data.get("mobile").valueOf()),
        },
      });

      // if session is active, link the booking to the user
      if (session) {
        await prisma.bookings.update({
          where: {
            booking_reference: newBooking.booking_reference,
          },
          data: {
            user: {
              connect: {
                user_id: session?.user.user_id,
              },
            },
          },
        });
      }

      await prisma.trips.update({
        where: {
          trip_id: getTrip.trip_id,
        },
        data: {
          trip_availability: {
            increment: -1,
          },
        },
      });

      redirect("/confirmation");
    }
  }
  //todo: add in mock payment
  return (
    <>
      <div className="font-bold text-xl mb-2">{getTrip.city}</div>
      <p className="text-gray-700 text-base">{getTrip.trip_title}</p>
      <div>
        {getTrip.trip_start_date} TO {getTrip.trip_end_date}
      </div>
      <h2 className="font-bold font-9xl">Fill in your details below!</h2>
      <form action={createBooking}>
        <label htmlFor="passport">Passport No:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="passport"
          name="passport"
          defaultValue={session?.user.user_passport_no || null}
        />
        <br />
        <label htmlFor="fname">First name:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="fname"
          name="fname"
          defaultValue={session?.user.user_lastName || null}
        />
        <label htmlFor="lname">Last name:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="lname"
          name="lname"
          defaultValue={session?.user.user_firstName || null}
        />
        <label htmlFor="email">Email:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="email"
          id="email"
          name="email"
          defaultValue={session?.user.user_email || null}
        />
        <label htmlFor="dob">Date of Birth:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="dob"
          name="dob"
          defaultValue={session?.user.user_dob || null}
        />
        <br />
        <label htmlFor="address">Address:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="address"
          name="address"
          defaultValue={session?.user.user_address || null}
        />
        <label htmlFor="country">Country:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="country"
          name="country"
          defaultValue={session?.user.user_country || null}
        />
        <label htmlFor="postal">Postal Code:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="postal"
          name="postal"
          defaultValue={session?.user.user_postal_code || null}
        />
        <br />
        <br />
        <h1 className="font-bold">Contact Details</h1>
        <label htmlFor="home">Home Number:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="tel"
          id="home"
          name="home"
          defaultValue={homeContacts?.contact_value || null}

          //todo: implement regex pattern
        />
        <label htmlFor="mobile">Mobile Number:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="tel"
          id="mobile"
          name="mobile"
          defaultValue={mobileContacts?.contact_value || null}
          //todo: implement regex pattern
        />
        <br />
        <br />
        <h1 className="font-bold">Payment Details</h1>
        <label htmlFor="cardname">Name on Card:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="cardname"
          name="cardname"
          defaultValue="Jimmy G"
        />
        <label htmlFor="cardnumber">Card Number:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="cardnumber"
          name="cardnumber"
          defaultValue="1111555599993333"
        />
        <label htmlFor="expmonth">Expiry:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="expmonth"
          name="expmonth"
          defaultValue="09"
        />
        /
        <label htmlFor="expyear" />
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="expyear"
          name="expyear"
          defaultValue="23"
        />
        <label htmlFor="cvv">CVV:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="cvv"
          name="cvv"
          defaultValue="911"
        />
        <br />
        <button type="submit">Submit</button>
        <br />
        <CancelButton />
      </form>
    </>
  );
};

export default BookingPage;
