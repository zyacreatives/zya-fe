import { api } from "@/lib/api";
import { SubmitInvestorInvestmentFocusDto } from "../_schema";
import { API_ROUTES } from "@/lib/routes";
import { useMutation } from "@tanstack/react-query";

const createInvestmentFocusApi = async (
  data: SubmitInvestorInvestmentFocusDto
) => {
  return await api.jsend(API_ROUTES.CREATE_INVESTMENT_FOCUS, "POST", {
    json: data,
  });
};

export const useCreateInvestmentFocusApi = () => {
  const { mutate, data, isPending, isSuccess } = useMutation({
    mutationFn: createInvestmentFocusApi,
  });

  return {
    createInvestmentFocus: mutate,
    data,
    isPending,
    isSuccess,
  };
};
