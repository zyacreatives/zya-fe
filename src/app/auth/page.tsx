"use client";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import Link from "next/link";
import { useUsernameReservationStore } from "../store/username-reservation.store";
import { auth } from "@/lib/auth";

export default function Register() {
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
    <div className="min-h-screen w-screen relative">
      <img
        src="/zaya-auth.jpg"
        className="absolute inset-0 opacity-10 -z-10 h-full"
        alt=""
      />
      <div className="max-w-md mx-auto flex flex-col text-center items-center justify-center">
        <div className="min-h-20">
          <img src="/profile-3d.svg" className="w-[100px] lg:w-[200px] mt-32" />
        </div>
        <h1 className="mt-8 lg:text-5xl text-3xl">
          <span className="text-secondary italic font-playfair font-semibold mr-1">
            @{reservation && reservation.username}
          </span>{" "}
          is yours 🎉
        </h1>
        <p className="text-slate-400 max-w-xs lg:max-w-full font-medium leading-tight  lg:text-[22px] lg:my-6 my-4 mb-8">
          Zya is your space to connect, create, and grow. Let’s make it yours.
        </p>
        <Link
          href={ROUTES.PERSONAL_INFO}
          className="inline-flex gap-2 bg-primary mb-4 w-11/12 mx-auto lg:w-full items-center tracking-tight justify-center py-4 text-white font-normal text-sm lg:text-base rounded-full"
        >
          <img src="/sms.svg" alt="" />
          Continue with Email
        </Link>
        <Button
          className="inline-flex gap-2 hover:bg-secondary bg-secondary w-11/12 mx-auto lg:w-full items-center tracking-tight justify-center py-7 text-white font-normal text-sm lg:text-base rounded-full"
          onClick={() => signInWithGoogle()}
        >
          <img src="/google.svg" alt="" />
          Continue with Google
        </Button>
        <p className="text-slate-400 text-center tracking-tight max-w-xs md:max-w-full text-sm mt-6">
          By continuing, you agree to our{" "}
          <span className="text-primary underline underline-offset-2">
            Terms
          </span>{" "}
          and{" "}
          <span className="text-primary underline underline-offset-2">
            Privacy Policy.
          </span>
        </p>
      </div>
    </div>
  );
}
