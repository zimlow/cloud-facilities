"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const page = async () => {
  return (
    <>
      <div>A confirmation email will be sent to your email shortly</div>
      <Link href="..">Back to Main</Link>
      <br />
      <Link href="/trips/skydive">Continue Browsing Trips</Link>
    </>
  );
};

export default page;
