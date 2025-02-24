import db from "@/lib/db";
import { NextResponse } from "next/server";
import isAdminUser from "@/lib/isAdminUser";
import isCompanyUser from "@/lib/isCompanyUser";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const listings = await db.listing.findMany({
      take: 10,
    });
    return NextResponse.json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    return NextResponse.error(error);
  }
}

export async function POST(req) {
  try {
    const companyUser = await isCompanyUser();
    const adminUser = await isAdminUser();

    if (!companyUser && !adminUser) {
      console.log("❌ Unauthorized: Only admins or company users can create listings");
      return NextResponse.json(
        { error: "Unauthorized: Only admins or company users can create listings" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { name, location, desc, type, pricePerNight, beds, hasFreeWifi, imageUrls } = body;

    const newListing = await db.listing.create({
      data: {
        name,
        location,
        desc,
        type,
        pricePerNight,
        beds,
        hasFreeWifi,
        imageUrls,
        ownerId: companyUser ? companyUser.id : null, // Only set ownerId for company users
      },
    });

    return NextResponse.json(newListing);
  } catch (error) {
    console.error("🚨 Error creating listing:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
