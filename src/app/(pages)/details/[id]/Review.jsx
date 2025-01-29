import React from "react";
import { AiFillStar } from "react-icons/ai";
import person_image from "../../../../../public/assets/person_image.jpg";
import Image from "next/image";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale"; // Import the Chinese locale

const Review = ({ review }) => {
  return (
    <div className="w-full flex gap-4">
      <div className="w-14 h-14">
        <Image
          height="56"
          width="56"
          className="w-full h-full object-cover rounded-full"
          src={review.user?.profilePicture || person_image} // Optional: Use profile picture if available
          alt={review.user?.username || "User"}
        />
      </div>
      <div>
        <h3 className="font-semibold text-[20px]">{review.user?.username}</h3>
        <span className="text-slate-700">
          {format(new Date(review.createdAt), "yyyy年M月d日", { locale: zhCN })}
        </span>
        <div className="mt-4 text-slate-800">{review.text}</div>
      </div>
      <span className="ml-auto flex items-center gap-2">
        {review.stars}
        <AiFillStar size={22} color="rgb(59 , 130 , 246)" />
      </span>
    </div>
  );
};

export default Review;
