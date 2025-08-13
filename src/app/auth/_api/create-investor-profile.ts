import { api } from "@/lib/api";
import { SubmitInvestorProfileDto, SubmitInvestorProfileToApiDto } from "../_schema";
import { API_ROUTES } from "@/lib/routes";
import { useMutation } from "@tanstack/react-query";

const createInvestorProfileApi = async (data: SubmitInvestorProfileToApiDto) => {
  return await api.jsend(API_ROUTES.CREATE_INVESTOR_PROFILE, "POST", {
    json: data,
  });
};

export const useCreateInvestorProfileApi = () => {
  const { mutateAsync, data, isPending, isSuccess } = useMutation({
    mutationFn: createInvestorProfileApi,
  });

  return {
    createInvestorProfile: mutateAsync,
    data,
    isPending,
    isSuccess,
  };
};
