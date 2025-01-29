import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic'; // Force dynamic rendering
export async function PUT(req, ctx) {
    try {
        await isAdminUser()
        const id = ctx.params.id
        const body = await req.json()

        const updatedReservation = await db.reservation.update({
            where: {
                id
            },
            data: {
                ...body
            }
        })

        return NextResponse.json(updatedReservation)
    } catch (error) {
        return NextResponse.error(error.message)
    }
}

export async function DELETE(req, ctx) {
    try {
        await isAdminUser()
        const id = ctx.params.id

        const deletedReservation = await db.reservation.delete({
            where: {
                id
            }
        })

        if (deletedReservation) {
            return NextResponse.json({ message: "预订已成功删除！" }, { status: 200 })
        } else {
            return NextResponse.error({ message: "预订不存在" }, { status: 400 })
        }
    } catch (error) {
        return NextResponse.error(error.message)
    }
}