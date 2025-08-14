"use client";
export const dynamic = "force-dynamic";
import { useSearchParams } from "next/navigation";
import { Onboarding_BrandProfile } from "../../_containers/brand-profile";
import { Onboarding_BrandCustomizeFeed } from "../../_containers/brand-feed";
import { Onboarding_BrandProjects } from "../../_containers/brand-projects";
import { ONBOARDING_PAGES } from "@/lib/routes";
import { Suspense } from "react";
export const runtime = "edge"
function BrandProfileWrapper() {
  return (
    <Suspense fallback={<div>Loading brand profile...</div>}>
      <Onboarding_BrandProfile />
    </Suspense>
  );
}

function BrandCustomizeFeedWrapper() {
  return (
    <Suspense fallback={<div>Loading feed customization...</div>}>
      <Onboarding_BrandCustomizeFeed />
    </Suspense>
  );
}

function BrandProjectsWrapper() {
  return (
    <Suspense fallback={<div>Loading brand projects...</div>}>
      <Onboarding_BrandProjects />
    </Suspense>
  );
}

function BrandProfileContent() {
  const searchParams = useSearchParams();
  const page = searchParams.get("onboarding_page") ?? "";

  return (
    <div>
      {page === ONBOARDING_PAGES.BRAND_PROFILE_DETAILS ? (
        <BrandProfileWrapper />
      ) : (
        <></>
      )}
      {page === ONBOARDING_PAGES.BRAND_PROFILE_CUSTOMIZE_FEED ? (
        <BrandCustomizeFeedWrapper />
      ) : (
        <></>
      )}
      {page === ONBOARDING_PAGES.BRAND_PROFILE_PORTFOLIO ? (
        <BrandProjectsWrapper />
      ) : (
        <></>
      )}
    </div>
  );
}

export default function Register_BrandProfile() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrandProfileContent />
    </Suspense>
  );
}
