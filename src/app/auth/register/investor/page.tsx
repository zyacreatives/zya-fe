"use client";
export const dynamic = "force-dynamic";
import { useSearchParams } from "next/navigation";
import { Onboarding_InvestorProfile } from "../../_containers/investor-profile";
import { ONBOARDING_PAGES } from "@/lib/routes";
import { Onboarding_InvestorInvestmentFocus } from "../../_containers/investor-investment-focus";
import { Suspense } from "react";

// Wrap each container component individually in case they also use useSearchParams
function InvestorProfileWrapper() {
  return (
    <Suspense fallback={<div>Loading investor profile...</div>}>
      <Onboarding_InvestorProfile />
    </Suspense>
  );
}

function InvestorInvestmentFocusWrapper() {
  return (
    <Suspense fallback={<div>Loading investment focus...</div>}>
      <Onboarding_InvestorInvestmentFocus />
    </Suspense>
  );
}

function InvestorProfileContent() {
  const searchParams = useSearchParams();
  const page = searchParams.get("onboarding_page") ?? "";

  return (
    <div>
      {page === ONBOARDING_PAGES.INVESTOR_PROFILE_DETAILS ? (
        <InvestorProfileWrapper />
      ) : (
        <></>
      )}
      {page === ONBOARDING_PAGES.INVESTOR_INVESTMENT_FOCUS ? (
        <InvestorInvestmentFocusWrapper />
      ) : (
        <></>
      )}
    </div>
  );
}

export default function Register_InvestorProfile() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InvestorProfileContent />
    </Suspense>
  );
}
