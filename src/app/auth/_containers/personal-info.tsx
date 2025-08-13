import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSubmitPersonalInfo } from "../_form/submit-personal-info";
import { Input } from "@/components/ui/input";
import { useUsernameReservationStore } from "@/src/app/store/username-reservation.store";

export function Register_PersonalInfo() {
  const { form, onSubmit } = useSubmitPersonalInfo();
  const username = useUsernameReservationStore((state) => state.reservation?.username)

  return (
    <div className="max-w-md ">
      <h2 className="text-center  tracking-tight mb-11">
        <span className="text-secondary">@{username} </span>is yours 🎉, Let’s <br/> setup
        your account.
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-md"
        >
          <div className="grid grid-cols-2 gap-4 ">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="zya@email.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="zya@email.com"
                    variant="password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-4 w-full pt-4">
            <img src="/auth-back.svg" className="w-12 h-12" />
            <Button
              variant={"groove"}
              className="border-none flex-1  rounded-full py-6 hover:translate-y-[1px] font-semibold"
            >
              Create My Zya Account
            </Button>
          </div>
        </form>
      </Form>
      <p className="text-[#99a0ae] text-center text-sm mt-6 max-w-xs mx-auto">
        By continuing, you agree to our{" "}
        <span className="text-primary">Terms</span> and{" "}
        <span className="text-primary">Privacy Policy.</span>
      </p>
    </div>
  );
}
