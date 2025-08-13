import { FormControl, FormLabel } from "@/components/ui/form";
import { UploadCloud02 } from "@untitledui/icons";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useRef } from "react";

type Props = {
  form: UseFormReturn<any>;
  label?: string;
  pfpSrc?: string;
};

export function ProfilePicUploader({ form, label = "Upload Image" }: Props) {
  const inputId = "profilePicInput";
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = form;

  const currentFile = watch("file");
  const previewUrl = currentFile?.url?.startsWith("blob:") && currentFile.url;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = /image\/(png|jpeg|svg)/.test(file.type);
    if (!isImage) {
      setError("file", {
        type: "manual",
        message: "Only PNG or JPEG images are allowed.",
      });
      return;
    }

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.src = url;

    img.onload = () => {
      if (img.width < 400 || img.height < 400) {
        setError("file", {
          type: "manual",
          message: "Image must be at least 400x400 pixels.",
        });
        return;
      }

      clearErrors("file");
      setValue("file", {
        key: "",
        url,
        contentType: "IMAGE",
        mimeType: file.type,
        visibility: "PUBLIC",
        purpose: "PROFILE_PICTURE",
        status: "AVAILABLE",
        _rawFile: file,
      } as any);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    };

    img.onerror = () => {
      setError("file", {
        type: "manual",
        message: "Failed to load image. Please try another file.",
      });
    };
  };

  const hasError = !!errors.file;

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex gap-2 items-center">
        <div className="relative w-fit h-fit shrink-0">
          <img
            src={previewUrl ?? "/pfp-placeholder.png"}
            alt="Profile"
            className={cn(
              "rounded-full lg:w-14 lg:h-14 w-11 h-11 object-cover border",
              hasError ? "border-destructive" : "border-slate-300"
            )}
          />
        </div>
        <div>
          <FormLabel className="lg:text-lg text-slate-700">
            {currentFile?._rawFile?.name ?? label}
          </FormLabel>
          <p className="text-xs lg:text-sm text-slate-400">
            Min 400x400px, PNG or JPEG
          </p>
        </div>
        <FormControl className="mt-0">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id={inputId}
          />
        </FormControl>
      </div>

      <label
        htmlFor={inputId}
        className="cursor-pointer border items-center flex gap-2 border-slate-200 text-sm px-[10px] py-2 mt-0 rounded-md hover:bg-muted transition"
      >
        <UploadCloud02 strokeWidth={1.3} size={20} />
        Upload
      </label>
    </div>
  );
}
