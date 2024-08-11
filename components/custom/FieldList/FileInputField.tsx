"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const FileInputField = ({ field, record, setRecord }: any) => (
  <div className="w-full py-2 space-y-2 ">
    <Label
      htmlFor={field.slug}
      className={cn("text-base font-medium", field?.customClassName)}
    >
      {field.name}{" "}
      {field.required ? <span className="text-destructive">*</span> : ""}
    </Label>
    <Input
      type="file"
      id={field.slug}
      onChange={(e: any) => {
        if (e.target.files) {
          const updatedRecord = { ...record };
          updatedRecord[field.slug] = e.target.files[0].name;
          setRecord(updatedRecord);
        }
      }}
    />
  </div>
);
