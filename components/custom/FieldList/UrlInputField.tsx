"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const UrlInputField = ({ field, record, setRecord }: any) => {
  const [error, setError] = useState("");
  const [helperText, setHelperText] = useState("");

  const validateUrl = (url: string) => {
    const urlPattern =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    return urlPattern.test(url);
  };

  const handleChange = (e: any) => {
    const updatedRecord = { ...record };
    updatedRecord[field.slug] = e.target.value;
    setRecord(updatedRecord);

    const urlValue = e.target.value;

    if (!validateUrl(urlValue)) {
      setError("Please enter a valid URL.");
    } else {
      setError("");
    }

    if (
      urlValue &&
      !urlValue.startsWith("http://") &&
      !urlValue.startsWith("https://")
    ) {
      setHelperText("Include 'http://' or 'https://'");
    } else {
      setHelperText("");
    }
  };

  return (
    <div className={cn("w-full my-2 space-y-2", field?.customClassName)}>
      <Label htmlFor={field.slug} className={"text-base font-medium"}>
        {field.name}{" "}
        {field.required ? <span className="text-destructive">*</span> : ""}
      </Label>
      <Input
        type="url"
        id={field.slug}
        value={record[field.slug] || ""}
        className={`focus-visible:ring-0 ${error ? "border-destructive" : ""}`}
        placeholder="https://example.com"
        onChange={handleChange}
      />
      {error && <p className="text-destructive text-sm">{error}</p>}
      {helperText && (
        <p className="text-muted-foreground text-sm">{helperText}</p>
      )}
    </div>
  );
};
