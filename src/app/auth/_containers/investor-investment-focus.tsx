import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useInvestmentFocus } from "../_form/investment-focus";
import {
  GeographicFocusEnum,
  InvestmentSizeEnum,
  InvestorTypeEnum,
} from "@/api-types";
import { useGetCreativeDisciplinesApi } from "../_api/get-creative-disciplines";
import { MultiSelectCommand } from "../_components/multi-select-command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InfoCircle } from "@untitledui/icons";
import { InvestorProfileCompletionDialog } from "../_components/investor-profile-completion-dialog";

export function Onboarding_InvestorInvestmentFocus() {
  const { form, onSubmit, isSuccess } = useInvestmentFocus();
  const { disciplines, cachedDisciplines } = useGetCreativeDisciplinesApi();
  const disciplineOptions = Array.isArray(cachedDisciplines)
    ? cachedDisciplines
    : Array.isArray(disciplines)
    ? disciplines
    : [];
  return (
    <div className="max-w-md mx-auto mt-16">
      <InvestorProfileCompletionDialog isSuccess={isSuccess} />
      <h2 className="text-center  tracking-tight mb-11">
        <span className="text-secondary">Tell us how you invest </span> so we
        can tailor your focus
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 lg:space-y-8 max-w-md"
        >
          <FormField
            control={form.control}
            name="investorType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  What type of Investor are you?
                  <Popover>
                    <PopoverTrigger>
                      {" "}
                      <InfoCircle className="fill-neutral-300 stroke-white w-5" />
                    </PopoverTrigger>
                    <PopoverContent
                      side="top"
                      className="p-1 text-neutral-500 text-xs border border-slate-200 text-center"
                    >
                      Your selection helps us tailor your verification
                    </PopoverContent>
                  </Popover>
                </FormLabel>
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
                    {Object.values(InvestorTypeEnum).map((type) => (
                      <SelectItem value={type} key={type}>
                        {type}
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
            name="disciplineSlugs"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-between ">
                  What creative areas are you focusing on right now?
                  <span className="text-slate-400">
                    {field?.value?.length ?? 0}/5
                  </span>
                </FormLabel>
                <FormControl>
                  <MultiSelectCommand
                    field={field}
                    options={disciplineOptions}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="investmentSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What's your investment size?</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="$5k - $25k" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(InvestmentSizeEnum).map((type) => (
                      <SelectItem value={type} key={type}>
                        {type}
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
            name="geographicFocus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Where is your geographical focus?</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Africa, UK..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(GeographicFocusEnum).map((type) => (
                      <SelectItem value={type} key={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-4 w-full pt-4">
            <Button variant={"groove"} className="p-6">
              Complete Setup
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
