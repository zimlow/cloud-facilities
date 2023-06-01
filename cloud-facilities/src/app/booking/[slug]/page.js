import CancelButton from "@/app/components/CancelButton";
import { redirect } from "next/navigation";
import { prisma } from "@/db";
import Link from "next/link";

const BookingPage = async ({ params }) => {
  const getTrip = await prisma.trips.findUnique({
    where: {
      trip_id: params.slug,
    },
  });

  async function createBooking(data) {
    "use server";
    await prisma.bookings.create({
      data: {
        booking_reference: Math.random().toString(36).substring(2, 17),
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
        name_on_card: data.get("cardname").valueOf(),
        card_no: Number(data.get("cardnumber").valueOf()),
        expiry_month: Number(data.get("expmonth").valueOf()),
        expiry_year: Number(data.get("expyear").valueOf()),
        CVV: Number(data.get("cvv").valueOf()),
      },
    });
    console.log("saved");
    redirect("/confirmation");
  }

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
          defaultValue="K12345678B"
        />
        <br />
        <label htmlFor="fname">First name:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="fname"
          name="fname"
          defaultValue="ah kow"
        />
        <label htmlFor="lname">Last name:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="lname"
          name="lname"
          defaultValue="tan"
        />
        <label htmlFor="email">Email:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="email"
          id="email"
          name="email"
          defaultValue="tanahkow@gmail.com"
        />
        <label htmlFor="dob">Date of Birth:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="dob"
          name="dob"
          defaultValue="19 sep 2023"
        />
        <br />
        <label htmlFor="address">Address:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="address"
          name="address"
          defaultValue="123 address road #01-01"
        />
        <label htmlFor="country">Country:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="country"
          name="country"
          defaultValue="Singapore"
        />
        <label htmlFor="postal">Postal Code:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="postal"
          name="postal"
          defaultValue="666000"
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
          defaultValue="1234"
          //regex pattern
        />
        <label htmlFor="mobile">Mobile Number:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="tel"
          id="mobile"
          name="mobile"
          defaultValue="5678"
          //regex pattern
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
          defaultValue="tan ah kow"
        />
        <label htmlFor="cardnumber">Card Number:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="cardnumber"
          name="cardnumber"
          defaultValue="1234567890123456"
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
