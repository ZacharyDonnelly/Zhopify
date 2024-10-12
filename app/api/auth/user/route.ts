import { prisma } from "@/lib/db/prisma";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest | Request): Promise<NextResponse> {
  const data = await req.formData();

  const password = data.get("password") as string;
  const name = data.get("name") as string;
  const email = data.get("email") as string;

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt) as string;

  if (password.length < 6) {
    return NextResponse.json(
      { message: "Password is not at least 6 characters" },
      { status: 400 },
    );
  }
  try {
    const existingUser = await prisma.user.findFirst({
      where: { email: email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 401 },
      );
    }

    const user = await prisma.user.create({
      data: { name, email, password: passwordHash },
    });

    return NextResponse.json(
      { name: user.name, email: user.email },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { message: `Prisma error P2002! - ${error.message}` },
          { status: 400 },
        );
      }
      return NextResponse.json(
        { message: `Prisma error - ${error.message}` },
        { status: 400 },
      );
    }

    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Error creating user", error },
      { status: 400 },
    );
  }
}

export async function GET(
  req: NextRequest | Request,
  res: NextResponse,
): Promise<NextResponse> {
  return NextResponse.json({ message: "GET request" }, { status: 200 });
}
