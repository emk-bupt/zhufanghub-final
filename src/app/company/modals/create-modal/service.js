import AXIOS_API from "@/utils/axiosAPI";

// Fetch company listings by ownerId
export async function getCompanyListings(ownerId) {
    if (!ownerId) {
        throw new Error("Owner ID is required to fetch listings");
    }

    const { data } = await AXIOS_API.get(`/listing?ownerId=${ownerId}`);
    return data;
}

// Upload images to Cloudinary
export async function postImages(cloudName, formData) {
    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
            method: "POST",
            body: formData
        }
    );
    const data = await res.json();
    return data.secure_url;
}

// Create new listing with ownerId
export async function createNewListing(data, imageUrls, ownerId) {
    if (!ownerId) {
        throw new Error("User is not authenticated");
    }

    const { data: newListing } = await AXIOS_API.post('/listing', {
        ...data,
        imageUrls,
        ownerId,  
    });

    return newListing;
}
