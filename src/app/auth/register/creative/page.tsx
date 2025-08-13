"use client";
export const dynamic = "force-dynamic";
import { useSearchParams } from "next/navigation";
import { Onboarding_CreativeProfile } from "../../_containers/creative-profile";
import { Onboarding_CreativeCustomizeFeed } from "../../_containers/creative-feed";
import { Onboarding_CreativePortfolio } from "../../_containers/creative-projects";
import { ONBOARDING_PAGES } from "@/lib/routes";
import { Suspense } from "react";

// Wrap each container component individually in case they also use useSearchParams
function CreativeProfileWrapper() {
  return (
    <Suspense fallback={<div>Loading creative profile...</div>}>
      <Onboarding_CreativeProfile />
    </Suspense>
  );
}

function CreativeCustomizeFeedWrapper() {
  return (
    <Suspense fallback={<div>Loading feed customization...</div>}>
      <Onboarding_CreativeCustomizeFeed />
    </Suspense>
  );
}

function CreativePortfolioWrapper() {
  return (
    <Suspense fallback={<div>Loading creative portfolio...</div>}>
      <Onboarding_CreativePortfolio />
    </Suspense>
  );
}

function CreativeProfileContent() {
  const searchParams = useSearchParams();
  const page = searchParams.get("onboarding_page") ?? "";

  return (
    <div>
      {page === ONBOARDING_PAGES.CREATIVE_PROFILE_DETAILS ? (
        <CreativeProfileWrapper />
      ) : (
        <></>
      )}
      {page === ONBOARDING_PAGES.CREATIVE_PROFILE_CUSTOMIZE_FEED ? (
        <CreativeCustomizeFeedWrapper />
      ) : (
        <></>
      )}
      {page === ONBOARDING_PAGES.CREATIVE_PROFILE_PORTFOLIO ? (
        <CreativePortfolioWrapper />
      ) : (
        <></>
      )}
    </div>
  );
}

export default function Register_CreativeProfile() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreativeProfileContent />
    </Suspense>
  );
}
