"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLogin } from "../_form/login";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Mail01 } from "@untitledui/icons";
import { useUsernameReservationStore } from "../../store/username-reservation.store";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { Suspense } from "react";

function LoginForm() {
  const { form, onSubmit } = useLogin();
  const reservation =
    useUsernameReservationStore((state) => state.reservation) ?? "";

  const signInWithGoogle = async () => {
    await auth.signIn.social({
      provider: "google",
      callbackURL: `/api/v1/users/redirect-profile?username=${
        reservation ? reservation.username : ""
      }&reservationToken=${reservation ? reservation.reservationToken : ""}`,
      newUserCallbackURL: `/api/v1/users/redirect-new-profile?username=${
        reservation ? reservation.username : ""
      }&reservationToken=${reservation ? reservation.reservationToken : ""}`,
    });
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" max-w-md w-[90%] mx-auto "
        >
          <h2 className="pt-32 font-semibold tracking-normal text-center mb-12 lg:mb-16">
            Welcome Back to <span className="text-primary">Zya!</span>
          </h2>
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username or Email</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input variant="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <p className="font-normal text-neutral-500 text-sm">
                  Keep me logged in
                </p>
              </div>
              <Link
                href={ROUTES.FEED}
                className="text-sm text-primary hover:underline underline-offset-2"
              >
                Forgot password?
              </Link>
            </div>
            <Button variant="groove" className="w-full rounded-full py-6">
              <Mail01 /> Log In
            </Button>
          </div>
          <p className="py-2 my-1 text-center text-xs text-neutral-400">OR</p>
          <Button
            className="inline-flex gap-2 border-secondary border text-secondary bg-transparent mx-auto w-full items-center tracking-tight justify-center py-6 hover:text-white hover:bg-secondary font-medium  rounded-full"
            onClick={() => signInWithGoogle()}
          >
            Continue with Google
          </Button>
          <p className="text-[#99a0ae] text-center text-sm mt-6 max-w-xs mx-auto">
            By continuing, you agree to our{" "}
            <span className="text-primary underline underline-offset-4">
              Terms
            </span>{" "}
            and{" "}
            <span className="text-primary underline underline-offset-4">
              Privacy Policy.
            </span>
          </p>
        </form>
      </Form>
    </div>
  );
}

export default function Login() {
  return (
    <div className="min-h-screen w-screen relative">
      <img
        src="/zaya-auth.jpg"
        className="absolute inset-0 opacity-10 -z-10 h-full"
        alt=""
      />
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
