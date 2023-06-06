import { NextResponse } from "next/server";
import { prisma } from "@/db";

export async function POST(request) {
  const body = await request.json();

  const res = await prisma.bookings.findFirst({
    where: {
      booking_reference: body.booking_reference,
    },
    include: {
      trip: true,
    },
  });

  const data = JSON.stringify(res);

  return new NextResponse(data);
}

export async function PATCH(request) {
  const body = await request.json();

  const res = await prisma.bookings.update({
    where: {
      booking_reference: body.booking_reference,
    },
    data: {
      user: {
        connect: {
          user_id: body.user_id,
        },
      },
    },
  });

  const data = JSON.stringify(res);

  return new NextResponse(data);
}

export async function DELETE(request) {
  const body = await request.json();

  const res = await prisma.bookings.delete({
    where: {
      booking_reference: body.booking_reference,
    },
  });
  const data = JSON.stringify(res);

  return new NextResponse(data);
}
