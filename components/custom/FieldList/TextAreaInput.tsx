"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const TextAreaInput = ({ field, record, setRecord }: any) => {
  const [text, setText] = useState(record[field.slug] || "");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    const record_1 = { ...record, [field.slug]: newText };
    setRecord(record_1);
  };

  const letterCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className={cn("w-full flex flex-col gap-2 ", field?.customClassName)}>
      {field?.name && (
        <Label htmlFor={field.slug} className={"text-base font-medium"}>
          {field.name}{" "}
          {field.required ? <span className="text-destructive">*</span> : ""}
        </Label>
      )}
      <Textarea
        id={field.slug}
        value={text}
        className="focus-visible:ring-0 "
        onChange={handleChange}
      />
      <div className="mt-2 text-sm text-muted-foreground">
        <span>
          {letterCount} letter{letterCount !== 1 ? "s" : ""}
        </span>{" "}
        |
        <span>
          {wordCount} word{wordCount !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
};
