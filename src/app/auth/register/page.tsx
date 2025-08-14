"use client";
export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { Register_PersonalInfo } from "./../_containers/personal-info";
import { Register_AccountType } from "./../_containers/account-type";
import { ONBOARDING_PAGES } from "@/lib/routes";
import { Register_EmailVerification } from "./../_containers/email-verification";
import { Suspense } from "react";
export const runtime = "edge"
function PersonalInfoWrapper() {
  return (
    <Suspense fallback={<div>Loading personal info...</div>}>
      <Register_PersonalInfo />
    </Suspense>
  );
}

function AccountTypeWrapper() {
  return (
    <Suspense fallback={<div>Loading account selection...</div>}>
      <Register_AccountType />
    </Suspense>
  );
}

function EmailVerificationWrapper() {
  return (
    <Suspense fallback={<div>Loading email verification...</div>}>
      <Register_EmailVerification />
    </Suspense>
  );
}

function RegisterContent() {
  const searchParams = useSearchParams();
  const page =
    searchParams.get("onboarding_page") ?? ONBOARDING_PAGES.PERSONAL_INFO;

  return (
    <div className="w-full">
      <div className="w-fit mx-auto mt-12">
        {page === ONBOARDING_PAGES.PERSONAL_INFO && <PersonalInfoWrapper />}
        {page === ONBOARDING_PAGES.ACCOUNT_TYPE_SELECTION && (
          <AccountTypeWrapper />
        )}
        {page === ONBOARDING_PAGES.EMAIL_VERIFICATION && (
          <EmailVerificationWrapper />
        )}
      </div>
    </div>
  );
}

export default function Register() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterContent />
    </Suspense>
  );
}