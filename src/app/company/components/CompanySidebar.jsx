"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import React from "react";
import { MdDashboard, MdHotel } from "react-icons/md";
import { AiOutlineHome, AiFillStar } from "react-icons/ai";

const CompanySidebar = () => {
  const currentPage = usePathname().split("/")[2];
  const { theme } = useTheme();

  const sidebarData = [
    { text: "仪表板", icon: MdDashboard, href: "/company/dashboard", isCurrentPage: currentPage === "dashboard" },
    { text: "房间", icon: MdHotel, href: "/company/listings", isCurrentPage: currentPage === "listings" },
    { text: "预订", icon: AiOutlineHome, href: "/company/reservations", isCurrentPage: currentPage === "reservations" },
    { text: "评论", icon: AiFillStar, href: "/company/reviews", isCurrentPage: currentPage === "reviews" },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-[#F3F4F6] dark:bg-gray-900 p-4 transition-all">
      <div className="h-full flex flex-col space-y-8">
        {sidebarData.map((data) => (
          <Link
            href={data.href}
            key={data.text}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer 
              ${
                data.isCurrentPage
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-300 dark:hover:bg-gray-700"
              }`}
          >
            <span>
              <data.icon
                color={data.isCurrentPage ? "#F3F4F6" : theme === "dark" ? "#D1D5DB" : "#4B5563"}
              />
            </span>
            <span className={`text-lg font-medium ${data.isCurrentPage ? "text-white" : "text-gray-700 dark:text-gray-300"}`}>
              {data.text}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CompanySidebar;
