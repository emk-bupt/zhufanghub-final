import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { format } from "currency-formatter";

const Card = ({ place }) => {
  console.log(place);

  return (
    <Link
      href={`/details/${place.id}`}
      className="h-[530px] w-[350px] flex flex-wrap rounded-xl cursor-pointer transition-all shadow-md hover:shadow-lg 
      bg-white dark:bg-gray-800 text-slate-800 dark:text-white"
    >
      {/* Image Section */}
      <div className="relative h-2/3 w-full">
        <Image
          width="250"
          height="250"
          src={place.imageUrls[0]}
          className="h-full w-full overflow-hidden rounded-tl-xl rounded-tr-xl object-cover"
          alt="Locations's image"
        />
        <div className="absolute right-0 bottom-0 p-4 bg-blue-700 text-white rounded-tl-xl font-semibold dark:bg-blue-600">
          {place.location}
        </div>
      </div>

      {/* Details Section */}
      <div className="w-full flex flex-col gap-4 p-4">
        {/* Title and Rating */}
        <div className="mt-2 flex justify-between items-center">
          <h2 className="text-left text-2xl font-semibold text-slate-800 dark:text-white">
            {place.name}
          </h2>
          <span className="p-2 rounded-full bg-blue-600 text-white flex items-center gap-2 dark:bg-blue-500">
            <AiFillStar color="white" />
            <span className="text-white">{place.avgRating}</span>
          </span>
        </div>

        {/* Price and Button */}
        <div className="mt-6 flex justify-between items-center">
          <span className="text-slate-600 dark:text-gray-300">
            {format(place.pricePerNight, { locale: "cn-CN" })}
            <span className="ml-2">每晚</span>
          </span>
          <button className="cursor-pointer py-2 px-6 text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600">
            预订
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Card;
