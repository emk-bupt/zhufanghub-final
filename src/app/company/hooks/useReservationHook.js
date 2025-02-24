import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteReservation } from "../(pages)/reservations/service"; // Ensure correct import path

export const useReservationHook = () => {
    const queryClient = useQueryClient();

    const { mutate: handleDeleteReservation, isPending } = useMutation({
        mutationFn: ({ chargeId, reservationId }) => deleteReservation({ chargeId, reservationId }),
        onSuccess: handleSuccess
    });

    function handleSuccess() {
        toast.success("成功删除预订");
        queryClient.invalidateQueries({
            queryKey: ["company", "reservations"], // Changed to company panel query key
        });
    }

    return {
        handleDeleteReservation,
        isPending
    };
};
