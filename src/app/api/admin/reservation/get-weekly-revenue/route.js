import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isoWeek from "dayjs/plugin/isoWeek"; // Import isoWeek plugin
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'; // Force dynamic rendering
// Extend dayjs with necessary plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isoWeek); // Extend with isoWeek plugin

// Helper function to get the current week number
const getCurrentWeekNumber = () => {
  return dayjs().isoWeek(); // ISO week number (week starts on Monday)
};

export async function GET(req) {
  try {
    // Ensure admin access
    await isAdminUser();
    console.log("Admin access verified.");

    // Get the current week number
    const currentWeekNumber = getCurrentWeekNumber();

    // Fetch reservations for the current week
    const allReservations = await db.reservation.findMany({
      include: {
        listing: true,
      },
      where: {
        createdAt: {
          // Fetch reservations only for the current week
          gte: dayjs().startOf("isoWeek").toDate(),
          lte: dayjs().endOf("isoWeek").toDate(),
        },
      },
    });

    console.log("Fetched reservations for the current week:", allReservations);

    // Initialize weekly revenue array (Sunday to Saturday)
    const weeklyRevenue = Array(7).fill(0);

    if (!allReservations || allReservations.length === 0) {
      console.log("No reservations found for the current week.");
      return NextResponse.json([0, 0, 0, 0, 0, 0, 0]);
    }

    // Calculate weekly revenue dynamically
    allReservations.forEach((reservation) => {
      const { createdAt, reservedDates, listing } = reservation;

      if (!createdAt || !reservedDates || !listing || typeof listing.pricePerNight !== "number") {
        console.warn("Missing or invalid fields in reservation:", reservation);
        return;
      }

      // Calculate total revenue for the reservation
      const pricePerNight = listing.pricePerNight;
      const daysDifference = reservation.daysDifference;
      const totalRevenue = pricePerNight * daysDifference;

      // Parse createdAt in the correct timezone (local Beijing time)
      const localCreatedAt = dayjs(createdAt).tz("Asia/Shanghai", true);
      if (!localCreatedAt.isValid()) {
        console.warn("Invalid createdAt date:", createdAt);
        return;
      }

      // Find the day of the week when the reservation was created (based on createdAt)
      const createdDayOfWeek = localCreatedAt.day();

      // Add the total revenue to the correct day in weeklyRevenue
      weeklyRevenue[createdDayOfWeek] += totalRevenue;
    });

    console.log("Final Weekly Revenue:", weeklyRevenue);

    // Update or create the Week data in the database
    await db.week.upsert({
      where: { weekNumber: currentWeekNumber },
      update: {
        revenueData: weeklyRevenue,
      },
      create: {
        weekNumber: currentWeekNumber,
        revenueData: weeklyRevenue,
      },
    });

    // Return the updated weekly revenue data
    return NextResponse.json(weeklyRevenue);
  } catch (error) {
    console.error("Error in GET /api/admin/reservation/get-weekly-revenue:", error.message);
    console.error(error.stack);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
