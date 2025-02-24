import db from "@/lib/db";
import { getCurrentUser } from "@/lib/currentUser";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Force dynamic rendering

export async function GET(req) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) return NextResponse.error({ message: "未授权" }, { status: 403 });

        // Fetch reservations only for listings owned by the current user (company owner)
        const companyReservations = await db.reservation.findMany({
            where: {
                listing: {
                    ownerId: currentUser.id, // Ensure only the company owner's reservations are fetched
                },
            },
            include: {
                listing: true,
            },
        });

        if (companyReservations.length === 0) return NextResponse.json(0);

        // Calculate revenue for the company
        const totalRevenue = companyReservations.reduce(
            (sum, reservation) => sum + reservation.daysDifference * reservation.listing.pricePerNight,
            0
        );

        return NextResponse.json(totalRevenue);
    } catch (error) {
        return NextResponse.error(error);
    }
}
