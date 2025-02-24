"use client";

import React from "react";
import CompanyLayout from "../../layout/CompanyLayout";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../../components/Date-table";
import { columns } from "./table/Column";
import { ClipLoader } from "react-spinners";
import { getCompanyListings } from "./service";

const Listings = () => {
  const { data: companyListings, isLoading, error } = useQuery({
    queryFn: getCompanyListings,
    queryKey: ["company", "listings"],
  });

  if (isLoading) return <ClipLoader />;
  if (error) return <p className="text-red-500">⚠ Error loading listings: {error.message}</p>;

  return (
    <CompanyLayout>
      <div className="ml-12 h-screen w-full">
        <h2 className="text-3xl text-slate-500 font-bold whitespace-nowrap">
          我的酒店
        </h2>
        <div className="mt-2 h-2/3 w-[60vw] overflow-auto">
          <DataTable columns={columns} data={companyListings} />
        </div>
      </div>
    </CompanyLayout>
  );
};

export default Listings;
