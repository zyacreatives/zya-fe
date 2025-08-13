import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useReserveUsernameApi } from "../_api/reserve-username";
import { APIError } from "@/lib/api";
import { useUsernameReservationStore } from "@/src/app/store/username-reservation.store";
import { useState } from "react";
import { ReserveUsernameDto, reserveUsernameSchema } from "../_schema";

export const useReserveUsername = () => {
  const [usernameStillAvailable, setUsernameStillAvailable] = useState(false);
  const { reserveUsername, isSuccess, reset } = useReserveUsernameApi();
  const { setReservation, reservation } = useUsernameReservationStore();

  const form = useForm<ReserveUsernameDto>({
    resolver: zodResolver(reserveUsernameSchema),
    defaultValues: {
      username: "",
    },
  });

  const isActive = (expiresAt: string | Date) => {
    return new Date(expiresAt).getTime() > Date.now();
  };

  const onSubmit = ({ username }: ReserveUsernameDto) => {
    if (
      reservation &&
      reservation.username === username &&
      reservation.expiresAt &&
      isActive(reservation.expiresAt)
    ) {
      setUsernameStillAvailable(true);
      return;
    }

    reserveUsername(
      { username },
      {
        onSuccess: (data) => {
          setReservation({
            username: data.username,
            reservationToken: data.reservationToken,
            expiresAt: data.expiresAt,
          });
          if (data.isNew) {
            form.reset();
          }
          setUsernameStillAvailable(true);
        },
        onError: (error) => {
          if (error instanceof APIError) {
            form.setError("username", {
              type: "manual",
              message: error.message || "Failed to reserve username",
            });
          }
        },
      }
    );
  };

  const resetReservationStatus = () => {
    reset();
    setUsernameStillAvailable(false);
  };

  return {
    form,
    isSuccess,
    usernameStillAvailable,
    resetReservationStatus,
    onSubmit,
  };
};
