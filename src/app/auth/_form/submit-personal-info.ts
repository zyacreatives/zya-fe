import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { ONBOARDING_PAGES } from "@/lib/routes";
import { useUsernameReservationStore } from "@/src/app/store/username-reservation.store";
import { SubmitPersonalInfoDto, submitPersonalInfoSchema } from "../_schema";
import { useClaimUsernameReservationApi } from "../_api/claim-username-reservation";
import { auth } from "@/lib/auth";
import { toast } from "sonner";
import { capitalizeSentences } from "@/lib/capitalize-sentences";
import { useUserStore } from "../../store/user.store";


export const useSubmitPersonalInfo = () => {
  const form = useForm<SubmitPersonalInfoDto>({
    resolver: zodResolver(submitPersonalInfoSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  const reservation = useUsernameReservationStore((s) => s.reservation);
  const clearReservation = useUsernameReservationStore(
    (s) => s.clearReservation
  );
  const setUser = useUserStore((s) => s.setUser);

  const router = useRouter();
  const searchParams = useSearchParams();

  const updatePage = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };

  const { claimUsernameReservation } = useClaimUsernameReservationApi();

  const onSubmit = async (values: SubmitPersonalInfoDto) => {
    const { error } = await auth.signUp.email({
      email: values.email,
      name: `${values.firstName ?? ""} ${values.lastName ?? ""}`,
      password: values.password,
      username: reservation?.username ?? "",
    });
    console.log({ error });
    if (!error) {
      claimUsernameReservation(
        {
          email: values.email,
          reservationToken: reservation?.reservationToken ?? "",
          username: reservation?.username ?? "",
        },
        {
          onError: (error) => {
            console.log(`Hello here`);
            toast.error(error.message);
          },
          onSuccess: async () => {
            const { data } = await auth.getSession({

            });
            console.log({ data, Hm: "HM DATA" });
            clearReservation();
            const { error } = await auth.updateUser({
              onboardingPage: ONBOARDING_PAGES.EMAIL_VERIFICATION,
            });
            console.log({ error, HELLO: "Hello" });
            if (!error) {
              updatePage(
                "onboarding_page",
                ONBOARDING_PAGES.EMAIL_VERIFICATION
              );

              if (data && data.user) setUser(data?.user);
            } else {
              console.log({ error });
              toast.error(error.message);
            }
          },
        }
      );
    } else {
      toast.error(capitalizeSentences({ text: error.message ?? "" }));
    }
  };

  return { form, onSubmit };
};
