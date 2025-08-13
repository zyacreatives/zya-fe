import { ONBOARDING_PAGES } from "@/lib/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { updateProfileTagsSchema } from "../_schema";
import { useUpdateCreativeTagsApi } from "../_api/update-creative-tags";
import { auth } from "@/lib/auth";
import { useUpdateBrandTagsApi } from "../_api/update-brand-tags";

export const useUpdateProfileDisciplineTags = (
  disciplines: string[],
  profile: "brand" | "creative"
) => {
  const schema = updateProfileTagsSchema(disciplines);
  const searchParams = useSearchParams();
  const { updateCreativeTags } = useUpdateCreativeTagsApi();
  const { updateBrandTags } = useUpdateBrandTagsApi();
  const router = useRouter();
  const updatePage = (newPage: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("onboarding_page", newPage);
    router.push(`?${params.toString()}`);
  };
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  const onSubmit = (values: z.infer<typeof schema>) => {
    const tags = extractUniqueTags({ data: values });
    profile === "creative"
      ? updateCreativeTags(
          { tags },
          {
            onSuccess: async () => {
              await auth.updateUser({
                onboardingPage: "CREATIVE_PROFILE_PORTFOLIO",
              });
              updatePage(ONBOARDING_PAGES.CREATIVE_PROFILE_PORTFOLIO);
            },
          }
        )
      : updateBrandTags(
          { tags },
          {
            onSuccess: async () => {
              await auth.updateUser({
                onboardingPage: "BRAND_PROFILE_PORTFOLIO",
              });
              updatePage(ONBOARDING_PAGES.BRAND_PROFILE_PORTFOLIO);
            },
          }
        );
  };

  return { form, onSubmit };
};

const extractUniqueTags = ({
  data,
}: {
  data: Record<string, string[]>;
}): string[] => {
  const allTags = Object.values(data).flat();
  return Array.from(new Set(allTags));
};
