import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const companies = await db.user.findMany({
      where: { isCompany: true },
      include: {
        listings: {
          include: {
            reservations: {
              include: {
                user: true, // Include user data in reservations
              },
            },
          },
        },
      },
    });

    const formattedCompanies = companies.map((company) => ({
        id: company.id,
        companyName: company.username,
        email: company.email,
        totalHotels: company.listings.length,
        totalReservations: company.listings.reduce((acc, listing) => acc + listing.reservations.length, 0),
        totalRevenue: company.listings.reduce(
          (acc, listing) =>
            acc +
            (listing.reservations?.reduce(
              (sum, res) => sum + (res.chargeId && !isNaN(res.chargeId) ? parseFloat(res.chargeId) : (res.daysDifference * listing.pricePerNight || 0)), 
              0
            ) || 0),
          0
        ),
      }));
      
      
      
    return NextResponse.json(formattedCompanies, { status: 200 });
  } catch (error) {
    console.error("Error fetching companies:", error);
    return NextResponse.json({ error: "获取公司用户失败" }, { status: 500 });
  }
}
