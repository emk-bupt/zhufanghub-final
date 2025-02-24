// hooks/company-widget-hook.js
import { useQueries } from "@tanstack/react-query";
import { getCompanyListings, getCompanyReservations, getCompanyRevenue, getCompanyReviews } from "../services/service"; // Make sure this is correct

export function useCompanyWidgetHook() {
  const [
    listingsQuery,
    reservationsQuery,
    revenueQuery,
    reviewsQuery,  // New query for reviews
  ] = useQueries({
    queries: [
      {
        queryKey: ["company", "listings"],
        queryFn: getCompanyListings, // Fetch all listings for the company
      },
      {
        queryKey: ["company", "reservations"],
        queryFn: getCompanyReservations, // Fetch all reservations for the company
      },
      {
        queryKey: ["company", "revenue"],
        queryFn: getCompanyRevenue, // Fetch the total revenue for the company
      },
      {
        queryKey: ["company", "reviews"],
        queryFn: getCompanyReviews, // Fetch all reviews for the company's listings
      },
    ],
  });

  return [
    listingsQuery,
    reservationsQuery,
    revenueQuery,
    reviewsQuery,  // Return reviews query
  ];
}
