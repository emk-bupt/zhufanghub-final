import db from "@/lib/db";
import isCompanyUser from "@/lib/isCompanyUser"; // New function to check company ownership
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Force dynamic rendering

// 🔍 Get a single listing by ID (Only if it belongs to the company)
export async function GET(req, ctx) {
    try {
        const user = await isCompanyUser();
        const { id } = ctx.params;

        const listing = await db.listing.findFirst({
            where: {
                id,
                ownerId: user.id, // Ensure the listing belongs to the logged-in company
            },
        });

        if (!listing) {
            return NextResponse.json({ message: "未找到酒店，或您无权访问此酒店。" }, { status: 404 });
        }

        return NextResponse.json(listing);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// ✏️ Update a listing (Only if it belongs to the company)
export async function PUT(req, ctx) {
    try {
        const user = await isCompanyUser();
        const { id } = ctx.params;
        const body = await req.json();

        const listing = await db.listing.findFirst({
            where: { id, ownerId: user.id },
        });

        if (!listing) {
            return NextResponse.json({ message: "无权更新此酒店。" }, { status: 403 });
        }

        const updatedListing = await db.listing.update({
            where: { id },
            data: { ...body },
        });

        return NextResponse.json(updatedListing, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// ❌ Delete a listing (Only if it belongs to the company)
export async function DELETE(req, ctx) {
    try {
        const user = await isCompanyUser();
        const { id } = ctx.params;

        const listing = await db.listing.findFirst({
            where: { id, ownerId: user.id },
        });

        if (!listing) {
            return NextResponse.json({ message: "无权删除此酒店。" }, { status: 403 });
        }

        await db.listing.delete({ where: { id } });

        return NextResponse.json({ message: "酒店已成功删除！" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
