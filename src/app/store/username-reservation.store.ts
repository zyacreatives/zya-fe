import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Reservation = {
  username: string;
  reservationToken: string;
  expiresAt: Date;
};

type Store = {
  reservation: Reservation | null;
  setReservation: (reservation: Reservation) => void;
  clearReservation: () => void;
};

export const useUsernameReservationStore = create<Store>()(
  persist(
    (set) => ({
      reservation: null,
      setReservation: (reservation) => set({ reservation }),
      clearReservation: () => set({ reservation: null }),
    }),
    {
      name: "username-reservation",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
