import { Check } from "lucide-react";

type Props = {
  title: string;
  active: boolean;
  no: number;
  completed?: boolean;
};
export const BreadCrumb = ({ title, active, no, completed }: Props) => {
  if (active) {
    return (
      <div className="flex gap-2 items-center font-medium">
        <img
          src="/breadcrumb-active.svg"
          className="animate-spin"
          width={16}
          height={16}
          alt=""
        />
        <p className="text-primary font-medium">{title}</p>
      </div>
    );
  }
  return (
    <div className="flex gap-2 items-center font-medium">
      {completed ? (
        <Check className="h-4 w-4 rounded-full bg-green-600 text-white p-[3px]" />
      ) : (
        <div className="w-4 h-4 text-[#717784] rounded-full bg-muted  text-xs border flex items-center justify-center">
          {no}
        </div>
      )}
      <p className="text-[#717784] font-medium">{title}</p>
    </div>
  );
};
