import { prisma } from "@/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  const user = await prisma.RegisteredUsers.findFirst({
    where: {
      user_email: body.email,
    },
  });

  if (user && (await bcrypt.compare(body.password, user.user_hash))) {
    const { user_hash, ...userWithoutPassword } = user;
    return new NextResponse(JSON.stringify(userWithoutPassword));
  } else
    return new NextResponse.json(
      null,
      { status: 401 },
      { message: "Invalid/Incorrect email or password" }
    );
}
