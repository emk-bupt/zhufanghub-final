"use client";

import React from "react";
import CompanyLayout from "../layout/CompanyLayout"; // Use CompanyLayout instead of AdminLayout
import { columns } from "./table/Columns";
import { useQuery } from "@tanstack/react-query";
import { getAllReviews } from "./service";  // Assuming the service function is correctly fetching data
import { DataTable } from "../components/Date-table";
import { ClipLoader } from "react-spinners";

const Reviews = () => {
    // Fetch all reviews
    const { data: allReviews, isLoading: isReviewsLoading } = useQuery({
        queryFn: getAllReviews,
        queryKey: ["company", "reviews"], // Changed to reflect company dashboard
    });

    // Show loader if data is loading
    if (isReviewsLoading) return <ClipLoader />;

    // Log to check structure of allReviews
    console.log("Reviews data:", allReviews);  // Optional: Debug the response

    return (
        <CompanyLayout>
            <div className="ml-12 h-screen w-full">
                <h2 className="text-3xl text-slate-500 font-bold whitespace-nowrap">
                    所有评论
                </h2>
                <div className="mt-2 h-2/3 w-[50vw]">
                    <DataTable
                        columns={columns}
                        data={allReviews} // Passing the filtered reviews data
                    />
                </div>
            </div>
        </CompanyLayout>
    );
};

export default Reviews;
