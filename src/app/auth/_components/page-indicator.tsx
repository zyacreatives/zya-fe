"use client";
export const dynamic = "force-dynamic";
import { usePathname, useSearchParams } from "next/navigation";
import { BreadCrumb } from "./breadcrumb";
import { ONBOARDING_PAGES } from "@/lib/routes";

export const PageIndicator = () => {
  const searchParams = useSearchParams();
  const page =
    searchParams.get("onboarding_page") ?? ONBOARDING_PAGES.PERSONAL_INFO;
  const pathname = usePathname();
  const creativePages = (
    <>
      <BreadCrumb
        title="Creative Profile"
        active={page === ONBOARDING_PAGES.CREATIVE_PROFILE_DETAILS}
        completed={
          page !== ONBOARDING_PAGES.PERSONAL_INFO &&
          page !== ONBOARDING_PAGES.ACCOUNT_TYPE_SELECTION &&
          page !== ONBOARDING_PAGES.CREATIVE_PROFILE_DETAILS
        }
        no={3}
      />
      <BreadCrumb
        title="Customize Feed"
        active={page === ONBOARDING_PAGES.CREATIVE_PROFILE_CUSTOMIZE_FEED}
        completed={
          page !== ONBOARDING_PAGES.PERSONAL_INFO &&
          page !== ONBOARDING_PAGES.ACCOUNT_TYPE_SELECTION &&
          page !== ONBOARDING_PAGES.CREATIVE_PROFILE_DETAILS &&
          page !== ONBOARDING_PAGES.CREATIVE_PROFILE_CUSTOMIZE_FEED
        }
        no={4}
      />
      <BreadCrumb
        title="Portfolio"
        no={5}
        active={page === ONBOARDING_PAGES.CREATIVE_PROFILE_PORTFOLIO}
      />
    </>
  );
  const brandPages = (
    <>
      <BreadCrumb
        title="Brand Profile"
        active={page === ONBOARDING_PAGES.BRAND_PROFILE_DETAILS}
        completed={
          page !== ONBOARDING_PAGES.PERSONAL_INFO &&
          page !== ONBOARDING_PAGES.ACCOUNT_TYPE_SELECTION &&
          page !== ONBOARDING_PAGES.BRAND_PROFILE_DETAILS
        }
        no={3}
      />
      <BreadCrumb
        title="Customize Feed"
        active={page === ONBOARDING_PAGES.BRAND_PROFILE_CUSTOMIZE_FEED}
        completed={
          page !== ONBOARDING_PAGES.PERSONAL_INFO &&
          page !== ONBOARDING_PAGES.ACCOUNT_TYPE_SELECTION &&
          page !== ONBOARDING_PAGES.BRAND_PROFILE_DETAILS &&
          page !== ONBOARDING_PAGES.BRAND_PROFILE_CUSTOMIZE_FEED
        }
        no={4}
      />
      <BreadCrumb
        title="Portfolio"
        no={5}
        active={page === ONBOARDING_PAGES.BRAND_PROFILE_PORTFOLIO}
      />
    </>
  );
  const investorPages = (
    <>
      <BreadCrumb
        title="Investor Profile"
        active={page === ONBOARDING_PAGES.INVESTOR_PROFILE_DETAILS}
        completed={
          page !== ONBOARDING_PAGES.PERSONAL_INFO &&
          page !== ONBOARDING_PAGES.ACCOUNT_TYPE_SELECTION &&
          page !== ONBOARDING_PAGES.INVESTOR_PROFILE_DETAILS
        }
        no={3}
      />
      <BreadCrumb
        title="Investment Focus"
        active={page === ONBOARDING_PAGES.INVESTOR_INVESTMENT_FOCUS}
        completed={
          page !== ONBOARDING_PAGES.PERSONAL_INFO &&
          page !== ONBOARDING_PAGES.ACCOUNT_TYPE_SELECTION &&
          page !== ONBOARDING_PAGES.INVESTOR_PROFILE_DETAILS &&
          page !== ONBOARDING_PAGES.INVESTOR_INVESTMENT_FOCUS
        }
        no={4}
      />
      {/* <BreadCrumb
        title="Verification"
        active={page === ONBOARDING_PAGES.INVESTOR_VERIFICATION}
        no={5}
      /> */}
    </>
  );

  const handlePagesShown = () => {
    if (pathname === "/auth/register/brand") {
      return brandPages;
    }
    if (pathname === "/auth/register/investor") {
      return investorPages;
    }
    if (pathname === "/auth/register/creative") {
      return creativePages;
    }
    return <></>;
  };
  const isConfirmationPage = pathname.includes("/confirmation");
  if (page === ONBOARDING_PAGES.EMAIL_VERIFICATION) {
    return <></>;
  }
  if (pathname === "/auth/register/choose-username") {
    return null;
  }
  return (
    <div className="h-16 hidden lg:flex justify-center border-b">
      {isConfirmationPage ? (
        <></>
      ) : (
        <div className="flex gap-6  mx-auto w-fit">
          <BreadCrumb
            title="Personal Info"
            active={
              page === ONBOARDING_PAGES.PERSONAL_INFO &&
              pathname === "/auth/register"
            }
            completed={page != "personal_info"}
            no={1}
          />
          <BreadCrumb
            title="Account Type"
            active={
              page === ONBOARDING_PAGES.ACCOUNT_TYPE_SELECTION &&
              pathname === "/auth/register"
            }
            completed={
              page !== ONBOARDING_PAGES.ACCOUNT_TYPE_SELECTION &&
              page !== ONBOARDING_PAGES.PERSONAL_INFO
            }
            no={2}
          />
          {handlePagesShown()}
        </div>
      )}
    </div>
  );
};
