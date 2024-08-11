"use client";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const DateInputField = ({ field, record, setRecord }: any) => (
  <div
    className={cn(
      "w-full my-2 flex justify-between space-x-2",
      field?.customClassName
    )}
  >
    {field?.name && (
      <Label htmlFor={field.slug} className={cn("text-base font-medium")}>
        {field.name}{" "}
        {field.required ? <span className="text-destructive">*</span> : ""}
      </Label>
    )}
    <DatePicker
      className="focus-visible:ring-0"
      date={record[field.slug]}
      setDate={(newDate: any) => {
        const record_1 = record;
        record_1[field.slug] = newDate;
        setRecord({ ...record_1 });
      }}
    />
  </div>
);
