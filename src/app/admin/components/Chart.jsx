"use client";
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const DynamicChartWithAPI = () => {
  const [chartData, setChartData] = useState([]);

  // Fetch the revenue data from the API
  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await fetch("/api/admin/reservation/get-weekly-revenue");
        const data = await response.json();

        console.log("Fetched Data: ", data);

        // Check if the response is valid (an array of 7 days)
        if (Array.isArray(data) && data.length === 7) {
          // Prepare data to be used by Recharts
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

    // Optionally, you can fetch data at intervals to keep the chart up-to-date
    const interval = setInterval(fetchRevenueData, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval); // Cleanup the interval when the component is unmounted
  }, []);

  // Custom Tooltip content
  const CustomTooltip = ({ payload, label }) => {
    if (payload && payload.length) {
      const { revenue } = payload[0].payload;
      return (
        <div className="custom-tooltip p-2 bg-white rounded-lg shadow-lg">
          <p className="text-sm font-semibold">{`${label}：收入 ${revenue}￥`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[525px] col-span-5 font-sans text-gray-900">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-600">每周收入图表</h1>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="day" 
            tick={{ fontSize: 14, fontFamily: 'Noto Sans SC', fontWeight: '500' }} 
            angle={-45} // Angle to rotate the labels and make them fit better
            textAnchor="end" 
            stroke="#333" // Color for x-axis labels
          />
          <YAxis 
            tickFormatter={(value) => `￥${value}`} 
            tick={{ fontSize: 14, fontFamily: 'Noto Sans SC', fontWeight: '500' }} 
            stroke="#333" // Color for y-axis labels
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{
              fontFamily: "Noto Sans SC",
              fontSize: "14px",
              fontWeight: "bold",
              color: "#333",
            }}
            payload={[{ value: "收入", type: "square", color: "#2563EB" }]} // Custom label for the legend
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
