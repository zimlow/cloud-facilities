import { NextResponse } from "next/server";
import { prisma } from "@/db";

export async function POST(request) {
  console.log("request.body is: ", request.body);
  const what = await request.json();
  console.log("what is: ", what);

  const res = await prisma.bookings.findFirst({
    where: {
      booking_reference: what.booking_reference,
    },
    include: {
      trip: true,
    },
  });

  console.log("res is: ", res);
  const data = JSON.stringify(res);
  // console.log(data);

  return new NextResponse(data);
}
