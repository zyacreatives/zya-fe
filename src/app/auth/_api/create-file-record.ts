import { api } from "@/lib/api";
import { CreateFileDto } from "../_schema";
import { API_ROUTES } from "@/lib/routes";
import { useMutation } from "@tanstack/react-query";
import { FileContentType, FileStatus, FileVisibility } from "@/api-types";

type Response_CreateFileRecord = {
  file: {
    id: string;
    userId: string;
    key: string;
    bucket: string;
    url: string;
    contentType: FileContentType;
    mimeType: string;
    visibility: FileVisibility;
    status: FileStatus;
    expiresAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
  };
};

const createFileRecordApi = async (file: CreateFileDto) => {
  return await api.jsend<Response_CreateFileRecord>(
    API_ROUTES.CREATE_FILE_RECORD,
    "POST",
    { json: { file } }
  );
};

export const useCreateFileRecordApi = () => {
  const { mutate, data, isPending, isSuccess } = useMutation({
    mutationFn: createFileRecordApi,
  });

  return {
    createFileRecord: mutate,
    data,
    isPending,
    isSuccess,
  };
};
