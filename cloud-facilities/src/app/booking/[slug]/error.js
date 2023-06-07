"use client"; // Error components must be Client Components

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Existing Booking Found</h2>
      <Link href="/trips/skydive">Back to Trips</Link>
    </div>
  );
}
