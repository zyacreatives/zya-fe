import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  variant?: "default" | "password" | "with-icon" | "link";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  protocol?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = "default",
      leftIcon,
      rightIcon,
      type = "text",
      protocol = "https://",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    const inputType =
      variant === "password" ? (showPassword ? "text" : "password") : type;

    const baseInputClasses = cn(
      "file:text-foreground placeholder:text-neutral-400  selection:bg-primary font-normal selection:text-primary-foreground dark:bg-input/30 border- flex h-9 w-full min-w-0 rounded-xl border bg-white shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-white file:text-sm file:font-normal disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[2px]",
      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
      className
    );

    if (variant === "link") {
      return (
        <div className="relative flex">
          <div className="flex items-center h-4 px-3 py-5 lg:py-6 bg-muted/50 text-muted-foreground rounded-l-xl border border-r-0 text-base md:text-sm font-normal">
            {protocol}
          </div>
          <input
            type={inputType}
            data-slot="input"
            className={cn(
              baseInputClasses,
              "rounded-l-none border-l-0 flex-1",
              "px-3 py-6 lg:py-6"
            )}
            ref={ref}
            {...props}
          />
        </div>
      );
    }

    if (variant === "with-icon" || variant === "password") {
      return (
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          <input
            type={inputType}
            data-slot="input"
            className={cn(
              baseInputClasses,
              {
                "pl-10": leftIcon,
                "pr-10": rightIcon || variant === "password",
              },
              "px-3 py-6 lg:py-6"
            )}
            ref={ref}
            {...props}
          />
          {variant === "password" && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff
                  strokeWidth={1.4}
                  className="w-5 text-neutral-400"
                />
              ) : (
                <Eye strokeWidth={1.4} className="w-5 text-neutral-400" />
              )}
            </button>
          )}
          {rightIcon && variant !== "password" && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        type={inputType}
        data-slot="input"
        className={cn(baseInputClasses, "px-3 py-6 lg:py-6")}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
export { Input };
