"use client"

import Image from 'next/image';
import { useListingHook } from '@/app/admin/hooks/listing-hook';
import { FaPen, FaTrash } from 'react-icons/fa';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { useState } from 'react';
import ListingModal from '@/app/admin/modals/listing-modal/ListingModal';

export const columns = [
    {
        accessorKey: "image",
        header: "照片",
        cell: ({ row }) => {
            const image = row.original?.imageUrls[0]

            return (
                <div>
                    <Image
                        className="rounded-2xl object-cover"
                        width="60"
                        height="60"
                        src={image}
                        alt="Hotelimage"
                    />
                </div>
            )
        }
    },
    {
        accessorKey: "name", 
        header: "名称",
        cell: ({ row }) => {
            const name = row.getValue("name")

            return (
                <span>
                    {name}
                </span>
            )
        }
    },
    {
        accessorKey: "location",
        header: "地点",
        cell: ({ row }) => {
            const location = row.getValue("location")

            return (
                <span>
                    {location}
                </span>
            )
        }
    },
    {
        accessorKey: "type",
        header: "类型"
    },
    {
        accessorKey: "pricePerNight",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center gap-1"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    每晚价格
                    <span className="flex items-center">
                        <AiOutlineArrowUp />
                        <AiOutlineArrowDown />
                    </span>
                </button>
            )
        },
        cell: ({ row }) => {
            const pricePerNight = row.getValue("pricePerNight")

            return (
                <span>
                    ￥{pricePerNight}
                </span>
            )
        }
    },
    {
        accessorKey: "beds",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center gap-1"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    床
                    <span className="flex items-center">
                        <AiOutlineArrowUp />
                        <AiOutlineArrowDown />
                    </span>
                </button>
            )
        },
        cell: ({ row }) => {
            const beds = row.getValue("beds")

            return (
                <span>
                    {beds}
                </span>
            )
        }
    },
    {
        accessorKey: "actions",
        header: "操作",
        cell: ({ row }) => {
            const listingId = row.original.id
            const [showModal, setShowModal] = useState(false)

            const { handleDeleteListing, isPending } = useListingHook()
            const handleHideModal = () => setShowModal(false)
            const handleShowModal = () => setShowModal(true)
            return (
                <>
                    <button
                        onClick={() => handleDeleteListing(listingId)}
                        disabled={isPending}
                        className="cursor-pointer px-2 py-1 rounded-xl"
                    >
                        <FaTrash
                            color={`${isPending ? "#bdb2b2" : "#f00"}`}
                        />
                    </button>
                    <button
                        onClick={handleShowModal}
                        className="cursor-pointer disabled:bg-slate-200 px-2 py-1 rounded-xl"
                    >
                        <FaPen
                            color="#31b608"
                        />
                    </button>
                    {showModal &&
                        <ListingModal
                            handleHideModal={handleHideModal}
                            listingId={listingId}
                        />
                    }
                </>
            )
        }
    }
]
