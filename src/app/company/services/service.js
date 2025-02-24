// services/service.js
import AXIOS_API from "@/utils/axiosAPI";

// Get all listings for the company
export async function getCompanyListings() {
    const { data } = await AXIOS_API.get('/company/listing/get-all-listings');
    return data;
}

// Get all reservations for the company
export async function getCompanyReservations() {
    const { data } = await AXIOS_API.get('/company/reservation/get-all-reservations');
    return data;
}

// Get total revenue for the company
export async function getCompanyRevenue() {
    const { data } = await AXIOS_API.get('/company/reservation/get-all-revenue');
    return data;
}

// Get all reviews for the company's listings
export async function getCompanyReviews() {
    const { data } = await AXIOS_API.get('/company/review');
    return data;
}
