import React from "react";
import Image from "next/image";

const Hero = ({ image, mainHeader, secondaryHeader }) => {
  return (
    <div className="relative h-screen w-full">
      <Image
        src={image}
        alt="photo"
        className="brightness-50 h-full w-full object-cover"
        layout="fill" // Ensure the image covers the entire container
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center gap-2 sm:gap-4 md:gap-8 px-4 sm:px-0">
        {/* Main Header */}
        <h2 className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center">
          {mainHeader}
        </h2>
        {/* Secondary Header */}
        <h5 className="text-white text-xl sm:text-4xl md:text-3xl lg:text-4xl font-semibold text-center">
          {secondaryHeader}
        </h5>
      </div>
    </div>
  );
};

export default Hero;