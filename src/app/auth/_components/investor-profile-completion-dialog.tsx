import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useUserStore } from "../../store/user.store";
export const InvestorProfileCompletionDialog = ({
  isSuccess,
}: {
  isSuccess: boolean;
}) => {
  const user = useUserStore((s) => s.user);
  return (
    <Dialog open={isSuccess}>
      <DialogContent className="p-0 border-none" showCloseButton={false}>
        <div className="min-h-24">
          <img src={"/investor-profile-completion.svg"} />
        </div>
        <div className="mt-4 mb-12 w-11/12 mx-auto text-center">
          <div className="w-4/5 mx-auto text-center">
            <DialogTitle className="text-primary text-3xl font-semibold">
              Welcome to Zya, {user?.name.split(" ")[0]} {" "}🎉

            </DialogTitle>

            <p className="font-medium text-neutral-400 leading-[24px] my-4">
              This is your creative playground, and discovery engine, all rolled
              into one. Step in, explore your space. Share your profile.
            </p>
          </div>
          <Button
            variant="groove"
            className="w-11/12 rounded-full py-6 mx-auto"
          >
            Explore Zya Ecosystem
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
