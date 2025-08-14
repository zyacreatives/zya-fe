"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useReserveUsername } from "./auth/_form/reserve-username";
import { ReservationSuccessDialog } from "./auth/_components/reservation-success-dialog";
import { useEffect, useState } from "react";

export const runtime = "edge"
export default function Home() {
  const {
    form,
    onSubmit,
    isSuccess,
    usernameStillAvailable,
    resetReservationStatus,
  } = useReserveUsername();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isSuccess || usernameStillAvailable) {
      setOpen(true);
    }
  }, [isSuccess, usernameStillAvailable]);

  return (
    <main className="w-[90%] mx-auto max-w-full">
      <div className="text-center w-fit mt-16 lg:mt-20 mx-auto">
        <p className="bg-gradient-to-r font-medium from-[#E55213] via-10% to-[#8591FF] bg-clip-text text-transparent">
          Zya is built for people like you
        </p>
        <h1 className="lg:my-5 my-3 max-w-4xl text-center font-bold font-instrument-sans text-5xl md:text-[60px] lg:text-[80px] mx-auto">
          The world hasn’t seen a talent like yours yet.
        </h1>
        <p className="max-w-xl w-[90%] font-medium  lg:text-xl mx-auto text-neutral-500">
          Zya is where bold work gets noticed, and the right connection finds
          you. Let your talent speak through your profile.
        </p>
      </div>
      <div>
        <div
          className={`bg-[#FFFDFC] border w-[95%] shadow-md relative flex items-center max-w-lg mx-auto mt-10 ${
            form.formState.errors.username
              ? "border-secondary"
              : " border-[#D3D3D3]"
          } rounded-full p-3 pb-4 `}
        >
          <p className="font-medium lg:text-xl">zya.com/</p>
          <img
            src="/hero-input.svg"
            alt=""
            className="absolute right-20 -top-[27px] z-20"
          />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        type="text"
                        placeholder="username"
                        {...field}
                        max={30}
                        className="lg:text-xl font-medium py-0 px-0 border-none focus:ring-0 outline-none  text-secondary bg-transparent focus:outline-none"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <button className="bg-radial font-medium from-[#9147F8] z-10 absolute right-3 lg:top-3 top-[10px] to-primary text-xs lg:text-sm lg:px-6 lg:py-2 py-2 px-3 rounded-full text-white">
                Create your profile
              </button>
            </form>
          </Form>
        </div>
        <p className="text-xs mt-3  font-medium text-secondary max-w-lg mx-auto text-center">
          {form.formState?.errors?.username?.message || ""}
        </p>
      </div>
      <ReservationSuccessDialog
        open={open}
        setOpen={(v) => {
          if (!v) resetReservationStatus();
          setOpen(v);
        }}
      />
    </main>
  );
}
