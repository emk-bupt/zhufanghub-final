import db from "@/lib/db";
import { getCurrentUser } from "@/lib/currentUser";
import isAdminUser from "@/lib/isAdminUser"; // ✅ New function to check admin user
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Force dynamic rendering

export async function GET(req) {
    try {
        console.log("✅ API HIT: /api/company/reservation/get-all-reservations");

        const currentUser = await getCurrentUser();
        const admin = await isAdminUser(); // ✅ Check if the user is an admin

        if (!currentUser && !admin) {
            console.log("❌ Unauthorized access attempt.");
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // ✅ Get `companyId` from query params
        const { searchParams } = new URL(req.url);
        const companyId = searchParams.get("companyId");

        let reservations;
        if (admin && companyId) {
            // ✅ Admin fetching reservations for a specific company
            reservations = await db.reservation.findMany({
                where: {
                    listing: {
                        ownerId: companyId,
                    },
                },
                include: {
                    listing: true,
                    user: true,
                },
            });
        } else if (currentUser) {
            // ✅ Company user fetching their own reservations
            reservations = await db.reservation.findMany({
                where: {
                    listing: {
                        ownerId: currentUser.id,
                    },
                },
                include: {
                    listing: true,
                    user: true,
                },
            });
        } else {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // ✅ Calculate total price
        const reservationsWithTotalPrice = reservations.map((reservation) => {
            return {
                ...reservation,
                totalPrice: reservation.daysDifference * reservation.listing.pricePerNight,
            };
        });

        console.log("📦 Reservations fetched:", reservations.length);
        return NextResponse.json(reservationsWithTotalPrice);
    } catch (error) {
        console.error("🚨 API Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
