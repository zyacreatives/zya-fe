import z from "zod";
import {
  ClientTypeEnum,
  FileContentTypeEnum,
  FileStatusEnum,
  FileVisibilityEnum,
  GeographicFocusEnum,
  InvestmentSizeEnum,
  InvestorTypeEnum,
  RoleEnum,
} from "@/api-types";

// ========================================
// BASE SCHEMAS
// ========================================

export const baseFileSchema = z.object({
  key: z.string(),
  contentType: z.enum(FileContentTypeEnum).default(FileContentTypeEnum.IMAGE),
  mimeType: z.string(),
  visibility: z.enum(FileVisibilityEnum).default(FileVisibilityEnum.PUBLIC),
  status: z.enum(FileStatusEnum).default(FileStatusEnum.AVAILABLE),
});

export const visibilityEnum = z.enum(["PUBLIC", "PRIVATE"]).default("PRIVATE");
export const fileStatusEnum = z
  .enum(["AVAILABLE", "EXPIRED", "NON_EXPIRING"])
  .default("AVAILABLE");

// ========================================
// USERNAME & AUTH SCHEMAS
// ========================================

export const reserveUsernameSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username is required" })
    .max(32, { message: "Username must be at most 32 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username may only contain letters, numbers, and underscores",
    }),
});

export const chooseUsernameSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username is required" })
    .max(32, { message: "Username must be at most 32 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username may only contain letters, numbers, and underscores",
    }),
});

export const claimUsernameSchema = z.object({
  username: z
    .string()
    .max(32, { message: "Username must be at most 32 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username may only contain letters, numbers, and underscores",
    }),
  reservationToken: z
    .string()
    .uuid({ message: "Reservation token is invalid" }),
  email: z.email({ message: "Enter a valid email address" }),
});

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, { message: "Email or username is required" })
    .refine(
      (val) => {
        const isEmail = z.email().safeParse(val).success;
        const isUsername = /^[a-zA-Z0-9_]{3,20}$/.test(val);
        return isEmail || isUsername;
      },
      {
        message:
          "Enter a valid email or a username (3–20 characters, letters/numbers/underscore)",
      }
    ),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(100, { message: "Password must be at most 100 characters" }),
  rememberMe: z.boolean(),
});

// ========================================
// USER PROFILE SCHEMAS
// ========================================

export const submitPersonalInfoSchema = z.object({
  firstName: z.string().max(255, { message: "First name is too long" }),
  lastName: z.string().max(255, { message: "Last name is too long" }),
  email: z
    .string()
    .email({ message: "Enter a valid email address" })
    .max(255, { message: "Email is too long" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(100, { message: "Password must be at most 100 characters" }),
});

export const submitCreativeProfileSchema = z.object({
  creative: z.object({
    disciplineSlugs: z
      .array(z.string())
      .min(3, { message: "Select at least 3 disciplines" })
      .max(5, { message: "Select at most 5 disciplines" }),
    bio: z
      .string()
      .max(200, { message: "Bio cannot exceed 200 characters" })
      .optional(),
    experienceLevel: z.enum(["0-1 year", "1-3 years", "3-5 years", "5+ years"]),
    location: z.string(),
  }),
  file: baseFileSchema.extend({
    _rawFile: z.instanceof(File, { message: "File is required" }),
  }),
});

export const submitCreativeProfileToApiSchema = z.object({
  creative: z.object({
    disciplineSlugs: z
      .array(z.string())
      .min(3, { message: "Select at least 3 disciplines" })
      .max(5, { message: "Select at most 5 disciplines" }),
    bio: z
      .string()
      .max(200, { message: "Bio cannot exceed 200 characters" })
      .optional(),
    experienceLevel: z.enum(["0-1 year", "1-3 years", "3-5 years", "5+ years"]),
    location: z.string(),
  }),
  file: baseFileSchema,
});

export const submitBrandProfileSchema = z.object({
  brand: z.object({
    bio: z
      .string()
      .max(210, { message: "Bio cannot exceed 210 characters" })
      .optional()
      .default(""),
    disciplineSlugs: z
      .array(z.string())
      .min(1, { message: "Select at least one discipline" })
      .default([]),
    brandName: z.string(),
  }),
  file: baseFileSchema.extend({
    _rawFile: z.instanceof(File, { message: "File is required" }),
  }),
});

export const submitBrandProfileToApiSchema = z.object({
  brand: z.object({
    bio: z
      .string()
      .max(210, { message: "Bio cannot exceed 210 characters" })
      .optional()
      .default(""),
    disciplineSlugs: z
      .array(z.string())
      .min(1, { message: "Select at least one discipline" })
      .default([]),
    brandName: z.string(),
  }),
  file: baseFileSchema,
});

export const submitInvestorProfileSchema = z.object({
  investor: z.object({
    websiteURL: z
      .string()
      .transform((val) => {
        // Add https:// if no protocol is present
        if (!/^https?:\/\//i.test(val)) {
          return `https://${val}`;
        }
        return val;
      })
      .pipe(z.url({ message: "Enter a valid URL" })),
    bio: z.string().max(200, { message: "Bio cannot exceed 200 characters" }),
    experienceLevel: z.enum(["0-1 year", "1-3 years", "3-5 years", "5+ years"]),
    location: z.string(),
  }),
  file: baseFileSchema.extend({
    _rawFile: z.instanceof(File, { message: "File is required" }),
  }),
});
export const submitInvestorProfileToApiSchema = z.object({
  investor: z.object({
    websiteURL: z
      .string()
      .transform((val) => {
        // Add https:// if no protocol is present
        if (!/^https?:\/\//i.test(val)) {
          return `https://${val}`;
        }
        return val;
      })
      .pipe(z.url({ message: "Enter a valid URL" })),
    bio: z.string().max(200, { message: "Bio cannot exceed 200 characters" }),
    experienceLevel: z.enum(["0-1 year", "1-3 years", "3-5 years", "5+ years"]),
    location: z.string(),
  }),
  file: baseFileSchema,
});

export const submitInvestorInvestmentFocusSchema = z.object({
  investorType: z.enum(InvestorTypeEnum),
  geographicFocus: z.enum(GeographicFocusEnum),
  investmentSize: z.enum(InvestmentSizeEnum),
  disciplineSlugs: z
    .array(z.string())
    .min(1, { message: "Select at least one discipline" }),
});

export const updateProfileTagsSchema = (disciplines: string[]) => {
  const schemaFields: Record<string, z.ZodArray<z.ZodString>> = {};
  disciplines.forEach((discipline) => {
    schemaFields[`${discipline}-tags`] = z
      .array(z.string())
      .min(3, { message: `Select at least 3 tags for ${discipline}` })
      .max(5, { message: `Select at most 5 tags for ${discipline}` });
  });
  return z.object({ ...schemaFields });
};

// ========================================
// PROJECT SCHEMAS
// ========================================

export const submitProjectSchema = z
  .object({
    title: z
      .string()
      .min(1, { message: "Title is required" })
      .max(100, { message: "Title must be at most 100 characters" }),
    description: z
      .string()
      .max(1000, { message: "Description cannot exceed 1000 characters" })
      .optional(),
    url: z
      .string()
      .transform((val) => {
        // Add https:// if no protocol is present
        if (!/^https?:\/\//i.test(val)) {
          return `https://${val}`;
        }
        return val;
      })
      .pipe(z.url({ message: "Enter a valid URL" })),
    tags: z.array(z.string()).default([]),
    startDate: z.string(),
    endDate: z.string(),
    projectCreatorType: z.enum(RoleEnum).default(RoleEnum.CREATIVE),
    clientId: z.string().optional(),
    clientType: z.enum(ClientTypeEnum).default(ClientTypeEnum.NONE),
    clientName: z.string().optional(),
    files: z.array(
      baseFileSchema
        .extend({ isPlaceholder: z.boolean().default(false) })
        .extend({ order: z.number().int().default(1) })
        .extend({ _rawFile: z.instanceof(File) })
    ),
  })
  .superRefine(({ startDate, endDate }, ctx) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(start.getTime())) {
      ctx.addIssue({
        path: ["startDate"],
        code: "custom",
        message: "Start date is invalid",
      });
    }

    if (isNaN(end.getTime())) {
      ctx.addIssue({
        path: ["endDate"],
        code: "custom",
        message: "End date is invalid",
      });
    }

    if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && start > end) {
      ctx.addIssue({
        path: ["startDate"],
        code: "custom",
        message: "Start date cannot be after end date",
      });
    }

    if (!isNaN(start.getTime()) && start > today) {
      ctx.addIssue({
        path: ["startDate"],
        code: "custom",
        message: "Start date cannot be in the future",
      });
    }

    if (!isNaN(end.getTime()) && end > today) {
      ctx.addIssue({
        path: ["endDate"],
        code: "custom",
        message: "End date cannot be in the future",
      });
    }
  });

export const submitProjectToApiSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title must be at most 100 characters" }),
  description: z
    .string()
    .max(1000, { message: "Description cannot exceed 1000 characters" })
    .optional(),
  url: z
    .string()
    .transform((val) => {
      // Add https:// if no protocol is present
      if (!/^https?:\/\//i.test(val)) {
        return `https://${val}`;
      }
      return val;
    })
    .pipe(z.url({ message: "Enter a valid URL" })),
  tags: z.array(z.string()).default([]),
  startDate: z.string(),
  endDate: z.string(),
  projectCreatorType: z.enum(RoleEnum).default(RoleEnum.CREATIVE),
  clientId: z.string().optional(),
  clientType: z.enum(ClientTypeEnum).default(ClientTypeEnum.NONE),
  clientName: z.string().optional(),
  files: z.array(
    baseFileSchema
      .extend({ isPlaceholder: z.boolean().default(false) })
      .extend({ order: z.number().int().default(1) })
  ),
});

// ========================================
// FILE MANAGEMENT SCHEMAS
// ========================================

export const presignedUploadUrlSchema = z.object({
  key: z.string().max(1024, { message: "Key is too long" }),
  contentType: z.string().max(256, { message: "Content type is too long" }),
  isPublic: z.boolean().default(false),
});

export const presignedDownloadUrlSchema = z.object({
  key: z.string().max(1024, { message: "Key is too long" }),
});

export const createFileSchema = z.object({
  key: z.string().max(1024, { message: "Key is too long" }),
  contentType: z
    .enum(["OTHER", "IMAGE", "VIDEO", "DOCUMENT", "AUDIO"])
    .default("IMAGE"),
  visibility: visibilityEnum.default("PUBLIC"),
  mimeType: z.string(),
  userId: z.string().cuid2(),
  status: fileStatusEnum,
});

export const refreshPrivateUrlSchema = z.object({
  key: z.string().max(1024, { message: "Key is too long" }),
});

export const deleteFileSchema = z.object({
  key: z.string().max(1024, { message: "Key is too long" }),
});

// ========================================
// TYPE EXPORTS
// ========================================

export type ReserveUsernameDto = z.infer<typeof reserveUsernameSchema>;

export type LoginDto = z.infer<typeof loginSchema>;
export type ClaimUsernameDto = z.infer<typeof claimUsernameSchema>;
export type SubmitPersonalInfoDto = z.infer<typeof submitPersonalInfoSchema>;
export type SubmitCreativeProfileDto = z.infer<
  typeof submitCreativeProfileSchema
>;
export type SubmitBrandProfileDto = z.infer<typeof submitBrandProfileSchema>;
export type SubmitInvestorProfileDto = z.infer<
  typeof submitInvestorProfileSchema
>;
export type SubmitCreativeProfileToApiDto = z.infer<
  typeof submitCreativeProfileToApiSchema
>;
export type SubmitBrandProfileToApiDto = z.infer<
  typeof submitBrandProfileToApiSchema
>;
export type SubmitInvestorProfileToApiDto = z.infer<
  typeof submitInvestorProfileToApiSchema
>;
export type SubmitInvestorInvestmentFocusDto = z.infer<
  typeof submitInvestorInvestmentFocusSchema
>;
export type SubmitProjectDto = z.infer<typeof submitProjectSchema>;
export type SubmitProjectToApiDto = z.infer<typeof submitProjectToApiSchema>;
export type PresignedUploadUrlDto = z.infer<typeof presignedUploadUrlSchema>;
export type PresignedDownloadUrlDto = z.infer<
  typeof presignedDownloadUrlSchema
>;
export type CreateFileDto = z.infer<typeof createFileSchema>;
export type RefreshPrivateUrlDto = z.infer<typeof refreshPrivateUrlSchema>;
export type DeleteFileDto = z.infer<typeof deleteFileSchema>;

// ========================================
// LEGACY/COMPATIBILITY EXPORTS
// ========================================

export const submitProjectSchemaType = submitProjectSchema;
