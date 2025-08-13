import { ReserveUsernameEndpointData } from "@/api-types/reserved-username.types";
import { api } from "@/lib/api";
import { API_ROUTES } from "@/lib/routes";
import { useMutation } from "@tanstack/react-query";

const reserveUsernameApi = async ({ username }: { username: string }) => {
  return await api.jsend<ReserveUsernameEndpointData>(
    API_ROUTES.RESERVE_USERNAME,
    "POST",
    {
      json: { username },
    }
  );
};

export const useReserveUsernameApi = () => {
  const { mutate, data, isPending, isSuccess, reset } = useMutation({
    mutationFn: reserveUsernameApi,
  });

  return {
    reserveUsername: mutate,
    data,
    isPending,
    isSuccess,
    reset
  };
};
