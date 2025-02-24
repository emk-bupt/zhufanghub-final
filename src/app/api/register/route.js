import db from '@/lib/db';
import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

export const dynamic = 'force-dynamic'; // Force dynamic rendering

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, username, password, accountType } = body;  // Add `accountType`

    // Check if the user already exists
    const isExisting = await db.user.findUnique({
      where: { email },
    });

    if (isExisting) {
      return NextResponse.json({ message: "You've already registered" }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create the user and store `isCompany` based on accountType
    await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        isCompany: accountType === "company",  // Store account type
      },
    });

    return NextResponse.json({ message: "User has registered successfully" }, { status: 201 });
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
