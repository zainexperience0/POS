"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

const RadioInputField = ({ field, record, setRecord }: any) => {
  return (
    <div
      className={cn(
        "w-full my-2 flex flex-col space-y-2",
        field?.customClassName
      )}
    >
      {field?.name && (
        <Label htmlFor={field.slug} className={cn("text-base font-medium")}>
          {field.name}{" "}
          {field.required ? <span className="text-destructive">*</span> : ""}
        </Label>
      )}
      <RadioGroup
        value={
          record[field.slug]?.length > 0
            ? record[field.slug]
            : field.defaultValue
        }
        onValueChange={(val: any) => {
          const record_1 = record;
          record_1[field.slug] = val;
          setRecord({ ...record_1 });
        }}
        className="flex flex-row space-x-4 items-center"
      >
        {field.options.map((option: any, i: any) => (
          <div key={i + 1} className="flex items-center  space-x-2">
            <RadioGroupItem
              value={option?.value ? option?.value : option}
              id={field.slug}
            />
            <Label htmlFor={field.slug}>
              {option?.value ? option?.name || option?.value : option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default RadioInputField;
