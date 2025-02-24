import db from "@/lib/db";
import { getCurrentUser } from "@/lib/currentUser";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Force dynamic rendering

// ✅ Update Reservation (Company User)
export async function PUT(req, ctx) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) return NextResponse.error({ message: "未授权" }, { status: 403 });

        const id = ctx.params.id;
        const body = await req.json();

        // Find the reservation to check if the user owns it
        const existingReservation = await db.reservation.findUnique({
            where: { id },
            include: { listing: true },
        });

        if (!existingReservation) {
            return NextResponse.error({ message: "预订不存在" }, { status: 404 });
        }

        // Ensure the user owns the hotel related to this reservation
        if (existingReservation.listing.companyId !== currentUser.companyId) {
            return NextResponse.error({ message: "无权修改此预订" }, { status: 403 });
        }

        // Update the reservation
        const updatedReservation = await db.reservation.update({
            where: { id },
            data: { ...body },
        });

        return NextResponse.json(updatedReservation);
    } catch (error) {
        return NextResponse.error(error.message);
    }
}

// ✅ Delete Reservation (Company User)
export async function DELETE(req, ctx) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) return NextResponse.error({ message: "未授权" }, { status: 403 });

        const id = ctx.params.id;

        // Find the reservation
        const existingReservation = await db.reservation.findUnique({
            where: { id },
            include: { listing: true },
        });

        if (!existingReservation) {
            return NextResponse.error({ message: "预订不存在" }, { status: 404 });
        }

        // Ensure the user owns the hotel related to this reservation
        if (existingReservation.listing.companyId !== currentUser.companyId) {
            return NextResponse.error({ message: "无权删除此预订" }, { status: 403 });
        }

        // Delete the reservation
        await db.reservation.delete({ where: { id } });

        return NextResponse.json({ message: "预订已成功删除！" }, { status: 200 });
    } catch (error) {
        return NextResponse.error(error.message);
    }
}
