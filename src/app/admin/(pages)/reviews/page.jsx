"use client";

import React from "react";
import AdminLayout from "../../layout/AdminLayout";
import { columns } from "./table/Columns";
import { useQuery } from "@tanstack/react-query";
import { getAllReviews } from "./service";
import { DataTable } from "../../components/Date-table";
import { ClipLoader } from "react-spinners";
import { getAllUsers } from "../../services/service";

const Reviews = () => {
    // Fetch all reviews and users
    const { data: allReviews, isLoading: isReviewsLoading } = useQuery({
        queryFn: getAllReviews,
        queryKey: ["admin", "reviews"],
    });

    const { data: allUsers, isLoading: isUsersLoading } = useQuery({
        queryFn: getAllUsers,
        queryKey: ["admin", "users"],
    });

    // Show loader if either data set is loading
    if (isReviewsLoading || isUsersLoading) return <ClipLoader />;

    // Map reviews to include username (join operation)
    const reviewsWithUsers = allReviews.map((review) => {
        const user = allUsers.find((user) => user.id === review.userId); // Assuming `userId` links the review to a user
        return {
            ...review,
            username: user ? user.username : "未知用户", // Default to "Unknown User" if no match
        };
    });

    return (
        <AdminLayout>
            <div className="ml-12 h-screen w-full">
                <h2 className="text-3xl text-slate-800 font-bold whitespace-nowrap">
                    所有评论
                </h2>
                <div className="mt-2 h-2/3 w-[50vw]">
                    <DataTable
                        columns={columns}
                        data={reviewsWithUsers}
                    />
                </div>
            </div>
        </AdminLayout>
    );
};

export default Reviews
