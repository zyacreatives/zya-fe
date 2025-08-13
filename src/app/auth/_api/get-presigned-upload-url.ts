import { api } from "@/lib/api";
import { API_ROUTES } from "@/lib/routes";
import { PresignedUploadUrlDto } from "../_schema";
import { useMutation } from "@tanstack/react-query";
import { GetPresignedUploadUrlEndpointData } from "@/api-types/file.types";

const getPresignedUploadUrlApi = async ({
  contentType,
  key,
}: PresignedUploadUrlDto) => {
  return await api.jsend<GetPresignedUploadUrlEndpointData>(
    API_ROUTES.GET_PRESIGNED_UPLOAD_URL,
    "PUT",
    {
      json: { contentType, key },
    }
  );
};

export const useGetPresignedUploadUrlApi = () => {
  const { mutateAsync, data, isPending, isSuccess } = useMutation({
    mutationFn: getPresignedUploadUrlApi,
  });

  return {
    getPresignedUploadUrl: mutateAsync,
    data,
    isPending,
    isSuccess,
  };
};
