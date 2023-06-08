import CancelButton from "@/app/components/CancelButton";
import { redirect } from "next/navigation";
import { prisma } from "@/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Email } from "@/app/components/Email";
import nodemailer from "nodemailer";
import { render, renderAsync } from "@react-email/render";

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

  async function createBooking(data) {
    "use server";

    const lastName = data.get("lname").valueOf().toUpperCase();
    const firstName = data.get("fname").valueOf();
    const email = data.get("email").valueOf();
    const passport_no = data.get("passport").valueOf().toUpperCase();
    const dob = data.get("dob").valueOf();
    const address = data.get("address").valueOf();
    const address_country = data.get("country").valueOf();
    const address_postal = Number(data.get("postal").valueOf());
    const home_no = Number(data.get("home").valueOf());
    const mobile_no = Number(data.get("mobile").valueOf());

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
          lastName: lastName,
          firstName: firstName,
          email: email,
          passport_no: passport_no,
          dob: dob,
          address: address,
          address_country: address_country,
          address_postal: address_postal,
          home_no: home_no,
          mobile_no: mobile_no,
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

      // email
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: process.env.ETH_USER,
          pass: process.env.ETH_PASSWORD,
        },
      });

      const emailHtml = render(<Email booking_ref={newBooking.booking_reference} />);

      const options = {
        from: "skydive@cloudfac.com",
        to: "test@gmail.com",
        subject: "Cloud Facilities Trip Booking Confirmation",
        html: emailHtml,
      };

      transporter.sendMail(options);

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
          required
        />
        <br />
        <label htmlFor="fname">First name:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="fname"
          name="fname"
          defaultValue={session?.user.user_firstName || null}
          required
        />
        <label htmlFor="lname">Last name:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="lname"
          name="lname"
          defaultValue={session?.user.user_lastName || null}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          className="border border-slate-300 rounded-md "
          type="email"
          id="email"
          name="email"
          defaultValue={session?.user.user_email || null}
          required
          title="Please enter a valid email address"
        />
        <label htmlFor="dob">Date of Birth:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="dob"
          name="dob"
          defaultValue={session?.user.user_dob || null}
          required
          pattern="(0[1-9]|1[0-9]|2[0-9]|3[0-1])/(0[1-9]|1[0-2])/19\d{2}|20\d{2}"
          title="Please enter a valid date in DD/MM/YYYY format"
        />
        <br />
        <label htmlFor="address">Address:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="address"
          name="address"
          defaultValue={session?.user.user_address || null}
          required
        />
        <label htmlFor="country">Country:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="country"
          name="country"
          defaultValue={session?.user.user_country || null}
          required
        />
        <label htmlFor="postal">Postal Code:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="postal"
          name="postal"
          defaultValue={session?.user.user_postal_code || null}
          required
          pattern="[0-9]{6}"
          title="Please enter a valid postal code"
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
          required

          //todo: implement regex pattern
        />
        <label htmlFor="mobile">Mobile Number:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="tel"
          id="mobile"
          name="mobile"
          defaultValue={mobileContacts?.contact_value || null}
          required
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
          required
        />
        <label htmlFor="cardnumber">Card Number:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="cardnumber"
          name="cardnumber"
          defaultValue="1111555599993333"
          required
          pattern="[0-9]{13,16}"
          title="Please enter a valid credit card number"
        />
        <label htmlFor="expmonth">Expiry:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="expmonth"
          name="expmonth"
          defaultValue="09"
          required
          pattern="^(0[1-9]|1[0-2])$"
          maxLength="2"
        />
        /
        <label htmlFor="expyear" />
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="expyear"
          name="expyear"
          defaultValue="23"
          pattern="2[3-9]|3[0-3]"
          maxLength="2"
          required
        />
        <label htmlFor="cvv">CVV:</label>
        <input
          className="border border-slate-300 rounded-md"
          type="text"
          id="cvv"
          name="cvv"
          defaultValue="911"
          pattern="[0-9]{3,4}"
          title="Please enter a valid CVV"
          required
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
