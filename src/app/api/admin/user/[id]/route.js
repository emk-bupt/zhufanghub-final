import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic'; // Force dynamic rendering
export async function GET(req, ctx) {
    try {
        await isAdminUser()

        const { id } = ctx.params

        const user = await db.user.findUnique({
            where: { id }
        })

        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.error(error)
    }
}

export async function PUT(req, ctx) {
    try {
        await isAdminUser()
        const { id } = ctx.params
        const body = await req.json()

        const updatedUser = await db.user.update({
            data: {
                ...body
            },
            where: { id }
        })

        return NextResponse.json(updatedUser)
    } catch (error) {
        return NextResponse.error(error)
    }
}

export async function DELETE(req, ctx) {
    try {
        await isAdminUser()
        const { id } = ctx.params

        const deletedUser = await db.user.delete({
            where: { id }
        })

        if (deletedUser) {
            return NextResponse.json({ message: "用户已成功删除!" }, { status: 200 })
        } else {
            return NextResponse.json({ message: `id 为 ${id} 的用户不存在！` })
        }
    } catch (error) {
        return NextResponse.error(error)
    }
}