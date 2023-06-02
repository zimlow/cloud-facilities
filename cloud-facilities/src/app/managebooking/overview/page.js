"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [bookings, setBookings] = useState([]);
  const searchParams = useSearchParams();
  const search = searchParams.get("booking");
  console.log("SEARCH IS:", search);

  async function getBookings() {
    const res = await fetch("/api/mybooking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ booking_reference: search }),
    });
    const json = await res.json();
    setBookings(json);
  }

  useEffect(() => {
    getBookings();
  }, []);

  return <div>{bookings.lastName}</div>;
};

export default page;
