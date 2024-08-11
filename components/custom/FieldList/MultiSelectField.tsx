"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "cmdk";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const MultiSelectField = ({ field, record, setRecord }: any) => {
  const [open, setOpen] = useState(false);

  console.log(record[field.slug], field);

  // const find = field.options?.find(
  //   (v: any) =>
  //     v === record[field.slug] || v?.value === record[field.slug][0]?.value
  // );

  // console.log({ find });

  const triggerValue =
    record[field.slug]?.length !== 0
      ? record[field.slug]?.length === 1
        ? record[field.slug][0]?.name || record[field.slug][0]
        : record[field.slug]?.length + " Selected"
      : "Select";

  useEffect(() => {
    setOpen(false);
  }, []);

  return (
    <div className="w-full flex flex-row justify-between items-center ">
      {field?.name && (
        <Label
          htmlFor={field.slug}
          className={cn("text-base font-medium", field?.customClassName)}
        >
          {field.name}{" "}
          {field.required ? <span className="text-destructive">*</span> : ""}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" className="w-fit">
            {triggerValue}
            <ChevronsUpDownIcon className="ml-20 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px]">
          <div className="flex flex-col items-center justify-center">
            <Command>
              <div className="flex w-full justify-center">
                <CommandInput
                  placeholder="Search..."
                  className="w-full max-w-[200px] text-sm px-2 py-1.5 rounded-md border border-input bg-background text-muted-foreground outline-none"
                />
              </div>
              <CommandList className="max-h-[300px] overflow-y-auto overflow-x-hidden">
                <CommandEmpty>No match found.</CommandEmpty>
                {field.options?.map((option: any, i: any) => (
                  <CommandItem
                    key={i + 1}
                    value={option?.value ? option?.value : option}
                    onSelect={(val) => {
                      const currentValue = val;
                      const record_1 = { ...record }; // Use a new object to avoid direct mutation
                      if (record_1[field.slug]?.includes(currentValue)) {
                        record_1[field.slug] = record_1[field.slug].filter(
                          (value: any) => value !== currentValue
                        );
                      } else {
                        record_1[field.slug] = [
                          ...(record_1[field.slug] || []),
                          currentValue,
                        ];
                      }
                      setRecord(record_1);
                      setOpen(false);
                    }}
                    className="flex items-center justify-between px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                  >
                    {option?.value ? option?.name || option?.value : option}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        record[field.slug]?.includes(option)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MultiSelectField;
