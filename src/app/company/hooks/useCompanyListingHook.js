import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCompanyListing } from "../(pages)/listings/service"; // Ensure the correct service function is used

export const useCompanyListingHook = () => {
    const queryClient = useQueryClient();

    const { mutate: handleDeleteListing, isPending } = useMutation({
        mutationFn: (id) => deleteCompanyListing(id),
        onSuccess: handleSuccess,
    });

    function handleSuccess() {
        toast.success(`成功删除酒店`);
        queryClient.invalidateQueries({
            queryKey: ["company", "listings"], // Invalidate only company listings
        });
    }

    return { handleDeleteListing, isPending };
};
