import db from "@/lib/db";
import { getCurrentUser } from "@/lib/currentUser";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic'; // Force dynamic rendering
export async function POST(req) {
  try {
    const { text, stars } = await req.json();
    const { id: userId } = await getCurrentUser();

    const { searchParams } = new URL(req.url);
    const listingId = searchParams.get("id");

    const createdReview = await db.review.create({
      data: {
        text,
        stars,
        listingId,
        userId,
      },
      include: {
        user: true, // Include user relationship in the response
      },
    });

    return NextResponse.json(createdReview, { status: 201 });
  } catch (error) {
    return NextResponse.error(error);
  }
}
