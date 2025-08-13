import { api } from "@/lib/api";
import { SubmitProjectToApiDto } from "../_schema";
import { API_ROUTES } from "@/lib/routes";
import { useMutation } from "@tanstack/react-query";

export const createProjectApi = async (data: SubmitProjectToApiDto) => {
  return await api.jsend(API_ROUTES.CREATE_PROJECT, "POST", {
    json: data,
  });
};

export const useCreateProjectApi = () => {
  const { mutate, data, isPending, isSuccess } = useMutation({
    mutationFn: createProjectApi,
  });

  return {
    createProject: mutate,
    data,
    isPending,
    isSuccess,
  };
};
