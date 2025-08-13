import { useForm } from "react-hook-form";
import {
  SubmitInvestorInvestmentFocusDto,
  submitInvestorInvestmentFocusSchema,
} from "../_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useCreateInvestmentFocusApi } from "../_api/create-investor-investment-focus";
import { auth } from "@/lib/auth";
import { ONBOARDING_PAGES } from "@/lib/routes";
import { toast } from "sonner";

export const useInvestmentFocus = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { createInvestmentFocus } = useCreateInvestmentFocusApi();
  const form = useForm<SubmitInvestorInvestmentFocusDto>({
    resolver: zodResolver(submitInvestorInvestmentFocusSchema),
    defaultValues: {
      disciplineSlugs: [],
    },
  });

  const onSubmit = async (values: SubmitInvestorInvestmentFocusDto) => {
    createInvestmentFocus(values, {
      onSuccess: () => {
        auth.updateUser({
          onboardingPage: ONBOARDING_PAGES.DONE,
        });
        setIsSuccess(true);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return { form, onSubmit, isSuccess };
};
