import db from "@/lib/db";
import { getCurrentUser } from "@/lib/currentUser";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'; // Force dynamic rendering
export async function GET(req) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser?.isAdmin) return NextResponse.error({ message: "您不是管理员！" }, { status: 403 })

        const allReservations = await db.reservation.findMany({
            include: {
                listing: true,
                user: true
            }
        })

        const allReservationsTotalPrice = allReservations.map((reservation) => {
            return {
                ...reservation,
                totalPrice: reservation.daysDifference * reservation.listing.pricePerNight
            }
        })

        return NextResponse.json(allReservationsTotalPrice)
    } catch (error) {
        return NextResponse.error(error)
    }
}