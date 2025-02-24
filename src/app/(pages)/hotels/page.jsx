"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getHotelById, getHotelRoomsById } from "./service";
import Reviews from "../details/[id]/Reviews";
import { format } from "currency-formatter";

const HotelPage = ({ params }) => {
  const { id } = params; // Use the hotel ID from the URL params
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        setLoading(true);
        const hotelData = await getHotelById(id); // Fetch the hotel data
        const roomsData = await getHotelRoomsById(id); // Fetch the rooms for the hotel
        setHotel(hotelData);
        setRooms(roomsData);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-8">
      {hotel && (
        <div className="container mx-auto">
          {/* Hotel Info Section */}
          <div className="hotel-details mb-12">
            <h2 className="text-4xl font-bold">{hotel.name}</h2>
            <p className="mt-2 text-lg">{hotel.location}</p>
            <p className="mt-2">{hotel.description}</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xl font-semibold">
                {format(hotel.pricePerNight, { locale: "en-US" })}/night
              </span>
              <span>{hotel.avgRating} ⭐</span>
            </div>
          </div>

          {/* Rooms Section */}
          <div className="rooms-section mb-16">
            <h3 className="text-3xl font-bold mb-6">Rooms</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <div key={room.id} className="room-card bg-white p-6 rounded-lg shadow-lg">
                  <h4 className="text-xl font-semibold">{room.name}</h4>
                  <p>{room.description}</p>
                  <p className="text-lg text-gray-600">
                    {format(room.price, { locale: "en-US" })} / night
                  </p>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="reviews-section mt-16">
            <h3 className="text-3xl font-bold mb-6">Reviews</h3>
            <Reviews id={id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelPage;
