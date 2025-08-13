import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useSubmitProject } from "../_form/submit-project";
import { MultiImageUploader } from "../_components/multi-image-uploader";
import { Input } from "@/components/ui/input";
import { MultiSelectCommand } from "../_components/multi-select-command";
import { creative_fields } from "@/lib/creative-fields";
import { ArrowRight, PenLineIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function Onboarding_BrandProjects() {
  const { form, onSubmit } = useSubmitProject("brand");

  return (
    <div className=" flex w-full justify-evenly pb-12 mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" w-full justify-evenly lg:flex gap-12"
        >
          <div className="lg:w-6/12">
            <FormField
              control={form.control}
              name="files"
              render={({ field }) => (
                <FormItem>
                  <MultiImageUploader
                    field={field}
                    error={form.getFieldState("files").error}
                  />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-6 lg:w-6/12">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter Project Title here"
                      variant="with-icon"
                      rightIcon={<PenLineIcon strokeWidth={1.3} size={20} />}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Who’s this project for?</FormLabel>
                  <FormControl>
                    <Input placeholder="Client name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tell us about this project</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-24 resize-none"
                      placeholder="Highlight description, key results of achievements"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Url</FormLabel>
                  <FormControl>
                    <Input
                      variant="link"
                      placeholder="www.zyacreatives.com"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between ">
                    Choose Tags
                    <span className="text-slate-400">
                      {field?.value?.length ?? 0}/5
                    </span>
                  </FormLabel>
                  <FormControl>
                    <MultiSelectCommand
                      field={field}
                      options={creative_fields}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 pb-6 gap-6">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between ">
                      Start Date
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="DD / MM / YYYY"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between ">
                      End Date
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="DD / MM / YYYY"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button
              variant={"groove"}
              className="border-none flex-1 w-full rounded-full py-6  flex items-center gap-1 hover:translate-y-[1px]"
            >
              Publsh Projects <ArrowRight size={3} />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
