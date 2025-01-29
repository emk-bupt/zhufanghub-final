"use client"

import React from 'react'
import Layout from '../../layout/AdminLayout'
import { useQuery } from '@tanstack/react-query'
import { ClipLoader } from 'react-spinners'
import { DataTable } from '../../components/Date-table'
import { columns } from './table/Columns'
import { getAllReservations } from '../../services/service'


const Reservations = () => {
    const { data: allReservations, isLoading } = useQuery({
        queryFn: () => getAllReservations(),
        queryKey: ["admin", "reservations"]
    })

    if (isLoading) return <ClipLoader />

    return (
        <Layout>
            <div className="ml-12 h-screen w-full">
                <h2 className="text-3xl text-slate-800 font-bold whitespace-nowrap">
                    所以预订
                </h2>
                <div className="mt-2 h-2/3 w-[65vw]">
                    <DataTable
                        columns={columns}
                        data={allReservations}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default Reservations