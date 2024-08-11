"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

const SelectInputField = ({ field, record, setRecord }: any) => {
  return (
    <div
      className={cn(
        "w-full flex flex-row justify-between items-center",
        field?.customClassName
      )}
    >
      {field?.name && (
        <Label htmlFor={field.slug} className={cn("text-base font-medium")}>
          {field.name}{" "}
          {field.required ? <span className="text-destructive">*</span> : ""}
        </Label>
      )}
      <Select
        value={record[field.slug] || ""}
        onValueChange={(e) => {
          const record_1 = record;
          record_1[field.slug] = e;
          setRecord({ ...record_1 });
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={field?.name} />
        </SelectTrigger>
        <SelectContent>
          {field?.options?.map((option: any, i: any) => (
            <SelectItem
              key={i + 1}
              value={option?.value ? option?.value : option}
            >
              {option?.value ? option?.name || option?.value : option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectInputField;
