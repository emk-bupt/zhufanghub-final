import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale'; // Import the Chinese locale

const Card = ({ reservation, mutate }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleCancel = async () => {
        setIsLoading(true);
        await mutate({
            chargeId: reservation.chargeId,
            reservationId: reservation.id,
        });
        setIsLoading(false); // Reset after mutation completes
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105 duration-300 flex flex-col h-full">
            <Link href={`/details/${reservation.listingId}`}>
                <Image
                    src={reservation.listing.imageUrls[0]} // Image URL
                    alt={reservation.listing.name} // Alt text for better accessibility
                    width={1280} // Use the original image's width
                    height={853} // Use the original image's height
                    className="w-full h-[200px] object-cover" // Ensure the image fills the container
                    layout="responsive" // Ensures responsiveness
                />
            </Link>
            <div className="p-4 flex flex-col justify-between flex-1">
                <span className="font-semibold text-lg text-gray-800">
                    {reservation.listing.location}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-2">
                    {reservation.listing.name}
                </h3>
                
                {/* Horizontal Dates Section */}
                <div className="flex items-center space-x-2 text-gray-600 mt-2">
                    <span>
                        {format(new Date(reservation.startDate), "yyyy年M月d日", { locale: zhCN })}
                    </span>
                    <span>-</span>
                    <span>
                        {format(new Date(reservation.endDate), "yyyy年M月d日", { locale: zhCN })}
                    </span>
                </div>

                <div className="mt-2 text-lg font-medium text-gray-800">
                    总价： ￥{reservation.daysDifference * reservation.listing.pricePerNight}
                </div>

                {/* Cancel Button with animation */}
                <button
                    onClick={handleCancel}
                    disabled={isLoading}
                    className={`w-full py-2 mt-4 rounded-xl transition-all 
                        ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-500'}
                        ${isLoading ? 'scale-95' : 'scale-100'} 
                        ${isLoading ? 'cursor-wait' : ''}`}
                >
                    {isLoading ? (
                        <div className="flex justify-center">
                            {/* Spinner */}
                            <div className="w-6 h-6 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        '取消'
                    )}
                </button>
            </div>
        </div>
    );
};

export default Card;
