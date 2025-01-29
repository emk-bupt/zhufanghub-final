import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic'; // Force dynamic rendering
export async function DELETE(req, ctx) {
    try {
        await isAdminUser()

        const { id } = ctx.params

        const review = await db.review.delete({
            where: { id }
        })

        if (review) {
            return NextResponse.json({ message: "成功删除了该评论" })
        } else {
            return NextResponse.error({ message: `评价 id 为 ${id} 不存在` })
        }
    } catch (error) {
        return NextResponse.error(error)
    }
}