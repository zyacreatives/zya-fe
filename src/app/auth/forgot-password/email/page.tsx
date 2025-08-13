"use client";
import { Suspense } from "react";
import { useUserStore } from "@/src/app/store/user.store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

function EmailSentContent() {
  const resetEmail = useUserStore((s) => s.resetEmail ?? "");
  const router = useRouter();

  //   useEffect(() => {
  //     auth.requestPasswordReset({
  //       email: resetEmail,
  //       //   callbackURL: `/api/v1/${API_ROUTES.REDIRECT_VERIFIED_EMAIL}`,
  //     });
  //   }, []);

  return (
    <div className="text-center">
      <div className="flex flex-col max-w-lg mx-auto gap-6">
        <h2 className=" mx-auto mt-32 font-semibold">
          We sent reset instructions to
          <span className="text-secondary block"> {resetEmail}.</span> Please
          check your mail.
        </h2>
        <Button
          type="submit"
          variant={"groove"}
          className="p-6 w-11/12 mx-auto my-5 rounded-full"
        >
          Resend Reset Link
        </Button>
        <Link
          href={""}
          className="underline block underline-offset-1 text-neutral-400 "
        >
          Back to Account login →
        </Link>
      </div>
    </div>
  );
}

export default function ForgotPassword_EmailSent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmailSentContent />
    </Suspense>
  );
}
