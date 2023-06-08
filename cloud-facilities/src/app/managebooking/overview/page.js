"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";

const page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const updateIDref = useRef();
  const [bookings, setBookings] = useState([{}]);
  const searchParams = useSearchParams();
  const search = searchParams.get("booking");

  const getBookings = async () => {
    const bookings = await fetch("/api/mybooking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ booking_reference: search }),
    });
    const bookingdata = await bookings.json();
    setBookings(bookingdata);
  };

  const linkAccount = async () => {
    const update = await fetch("/api/mybooking", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        booking_reference: bookings.booking_reference,
        user_id: updateIDref.current.value,
      }),
    });
  };

  const handleCancel = async () => {
    const response = await fetch("/api/cancelbooking", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: session?.user?.accessToken,
      },
      body: JSON.stringify({
        booking_reference: bookings.booking_reference,
        trip_id: bookings.trip_id,
      }),
    });

    if (response.ok) {
      router.refresh("/trips");
      alert("Booking Cancelled");
    } else {
      alert(`Error: ${response.status} ${response.statusText}`);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div className="text-center">
      <div>Manage Your Booking for {bookings.trip?.trip_title}</div>
      <div>Booking Reference: {bookings.booking_reference}</div>
      <br />
      <div>rest of booking details..</div>
      <br />
      <label htmlFor="updateAccountID">
        Already a member? Link your Booking to your account here:
      </label>
      <br />
      <input
        className="border-solid border-slate-300 border-2 rounded-md"
        type="text"
        id="updateAccountID"
        name="updateAccountID"
        ref={updateIDref}
      ></input>
      <br />
      <button className="bg-red-100" onClick={linkAccount}>
        Link Booking
      </button>
      {session ? (
        <>
          <button className="bg-blue-200" onClick={handleCancel}>
            Cancel Booking
          </button>
        </>
      ) : (
        <div>
          <Link
            className="text-teal-400 hover:underline hover:decoration-1 hover:decoration-inherit"
            href="/login"
          >
            Register/ Login
          </Link>{" "}
          to cancel Booking
        </div>
      )}
    </div>
  );
};

export default page;
