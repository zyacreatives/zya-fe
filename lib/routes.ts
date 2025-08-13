export const ROUTES = {
  HOME: "/",
  FEED: "/feed",
  ACCOUNT_CREATION_TYPE: "/auth",
  LOGIN: "/auth/login",
  PASSWORD_RESET_EMAIL_FORM: "/auth/forgot-password",
  PASSWORD_RESET_EMAIL_CONFIRMATION: "/auth/forgot-password/email",
  PASSWORD_RESET: "/auth/forgot-password/reset",
  PERSONAL_INFO: "/auth/register?onboarding_page=PERSONAL_INFO",
  ACCOUNT_TYPE_SELECTION:
    "/auth/register?onboarding_page=ACCOUNT_TYPE_SELECTION",
  EMAIL_VERIFICATION: "/auth/register?onboarding_page=EMAIL_VERIFICATION",
  CREATIVE_PROFILE_DETAILS:
    "/auth/register/creative?onboarding_page=CREATIVE_PROFILE_DETAILS",
  CREATIVE_PROFILE_CUSTOMIZE_FEED:
    "/auth/register/creative?onboarding_page=CREATIVE_PROFILE_CUSTOMIZE_FEED",
  CREATIVE_PROFILE_PORTFOLIO:
    "/auth/register/creative?onboarding_page=CREATIVE_PROFILE_PORTFOLIO",
  BRAND_PROFILE_DETAILS:
    "/auth/register/brand?onboarding_page=BRAND_PROFILE_DETAILS",
  BRAND_PROFILE_CUSTOMIZE_FEED:
    "/auth/register/brand?onboarding_page=BRAND_PROFILE_CUSTOMIZE_FEED",
  BRAND_PROFILE_PORTFOLIO:
    "/auth/register/brand?onboarding_page=BRAND_PROFILE_PORTFOLIO",
  INVESTOR_PROFILE_DETAILS:
    "/auth/register/investor?onboarding_page=INVESTOR_PROFILE_DETAILS",
  INVESTOR_INVESTMENT_FOCUS:
    "/auth/register/investor?onboarding_page=INVESTOR_INVESTMENT_FOCUS",
  INVESTOR_VERIFICATION:
    "/auth/register/investor?onboarding_page=INVESTOR_VERIFICATION",
} as const;

export const ONBOARDING_PAGES = {
  PERSONAL_INFO: "PERSONAL_INFO",
  ACCOUNT_TYPE_SELECTION: "ACCOUNT_TYPE_SELECTION",
  CREATIVE_PROFILE_DETAILS: "CREATIVE_PROFILE_DETAILS",
  CREATIVE_PROFILE_CUSTOMIZE_FEED: "CREATIVE_PROFILE_CUSTOMIZE_FEED",
  CREATIVE_PROFILE_PORTFOLIO: "CREATIVE_PROFILE_PORTFOLIO",
  BRAND_PROFILE_DETAILS: "BRAND_PROFILE_DETAILS",
  BRAND_PROFILE_CUSTOMIZE_FEED: "BRAND_PROFILE_CUSTOMIZE_FEED",
  BRAND_PROFILE_PORTFOLIO: "BRAND_PROFILE_PORTFOLIO",
  EMAIL_VERIFICATION: "EMAIL_VERIFICATION",
  INVESTOR_PROFILE_DETAILS: "INVESTOR_PROFILE_DETAILS",
  INVESTOR_INVESTMENT_FOCUS: "INVESTOR_INVESTMENT_FOCUS",
  DONE: "DONE",
  INVESTOR_VERIFICATION: "INVESTOR_VERIFICATION",
} as const;

/* KY automatically puts a forward slash at the 
beginning of endpoint routes, hence the lack
thereof here */
export const API_ROUTES = {
  REGISTER_WITH_EMAIL_AND_PASSWORD: "auth/sign-up/email",
  RESERVE_USERNAME: "usernames/reserve",
  CLAIM_USERNAME: "usernames/claim",
  CHOOSE_USERNAME: "users/choose-username",
  REDIRECT_VERIFIED_EMAIL: "users/redirect-verified-email",
  GET_CREATIVE_DISCIPLINES: "disciplines",
  GET_MULTIPLE_DISCIPLINES: "disciplines/multiple",
  VALIDATE_USERNAME_RESERVATION: "users/validate-username-reservation",
  CREATE_CREATIVE_PROFILE: "creatives",
  CREATE_BRAND_PROFILE: "brands",
  CREATE_INVESTOR_PROFILE: "investors",
  CREATE_INVESTMENT_FOCUS: "investors/investment-focus",
  DELETE_RESERVED_USERNAME: "users/delete-reserved-username",
  UPDATE_USER_ROLE: (id: string) => `users/${id}/role`,
  GET_CREATIVE_DISCIPLINES_WITH_TAGS: (slugs: string) =>
    `disciplines?withTags=true&slugs=${slugs}`,
  UPDATE_USER_ONBOARDING_PAGE: (id: string) => `users/${id}/onboarding-page`,
  SEND_VERIFICATION_EMAIL: "auth/send-verification-email",
  GET_PRESIGNED_UPLOAD_URL: "files/get-upload-url",
  REDIRECT_TO_FORGOT_PASSWORD_PAGE: "/users/password-reset-page-redirect",
  CREATE_FILE_RECORD: "files",
  UPDATE_CREATIVE_PROFILE_TAGS: "creatives/me/update-tags",
  UPDATE_BRAND_PROFILE_TAGS: "brands/me/update-tags",
  CREATE_PROJECT: "projects",
} as const;
