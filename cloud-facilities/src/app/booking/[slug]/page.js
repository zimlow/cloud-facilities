import Link from "next/link";

async function createBooking(data, { params }) {
  "use server";
  console.log("hi");
  // await prisma.users.create({
  //   data: {
  //     user_lastName: data.lname,
  //     user_firstName: data.fname,
  //     user_email: data.email,
  //     user_dob: data.dob,
  //     user_address: data.address,
  //     user_country: data.country,
  //     user_postal_code: data.postal,
  //     user_passport_no: data.passport,
  //     user_bookings: {
  //       create: {
  //   }
  // })

  // await prisma.bookings.create({
  //   data: {
  //     booking_reference: Math.random().toString(36).substring(2, 17),
  //     trip: {
  //       connect: { trip_id: params.slug },
  //     },
  //     user: {
  //       create: {},
  //     },
  //   },
  // });
}

const BookingPage = async ({ params }) => {
  const getTrip = await prisma.trips.findUnique({
    where: {
      trip_id: params.slug,
    },
  });

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
        />
        <br />
        <label htmlFor="fname">First name:</label>
        <input className="border border-slate-300 rounded-md" type="text" id="fname" name="fname" />
        <label htmlFor="lname">Last name:</label>
        <input className="border border-slate-300 rounded-md" type="text" id="lname" name="lname" />
        <label htmlFor="email">Email:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="email"
          id="email"
          name="email"
        />
        <label htmlFor="dob">Date of Birth:</label>
        <input className="border border-slate-300 rounded-md" type="text" id="dob" name="dob" />
        <br />
        <label htmlFor="address">Address:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="address"
          name="address"
        />
        <label htmlFor="country">Country:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="country"
          name="country"
        />
        <label htmlFor="postal">Postal Code:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="postal"
          name="postal"
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
          //regex pattern
        />
        <label htmlFor="mobile">Mobile Number:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="tel"
          id="mobile"
          name="mobile"
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
        />
        <label htmlFor="cardnumber">Card Number:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="cardnumber"
          name="cardnumber"
        />
        <label htmlFor="expiry">Expiry:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="expmonth"
          name="expmonth"
        />
        /
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="expyear"
          name="expyear"
        />
        <label htmlFor="cvv">CVV:</label>
        <input className="border border-slate-300 rounded-md" type="text" id="cvv" name="cvv" />
        <br />
        <button type="submit">Submit</button>
        <br />
      </form>
      <CancelButton />
    </>
  );
};

export default BookingPage;
