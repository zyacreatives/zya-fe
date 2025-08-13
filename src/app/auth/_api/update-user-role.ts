import { api } from "@/lib/api";
import { API_ROUTES } from "@/lib/routes";
import { useMutation } from "@tanstack/react-query";

type Response_UpdateUserRole = {
  data: {
    role: string;
    id: string;
  };
};

const updateUserRoleApi = async ({
  id,
  role,
}: {
  id: string;
  role: string;
}) => {
  return await api.jsend<Response_UpdateUserRole>(
    API_ROUTES.UPDATE_USER_ROLE(id),
    "PATCH",
    {
      json: { role },
    }
  );
};

export const useUpdateUserRoleApi = () => {
  const { mutate, data, isPending, isSuccess } = useMutation({
    mutationFn: updateUserRoleApi,
  });

  return {
    updateUserRole: mutate,
    data,
    isPending,
    isSuccess,
  };
};
