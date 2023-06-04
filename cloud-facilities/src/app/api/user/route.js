import { prisma } from "@/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const body = await req.json();

  const user = await prisma.RegisteredUsers.create({
    data: {
      user_lastName: body.lastName,
      user_firstName: body.firstName,
      user_email: body.email,
      user_hash: await bcrypt.hash(body.password, 12),
      user_dob: body.dob,
      user_address: body.address,
      user_country: body.country,
      user_postal_code: body.postal_code,
      user_passport_no: body.passport_no,
      user_contacts: {
        createMany: {
          data: [
            {
              contact_type: "MOBILE",
              contact_value: body.mobile,
            },
            {
              contact_type: "HOME",
              contact_value: body.home,
            },
            {
              contact_type: "OFFICE_NO",
              contact_value: body.office,
            },
          ],
        },
      },
    },
  });

  //why need this?
  const { user_hash, ...result } = user;
  return new NextResponse(JSON.stringify(result));
}
