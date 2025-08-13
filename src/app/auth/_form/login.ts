import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { LoginDto, loginSchema } from "../_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { auth } from "@/lib/auth";
import { useUserStore } from "../../store/user.store";
import { toast } from "sonner";
import { ONBOARDING_PAGES } from "@/lib/routes";
export const useLogin = () => {
  const router = useRouter();
  const form = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
      identifier: "",
      password: "",
    },
  });
  const searchParams = useSearchParams();
  const setUser = useUserStore((s) => s.setUser);


  const onSubmit = async (values: LoginDto) => {
    const handlePostLogin = async () => {
      const { data } = await auth.getSession();
      if (!data?.user) return;
      console.log({data})
      if (data.user.onboardingPage === "DONE") {
        setUser(data.user);
        router.push("/");
      } else if (
        data.user.onboardingPage === ONBOARDING_PAGES.ACCOUNT_TYPE_SELECTION
      ) {
        setUser(data.user);
        const params = new URLSearchParams(searchParams.toString());
        params.set("onboarding_page", ONBOARDING_PAGES.ACCOUNT_TYPE_SELECTION);
        router.push(`/auth/register/?${params.toString()}`);
      } else {
        setUser(data.user);
        const params = new URLSearchParams(searchParams.toString());
        params.set("onboarding_page", data.user?.onboardingPage ?? "");
        router.push(
          `/auth/register/${
            data.user.role?.toLowerCase() ?? "creative"
          }?${params.toString()}`
        );
      }
    };

    const signIn = z.email().safeParse(values.identifier).success
      ? () =>
          auth.signIn.email({
            email: values.identifier,
            password: values.password,
            rememberMe: values.rememberMe,
          })
      : () =>
          auth.signIn.username({
            username: values.identifier,
            password: values.password,
            rememberMe: values.rememberMe,
          });

    const { error } = await signIn();
    if (error) {
      console.log({ error });
      toast.error(error.message);
      return;
    }
    await handlePostLogin();
  };

  return { form, onSubmit };
};
