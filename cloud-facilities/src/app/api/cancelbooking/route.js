import { NextResponse } from "next/server";
import { prisma } from "@/db";
import { verifyJwt } from "@/jwt";
import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function PATCH(req, res) {
  const session = await getServerSession(authOptions);
  const body = await req.json();
  if (session) {
    const reqHeaders = headers();
    const accessToken = reqHeaders.get("Authorization");
    const verifiedJwt = verifyJwt(accessToken);

    const booking = await prisma.bookings.findFirst({
      where: { booking_reference: body.booking_reference },
    });

    if (!accessToken || !verifiedJwt) {
      return new NextResponse(JSON.stringify({ error: "unauthorized1" }), { status: 401 });
    }
    if (booking.user_id !== verifiedJwt.user_id) {
      return new NextResponse(JSON.stringify({ error: "unauthorized2" }), { status: 401 });
    }
  }

  const delink = await prisma.bookings.update({
    where: {
      booking_reference: body.booking_reference,
    },
    data: {
      user: {
        disconnect: true,
      },
    },
  });

  const deleteBooking = await prisma.bookings.delete({
    where: {
      booking_reference: body.booking_reference,
    },
  });

  const updateAvailability = await prisma.trips.update({
    where: {
      trip_id: body.trip_id,
    },
    data: {
      trip_availability: {
        increment: 1,
      },
    },
  });

  const data = JSON.stringify(updateAvailability);
  return new NextResponse(data);
}
