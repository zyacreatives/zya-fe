import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useUpdateProfileDisciplineTags } from "../_form/customize-feed";
import { MultiSelectCommand } from "../_components/multi-select-command";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useOnboardingDisciplineStore } from "../../store/onboarding-disciplines.store";
import { useGetCreativeDisciplinesWithTagsApi } from "../_api/get-creative-disciplines";

export function Onboarding_BrandCustomizeFeed() {
  const { onboardingDisciplines } = useOnboardingDisciplineStore();
  const { disciplines } = useGetCreativeDisciplinesWithTagsApi({
    slugs: onboardingDisciplines.join(",").trim(),
  });
  const { form, onSubmit } = useUpdateProfileDisciplineTags(
    onboardingDisciplines,
    "brand"
  );
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-11">
        <span className="text-secondary">Let's start simple, </span> choose
        creative tags to help us get your feed right.
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 pb-12"
        >
          {disciplines &&
            disciplines.map((discipline) => {
              return (
                <FormField
                  key={discipline.slug}
                  control={form.control}
                  name={`${discipline.slug}-tags`}
                  render={({ field }) => (
                    <FormItem>
                      <FormItem>
                        <FormLabel className="flex justify-between ">
                          {discipline.name ?? ""}
                          <span className="text-slate-400">
                            {field?.value?.length ?? 0}/5
                          </span>
                        </FormLabel>
                        <FormControl>
                          <MultiSelectCommand
                            field={field}
                            options={discipline.tags ?? []}
                          />
                        </FormControl>
                      </FormItem>
                    </FormItem>
                  )}
                />
              );
            })}
          <div className="flex mt-12 items-center gap-4 w-full">
            <Button
              variant={"groove"}
              className="border-none flex-1 rounded-full py-6 flex items-center gap-1 hover:translate-y-[1px]"
            >
              Proceed to Add Projects <ArrowRight size={3} />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
