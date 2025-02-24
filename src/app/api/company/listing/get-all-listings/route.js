import db from "@/lib/db";
import isCompanyUser from "@/lib/isCompanyUser";
import isAdminUser from "@/lib/isAdminUser"; // ✅ New function to check admin user
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        console.log("✅ API HIT: /api/company/listing/get-all-listings");

        const user = await isCompanyUser();
        const admin = await isAdminUser(); // ✅ Check if the user is an admin

        if (!user && !admin) {
            console.log("❌ Unauthorized access attempt.");
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // ✅ Get `companyId` from query params
        const { searchParams } = new URL(req.url);
        const companyId = searchParams.get("companyId");

        let listings;
        if (admin && companyId) {
            // ✅ Admin fetching listings for a specific company
            listings = await db.listing.findMany({
                where: { ownerId: companyId },
            });
        } else if (user) {
            // ✅ Company user fetching their own listings
            listings = await db.listing.findMany({
                where: { ownerId: user.id },
            });
        } else {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        console.log("📦 Listings fetched:", listings.length);
        return NextResponse.json(listings);
    } catch (error) {
        console.error("🚨 API Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
