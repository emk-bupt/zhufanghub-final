import db from "@/lib/db";
import { calcAndSortListings } from "@/lib/sortListings";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'; // Force dynamic rendering

export async function GET(req) {
  try {
    // Fetch listings with reviews included
    const listings = await db.listing.findMany({
      include: { reviews: true },
    });

    

    // Calculate and sort listings by average rating; take top 6
    const sortedListings = calcAndSortListings(listings).slice(0, 6);

    

    return NextResponse.json(sortedListings);
  } catch (error) {
    console.error("Error in best‑hotels API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
