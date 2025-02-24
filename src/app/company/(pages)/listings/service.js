import AXIOS_API from "@/utils/axiosAPI";

// Fetch listings for a specific company (User)
export async function getCompanyListings() {
    try {
        const res = await AXIOS_API.get("/company/listing/get-all-listings");
        return res.data;
    } catch (error) {
        console.error("🚨 Fetch Error:", error.message);
        throw error;
    }
}

// Function to get a listing by its ID
export async function getCompanyListingById(listingId) {
    const { data: listing } = await AXIOS_API.get(`/company/listing/${listingId}`);
    return listing;
}

// Function to update a listing by its ID
export async function updateCompanyListing({ listingId, body }) {
    const { data: updatedListing } = await AXIOS_API.put(`/company/listing/${listingId}`, body);
    return updatedListing;
}

// Function to delete a listing (specific to company)
export async function deleteCompanyListing(id) {
    try {
        const { data } = await AXIOS_API.delete(`/company/listing/${id}`);
        return data;
    } catch (error) {
        console.error("🚨 Delete Error:", error.message);
        throw error;
    }
}

// Function to upload images to Cloudinary
export async function postImages(cloudName, formData) {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
    });

    const data = await res.json();
    return data.secure_url;
}
