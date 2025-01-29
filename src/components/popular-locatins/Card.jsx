import Link from "next/link";
import React from "react";
import Image from "next/image";

const Card = ({ place }) => {
  const url = `/catalog?city=${place.value}&min_price=${50}&max_price=${999}&type=${"luxury"}`;

  return (
    <Link
      href={url}
      className="cursor-pointer h-[370px] sm:h-[340px] lg:h-[370px] w-full sm:w-[320px] md:w-[360px] lg:w-[278px] xl:w-[278px] flex flex-col rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image Container */}
      <div className="relative h-2/3 lg:h-[60%] w-full">
        <Image
          src={place.image}
          alt={`Image of ${place.value}`}
          className="h-full w-full rounded-t-xl object-cover"
          width={560} // Adjusted width
          height={200} // Adjusted height
        />
        <div className="absolute right-0 bottom-0 capitalize p-3 bg-blue-700 text-white rounded-tl-xl font-semibold">
          {place.value}
        </div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col gap-2 p-4">
        <h2 className="text-center text-xl lg:text-2xl text-slate-800 font-semibold">
          {place.numOfPlaces} 住宿地点
        </h2>
        <p className="text-center text-base lg:text-lg text-slate-700">
          发现最适合您旅行的酒店
        </p>
      </div>
    </Link>
  );
};

export default Card;
