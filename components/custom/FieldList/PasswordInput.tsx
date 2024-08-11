"use client";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { cn } from "@/lib/utils";

export const PasswordInputField = ({ field, record, setRecord }: any) => (
  <div
    className={cn(
      "w-full my-2 flex flex-col justify-center space-y-2",
      field?.customClassName
    )}
  >
    {field?.name && (
      <Label htmlFor={field.slug} className={cn("text-base font-medium")}>
        {field.name}{" "}
        {field.required ? <span className="text-destructive">*</span> : ""}
      </Label>
    )}
    <PasswordInput
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
