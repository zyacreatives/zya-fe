import { api } from "@/lib/api";
import { API_ROUTES } from "@/lib/routes";
import { useMutation } from "@tanstack/react-query";

type Response_SendVerificationEmail = {
  status: boolean;
};
const sendVerificationEmailApi = async ({
  email,
  callbackUrl,
}: {
  email: string;
  callbackUrl: string;
}) => {
  return await api.auth<Response_SendVerificationEmail>(
    API_ROUTES.SEND_VERIFICATION_EMAIL,
    "POST",
    { json: { email, callbackUrl } }
  );
};

export const useSendVerificationEmail = () => {
  const {
    mutate: sendVerificationEmail,
    data,
    isPending,
    isSuccess,
  } = useMutation({ mutationFn: sendVerificationEmailApi });

  return { sendVerificationEmail, data, isPending, isSuccess };
};
