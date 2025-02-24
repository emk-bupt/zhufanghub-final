"use client";

import Image from "next/image";
import { FaPen, FaTrash } from "react-icons/fa";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { useState } from "react";
import ListingModal from "@/app/company/modals/listing-modal/ListingModal";
import { useCompanyListingHook } from "@/app/company/hooks/useCompanyListingHook";

export const columns = [
    {
        accessorKey: "image",
        header: "照片",
        cell: ({ row }) => {
            const image = row.original?.imageUrls[0];
            const listingId = row.original?.id; 
            const listingSlug = row.original?.slug; // If using a slug-based URL

            const listingUrl = `/details/${listingSlug || listingId}`; // Adjust this based on your routing

            return (
                <a href={listingUrl} target="_blank" rel="noopener noreferrer">
                    <Image
                        className="rounded-2xl object-cover cursor-pointer hover:opacity-80 transition"
                        width="60"
                        height="60"
                        src={image}
                        alt="Hotel Image"
                    />
                </a>
            );
        }
    },
    {
        accessorKey: "name",
        header: "名称",
        cell: ({ row }) => <span>{row.getValue("name")}</span>
    },
    {
        accessorKey: "location",
        header: "地点",
        cell: ({ row }) => <span>{row.getValue("location")}</span>
    },
    {
        accessorKey: "type",
        header: "类型"
    },
    {
        accessorKey: "pricePerNight",
        header: ({ column }) => (
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
        ),
        cell: ({ row }) => <span>￥{row.getValue("pricePerNight")}</span>
    },
    {
        accessorKey: "beds",
        header: ({ column }) => (
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
        ),
        cell: ({ row }) => <span>{row.getValue("beds")}</span>
    },
    {
        accessorKey: "actions",
        header: "操作",
        cell: ({ row }) => {
            const listingId = row.original.id;
            const [showModal, setShowModal] = useState(false);

            const { handleDeleteListing, isPending } = useCompanyListingHook();

            const handleHideModal = () => setShowModal(false);
            const handleShowModal = () => setShowModal(true);

            return (
                <>
                    <button
                        onClick={() => handleDeleteListing(listingId)}
                        disabled={isPending}
                        className="cursor-pointer px-2 py-1 rounded-xl"
                    >
                        <FaTrash color={`${isPending ? "#bdb2b2" : "#f00"}`} />
                    </button>
                    <button
                        onClick={handleShowModal}
                        className="cursor-pointer disabled:bg-slate-200 px-2 py-1 rounded-xl"
                    >
                        <FaPen color="#31b608" />
                    </button>
                    {showModal && (
                        <ListingModal
                            handleHideModal={handleHideModal}
                            listingId={listingId}
                        />
                    )}
                </>
            );
        }
    }
];
