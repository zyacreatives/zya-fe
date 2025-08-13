import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
export const ProjectCreationSuccessDialog = ({
  isSuccess,
  projectName = "Zya Multi-platform",
}: {
  isSuccess: boolean;
  projectName: string;
}) => {
  return (
    <Dialog open={isSuccess}>
      <DialogContent className="py-12">
        <div className="min-h-24">
          <img src={"/project-creation-success.svg"} />
        </div>
        <div className="w-fit mx-auto text-center">
          <DialogTitle className="text-secondary text-3xl font-semibold">
            Your First Project is Live
          </DialogTitle>

          <p className="font-medium text-neutral-400 leading-[24px] my-4">
            Your Project{" "}
            <span className="text-primary underline underline-offset-2">
              {projectName}
            </span>{" "}
            is now live on Zya! 🥳 Invite your friends, and investors to join
            the excitement. Share directly or copy the link below!
          </p>
        </div>
        <Button
        //   onClick={() => router.replace(ROUTES.ACCOUNT_CREATION_TYPE)}
          variant="groove"
          className="w-11/12 rounded-full py-6 mx-auto"
        //   disabled={timeLeft === 0}
        >
          View Project Catalogue
        </Button>
      </DialogContent>
    </Dialog>
  );
};
