"use server";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "@/db";
import Link from "next/link";
import ContactCard from "../components/ContactCard";

//   only authenticated user can see this
const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/profile");
  }

  const allDetails = await prisma.RegisteredUsers.findUnique({
    where: {
      user_email: session?.user?.user_email,
    },
    select: {
      user_lastName: true,
      user_firstName: true,
      user_email: true,
      user_dob: true,
      user_address: true,
      user_country: true,
      user_postal_code: true,
      user_passport_no: true,
      user_image: true,
      user_bookings: {
        select: {
          booking_reference: true,
          trip_id: true,
        },
      },
      user_contacts: {
        select: {
          contact_value: true,
          contact_type: true,
        },
      },
    },
  });

  const contactDetails = allDetails.user_contacts;

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
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                {/* tabs */}
                <div className="mr-4 p-3 text-center">
                  <ul className="absolute flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <li className="mr-2">
                      <Link
                        href="/profile"
                        aria-current="page"
                        className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                      >
                        Personal Details
                      </Link>
                    </li>
                    <li className="mr-2">
                      <Link
                        href="/profile/bookings"
                        className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                      >
                        Bookings
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* --FORM -- */}
                <div className="mt-10 py-10 border-t border-gray-300 text-start">
                  <form>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor="fName"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          First name
                        </label>
                        <input
                          type="text"
                          id="fName"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder={allDetails.user_firstName}
                          disabled
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lName"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Last name
                        </label>
                        <input
                          type="text"
                          id="lName"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder={allDetails.user_lastName}
                          disabled
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder={allDetails.user_email}
                          disabled
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="DOB"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Date of Birth
                        </label>
                        <input
                          type="text"
                          id="DOB"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder={allDetails.user_dob}
                          disabled
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="address"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Home Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder={allDetails.user_address}
                          disabled
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="country"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          id="country"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder={allDetails.user_country}
                          disabled
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          htmlFor="postal"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Postal Code
                        </label>
                        <input
                          type="text"
                          id="postal"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder={allDetails.user_postal_code}
                          disabled
                        />
                      </div>

                      <div className="mb-6">
                        <label
                          htmlFor="passportNo"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Password
                        </label>
                        <input
                          type="text"
                          id="passportNo"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder={allDetails.user_passport_no}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="font-bold text-xl underline text-start "> Contact Details</div>

                    <div className="mb-6">
                      <ContactCard contactdetails={contactDetails} />
                      {/* <label
                        htmlFor="mobile"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Mobile No.
                      </label>
                      <input
                        type="text"
                        id="mobile"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={allDetails.user_contacts[0].contact_value}
                        disabled
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="home"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Home No.
                      </label>
                      <input
                        type="text"
                        id="home"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={allDetails.user_contacts[1].contact_value}
                        disabled
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="office"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Office No.
                      </label>
                      <input
                        type="text"
                        id="office"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={allDetails.user_contacts[2].contact_value}
                        disabled
                      />*/}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProfilePage;
