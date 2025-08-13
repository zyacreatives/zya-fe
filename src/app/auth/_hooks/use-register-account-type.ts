import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";
import { ROUTES } from "@/lib/routes";
import { toast } from "sonner";
import { useUserStore } from "../../store/user.store";

type UserProfile = "BRAND" | "CREATIVE" | "INVESTOR";

export function useRegisterAccountType() {
  const [chosenProfile, setChosenProfile] = useState<UserProfile | "">("");
  const router = useRouter();
  const setUser = useUserStore((s) => s.setUser);
  const getNextRoute = (profile: UserProfile) => {
    switch (profile) {
      case "BRAND":
        return ROUTES.BRAND_PROFILE_DETAILS;
      case "INVESTOR":
        return ROUTES.INVESTOR_PROFILE_DETAILS;
      case "CREATIVE":
      default:
        return ROUTES.CREATIVE_PROFILE_DETAILS;
    }
  };

  const handleCompleteProfile = async () => {
    if (!chosenProfile) return;
    const { error } = await auth.updateUser({
      role: chosenProfile,
      onboardingPage: `${chosenProfile}_PROFILE_DETAILS`,
    } as any);
    if (!error) {
      const { data } = await auth.getSession();
      if (data && data.user) setUser(data?.user);
      router.push(getNextRoute(chosenProfile));
    } else {
      toast.error(error.message);
    }
  };

  return {
    chosenProfile,
    setChosenProfile,
    handleCompleteProfile,
  };
}
