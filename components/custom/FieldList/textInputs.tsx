"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const TextInputField = ({ field, record, setRecord }: any) => (
  <div
    className={cn(
      "w-full  my-2 flex flex-col justify-center space-y-2",
      field?.customClassName
    )}
  >
    <Label htmlFor={field.slug} className={cn("text-base font-medium")}>
      {field.name}{" "}
      {field.required ? <span className="text-destructive">*</span> : ""}
    </Label>
    <Input
      type="text"
      id={field.slug}
      value={record[field.slug]}
      className="focus-visible:ring-0"
      onChange={(e: any) => {
        const record_1 = { ...record };
        record_1[field.slug] = e.target.value;
        setRecord(record_1);
      }}
    />
  </div>
);
