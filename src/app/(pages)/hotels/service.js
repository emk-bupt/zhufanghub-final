import AXIOS_API from "@/utils/axiosAPI";

// Get the hotel details
export const getHotelById = async (id) => {
  const response = await AXIOS_API.get(`/hotel/${id}`);
  return response.data;
};

// Get the rooms for a specific hotel
export const getHotelRoomsById = async (hotelId) => {
  const response = await AXIOS_API.get(`/hotel/${hotelId}/rooms`);
  return response.data;
};
