"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useUserStore } from "@/src/app/store/user.store";
import { Button } from "@/components/ui/button";
import { API_ROUTES, ROUTES } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";

export const Register_EmailVerification = () => {
  const email = useUserStore((s) => s.user?.email ?? "");
  const router = useRouter();

  useEffect(() => {
    auth.sendVerificationEmail({
      email,
      callbackURL: `/api/v1/${API_ROUTES.REDIRECT_VERIFIED_EMAIL}`,
    });
  }, []);

  return (
    <div className="text-center">
      <div className="flex flex-col max-w-lg mx-auto gap-6">
        <h2 className=" mx-auto font-medium mt-32">
          We sent a confirmation mail to{" "}
          <span className="text-secondary">{email}</span>
        </h2>
        <Link
          href={"https://mail.google.com/mail/u/0/#inbox"}
          className="border-none w-1/2 lg:w-11/12 mx-auto justify-center  mt-4 flex flex-1 group text-center rounded-full py-4 font-sans tracking-tight bg-[#9273E0] text-white border border-white/25 shadow-[0_1px_0_0_rgba(0,0,0,0.05),inset_0_-3px_0_0_rgba(0,0,0,0.05),inset_0_-2px_1px_0_rgba(0,0,0,0.1804)] hover:bg-[#9273E0]/90 active:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)] hover:shadow-none transition-all duration-150"
        >
          Open Mailbox
        </Link>
      </div>
      <Button
        variant={"link"}
        // disabled={isPending}
        className="mx-auto"
        onClick={() => {
          router.push(ROUTES.CREATIVE_PROFILE_DETAILS);
          auth.sendVerificationEmail({
            email,
            callbackURL: `/api/v1/${API_ROUTES.REDIRECT_VERIFIED_EMAIL}`,
          });
        }}
      >
        Resend Confirmation Link
      </Button>
    </div>
  );
};
