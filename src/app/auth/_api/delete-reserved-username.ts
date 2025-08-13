import { api } from "@/lib/api";
import { API_ROUTES } from "@/lib/routes";
import { useMutation } from "@tanstack/react-query";

type Response_DeleteReservedUsername = {
  username: string;
  reservationToken: string;
};

const deleteReservedUsernameApi = async ({
  username,
  reservationToken,
}: {
  username: string;
  reservationToken: string;
}) => {
  return await api.jsend<Response_DeleteReservedUsername>(
    API_ROUTES.DELETE_RESERVED_USERNAME,
    "DELETE",
    {
      json: { username, reservationToken },
    }
);
};

export const useDeleteReservedUsernameApi = () => {
  const { mutate, data, isPending, isSuccess } = useMutation({
    mutationFn: deleteReservedUsernameApi,
  });

  return {
    deleteReservedUsername: mutate,
    data,
    isPending,
    isSuccess,
  };
};
