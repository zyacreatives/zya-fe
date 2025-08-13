import { api } from "@/lib/api";
import { API_ROUTES } from "@/lib/routes";
import { useMutation } from "@tanstack/react-query";

type RegistrationProps = {
  name: string;
  email: string;
  password: string;
  username: string;
};

type Response_RegisterWithEmail = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    image: string | null;
    username: string | null;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
  };
};

const registerWithEmailApi = async (dto: RegistrationProps) => {
  return await api.auth<Response_RegisterWithEmail>(
    API_ROUTES.REGISTER_WITH_EMAIL_AND_PASSWORD,
    "POST",
    {
      json: dto,
    }
  );
};

export const useRegisterWithEmailApi = () => {
  const { mutate, data, isPending, isSuccess } = useMutation({
    mutationFn: registerWithEmailApi,
  });

  return {
    registerWithEmail: mutate,
    data,
    isPending,
    isSuccess,
  };
};
