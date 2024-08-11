import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

export const MultiSelectToogle = ({ field, record, setRecord }: any) => (
  <div className="w-full flex flex-col space-y-2">
    {field?.name && (
      <Label
        htmlFor={field.slug}
        className={cn("text-base font-semibold", field?.customClassName)}
      >
        {field.name}{" "}
        {field.required ? <span className="text-destructive">*</span> : ""}
      </Label>
    )}
    <ToggleGroup
      type="multiple"
      variant={"outline"}
      id={field.slug}
      // value={record[field.slug]}
      value={record[field.slug]}
      onValueChange={(e) => {
        const record_1 = { ...record, [field.slug]: e };
        setRecord(record_1);
      }}
      className="flex flex-row items-center justify-start "
    >
      {field?.options?.map((option: any, i: any) => (
        <ToggleGroupItem
          key={i + 1}
          value={option?.value ? option?.value : option}
          className="font-light capitalize h-8 mr-2"
        >
          {option?.value ? option?.name || option?.value : option}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  </div>
);
