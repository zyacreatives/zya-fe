import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useUserStore } from "../../store/user.store";
import { auth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { API_ROUTES, ROUTES } from "@/lib/routes";

const emailSchema = z.object({
  email: z.email("Email is required"),
});

type PasswordResetEmailDto = z.infer<typeof emailSchema>;
export const useForgotPasswordEmail = () => {
  const router = useRouter();
  const form = useForm<PasswordResetEmailDto>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const setResetEmail = useUserStore((s) => s.setResetEmail);

  const onSubmit = async ({ email }: PasswordResetEmailDto) => {
    setResetEmail(email);
    await auth.requestPasswordReset({
      email,
      redirectTo: `/api/v1/users/password-reset-page-redirect`,
    });
    router.push(ROUTES.PASSWORD_RESET_EMAIL_CONFIRMATION);
  };

  return { form, onSubmit };
};
