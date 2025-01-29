"use client";
import { format } from "currency-formatter";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { FaBed, FaWifi } from "react-icons/fa";
import { register } from "swiper/element/bundle";
import { useQuery } from "@tanstack/react-query";
import { getListingById } from "./service";
import { ClipLoader } from "react-spinners";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Reviews from "./Reviews";
import BookModal from "@/components/book-modal/BookModal";

register();

const HotelDetails = (ctx) => {
  const { id } = ctx.params;
  const [showModal, setShowModal] = useState(false);
  const swiperElRef = useRef(null);

  const { data: listing, isPending } = useQuery({
    queryKey: ["listings", { id }],
    queryFn: () => getListingById(id),
  });

  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);

  if (isPending) {
    const style = {
      marginTop: "5rem",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      height: "100vh",
    };

    return (
      <div style={style}>
        <ClipLoader color={"#123abc"} />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen w-full mt-24 ${showModal && "overflow-hidden"}`}
    >
      {showModal && (
        <BookModal listing={listing} handleHideModal={handleHideModal} />
      )}
      <div className="h-full w-3/4 mx-auto">
        <div>
          {/* Swiper Container for Hotel Images */}
          <div className="w-full h-[750px] overflow-hidden mx-auto">
            <div className="w-full h-full">
              <swiper-container
                ref={swiperElRef}
                slides-per-view="1"
                navigation="true"
              >
                {listing?.imageUrls?.map((imageUrl) => (
                  <swiper-slide key={imageUrl}>
                    <Image
                      className="h-[750px] w-full object-cover rounded-lg"
                      height="750"
                      width="750"
                      src={imageUrl}
                      blurDataURL={
                        typeof listing.blurredImage === "string"
                          ? listing.blurredImage
                          : ""
                      }
                      placeholder={
                        typeof listing.blurredImage === "string" ? "blur" : "empty"
                      }
                      alt="hotel image"
                    />
                  </swiper-slide>
                ))}
              </swiper-container>
            </div>
          </div>

          {/* Hotel Details */}
          <div className="mt-12 px-6 w-full flex items-center justify-between">
            <h2 className="font-bold text-4xl">{listing.name}</h2>
            <div>
              <span className="p-2 px-4 text-[22px] rounded-full bg-blue-600 text-white flex items-center gap-2">
                <AiFillStar color="white" />
                <span className="text-white">{listing.avgRating}</span>
              </span>
              <span>{listing.reviews.length} 评论</span>
            </div>
          </div>
          <div className="mt-16 px-6 flex items-center gap-8">
            <span className="flex items-center gap-2">
              <CiLocationOn />
              {listing.location}
            </span>
            <span className="flex items-center gap-2">
              {format(listing.pricePerNight, { locale: "cn-CN" })}/晚
            </span>
            <span className="flex items-center gap-2">
              {listing.beds} <FaBed />
            </span>
            {listing.hasFreeWifi && (
              <span className="flex items-center gap-2">
                免费 <FaWifi />
              </span>
            )}
          </div>
          <div className="mt-16 px-6 w-full flex items-end justify-between">
            <p className="text-xl max-w-xl text-slate-700">{listing.desc}</p>
            <button
              onClick={handleShowModal}
              className="cursor-pointer rounded-lg py-2 px-6 text-xl text-white bg-blue-500"
            >
              预订
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t-2 border-white-800 px-6 mt-16 mx-auto">
          <h1 className="mt-16 text-3xl font-bold">评论</h1>
          <Reviews id={id} />
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
