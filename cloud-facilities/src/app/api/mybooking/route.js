import { NextResponse } from "next/server";
import { prisma } from "@/db";

export async function POST(request) {
  const what = await request.json();

  const res = await prisma.bookings.findFirst({
    where: {
      booking_reference: what.booking_reference,
    },
    include: {
      trip: true,
    },
  });

  const data = JSON.stringify(res);

  return new NextResponse(data);
}
