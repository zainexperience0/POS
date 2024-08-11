"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export const NumberInputField = ({ field, record, setRecord }: any) => {
  const [value, setValue] = useState(record[field.slug] || 0);

  const handleChange = (e: any) => {
    const newValue = e.target.value ? Number(e.target.value) : 0;
    setValue(newValue);
    updateRecord(newValue);
  };

  const increment = () => {
    const newValue = value + 1;
    setValue(newValue);
    updateRecord(newValue);
  };

  const decrement = () => {
    const newValue = value > 0 ? value - 1 : 0;
    setValue(newValue);
    updateRecord(newValue);
  };

  const updateRecord = (newValue: number) => {
    const record_1 = { ...record };
    record_1[field.slug] = newValue;
    setRecord(record_1);
  };

  return (
    <div
      className={cn("w-full my-2 flex justify-between", field?.customClassName)}
    >
      <div className="w-full p-1 my-2 flex flex-col justify-center space-y-2">
        {field?.name && (
          <Label htmlFor={field.slug} className={cn("text-base font-medium")}>
            {field.name}{" "}
            {field.required ? <span className="text-destructive">*</span> : ""}
          </Label>
        )}
      </div>
      <div className="flex items-center flex-row space-x-4">
        <Button onClick={decrement} variant={"secondary"}>
          <Minus className="w-4 h-4" />
        </Button>
        <Input
          type="number"
          id={field.slug}
          value={value}
          className="focus-visible:ring-0 text-center border rounded-md max-w-[300px] w-fit"
          onChange={handleChange}
        />
        <Button onClick={increment} variant={"secondary"}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
