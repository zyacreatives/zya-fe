import { api } from "@/lib/api";
import { SubmitCreativeProfileToApiDto } from "../_schema";
import { CreateCreativeEndpointData } from "@/api-types/creative.types";
import { API_ROUTES } from "@/lib/routes";
import { useMutation } from "@tanstack/react-query";

const createCreativeProfileApi = async (
  data: SubmitCreativeProfileToApiDto
) => {
  return await api.jsend<CreateCreativeEndpointData>(
    API_ROUTES.CREATE_CREATIVE_PROFILE,
    "POST",
    { json: data }
  );
};

export const useCreateCreativeProfileApi = () => {
  const { mutateAsync, data, isPending, isSuccess } = useMutation({
    mutationFn: createCreativeProfileApi,
  });

  return {
    createCreativeProfile: mutateAsync,
    data,
    isPending,
    isSuccess,
  };
};
