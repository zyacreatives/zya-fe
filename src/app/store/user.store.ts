import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type User = {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  role?: string | null;
  displayUsername?: string | null;
  username?: string | null;
  onboardingPage?: string | null;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type Store = {
  user: User | null;
  token: string | null;
  resetEmail: string | null;
  setResetEmail: (e: string) => void;
  setUser: (user: User) => void;
  clearUser: () => void;
  setToken: (token: string) => void;
  updateToken: (updater: (prev: string | null) => string) => void;
  clearToken: () => void;
};

export const useUserStore = create<Store>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      resetEmail: null,
      setResetEmail: (resetEmail) => set({ resetEmail }),
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      setToken: (token) => set({ token }),
      updateToken: (updater) => set({ token: updater(get().token) }),
      clearToken: () => set({ token: null }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
