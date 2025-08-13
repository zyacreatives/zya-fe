import { api } from "@/lib/api";
import { API_ROUTES } from "@/lib/routes";
import { useMutation } from "@tanstack/react-query";

const updateBrandTagsApi = async (data: { tags: string[] }) => {
  return await api.jsend(API_ROUTES.UPDATE_BRAND_PROFILE_TAGS, "PATCH", {
    json: data,
  });
};

export const useUpdateBrandTagsApi = () => {
  const { mutate, data, isPending, isSuccess } = useMutation({
    mutationFn: updateBrandTagsApi,
  });
  return {
    updateBrandTags: mutate,
    data,
    isPending,
    isSuccess,
  };
};
