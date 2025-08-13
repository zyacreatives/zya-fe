export enum RoleEnum {
  CREATIVE = "CREATIVE",
  BRAND = "BRAND",
  INVESTOR = "INVESTOR",
  ADMIN = "ADMIN",
}

export enum UserStatusEnum {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  DELETED = "DELETED",
}

export enum ClientTypeEnum {
  CREATIVE = "CREATIVE",
  BRAND = "BRAND",
  NONE = "NONE",
}

export enum ExperienceLevelEnum {
  YEAR_0_1 = "0-1 year",
  YEAR_1_3 = "1-3 years",
  YEAR_3_5 = "3-5 years",
  YEAR_5_PLUS = "5+ years",
}

export enum OnboardingPageEnum {
  ACCOUNT_TYPE_SELECTION = "ACCOUNT_TYPE_SELECTION",
  CREATIVE_PROFILE_DETAILS = "CREATIVE_PROFILE_DETAILS",
  CREATIVE_PROFILE_CUSTOMIZE_FEED = "CREATIVE_PROFILE_CUSTOMIZE_FEED",
  CREATIVE_PROFILE_PORTFOLIO = "CREATIVE_PROFILE_PORTFOLIO",
  BRAND_PROFILE_DETAILS = "BRAND_PROFILE_DETAILS",
  BRAND_PROFILE_CUSTOMIZE_FEED = "BRAND_PROFILE_CUSTOMIZE_FEED",
  BRAND_PROFILE_PORTFOLIO = "BRAND_PROFILE_PORTFOLIO",
  INVESTOR_PROFILE_DETAILS = "INVESTOR_PROFILE_DETAILS",
  INVESTOR_INVESTMENT_FOCUS = "INVESTOR_INVESTMENT_FOCUS",
  INVESTOR_VERIFICATION = "INVESTOR_VERIFICATION",
  DONE = "DONE",
}

export enum FileVisibilityEnum {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}

export enum FileStatusEnum {
  AVAILABLE = "AVAILABLE",
  EXPIRED = "EXPIRED",
  NON_EXPIRING = "NON_EXPIRING",
}

export enum FileContentTypeEnum {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  DOCUMENT = "DOCUMENT",
  AUDIO = "AUDIO",
  OTHER = "OTHER",
}

export enum InvestorTypeEnum {
  ANGEL_INVESTOR = "Angel Investor",
  VENTURE_CAPITALIST = "Venture Capitalist",
  PRIVATE_EQUITY_FIRM = "Private Equity Firm",
  VENTURE_DEBT_PROVIDER = "Venture Debt Provider",
  BANK = "Bank",
  CONVERTIBLE_NOTE_INVESTOR = "Convertible Note Investor",
  REVENUE_BASED_FINANCING_INVESTOR = "Revenue Based Financing Investor",
  CORPORATE_VENTURE_CAPITALIST = "Corporate Venture Capitalist",
  GOVERNMENT = "Government",
  SOCIAL_IMPACT_INVESTOR = "Social Impact Investor"
}


export enum InvestmentSizeEnum {
  UNDER_5K = "Under 5k USD",
  BETWEEN_5K_25K = "5k - 25k USD",
  BETWEEN_25K_100K = "25k - 100k USD",
  BETWEEN_100K_500K = "100k - 500k USD",
  BETWEEN_500K_1M = "500k - 1M USD",
  OVER_1M = "1M+ USD",
}

export enum GeographicFocusEnum {
  AFRICA = "Africa",
  ASIA = "Asia",
  EUROPE = "Europe",
  NORTH_AMERICA = "North America",
  SOUTH_AMERICA = "South America",
  MIDDLE_EAST = "Middle East",
  OCEANIA = "Oceania",
  UK = "United Kingdom (UK)",
  US = "United States (US)",
  GLOBAL = "Global",
  OTHER = "Other",
}

export enum InvestorVerificationDocumentStatusEnum {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum InvestorVerificationDocumentTypeEnum {
  ID_PROOF = "ID_PROOF",
  BANK_STATEMENT = "BANK_STATEMENT",
  TAX_DOCUMENT = "TAX_DOCUMENT",
  BUSINESS_REGISTRATION = "BUSINESS_REGISTRATION",
  OTHER_CERTIFICATE = "OTHER_CERTIFICATE",
}

export type Role = (typeof RoleEnum)[keyof typeof RoleEnum];
export type UserStatus = (typeof UserStatusEnum)[keyof typeof UserStatusEnum];
export type ClientType = (typeof ClientTypeEnum)[keyof typeof ClientTypeEnum];
export type ExperienceLevel =
  (typeof ExperienceLevelEnum)[keyof typeof ExperienceLevelEnum];
export type OnboardingPage =
  (typeof OnboardingPageEnum)[keyof typeof OnboardingPageEnum];
export type FileVisibility =
  (typeof FileVisibilityEnum)[keyof typeof FileVisibilityEnum];
export type FileStatus = (typeof FileStatusEnum)[keyof typeof FileStatusEnum];

export type FileContentType =
  (typeof FileContentTypeEnum)[keyof typeof FileContentTypeEnum];
export type InvestorType =
  (typeof InvestorTypeEnum)[keyof typeof InvestorTypeEnum];
export type InvestmentSize =
  (typeof InvestmentSizeEnum)[keyof typeof InvestmentSizeEnum];
export type GeographicFocus =
  (typeof GeographicFocusEnum)[keyof typeof GeographicFocusEnum];
export type InvestorVerificationDocumentStatus =
  (typeof InvestorVerificationDocumentStatusEnum)[keyof typeof InvestorVerificationDocumentStatusEnum];
export type InvestorVerificationDocumentType =
  (typeof InvestorVerificationDocumentTypeEnum)[keyof typeof InvestorVerificationDocumentTypeEnum];
