"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const CheckboxField = ({ field, record, setRecord }: any) => (
  <div
    className={cn(
      "w-full flex items-center justify-between",
      field?.customClassName
    )}
  >
    <Label htmlFor={field.slug} className={cn("text-base font-medium")}>
      {field.name}{" "}
      {field.required ? <span className="text-destructive">*</span> : ""}
    </Label>
    <Checkbox
      id={field.slug}
      checked={record[field.slug]}
      onCheckedChange={(e) => {
        const record_1 = { ...record };
        record_1[field.slug] = e;
        setRecord(record_1);
      }}
    />
  </div>
);
