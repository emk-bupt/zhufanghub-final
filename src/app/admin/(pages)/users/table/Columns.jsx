"use client"
import Image from 'next/image'
import person_image from '../../../../../../public/assets/person_image.jpg'
import { format, register } from 'timeago.js'
import zh_CN from 'timeago.js/lib/lang/zh_CN'
import { FaPen, FaTrash } from "react-icons/fa"
import { useUserHook } from "../../../hooks/user-hook"
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'
import React, { useState } from 'react'
import UserModal from '@/app/admin/modals/user-modal/UserModal'

// Register the Chinese locale for timeago.js
register('zh_CN', zh_CN)

export const columns = [
    {
        accessorKey: "profilePhoto",
        header: "照片",
        cell: ({ row }) => {
            return (
                <Image
                    className="h-10 w-10 rounded-full object-cover"
                    height={50}
                    width={50}
                    src={person_image}
                    alt="Person's image"
                />
            )
        }
    },
    {
        accessorKey: "username",
        header: "用户名",
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center gap-1"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    邮箱
                    <span className="flex items-center">
                        <AiOutlineArrowUp />
                        <AiOutlineArrowDown />
                    </span>
                </button>
            )
        },
    },
    {
        accessorKey: "reservations",
        header: ({ column }) => {
            return (
                <button
                    className="Flex items-center gap-1"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    预订
                    <span className="flex items-center">
                        <AiOutlineArrowUp />
                        <AiOutlineArrowDown />
                    </span>
                </button>
            )
        },
        cell: ({ row }) => {
            
            const value = row.getValue("reservations")?.length || 0
            console.log("this is row:",row.original)
            return (
                <div>
                    {value} 预订
                </div>
            )
        }
    },
    {
        accessorKey: "CreatedAt",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center gap-1"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    创建于
                    <span className="flex items-center">
                        <AiOutlineArrowUp />
                        <AiOutlineArrowDown />
                    </span>
                </button>
            );
        },
        cell: ({ row }) => {
            const value = row.getValue("CreatedAt");
            return (
                <div>
                    {format(value, "zh_CN")} {/* Use Chinese locale */}
                </div>
            );
        },
        sortingFn: "datetime", // Specify sorting function for datetime
    },
    
    {
        accessorKey: "actions",
        header: "操作",
        cell: ({ row }) => {
            const { id: userId } = row.original
            const [showModal, setShowModal] = useState(false)

            const handleHideModal = () => setShowModal(false)
            const handleShowModal = () => setShowModal(true)

            const { handleDeleteUser, isPending } = useUserHook()

            return (
                <>
                    <button
                        className="cursor-pointer disabled:bg-slate-200 px-2 py-1 rounded-xl"
                        disabled={isPending}
                        onClick={() => handleDeleteUser(userId)}
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
                        <UserModal
                            userId={userId}
                            handleHideModal={handleHideModal}
                        />
                    )}
                </>
            )
        }
    },
]
