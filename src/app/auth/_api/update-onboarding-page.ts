import { api } from "@/lib/api";
import { API_ROUTES } from "@/lib/routes";
import { useMutation } from "@tanstack/react-query";

type Response_UpdateOnboardingPage = {
  success: boolean;
};
type OnboardingPage =
  | "ACCOUNT_TYPE_SELECTION"
  | "CREATIVE_PROFILE_DETAILS"
  | "CREATIVE_PROFILE_CUSTOMIZE_FEED"
  | "CREATIVE_PROFILE_PORTFOLIO"
  | "BRAND_PROFILE_DETAILS"
  | "BRAND_PROFILE_CUSTOMIZE_FEED"
  | "BRAND_PROFILE_PORTFOLIO"
  | "INVESTOR_PROFILE_DETAILS"
  | "INVESTOR_INVESTMENT_FOCUS"
  | "INVESTOR_VERIFICATION"
  | "DONE";

const updateOnboardingPageApi = async ({
  id,
  onboardingPage,
}: {
  id: string;
  onboardingPage: OnboardingPage;
}) => {
  return await api.jsend<Response_UpdateOnboardingPage>(
    API_ROUTES.UPDATE_USER_ONBOARDING_PAGE(id),
    "PATCH",
    { json: { onboardingPage } }
  );
};

export const useUpdateUserOnboardingPageApi = () => {
  const { mutate, data, isPending, isSuccess } = useMutation({
    mutationFn: updateOnboardingPageApi,
  });

  return {
    updateOnboardingPage: mutate,
    data,
    isPending,
    isSuccess,
  };
};
