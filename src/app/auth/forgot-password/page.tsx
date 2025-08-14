"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForgotPasswordEmail } from "../_form/forgot-password-email";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
export const runtime = "edge"
function ForgotPasswordForm() {
  const { form, onSubmit } = useForgotPasswordEmail();

  return (
    <div className="text-center max-w-md w-[90%] mx-auto mt-32">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h2>Enter the email associated with your account</h2>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="my-12">
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input placeholder="user@zya.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant={"groove"}
            className="w-full p-6 rounded-full"
          >
            Send Reset Instructions
          </Button>
          <Link
            href={""}
            className="underline block underline-offset-1 text-neutral-400 mt-12"
          >
            Back to Account login →
          </Link>
        </form>
      </Form>
    </div>
  );
}

export default function ForgotPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgotPasswordForm />
    </Suspense>
  );
}