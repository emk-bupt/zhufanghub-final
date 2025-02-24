import Image from "next/image";
import { format } from "date-fns";
import zhCN from "date-fns/locale/zh-CN";
import { FaTrash } from "react-icons/fa";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { useReservationHook } from "@/app/company/hooks/useReservationHook";
import { useRouter } from "next/navigation";

export const columns = [
    {
        accessorKey: "image",
        header: "照片",
        cell: ({ row }) => {
            const image = row.getValue("listing").imageUrls[0];
            const listingId = row.getValue("listing").id;
            const router = useRouter(); // Hook for navigation

            return (
                <div
                    className="cursor-pointer"
                    onClick={() => router.push(`/company/listing/${listingId}`)}
                >
                    <Image
                        className="rounded-full object-cover"
                        width="50"
                        height="50"
                        src={image}
                        alt="Listing Image"
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "startDate",
        header: "开始日期",
        cell: ({ row }) => {
            const value = row.getValue("startDate");
            return (
                <span>
                    {format(new Date(value), "yyyy年MM月dd日", { locale: zhCN })}
                </span>
            );
        },
    },
    {
        accessorKey: "endDate",
        header: "结束日期",
        cell: ({ row }) => {
            const value = row.getValue("endDate");
            return (
                <span>
                    {format(new Date(value), "yyyy年MM月dd日", { locale: zhCN })}
                </span>
            );
        },
    },
    {
        accessorKey: "user",
        header: "用户",
        cell: ({ row }) => {
            const { username } = row.getValue("user");
            return <span>{username}</span>;
        },
    },
    {
        accessorKey: "totalPrice",
        header: ({ column }) => (
            <button
                className="flex justify-center items-center gap-1"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                价格
                <span className="flex items-center">
                    <AiOutlineArrowUp />
                    <AiOutlineArrowDown />
                </span>
            </button>
        ),
        cell: ({ row }) => {
            const totalPrice = row.getValue("totalPrice");

            return (
                <span className="block text-left">
                    ¥{totalPrice.toLocaleString("zh-CN")}
                </span>
            );
        },
    },
    {
        accessorKey: "listing",
        header: "酒店",
        cell: ({ row }) => {
            const { name } = row.getValue("listing");

            return <span>{name}</span>;
        },
    },
    {
        accessorKey: "actions",
        header: "操作",
        cell: ({ row }) => {
            const { chargeId, id: reservationId } = row.original;

            const { handleDeleteReservation, isPending } = useReservationHook();

            return (
                <button
                    onClick={() =>
                        handleDeleteReservation({ chargeId, reservationId })
                    }
                    className="cursor-pointer disabled:bg-slate-200 px-2 py-1 rounded-xl"
                >
                    <FaTrash
                        color={`${isPending ? "#bdb2b2" : "#f00"}`}
                    />
                </button>
            );
        },
    },
];
