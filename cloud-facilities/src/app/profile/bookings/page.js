import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { prisma } from "@/db";
import Link from "next/link";

const profileBookings = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/profile");
  }

  const bookings = await prisma.bookings.findMany({
    where: {
      user_id: session?.user.user_id,
    },
    select: {
      booking_reference: true,
      trip: {
        select: {
          activity: true,
          trip_start_date: true,
          trip_end_date: true,
          trip_title: true,
          destination: {
            select: {
              city: true,
              country: true,
              region: true,
              destination_image: true,
            },
          },
        },
      },
    },
  });

  return (
    <>
      <main className="profile-page">
        <section className="relative block" style={{ height: "500px" }}>
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span id="tintOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
          </div>
        </section>
        <section className="relative py-16 bg-gray-300">
          <div className="container mx-auto px-4 ">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                {/* tabs */}
                <div className="mr-4 p-3 text-center">
                  <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <li className="mr-2">
                      <Link
                        href="/profile"
                        className="text-lg inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                      >
                        Personal Details
                      </Link>
                    </li>
                    <li className="mr-2">
                      <Link
                        href="/profile/bookings"
                        className="text-lg inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500 "
                      >
                        Bookings
                      </Link>
                    </li>
                  </ul>

                  {/* --FORM -- */}
                  <div className="relative">
                    <h1 className="text-3xl text-start py-5">Upcoming Trips</h1>
                    {bookings.map((booking) => {
                      return (
                        <>
                          <div className="text-2xl text-start divide-y-2 divide-slate-200 my-2">
                            <div>Booking Reference {booking.booking_reference.toUpperCase()}</div>
                            <div className="pt-2">{booking.trip.destination.city}</div>
                          </div>
                          {/* --trip details card-- */}
                          <div className="flex divide-x-2 divide-slate-400 shadow-lg text-start my-1 bg-blue-50 rounded">
                            <div className="p-3 w-1/5">
                              <p className="text-xl">{booking.trip.trip_title}</p>

                              <p className="text-sm text-slate-400">{booking.trip.activity}</p>
                            </div>
                            <div className="px-5 py-2 w-3/5 items-center justify-center flex">
                              <div className="text-3xl ">
                                {booking.trip.trip_start_date} to {booking.trip.trip_end_date}
                              </div>
                            </div>
                            <div className="p-3 w-1/5 items-center justify-center flex ">
                              <Link
                                className="rounded bg-teal-400 p-1 font-semibold"
                                href={`/managebooking/overview?booking=${booking.booking_reference}`}
                              >
                                Manage Booking
                              </Link>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default profileBookings;
