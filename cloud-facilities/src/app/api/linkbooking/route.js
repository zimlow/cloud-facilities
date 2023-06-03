import { NextResponse } from "next/server";
import { prisma } from "@/db";

export async function PATCH(request) {
  const what = await request.json();

  const res = await prisma.bookings.update({
    where: {
      booking_reference: what.booking_reference,
    },
    data: {
      user: {
        connect: {
          user_id: what.user_id,
        },
      },
    },
  });

  const data = JSON.stringify(res);

  return new NextResponse(data);
}
