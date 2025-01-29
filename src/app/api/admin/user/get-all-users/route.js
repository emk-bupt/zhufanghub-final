import db from "@/lib/db";
import { getCurrentUser } from "@/lib/currentUser";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic'; // Force dynamic rendering
export async function GET(req) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser?.isAdmin) return NextResponse.error({ message: "您不是管理员！" }, { status: 403 })

        const allUsers = await db.user.findMany({
            include: {
                reservations: true
            }
        })

        return NextResponse.json(allUsers)
    } catch (error) {
        return NextResponse.error(error)
    }
}