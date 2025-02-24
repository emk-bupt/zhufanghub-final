import AXIOS_API from "@/utils/axiosAPI";

export async function getAllReviews() {
    const { data } = await AXIOS_API.get(`/company/review`); // Adjust endpoint if necessary
    return data;
}
