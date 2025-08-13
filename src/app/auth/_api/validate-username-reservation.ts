import { api } from "@/lib/api";
import { API_ROUTES } from "@/lib/routes";
import { useMutation } from "@tanstack/react-query";

type Response_ValidateUsernameReservation = {
  username: string;
  reservationToken: string;
  isNew: boolean;
};

const validateUsernameReservationApi = async ({
  username,
  reservationToken,
}: {
  username: string;
  reservationToken: string;
}) => {
  return await api.jsend<Response_ValidateUsernameReservation>(
    API_ROUTES.VALIDATE_USERNAME_RESERVATION,
    "POST",
    {
      json: { username, reservationToken },
    }
  );
};

export const useValidateUsernameReservationApi = () => {
  const { mutate, data, isPending, isSuccess } = useMutation({
    mutationFn: validateUsernameReservationApi,
  });

  return {
    validateUsernameReservation: mutate,
    data,
    isPending,
    isSuccess,
  };
};
