"use client";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { cn } from "@/lib/utils";

export const ToogleInputField = ({ field, record, setRecord }: any) => {
  return (
    <div
      className={cn(
        "w-full flex flex-col space-y-2 flex-wrap white",
        field?.customClassName
      )}
    >
      {field?.name && (
        <Label htmlFor={field.slug} className={"text-base font-semibold"}>
          {field.name}{" "}
          {field.required ? <span className="text-destructive">*</span> : ""}
        </Label>
      )}
      <ToggleGroup
        type="single"
        id={field.slug}
        value={record[field.slug] || ""}
        // defaultValue={field.defaultValue}
        onValueChange={(e) => {
          if (e.length === 0) return;
          const record_1 = { ...record, [field.slug]: e };
          setRecord(record_1);
        }}
        className="flex flex-row items-center justify-start flex-wrap"
      >
        {field.options.map((option: any, i: any) => (
          <ToggleGroupItem
            key={i + 1}
            value={option?.value ? option?.value : option}
            className="font-light capitalize h-8 mr-2"
          >
            {option?.value ? option?.name || option?.value : option}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};
