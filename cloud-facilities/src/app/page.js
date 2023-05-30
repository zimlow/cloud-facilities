import React from "react";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

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
