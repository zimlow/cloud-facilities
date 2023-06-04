"use client";
import { redirect, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";

const page = () => {
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
    //if successful, reflect in booking
    //else give error, do nothing.
  };

  const handleCancel = async () => {
    const cancel = await fetch("/api/cancelbooking", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        booking_reference: bookings.booking_reference,
      }),
    });

    //if successful, redirect
    //else give error, do nothing.
    // redirect("/trips/skydive");
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
      <button className="bg-blue-200" onClick={handleCancel}>
        Cancel Booking
      </button>
    </div>
  );
};

export default page;
