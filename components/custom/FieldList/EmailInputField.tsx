"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const EmailInputField = ({ field, record, setRecord }: any) => (
  <div className="w-full p-2 my-2 flex flex-col justify-center space-y-2">
    {field?.name && (
      <Label
        htmlFor={field.slug}
        className={cn("text-base font-medium", field?.customClassName)}
      >
        {field.name}{" "}
        {field.required ? <span className="text-red-500">*</span> : ""}
      </Label>
    )}
    <Input
      type="email"
      id={field.slug}
      value={record[field.slug] || ""}
      className={`focus-visible:ring-0 ${getStrengthClass(record[field.slug])}`}
      onChange={(e: any) => {
        const record_1 = { ...record };
        record_1[field.slug] = e.target.value;
        setRecord(record_1);
      }}
    />
    {getStrengthMessage(record[field.slug]) && (
      <p
        className={`text-${getStrengthClass(
          record[field.slug]
        )} mt-2 text-muted-foreground text-xs`}
      >
        {getStrengthMessage(record[field.slug])}
      </p>
    )}
  </div>
);

const getStrengthClass = (email: string) => {
  if (!email) {
    return "gray-500"; // No input
  }

  const strength = calculateEmailStrength(email);

  switch (strength) {
    case "weak":
      return "red-500";
    case "medium":
      return "yellow-500";
    case "strong":
      return "green-500";
    default:
      return "gray-500";
  }
};

const getStrengthMessage = (email: string) => {
  if (!email) {
    return null;
  }

  const strength = calculateEmailStrength(email);

  switch (strength) {
    case "weak":
      return "Incomplete Email";
    case "medium":
      return "Almost Complete Email";
    case "strong":
      return "Perfect Email!";
    default:
      return null;
  }
};

const calculateEmailStrength = (email: string) => {
  // This is a simplified example. You can implement more complex logic.
  if (email.length < 5) {
    return "weak";
  } else if (email.length >= 5 && email.length < 15) {
    return "medium";
  } else if (email.includes("@") && email.includes(".")) {
    return "strong";
  }
};
