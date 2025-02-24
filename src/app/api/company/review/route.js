import db from "@/lib/db";
import { getCurrentUser } from "@/lib/currentUser"; // Assuming this function is available to get current user
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'; // Force dynamic rendering

export async function GET(req) {
    try {
        const currentUser = await getCurrentUser();

        // If no user is logged in
        if (!currentUser) {
            return NextResponse.error({ message: "未授权！" }, { status: 401 });
        }

        // If user is a company, return reviews for listings owned by the company
        if (currentUser.isCompany) {
            const companyReviews = await db.review.findMany({
                where: {
                    listing: {
                        ownerId: currentUser.id // Filter reviews based on company ownership
                    }
                },
                include: {
                    listing: true, // Include the listing details (hotel or room)
                    user: true // Include the user details (reviewer's username)
                }
            });
           
            
            return NextResponse.json(companyReviews);
        }

        // If the user does not have company role, return an error
        return NextResponse.error({ message: "无权限" }, { status: 403 });
    } catch (error) {
        return NextResponse.error(error.message);
    }
}
