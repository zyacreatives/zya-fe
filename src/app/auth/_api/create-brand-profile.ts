import { api } from "@/lib/api";
import { SubmitBrandProfileToApiDto, SubmitCreativeProfileToApiDto } from "../_schema";
import { API_ROUTES } from "@/lib/routes";
import { useMutation } from "@tanstack/react-query";

const createBrandProfileApi = async (data: SubmitBrandProfileToApiDto) => {
  return await api.jsend(API_ROUTES.CREATE_BRAND_PROFILE, "POST", {
    json: data,
  });
};

export const useCreateBrandProfileApi = () => {
  const { mutate, data, isPending, isSuccess } = useMutation({
    mutationFn: createBrandProfileApi,
  });

  return {
    createBrandProfile: mutate,
    data,
    isPending,
    isSuccess,
  };
};
