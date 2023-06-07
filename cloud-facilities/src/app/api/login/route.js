import { prisma } from "@/db";
import { signJwtAccessToken } from "@/jwt";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const body = await req.json();

  const user = await prisma.RegisteredUsers.findFirst({
    where: {
      user_email: body.email,
    },
  });

  if (user && (await bcrypt.compare(body.password, user.user_hash))) {
    const { user_hash, ...userWithoutPassword } = user;

    // todo: change payload to include only the necessary data
    const accessToken = signJwtAccessToken(userWithoutPassword);
    const result = { ...userWithoutPassword, accessToken };

    return new NextResponse(JSON.stringify(result));
  } else return new NextResponse(JSON.stringify(null), { status: 401 });
}
