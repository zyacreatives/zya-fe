import { useRegisterAccountType } from "../_hooks/use-register-account-type";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight } from "lucide-react";

const userTypes = [
  {
    label: "As a Creative",
    description: "Showcase your work, and get discovered. E.g designers...",
    icon: "/creative-profile.svg",
    profile: "CREATIVE",
  },
  {
    label: "As a Brand",
    description: "Collaborate to build, or post opportunities. E.g Agency...",
    icon: "/brand-profile.svg",
    profile: "BRAND",
  },
  {
    label: "As an Investor",
    description: "Discover creatives and invest in their growth, projects.",
    icon: "/investor-profile.svg",
    profile: "INVESTOR",
  },
] as const;

export function Register_AccountType() {
  const { chosenProfile, setChosenProfile, handleCompleteProfile } =
    useRegisterAccountType();

  return (
    <div>
      <h2 className="max-w-md mx-auto text-center">
        <span className="text-secondary">Let's get to know you.</span> How will
        you use Zya?
      </h2>

      <div className="grid lg:grid-cols-3 gap-3 lg:w-fit my-11">
        {userTypes.map(({ label, description, icon, profile }) => {
          const isActive = chosenProfile === profile;

          return (
            <div
              key={profile}
              onClick={() => setChosenProfile(profile)}
              className={`lg:w-64 rounded-md relative border gap-8 lg:gap-0 h-32 px-4 lg:px-0 lg:h-64 flex 
                lg:flex-col items-center justify-center text-center hover:cursor-pointer ${
                  isActive ? "border-primary bg-[#FBFAFF]" : ""
                }`}
            >
              <img src={icon} className="w-24 h-24" />
              <div className="lg:text-center text-left">
                <p className="font-semibold opacity-90 lg:mt-4 text-[#434446]">
                  {label}
                </p>
                <p className="text-xs text-neutral-500 font-medium opacity-80 lg:w-10/12 mx-auto mt-1">
                  {description}
                </p>
              </div>

              {isActive && (
                <Check className="w-4 h-4 p-1 bg-primary text-white rounded-full absolute -bottom-2" />
              )}
            </div>
          );
        })}
      </div>

      {chosenProfile && (
        <div className="text-center">
          <Button
            variant="groove"
            className="lg:w-7/12 w-full rounded-full py-6"
            onClick={handleCompleteProfile}
          >
            Complete Profile Details
            <ChevronRight className="group-hover:translate-x-1" />
          </Button>
        </div>
      )}
    </div>
  );
}
