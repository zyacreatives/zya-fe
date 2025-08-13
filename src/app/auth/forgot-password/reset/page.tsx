"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useResetPassword } from "../../_form/reset-password";
import { Input } from "@/components/ui/input";
import { InfoCircle } from "@untitledui/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

function ResetPasswordForm() {
  const { form, onSubmit } = useResetPassword();
  
  return (
    <div className="max-w-md mx-auto mt-32">
      <h2 className="text-center">Create a new password</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="my-12">
                <FormLabel>Enter new password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    variant="password"
                    placeholder="••••••••"
                  />
                </FormControl>
                <FormMessage />
                {form.formState.errors.password ? (
                  <></>
                ) : (
                  <p className="flex text-xs gap-1 font-medium -mt-1 items-center">
                    <InfoCircle className="fill-neutral-300 stroke-white w-5" />
                    Ensure your password is at least 8 characters
                  </p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="my-12">
                <FormLabel>Confirm new password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    variant="password"
                    placeholder="••••••••"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant={"groove"}
            className="w-full p-6 mt-6 text-base rounded-full"
          >
            Create a new password
          </Button>
          <Link
            href={""}
            className="underline block w-fit mx-auto  underline-offset-1 text-neutral-400 mt-8"
          >
            Back to Account login →
          </Link>
        </form>
      </Form>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
