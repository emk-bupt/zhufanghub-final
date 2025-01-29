import AXIOS_API from "@/utils/axiosAPI";

export async function deleteReservation({ chargeId, reservationId }) {
    const { data, error } = await AXIOS_API.delete(`/admin/reservation/${reservationId}`)

    if (!error) {
        const { data } = await AXIOS_API.delete(`/stripe?charge_id=${chargeId}&reservation_id=${reservationId}`)
        return { data }
    }

    return data
}