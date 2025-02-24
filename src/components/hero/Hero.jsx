"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";

const Hero = ({ image, mainHeader, secondaryHeader, showSearch }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]); // ✅ Clears results when search is empty
      setErrorMessage("");
      return;
    }

    const fetchResults = async () => {
      const encodedQuery = encodeURIComponent(query.trim());
      const res = await fetch(`/api/search?query=${encodedQuery}`);
      const data = await res.json();

      if (data.message) {
        setErrorMessage(data.message);
        setResults([]);
      } else {
        setResults(data.listings);
        setErrorMessage("");
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image src={image} alt="Hero Background" className="h-full w-full object-cover" layout="fill" />
      </motion.div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md"></div>

      {/* Text Content */}
      <div className="absolute flex flex-col items-center text-center px-4 w-full max-w-3xl">
        <motion.h2 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-lg mb-5">
          {mainHeader}
        </motion.h2>
        <motion.h5 className="text-white text-lg sm:text-2xl md:text-3xl font-semibold drop-shadow-md mb-6">
          {secondaryHeader}
        </motion.h5>

        {/* Search Bar */}
        {showSearch && (
          <motion.div className="w-full max-w-2xl">
            <div className="bg-white border border-gray-300 rounded-full shadow-lg flex items-center px-4 py-3 gap-3 transition-all">
              <FaMapMarkerAlt className="text-blue-500 ml-2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="输入您的目的地..."
                className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-500 px-2 rounded-full"
              />
            </div>

            {/* Error Message */}
            {errorMessage && <div className="mt-6 text-red-500 text-center">{errorMessage}</div>}

            {/* Search Results List */}
            {results.length > 0 && (
              <div className="mt-6 bg-white rounded-xl shadow-lg overflow-hidden max-h-[400px] overflow-y-auto divide-y divide-gray-200">
                {results.map((place) => (
                  <Link
                    key={place.id}
                    href={`/details/${place.id}`}
                    className="flex items-center w-full p-3 transition-all hover:bg-gray-100"
                  >
                    {/* Small Image */}
                    <div className="w-16 h-16 relative flex-shrink-0">
                      <Image
                        src={place.imageUrls[0]}
                        alt={place.name}
                        className="object-cover w-full h-full rounded-md"
                        layout="fill"
                      />
                    </div>

                    {/* Hotel Info */}
                    <div className="flex-1 px-4">
                      <h3 className="font-semibold text-lg">{place.name}</h3>
                      <p className="text-sm text-gray-600">{place.location}</p>
                    </div>

                    {/* Price */}
                    <div className="text-lg font-bold text-blue-600">
                      ¥{place.pricePerNight}/晚
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Hero;
