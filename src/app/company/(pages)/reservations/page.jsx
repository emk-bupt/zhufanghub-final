"use client"

import React from 'react'
import Layout from '../../layout/CompanyLayout' // Updated layout for Company
import { useQuery } from '@tanstack/react-query'
import { ClipLoader } from 'react-spinners'
import { DataTable } from '../../components/Date-table'
import { columns } from './table/Columns'
import { getCompanyReservations } from '../../services/service' // Fetch company-specific reservations

const Reservations = () => {
    const { data: companyReservations, isLoading } = useQuery({
        queryFn: () => getCompanyReservations(),
        queryKey: ["company", "reservations"] // Updated key for company
    })

    if (isLoading) return <ClipLoader />

    return (
        <Layout>
            <div className="ml-12 h-screen w-full">
                <h2 className="text-3xl text-slate-500 font-bold whitespace-nowrap">
                    我的预订
                </h2>
                <div className="mt-2 h-2/3 w-[65vw]">
                    <DataTable
                        columns={columns}
                        data={companyReservations}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default Reservations
