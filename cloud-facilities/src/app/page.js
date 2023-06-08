import React from "react";
import Link from "next/link";

const Home = async () => {
  return (
    <>
      <section className="relative block" style={{ height: "80vh" }}>
        <div
          className="absolute w-full h-full overflow-hidden bg-contain bg-no-repeat "
          style={{
            backgroundImage: "url('/home.png')",
          }}
        >
          <div className=" text-end justify-end items-start text-8xl font-bold h-full py-15 px-10">
            <Link href="/trips/skydive">
              <p className="text-yellow-500 hover:text-blue-300 py-3">Enter</p>
            </Link>
            <Link href="/trips/skydive">
              <p className="text-yellow-500 hover:text-blue-300 py-3">About Us</p>
            </Link>
            <Link href="/trips/skydive">
              <p className="text-yellow-500 hover:text-blue-300 py-3">All Trips</p>
            </Link>
            <Link href="/managebooking">
              <p className="text-yellow-500 hover:text-blue-300 py-3">Bookings</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
