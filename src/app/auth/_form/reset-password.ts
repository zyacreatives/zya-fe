import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { auth } from "@/lib/auth";

const passwordSchema = z
  .object({
    password: z
      .string({ error: "Password is required" })
      .min(8, "Password should be at least 8 characters.")
      .max(100, "Password should be a maximum of 100 characters."),
    confirmPassword: z.string({
      error: "Please confirm your password",
    }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordResetDto = z.infer<typeof passwordSchema>;
export const useResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const form = useForm<PasswordResetDto>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async ({ password }: PasswordResetDto) => {
    auth.resetPassword({
      newPassword: password,
      token,
    });
  };

  return { form, onSubmit };
};
