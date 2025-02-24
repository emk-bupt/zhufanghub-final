import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SearchResultCard = ({ place }) => {
  return (
    <Link href={`/details/${place.id}`}>
      <div className="flex items-center p-4 rounded-xl shadow-md hover:shadow-lg transition-all bg-white dark:bg-gray-800 text-slate-800 dark:text-white">
        <div className="relative w-20 h-20">
          <Image
            src={place.imageUrls[0]}
            alt={place.name}
            className="object-cover w-full h-full rounded-xl"
            layout="fill"
          />
        </div>
        <div className="ml-4">
          <h3 className="font-semibold text-xl">{place.name}</h3>
          <p className="text-sm text-gray-500">{place.location}</p>
          <p className="text-lg font-bold mt-2">¥{place.pricePerNight}/晚</p>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
