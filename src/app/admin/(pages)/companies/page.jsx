"use client";
import React from "react";
import AdminLayout from "../../layout/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../../components/Date-table";
import { columns } from "./columns";
import { ClipLoader } from "react-spinners";
import { getAllCompanyUsers } from "./service";

const CompanyUsers = () => {
  const { data: companyUsers, isLoading } = useQuery({
    queryFn: getAllCompanyUsers,
    queryKey: ["admin", "companyUsers"],
  });

  if (isLoading) return <ClipLoader />;

  return (
    <AdminLayout>
      <div className="ml-12 h-screen w-full">
        <h2 className="text-3xl text-slate-500 font-bold">公司用户管理</h2>
        <div className="mt-2 h-2/3 w-[60vw] overflow-auto">
          <DataTable columns={columns} data={companyUsers} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default CompanyUsers;
