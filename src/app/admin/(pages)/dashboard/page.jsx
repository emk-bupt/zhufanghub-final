"use client";
import React from "react";
import AdminLayout from "../../layout/AdminLayout";
import { AiFillBank, AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { MdHotel } from "react-icons/md";
import { useWidgetHook } from "../../hooks/widget-hook";
import Widget from "../../components/Widget";
import BigWidget from "../../components/BigWidget";
import Chart from "../../components/Chart";

// Helper function for currency formatting
const formatCurrency = (value) => {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
  }).format(value);
};

const Dashboard = () => {
  const [
    usersQuery,
    listingsQuery,
    reservationsQuery,
    revenueQuery,
    mostReservedQuery,
  ] = useWidgetHook();

  // Widget data with consistent `id`, `page` (URL), and `displayName` (for UI)
  const widgetData = [
    {
      id: "users",
      page: "users", // URL-friendly name
      displayName: "用户", // Chinese name for UI
      data: usersQuery.data,
      icon: <AiOutlineUser color="#efefef" />,
    },
    {
      id: "listings",
      page: "listings", // URL-friendly name
      displayName: "酒店", // Chinese name for UI
      data: listingsQuery.data,
      icon: <MdHotel color="#efefef" />,
    },
    {
      id: "reservations",
      page: "reservations", // URL-friendly name
      displayName: "预订", // Chinese name for UI
      data: reservationsQuery.data,
      icon: <AiOutlineHome color="#efefef" />,
    },
    {
      id: "revenue",
      page: "revenue", // URL-friendly name
      displayName: "收入", // Chinese name for UI
      data: revenueQuery.data,
      icon: <AiFillBank color="#efefef" />,
    },
  ];

  return (
    <AdminLayout>
      <div className="ml-2 w-full h-full flex flex-col col-span-7 overflow-hidden">
        {/* Widget Grid */}
        <div className="grid grid-cols-4 gap-8">
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

        {/* Big Widget and Chart */}
        <div className="mt-28 grid grid-cols-7 gap-16">
          <BigWidget
            listing={mostReservedQuery.data}
            currencySymbol="￥" // Pass dynamic symbol if needed
          />
          <Chart />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
