import AXIOS_API from "@/utils/axiosAPI"

export async function getListingById(listingId) {
    const { data: listing } = await AXIOS_API.get(`/admin/listing/${listingId}`)

    return listing
}

export async function updateListing({ listingId, body }) {

    const { data: updatedListing } = await AXIOS_API.put(`/admin/listing/${listingId}`, body)

    return updatedListing
}

export async function postImages(cloudName, formData) {

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData
    })

    const data = await res.json()

    const imageUrl = data['secure_url']

    return imageUrl
}


export async function deleteListing(id) {
    const { data } = await AXIOS_API.delete(`/admin/listing/${id}`)

    return data
}