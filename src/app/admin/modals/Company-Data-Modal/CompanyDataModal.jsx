"use client";
import Image from 'next/image';
import { format } from "date-fns";
import zhCN from "date-fns/locale/zh-CN";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { DataTable } from "../../components/Date-table";
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import ListingModal from '../listing-modal/ListingModal';
import { useListingHook } from '@/app/admin/hooks/listing-hook';
import { useReservationHook } from "@/app/admin/hooks/reservation-hook";
import { FaPen, FaTrash } from 'react-icons/fa';


const CompanyDataModal = ({ isOpen, onClose, type, companyId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen || !companyId) return;

    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const url =
          type === "hotels"
            ? `/api/company/listing/get-all-listings?companyId=${companyId}`
            : `/api/company/reservation/get-all-reservations?companyId=${companyId}`;

        const response = await fetch(url, {
          method: "GET",
          credentials: "include", // Ensure session cookies are sent
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          if (response.status === 401) throw new Error("未授权访问");
          throw new Error("数据获取失败");
        }

        const result = await response.json();
        console.log("Fetched data:", result);

        setData(result);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isOpen, type, companyId]);

  // Define different columns for "hotels" and "reservations"
  const hotelColumns = [
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
  ];

  const reservationColumns = [
    {
            accessorKey: "image",
            header: "照片",
            cell: ({ row }) => {
                const image = row.getValue("listing").imageUrls[0];
    
                return (
                    <div>
                        <Image
                            className="rounded-full object-cover"
                            width="50"
                            height="50"
                            src={image}
                            alt=""
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
                const { email } = row.getValue("user");
                return <span>{email}</span>;
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-4xl relative">
        <h2 className="text-xl font-semibold mb-4">
          {type === "hotels" ? "酒店列表" : "预订记录"}
        </h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        {loading ? (
          <div className="flex justify-center">
            <ClipLoader />
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <DataTable
            columns={type === "hotels" ? hotelColumns : reservationColumns}
            data={data}
          />
        )}
      </div>
    </div>
  );
};

export default CompanyDataModal;
