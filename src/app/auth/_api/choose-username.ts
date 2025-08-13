import { api } from "@/lib/api";
import { API_ROUTES } from "@/lib/routes";
import { useMutation } from "@tanstack/react-query";

type Response_ChooseUsername = {
  username: string;
};

const chooseUsernameApi = async ({ username }: { username: string }) => {
  return await api.jsend<Response_ChooseUsername>(
    API_ROUTES.CHOOSE_USERNAME,
    "POST",
    {
      json: { username },
    }
  );
};

export const useChooseUsernameApi = () => {
  const { mutate, data, isPending, isSuccess } = useMutation({
    mutationFn: chooseUsernameApi,
  });

  return {
    chooseUsername: mutate,
    data,
    isPending,
    isSuccess,
  };
};
