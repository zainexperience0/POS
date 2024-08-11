"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const RedirectButtonField = ({ field, record, setRecord }: any) => {
  const [error, setError] = useState("");

  const handleRedirect = () => {
    const url = field.defaultValue;

    if (url) {
      window.location.href = url;
    } else {
      setError("No URL provided.");
    }
  };

  return (
    <div
      className={cn(
        "w-full space-y-2 flex justify-between items-center ",
        field?.customClassName
      )}
    >
      <Label htmlFor={field.slug} className={cn("text-base font-medium")}>
        {field.name}{" "}
        {field.required ? <span className="text-destructive">*</span> : ""}
      </Label>
      <Button onClick={handleRedirect} className="mt-2">
        Go to URL
      </Button>
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
};
