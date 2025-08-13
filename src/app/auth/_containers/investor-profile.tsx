import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSubmitProfile } from "../_form/submit-profile";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/lib/countries";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ProfilePicUploader } from "../_components/profile-pic-uploader";
import { Input } from "@/components/ui/input";
import { useUserStore } from "../../store/user.store";

export function Onboarding_InvestorProfile() {
  const { form, onSubmit } = useSubmitProfile("investor");
  const experienceLevels = ["0-1 year", "1-3 years", "3-5 years", "5+ years"];
  const user = useUserStore((u) => u.user);
  console.log(form.formState.errors);
  return (
    <div className="max-w-md mx-auto w-[95%]">
      <h2 className="text-center mb-11">
        <span className="text-secondary">@{user?.username ?? ""} </span> A quick
        intro to help you stand out
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="file"
            render={() => (
              <FormItem>
                <ProfilePicUploader form={form} />
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="investor.bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-between ">
                  Add a Bio
                  <span className="text-slate-400">
                    {field?.value?.length ?? 0}/200
                  </span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="min-h-28 resize-none"
                    placeholder="Write a brief intro others will see on your profile"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="investor.websiteURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-between ">
                  Website Link (Personal or Funding)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    variant="link"
                    placeholder="www.zyacreatives.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="investor.experienceLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select.." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {experienceLevels.map((exp) => (
                        <SelectItem value={exp} key={exp}>
                          {exp}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="investor.location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select.." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem value={country.slug} key={country.slug}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex mt-12 items-center gap-4 w-full">
            <Button
              variant={"groove"}
              className="border-none flex-1 rounded-full py-6 flex items-center gap-1 hover:translate-y-[1px] font-semibold"
            >
              Proceed To Investment Focus <ArrowRight size={3} />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
