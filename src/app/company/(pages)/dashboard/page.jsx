"use client";
import React, { useState } from "react";
import CompanyLayout from "../../layout/CompanyLayout";
import { MdHotel } from "react-icons/md";
import { AiOutlineHome, AiFillBank, AiFillStar } from "react-icons/ai";
import Widget from "../../components/Widget";
import Button from "@/ui/Button";
import CreateModal from "../../modals/create-modal/CreateRoomModal"; // Import the modal

import { useCompanyWidgetHook } from "../../hooks/company-widget-hook";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false); // Control modal visibility

  const [
    listingsQuery,
    reservationsQuery,
    revenueQuery,
    reviewsQuery,  // Access the reviews query
  ] = useCompanyWidgetHook();

  const widgetData = [
    {
      id: "listings",
      page: "listings",
      displayName: "房间数",
      data: listingsQuery?.data ? listingsQuery.data.length : 0, 
      icon: <MdHotel color="#efefef" />,
    },
    {
      id: "reservations",
      page: "reservations",
      displayName: "预订数",
      data: reservationsQuery?.data ? reservationsQuery.data.length : 0, 
      icon: <AiOutlineHome color="#efefef" />,
    },
    {
      id: "reviews",
      page: "reviews",
      displayName: "评论数",
      data: reviewsQuery?.data ? reviewsQuery.data.length : 0,  // Display the number of reviews
      icon: <AiFillStar color="#efefef" />,
    },
    {
      id: "revenue",
      page: "revenue",
      displayName: "收入",
      data: revenueQuery?.data,
      icon: <AiFillBank color="#efefef" />,
    },
  ];

  return (
    <CompanyLayout>
      <div className="ml-2 w-full min-h-screen flex flex-col overflow-hidden bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        
        {/* Add Room Button */}
        <div className="flex justify-end mb-4">
          <Button
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={() => setShowModal(true)}
            label="添加房间"
          />
        </div>

        {/* Widget Grid */}
        <div className="ml-2 w-full flex-grow flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <div className="grid grid-cols-4 gap-8 p-4">
            {widgetData?.map(({ id, page, displayName, data, icon }) => (
              <Widget
                key={id}
                page={page} // URL-friendly
                displayName={displayName} // Translated name
                data={data}
                icon={icon}
              />
            ))}
          </div>
        </div>

        {/* Render Modal if showModal is true */}
        {showModal && <CreateModal handleHideModal={() => setShowModal(false)} />}
      </div>
    </CompanyLayout>
  );
};

export default Dashboard;
