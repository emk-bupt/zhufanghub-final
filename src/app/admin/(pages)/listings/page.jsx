"use client";

import React from "react";
import AdminLayout from "../../layout/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../../components/Date-table";
import { columns } from "./table/Column";
import { ClipLoader } from "react-spinners";
import { getAllListings } from "../../services/service";

const Listings = () => {
  const { data: allListings, isLoading } = useQuery({
    queryFn: getAllListings, // queryFn:getAllListings
    queryKey: ["admin", "listings"],
  });

  if (isLoading) return <ClipLoader />;

  return (
    <AdminLayout>
      <div className="ml-12 h-screen w-full">
        <h2 className="text-3xl text-slate-500 font-bold whitespace-nowrap">
          所有酒店
        </h2>
        <div className="mt-2 h-2/3 w-[60vw] overflow-auto">
          <DataTable columns={columns} data={allListings} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Listings;
