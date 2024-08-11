"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";




export const PhoneInputField = ({ field, record, setRecord }: any) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Regular expression to match numbers from 0 to 9 and up to 11 digits
    const regex = /^[0-9]{0,11}$/;

    if (regex.test(inputValue)) {
      const record_1 = { ...record, [field.slug]: inputValue };
      setRecord(record_1);
    }
  };

  return (
    <div
      className={cn(
        "w-full rounded shadow-md my-2 flex flex-col justify-center space-y-2",
        field?.customClassName
      )}
    >
      <Label
        htmlFor={field.slug}
        className={cn("text-base font-medium", field?.customClassName)}
      >
        {field.name}{" "}
        {field.required ? <span className="text-destructive">*</span> : ""}
      </Label>
      <div className="flex flex-row space-x-4 items-center">
   
      <Input
          type="text" // Use text to allow validation before input
          id={field.slug}
          value={record[field.slug] || ""}
          className={`focus-visible:ring-0 border rounded w-full`}
          onChange={handleInputChange}
          placeholder={`1234567890`}
          aria-describedby={`${field.slug}-error`}
        />
      </div>
    </div>
  );
};