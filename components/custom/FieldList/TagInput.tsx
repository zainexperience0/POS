import { Label } from "@/components/ui/label";
import { InputTags } from "@/components/ui/tag-input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { nanoid } from "nanoid";

export const CustomTagInput = ({ field, record, setRecord }: any) => (
  <div className={cn("w-full flex flex-col space-y-2", field?.customClassName)}>
    {field?.name && (
      <Label htmlFor={field.slug} className={cn("text-base font-semibold")}>
        {field.name}{" "}
        {field.required ? <span className="text-destructive">*</span> : ""}
      </Label>
    )}
    <InputTags
      placeholder="Add a tag"
      value={
        record[field.slug]?.length > 0
          ? record[field.slug]
          : field.defaultValue || ""
      }
      onChange={(newTags) => {
        console.log({ newTags });
        const record_1 = { ...record, [field.slug]: newTags };
        setRecord(record_1);
      }}
    />
    <p className="text-xs text-muted-foreground ml-1">
      Add a comma or space to add multiple tags
    </p>
  </div>
);
