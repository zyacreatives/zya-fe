import { ONBOARDING_PAGES } from "@/lib/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, UseFormReturn } from "react-hook-form";
import {
  SubmitBrandProfileDto,
  submitBrandProfileSchema,
  SubmitCreativeProfileDto,
  submitCreativeProfileSchema,
  SubmitInvestorProfileDto,
  submitInvestorProfileSchema,
} from "../_schema";
import { useGetPresignedUploadUrlApi } from "../_api/get-presigned-upload-url";
import { auth, getUserDetails } from "@/lib/auth";
import ky from "ky";
import { useCreateCreativeProfileApi } from "../_api/create-creative-profile";
import { convertToWebp } from "@/lib/convert-to-webp";
import { useCreateBrandProfileApi } from "../_api/create-brand-profile";
import { useOnboardingDisciplineStore } from "../../store/onboarding-disciplines.store";
import { useUserStore } from "../../store/user.store";
import { toast } from "sonner";
import { useState } from "react";
import { useCreateInvestorProfileApi } from "../_api/create-investor-profile";

type ProfileType = "creative" | "brand" | "investor";
type ProfileFormMap = {
  creative: {
    form: UseFormReturn<SubmitCreativeProfileDto>;
    onSubmit: (values: SubmitCreativeProfileDto) => void;
    isPending?: boolean;
  };
  brand: {
    form: UseFormReturn<SubmitBrandProfileDto>;
    onSubmit: (values: SubmitBrandProfileDto) => void;
  };
  investor: {
    form: UseFormReturn<SubmitInvestorProfileDto>;
    onSubmit: (values: SubmitInvestorProfileDto) => void;
  };
};

export const useSubmitProfile = <T extends ProfileType>(
  profile: T
): ProfileFormMap[T] => {
  const searchParams = useSearchParams();
  const [isPending, setIsPending] = useState(false);
  const { getPresignedUploadUrl } = useGetPresignedUploadUrlApi();
  const { createBrandProfile } = useCreateBrandProfileApi();
  const { setOnboardingDisciplines } = useOnboardingDisciplineStore();
  const router = useRouter();
  const updatePage = (newPage: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("onboarding_page", newPage);
    router.push(`?${params.toString()}`);
  };
  if (profile === "creative") {
    const form = useForm<SubmitCreativeProfileDto>({
      resolver: zodResolver(submitCreativeProfileSchema) as any,
    });

    const user = useUserStore((u) => u.user);
    const setUser = useUserStore((u) => u.setUser);

    const { getPresignedUploadUrl } = useGetPresignedUploadUrlApi();
    const { createCreativeProfile } = useCreateCreativeProfileApi();

    const onSubmit = async (values: SubmitCreativeProfileDto) => {
      setIsPending(true);
      if (!user) return;
      const key = `${user.id}/profile-picture`;
      try {
        console.log(values);
        const webPFile = await convertToWebp({ file: values.file._rawFile });
        console.log({ webPFile });
        const { url } = await getPresignedUploadUrl({
          contentType: "image/webp",
          key,
          isPublic: true,
        });
        console.log({ url });
        await ky.put(url, {
          headers: { "Content-Type": "image/webp" },
          body: webPFile,
          timeout: false,
        });

        const { _rawFile, ...fileMeta } = values.file;
        await createCreativeProfile({
          creative: values.creative,
          file: { ...fileMeta, key },
        });

        const nextPage = ONBOARDING_PAGES.CREATIVE_PROFILE_CUSTOMIZE_FEED;
        await auth.updateUser({ onboardingPage: nextPage });
        if (user) {
          setUser({ ...user, onboardingPage: nextPage });
        }
        setOnboardingDisciplines(values.creative.disciplineSlugs);
        updatePage(nextPage);
      } catch (error: any) {
        setIsPending(false);
        toast.error(error.message);
      }
    };

    return { form, onSubmit, isPending } as unknown as ProfileFormMap[T];
  }

  if (profile === "brand") {
    const form = useForm<SubmitBrandProfileDto>({
      resolver: zodResolver(submitBrandProfileSchema) as any,
    });
    const onSubmit = async (values: SubmitBrandProfileDto) => {
      const user = await getUserDetails();
      const key = `${user?.id}/brand-logo`;
      const webPFile = await convertToWebp({ file: values.file._rawFile });
      getPresignedUploadUrl(
        {
          contentType: "image/webp",
          key,
          isPublic: true,
        },
        {
          onSuccess: async (data) => {
            await ky
              .put(data.url, {
                headers: { "Content-Type": "image/webp" },
                body: webPFile,
              })
              .then(() => {
                const { _rawFile, ...file } = values.file;
                createBrandProfile(
                  {
                    brand: values.brand,
                    file: { ...file, key },
                  },
                  {
                    onSuccess: async () => {
                      await auth
                        .updateUser({
                          onboardingPage:
                            ONBOARDING_PAGES.BRAND_PROFILE_CUSTOMIZE_FEED,
                        } as any)
                        .then(() => {
                          setOnboardingDisciplines(
                            values.brand.disciplineSlugs
                          );
                          updatePage(
                            ONBOARDING_PAGES.BRAND_PROFILE_CUSTOMIZE_FEED
                          );
                        });
                    },
                  }
                );
              });
          },
        }
      );
    };
    return { form, onSubmit } as unknown as ProfileFormMap[T];
  }

  if (profile === "investor") {
    const user = useUserStore((u) => u.user);
    const setUser = useUserStore((u) => u.setUser);

    const { getPresignedUploadUrl } = useGetPresignedUploadUrlApi();
    const { createInvestorProfile } = useCreateInvestorProfileApi();
    const form = useForm<SubmitInvestorProfileDto>({
      resolver: zodResolver(submitInvestorProfileSchema) as any,
      defaultValues: {
        investor: {
          bio: "",
          websiteURL: "",
          location: "",
        },
      },
    });
    const onSubmit = async (values: SubmitInvestorProfileDto) => {
      setIsPending(true);
      if (!user) return;
      const key = `${user.id}/profile-picture`;
      try {
        const webPFile = await convertToWebp({ file: values.file._rawFile });
        const { url } = await getPresignedUploadUrl({
          contentType: "image/webp",
          key,
          isPublic: true,
        });
        await ky.put(url, {
          headers: { "Content-Type": "image/webp" },
          body: webPFile,
          timeout: false,
        });

        const { _rawFile, ...fileMeta } = values.file;
        await createInvestorProfile({
          investor: values.investor,
          file: { ...fileMeta, key },
        });

        const nextPage = ONBOARDING_PAGES.INVESTOR_INVESTMENT_FOCUS;
        await auth.updateUser({ onboardingPage: nextPage });
        if (user) {
          setUser({ ...user, onboardingPage: nextPage });
        }
        updatePage(nextPage);
      } catch (error: any) {
        setIsPending(false);
        toast.error(error.message);
      }
    };

    return { form, onSubmit } as unknown as ProfileFormMap[T];
  }

  throw new Error("Invalid profile type");
};
