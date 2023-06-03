"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
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

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div className="text-center">
      <div>Manage Your Booking for {bookings.trip?.trip_title}</div>
      <div>Booking Reference: {bookings.booking_reference}</div>
      {/* <br />
      <div>display rest of booking details below</div>
      <div>include update button to update account ID</div> */}
    </div>
  );
};

export default page;
