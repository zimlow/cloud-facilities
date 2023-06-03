"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";

const page = () => {
  const updateIDref = useRef();
  const [bookings, setBookings] = useState([{}]);
  const searchParams = useSearchParams();
  const search = searchParams.get("booking");

  async function getBookings() {
    const res = await fetch("/api/mybooking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ booking_reference: search }),
    });
    const json = await res.json();
    console.log("JSON IS:", json);
    setBookings(json);
  }

  const handleUpdateID = async () => {
    const update = await fetch("/api/linkbooking", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        booking_reference: bookings.booking_reference,
        user_id: updateIDref.current.value,
      }),
    });
    const updateJson = await update.json();
    console.log("UPDATEJSON IS:", updateJson);
  };

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div className="text-center">
      <div>Manage Your Booking for {bookings.trip?.trip_title}</div>
      <div>Booking Reference: {bookings.booking_reference}</div>
      {/* {/* <br /> */}
      <div>rest of booking details..</div>
      <label htmlFor="updateAccountID">
        Already a member? Link your Booking to your account here:
      </label>
      <input type="text" id="updateAccountID" name="updateAccountID" ref={updateIDref}></input>
      <button onClick={handleUpdateID}>Link Booking</button>
      {/* cancel button */}
    </div>
  );
};

export default page;
