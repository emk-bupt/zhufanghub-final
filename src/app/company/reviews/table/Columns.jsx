import { format } from "date-fns";
import { zhCN } from "date-fns/locale"; // Import Chinese locale
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { useReviewHook } from "@/app/admin/hooks/review-hook";

export const columns = [
    {
        accessorKey: "stars",
        header: ({ column }) => (
            <button
                className="flex justify-center items-center gap-1"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                星级
                <span className="flex items-center">
                    <AiOutlineArrowUp />
                    <AiOutlineArrowDown />
                </span>
            </button>
        ),
        cell: ({ row }) => {
            const value = row.getValue("stars");
            return <span>{value}</span>;
        },
    },
    {
        accessorKey: "user.username",
        header: "用户名",
        cell: ({ row }) => {
            const username = row.original.user?.username; 
            return <span>{username || "未知用户"}</span>;
        },
    },
    {
        accessorKey: "listing.name",  // Still correct, ensuring listing.name is accessed
        header: "酒店名称",
        cell: ({ row }) => {
            const listingSlug = row.original.listing?.slug; // Use slug if available, else use ID
            const listingId = row.original.listing?.id; // Fallback to listing ID if slug is missing

            const listingUrl = `/details/${listingSlug || listingId}`; // Create the URL for the hotel page
            const listingName = row.original.listing?.name; // Access the listing name

            return (
                <a href={listingUrl} target="_blank" rel="noopener noreferrer">
                    <span>{listingName || "未知酒店"}</span>
                </a>
            );
        },
    },
    {
        accessorKey: "text",
        header: "评论",
        cell: ({ row }) => {
            const text = row.getValue("text");
            return <span>{text}</span>;
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <button
                className="flex justify-center items-center gap-1"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                创建于
                <span className="flex items-center">
                    <AiOutlineArrowUp />
                    <AiOutlineArrowDown />
                </span>
            </button>
        ),
        cell: ({ row }) => {
            const value = row.getValue("createdAt");
            return (
                <span>
                    {format(new Date(value), "yyyy年MM月dd日", { locale: zhCN })}
                </span>
            );
        },
        sortingFn: "datetime", 
    },
      {
            accessorKey: "actions",
            header: "操作",
            cell: ({ row }) => {
                const { id } = row.original;
                const { handleDeleteReview, isPending } = useReviewHook();
    
                return (
                    <button
                        onClick={() => handleDeleteReview(id)}
                        className="cursor-pointer disabled:bg-slate-200 px-2 py-1 rounded-xl"
                    >
                        <FaTrash color={`${isPending ? "#bdb2b2" : "#f00"}`} />
                    </button>
                );
            },
        },
];
