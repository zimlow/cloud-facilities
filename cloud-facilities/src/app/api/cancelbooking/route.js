import { NextResponse } from "next/server";
import { prisma } from "@/db";

export async function PATCH(req, res) {
  const what = await req.json();

  const delink = await prisma.bookings.update({
    where: {
      booking_reference: what.booking_reference,
    },
    data: {
      user: {
        disconnect: true,
      },
    },
  });

  const deleteBooking = await prisma.bookings.delete({
    where: {
      booking_reference: what.booking_reference,
    },
  });

  const updateAvailability = await prisma.trips.update({
    where: {
      trip_id: what.trip_id,
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
