import React from "react";
import Link from "next/link";

const Home = async () => {
  return (
    <>
      <Link
        href="/trips/skydive"
        className="border-solid border-2 border-black-200 hover:border-black pd-2"
      >
        Enter
      </Link>
    </>
  );
};

export default Home;
