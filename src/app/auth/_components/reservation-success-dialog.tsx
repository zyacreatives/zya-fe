import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUsernameReservationStore } from "@/src/app/store/username-reservation.store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";

export const ReservationSuccessDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) => {
  const router = useRouter();
  const { reservation } = useUsernameReservationStore();
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    if (!open || !reservation?.expiresAt) return;

    const expiryTime = new Date(reservation.expiresAt).getTime();
    const updateCountdown = () => {
      const secondsLeft = Math.max(
        Math.floor((expiryTime - Date.now()) / 1000),
        0
      );
      setTimeLeft(secondsLeft);

      if (secondsLeft === 0) {
        setOpen(false);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [open, reservation?.expiresAt, setOpen]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}m : ${s}s`;
  };

  if (!reservation) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="text-center px-10 py-16">
        <DialogHeader>
          <DialogTitle className="text-2xl lg:text-3xl text-center">
            <span className="text-secondary">@{reservation.username}</span> has
            been reserved 🥳
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm text-slate-900">
          <p className="lg:text-lg text-neutral-400 font-medium max-w-sm mx-auto">
            Looks like you’ve found the perfect username. Let’s make it official
            before it slips away..
          </p>
          <p className="text-secondary font-semibold text-center text-4xl">
            {formatTime(timeLeft)}
          </p>
        </div>

        <DialogFooter className="flex flex-col mt-4">
          <div className="flex flex-col gap-2 w-full">
            <Button
              onClick={() => router.replace(ROUTES.ACCOUNT_CREATION_TYPE)}
              variant="groove"
              className="w-11/12 rounded-full py-6 mx-auto"
              disabled={timeLeft === 0}
            >
              Continue
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
