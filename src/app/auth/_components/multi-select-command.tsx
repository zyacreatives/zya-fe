"use client";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import { InfoCircle } from "@untitledui/icons";
type Option = {
  slug: string;
  name: string;
};

type MultiSelectCommandProps = {
  field: {
    value: string[];
    onChange: (value: string[]) => void;
  };
  options: (string | Option)[];
  placeholder?: string;
  max?: number;
};

export const MultiSelectCommand: React.FC<MultiSelectCommandProps> = ({
  field,
  options,
  placeholder = "Select options...",
  max = 5,
}) => {
  const [open, setOpen] = React.useState(false);
  const currentValue = field.value || [];

  const normalizedOptions: Option[] = React.useMemo(() => {
    return options.map((opt) =>
      typeof opt === "string" ? { slug: opt, name: opt } : opt
    );
  }, [options]);

  const toggleOption = (slug: string) => {
    if (currentValue.includes(slug)) {
      field.onChange(currentValue.filter((v) => v !== slug));
    } else if (currentValue.length < max) {
      field.onChange([...currentValue, slug]);
    }
  };

  const selectedOptions = normalizedOptions.filter((opt) =>
    currentValue.includes(opt.slug)
  );

  return (
    <div className="space-y-2 max-w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <div>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-full justify-between rounded-xl min-h-10 h-auto px-3 lg:py-3 py-3"
            >
              <div className="flex flex-wrap gap-1 flex-1 tracking-tight overflow-y-clip">
                {selectedOptions.length > 0 ? (
                  selectedOptions.map((option) => (
                    <div
                      key={option.slug}
                      className="flex items-center rounded-lg border p-1 px-2 text-slate-600 border-slate-200  text-xs"
                    >
                      {option.name}
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleOption(option.slug);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            toggleOption(option.slug);
                          }
                        }}
                        className="ml-1 hover:cursor-pointer focus:outline-none"
                      >
                        <span className="sr-only">Remove</span>
                        <X className=" text-primary" size={10} />
                      </span>
                    </div>
                  ))
                ) : (
                  <span className="text-muted-foreground text-base">{placeholder}</span>
                )}
              </div>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-neutral-300 " />
            </Button>
          </PopoverTrigger>
          {selectedOptions.length < 3 ? (
            <p className="flex text-xs gap-1 font-medium  items-center mt-1 text-neutral-500">
              <InfoCircle className="fill-neutral-300 stroke-white w-5 " />
              Select a minimum of 3 areas / disciplines
            </p>
          ) : (
            <></>
          )}
        </div>
        <PopoverContent
          className="p-0 PopoverContent"
          align="start"
          sideOffset={4}
          asChild
        >
          <Command className="pb-2">
            <CommandInput placeholder="Search..." />
            <CommandGroup className="max-h-72 overflow-y-auto scrollbar-none">
              {normalizedOptions.map((option) => {
                const isSelected = currentValue.includes(option.slug);
                return (
                  <CommandItem
                    key={option.slug}
                    className="mt-[3px] flex justify-between "
                    onSelect={() => toggleOption(option.slug)}
                  >
                    <span>{option.name}</span>
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-muted",
                        isSelected ? "bg-primary text-white" : ""
                      )}
                    >
                      {isSelected && (
                        <Check className="h-4 w-4 text-white p-[3px]" />
                      )}
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
