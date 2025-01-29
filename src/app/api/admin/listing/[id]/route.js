import db from "@/lib/db"
import isAdminUser from "@/lib/isAdminUser"
import { NextResponse } from "next/server"
export const dynamic = 'force-dynamic'; // Force dynamic rendering
export async function GET(req, ctx) {
    try {
        await isAdminUser()

        const { id } = ctx.params

        const listing = await db.listing.findFirst({
            where: {
                id
            }
        })

        return NextResponse.json(listing)
    } catch (error) {
        return NextResponse.error(error.message)
    }
}

export async function PUT(req, ctx) {
    try {
        await isAdminUser()

        const { id } = ctx.params
        const body = await req.json()

        const updatedListing = await db.listing.update({
            where: {
                id
            },
            data: {
                ...body
            }
        })

        return NextResponse.json(updatedListing, { status: 200 })
    } catch (error) {
        return NextResponse.error(error.message)
    }
}

export async function DELETE(req, ctx) {
    try {
        await isAdminUser()
        const id = ctx.params.id

        const deletedListing = await db.listing.delete({
            where: {
                id
            }
        })

        if (deletedListing) {
            return NextResponse.json({ message: "酒店已成功删除！" }, { status: 200 })
        } else {
            return NextResponse.error({ message: "酒店不存在！" }, { status: 400 })
        }
    } catch (error) {
        return NextResponse.error(error.message)
    }
}