import db from "@/lib/db";
import { getCurrentUser } from "@/lib/currentUser";
import { NextResponse } from "next/server";
import { getDatesInRange } from "@/lib/dateToMilliseconds";
export const dynamic = 'force-dynamic'; // Force dynamic rendering
export async function GET(req) {
    try {
        const currentUser = await getCurrentUser();

        // Admin or regular user
        const reservations = await db.reservation.findMany({
            where: currentUser.isAdmin
                ? {}
                : { userId: currentUser.id }, // Conditional query based on role
            include: {
                listing: true,
            },
        });

        return NextResponse.json(reservations);
    } catch (error) {
        console.error("Error fetching reservations:", error);
        return NextResponse.json({ message: "An error occurred while fetching reservations." });
    }
}

export async function POST(req) {
    try {
        const currentUser = await getCurrentUser();
        const body = await req.json();

        const { startDate, endDate, listingId, daysDifference } = body;

        // Get the listing
        const listing = await db.listing.findUnique({
            where: { id: listingId },
            include: { reservations: true },
        });

        if (!listing) {
            return NextResponse.json({ message: "Listing not found" }, { status: 404 });
        }

        // Get all booked dates
        const allBookedDates = listing.reservations.flatMap((reservation) => reservation.reservedDates);

        const getDates = getDatesInRange(startDate, endDate);
        const isUnavailable = allBookedDates.some((date) => getDates.includes(date));

        if (isUnavailable) {
            return NextResponse.json({ message: "You are trying to reserve a booked date!" }, { status: 400 });
        }

        // Add createdAt for the new reservation
        const newReservation = await db.reservation.create({
            data: {
                startDate,
                endDate,
                listingId,
                daysDifference,
                reservedDates: getDates,
                userId: currentUser.id,
                
            },
        });

        return NextResponse.json(newReservation);
    } catch (error) {
        console.error("Error creating reservation:", error);
        return NextResponse.json({ message: "An error occurred while creating the reservation." }, { status: 500 });
    }
}
