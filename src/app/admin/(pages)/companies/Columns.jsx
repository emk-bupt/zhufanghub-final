import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { useState } from "react";
import CompanyDataModal from "../../modals/Company-Data-Modal/CompanyDataModal";

const ModalButton = ({ type, companyId, value }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className="text-blue-500 hover:underline">
        {value || 0}
      </button>

      {showModal && (
        <CompanyDataModal isOpen={showModal} onClose={() => setShowModal(false)} type={type} companyId={companyId} />
      )}
    </>
  );
};

export const columns = [
  {
    accessorKey: "companyName",
    header: ({ column }) => (
      <button className="flex justify-center items-center gap-1" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        公司名称
        <span className="flex items-center">
          <AiOutlineArrowUp />
          <AiOutlineArrowDown />
        </span>
      </button>
    ),
    cell: ({ row }) => <span>{row.getValue("companyName") || "未知公司"}</span>,
  },
  {
    accessorKey: "email",
    header: "邮箱",
    cell: ({ row }) => <span>{row.getValue("email") || "未知邮箱"}</span>,
  },
  {
    accessorKey: "totalHotels",
    header: "酒店数量",
    cell: ({ row }) => <ModalButton type="hotels" companyId={row.original.id} value={row.getValue("totalHotels")} />,
  },
  {
    accessorKey: "totalReservations",
    header: "预订总数",
    cell: ({ row }) => <ModalButton type="reservations" companyId={row.original.id} value={row.getValue("totalReservations")} />,
  },
  {
    accessorKey: "totalRevenue",
    header: "总收入",
    cell: ({ row }) => {
      const totalRevenue = row.getValue("totalRevenue");
      return <span>￥{isNaN(totalRevenue) ? "未计算" : totalRevenue}</span>;
    },
  },
];
