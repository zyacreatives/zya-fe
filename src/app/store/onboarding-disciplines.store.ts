import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Store = {
  onboardingDisciplines: string[];
  setOnboardingDisciplines: (d: string[]) => void;
  clearOnboardingDisciplines: () => void;
};

export const useOnboardingDisciplineStore = create<Store>()(
  persist(
    (set, get) => ({
      onboardingDisciplines: [],
      setOnboardingDisciplines: (d) => set({ onboardingDisciplines: d }),
      clearOnboardingDisciplines: () => set({ onboardingDisciplines: [] }),
    }),
    {
      name: "onboarding-discipline",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
