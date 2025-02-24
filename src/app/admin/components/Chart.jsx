"use client";
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTheme } from "next-themes";

const DynamicChartWithAPI = () => {
  const [chartData, setChartData] = useState([]);
  const { theme } = useTheme(); // Get the current theme (dark/light)

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await fetch("/api/admin/reservation/get-weekly-revenue");
        const data = await response.json();

        console.log("Fetched Data: ", data);

        if (Array.isArray(data) && data.length === 7) {
          const formattedData = data.map((revenue, index) => ({
            day: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][index],
            revenue: revenue,
          }));

          setChartData(formattedData);
        } else {
          console.warn("Invalid data format from API.");
        }
      } catch (error) {
        console.error("Error fetching weekly revenue:", error);
      }
    };

    fetchRevenueData();
    const interval = setInterval(fetchRevenueData, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Custom Tooltip with dark mode support
  const CustomTooltip = ({ payload, label }) => {
    if (payload && payload.length) {
      const { revenue } = payload[0].payload;
      return (
        <div className={`p-2 rounded-lg shadow-lg ${theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}>
          <p className="text-sm font-semibold">{`${label}：收入 ￥${revenue}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[525px] col-span-5 font-sans bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg transition-all">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-600 dark:text-blue-400">
        每周收入图表
      </h1>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#4B5563" : "#E5E7EB"} />
          <XAxis 
            dataKey="day" 
            tick={{ fontSize: 14, fontFamily: 'Noto Sans SC', fontWeight: '500', fill: theme === "dark" ? "#D1D5DB" : "#333" }} 
            angle={-45} 
            textAnchor="end"
          />
          <YAxis 
            tickFormatter={(value) => `￥${value}`} 
            tick={{ fontSize: 14, fontFamily: 'Noto Sans SC', fontWeight: '500', fill: theme === "dark" ? "#D1D5DB" : "#333" }} 
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{
              fontFamily: "Noto Sans SC",
              fontSize: "14px",
              fontWeight: "bold",
              color: theme === "dark" ? "#D1D5DB" : "#333",
            }}
            payload={[{ value: "收入", type: "square", color: "#2563EB" }]} 
          />
          <Bar 
            dataKey="revenue" 
            fill="#2563EB" 
            barSize={40} 
            radius={[10, 10, 0, 0]} 
            opacity={0.8} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DynamicChartWithAPI;
