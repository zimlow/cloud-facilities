import { prisma } from "@/db";

async function getBooking(data) {
  "use server";
  const theBooking = await prisma.bookings.find({
    where: {
      booking_reference: data.get("booking_reference").valueOf(),
      lname: data.get("lname").valueOf(),
    },
  });
  console.log(theBooking);
}
const myBooking = () => {
  return (
    <>
      <div className="text-center place-self-center text-9xl">Manage Booking</div>
      <br />
      <form action={getBooking}>
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
    </>
  );
};

export default myBooking;
