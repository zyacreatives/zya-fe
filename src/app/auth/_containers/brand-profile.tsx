import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useSubmitProfile } from "../_form/submit-profile";
import { MultiSelectCommand } from "../_components/multi-select-command";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ProfilePicUploader } from "../_components/profile-pic-uploader";
import { Input } from "@/components/ui/input";
import { useGetCreativeDisciplinesApi } from "../_api/get-creative-disciplines";

export function Onboarding_BrandProfile() {
  const { form, onSubmit } = useSubmitProfile("brand");
  const { disciplines, cachedDisciplines } = useGetCreativeDisciplinesApi();
  const disciplineOptions = Array.isArray(cachedDisciplines)
    ? cachedDisciplines
    : Array.isArray(disciplines)
    ? disciplines
    : [];

  return (
    <div className="max-w-md mx-auto w-[95%]">
      <h2 className="text-center mb-11">
        <span className="text-secondary">@daniel </span> Let's get to know your
        brand.
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="file"
            render={() => (
              <FormItem>
                <ProfilePicUploader
                  form={form}
                  label="Upload Brand Logo"
                  pfpSrc="/brand-pfp.svg"
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brand.brandName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-between ">
                  Brand Name
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Zya Brand" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brand.bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-between ">
                  About Your Brand
                  <span className="text-slate-400">
                    {field?.value?.length ?? 0}/200
                  </span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="min-h-28 resize-none"
                    placeholder="Tell the world what drives your brand creativity."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brand.disciplineSlugs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Choose Brand Fields</FormLabel>
                <MultiSelectCommand field={field} options={disciplineOptions} />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-4 mt-12 w-full">
            <img src="/auth-back.svg" className="w-12 h-12" />
            <Button
              variant={"groove"}
              className="border-none flex-1 rounded-full py-6 flex items-center gap-1 hover:translate-y-[1px] font-semibold"
            >
              Continue To Customize Feed <ArrowRight size={3} />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
