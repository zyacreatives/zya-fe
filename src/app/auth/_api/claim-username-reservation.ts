import { api } from "@/lib/api";
import { API_ROUTES } from "@/lib/routes";
import { ClaimUsernameDto } from "../_schema";
import { useMutation } from "@tanstack/react-query";

const claimUsernameReservationApi = async (values: ClaimUsernameDto) => {
  return await api.jsend(API_ROUTES.CLAIM_USERNAME, "POST", {
    json: values,
  });
};

export const useClaimUsernameReservationApi = () => {
  const { mutate, data, isPending, isSuccess } = useMutation({
    mutationFn: claimUsernameReservationApi,
  });
  return {
    claimUsernameReservation: mutate,
    data,
    isPending,
    isSuccess,
  };
};
