import Link from "next/link";
import { useTheme } from "next-themes";
import React from "react";

const Widget = ({ page, displayName, data, icon }) => {
  const { theme } = useTheme(); // Get current theme

  // Check if the widget is for revenue
  const isRevenue = page === "revenue";
  const displayData = isRevenue
    ? `￥${data}` // Format revenue
    : Array.isArray(data)
    ? data?.length
    : data; // Show the count for other widgets

  return (
    <div
      className="w-full h-48 p-4 transition-all shadow-md hover:shadow-lg rounded-xl cursor-pointer 
      bg-gray-100 dark:bg-gray-800"
    >
      <div className="w-full h-full flex flex-col justify-between">
        {/* Header */}
        <div className="flex justify-between">
          <h2 className="font-bold text-[18px] uppercase text-gray-600 dark:text-gray-400">
            {displayName}
          </h2>
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-200">
            {displayData ?? "N/A"}
          </span>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4">
          {/* Only show the link for widgets that are not for revenue */}
          {!isRevenue && (
            <Link
              className="border-b transition hover:border-gray-500 text-blue-500 dark:text-blue-400"
              href={`/admin/${page}`} // Use URL-friendly `page` for routing
            >
              查看全部
            </Link>
          )}
          <span className="h-8 w-8 flex justify-center items-center rounded-full 
          bg-blue-400 text-white dark:bg-blue-500">
            {icon}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Widget;
