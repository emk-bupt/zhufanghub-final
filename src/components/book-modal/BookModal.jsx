"use client";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./dateRangeDark.css"; // Import custom styles for dark mode
import { DateRangePicker } from "react-date-range";
import zhCN from "date-fns/locale/zh-CN";
import React, { useState } from "react";
import { format } from "currency-formatter";
import { AiOutlineClose } from "react-icons/ai";
import Button from "@/ui/Button";
import { redirectToCheckout } from "./service";
import getDatesInRange from "@/lib/dateToMilliseconds";

const BookModal = ({ listing, handleHideModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  // No default selected dates: initialize with null values
  const [dateRange, setDateRange] = useState([null, null]);

  // Use fallback dates for display if no dates are selected yet
  const selectionRange = {
    startDate: dateRange[0] || new Date(),
    endDate: dateRange[1] || new Date(),
    key: "selection",
  };

  const calcDaysDiff = () => {
    if (!dateRange[0] || !dateRange[1]) return 0;
    const timeDiff = dateRange[1].getTime() - dateRange[0].getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) || 0;
  };

  const handlePayment = async () => {
    // Only proceed if both dates are selected
    if (!dateRange[0] || !dateRange[1]) return;

    setIsLoading(true);
    try {
      await redirectToCheckout(
        listing,
        dateRange[0],
        dateRange[1],
        calcDaysDiff()
      );
    } finally {
      setIsLoading(false);
    }
  };

  const disabledDates =
    listing?.reservations?.flatMap((reservation) => {
      const start = new Date(reservation.startDate);
      const end = new Date(reservation.endDate);
      return getDatesInRange(start, end).map((ts) => new Date(ts));
    }) || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-md">
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 w-full sm:w-[400px] md:w-[500px] rounded-lg shadow-lg overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-xl">预订酒店</h3>
          <AiOutlineClose
            size={20}
            className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-400"
            onClick={handleHideModal}
          />
        </div>

        {/* Modal Body */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">{listing.name}</h2>
            <span className="text-gray-800 dark:text-gray-300 font-medium">
              {format(listing.pricePerNight, { locale: "cn-CN" })}
            </span>
          </div>

          {/* Date Picker with Custom Dark Mode Support */}
          <div className="w-full dark:bg-gray-800 dark:text-gray-200 p-2 rounded-lg">
            <DateRangePicker
              ranges={[selectionRange]}
              minDate={new Date()}
              disabledDates={disabledDates}
              onChange={({ selection }) =>
                setDateRange([selection.startDate, selection.endDate])
              }
              locale={zhCN}
              firstDayOfWeek={1}
              className="w-full rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
              rangeColors={["#3b82f6"]}
              showMonthAndYearPickers={true}
              inputRanges={[]}
              editableDateInputs={true}
              dateDisplayFormat="yyyy年MM月dd日"
              monthDisplayFormat="yyyy年MM月"
              phrases={{
                today: "今天",
                yesterday: "昨天",
                thisWeek: "本周",
                lastWeek: "上周",
                thisMonth: "本月",
                lastMonth: "上月",
                reset: "重置",
                close: "关闭",
              }}
            />
          </div>
        </div>

        {/* Price Summary */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 space-y-2">
          <div className="flex justify-between text-lg font-medium">
            <span>
              {format(listing.pricePerNight, { locale: "cn-CN" })} x {calcDaysDiff()} 晚
            </span>
            <span className="text-blue-600 dark:text-blue-400">
              {format(listing.pricePerNight * calcDaysDiff(), {
                locale: "cn-CN",
              })}
            </span>
          </div>
        </div>

        {/* Booking Button */}
        <div className="p-4 flex justify-center">
          <Button
            onClick={handlePayment}
            disabled={isLoading || calcDaysDiff() === 0}
            className="w-full py-3 text-white bg-blue-500 dark:bg-blue-600 rounded-lg font-semibold text-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition"
            label={isLoading ? "处理中..." : "预订"}
          />
        </div>
      </div>
    </div>
  );
};

export default BookModal;
