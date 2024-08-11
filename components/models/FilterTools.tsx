import { Search, Settings2 } from "lucide-react";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { MultiSelectToogle } from "../custom/FieldList/MultiSelectToogle";
import { Separator } from "../ui/separator";
import { ToogleInputField } from "../custom/FieldList/ToogleInputField";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export const FilterTools = ({ model, setSearchQuery }: any) => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [fields, setFields] = useState<any>(
    model.searchConfig?.searchFields || []
  );
  const [sortField, setSortField] = useState<any>(
    model.searchConfig?.sortField
  );
  const [sortBy, setSortBy] = useState<any>(
    model.searchConfig?.sortBy || "desc"
  );

  const [openfilter, setOpenFilter] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        setSearchQuery(query);
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [query]);

  useEffect(() => {
    setQuery(
      `${search?.length > 0 ? `&s=${search}` : ""}${
        fields?.length > 0 ? `&fields=${fields.join(",")}` : ""
      }${sortField?.length > 0 ? `&sortfield=${sortField}` : ""}${
        sortBy?.length > 0 ? `&sortby=${sortBy}` : ""
      }`
    );
  }, [search, fields, sortBy, sortField, query]);

  return (
    <div className="flex flex-row items-center space-x-4">
      <div className="flex flex-row items-center  border rounded-lg p-[2px] bg-secondary min-w-[400px]">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 "
        />
        <Button
          variant={"secondary"}
          size={"sm"}
          className="rounded-lg"
          onClick={() => setSearchQuery(query)}
        >
          <Search className=" w-5 h-5" />
        </Button>
      </div>
      <Dialog open={openfilter} onOpenChange={setOpenFilter}>
        <DialogTrigger className={buttonVariants({ variant: "secondary" })}>
          <Settings2 className="w-5 h-5" />
        </DialogTrigger>
        <DialogContent className="p-6 min-h-[300px] overflow-hidden space-y-2">
          <DialogTitle>Filters</DialogTitle>
          <MultiSelectToogle
            field={{
              slug: "fields",
              name: "Search in:",
              required: false,
              defaultValue: model.searchConfig?.searchFields,
              options: model.fields
                .filter(
                  (f: any) =>
                    ["string", "array"].includes(f.dataType) &&
                    model.searchConfig?.searchFields?.includes(f.slug)
                )
                .map((field: any) => ({ value: field.slug, name: field.name })),
            }}
            record={{ fields }}
            setRecord={(newRecord: any) => setFields(newRecord.fields)}
          />
          <Separator />
          <ToogleInputField
            field={{
              slug: "sortby",
              name: "Sort by:",
              required: false,
              defaultValue: model.searchConfig?.sortBy || "desc",
              options: [
                { name: "Ascending", value: "asc" },
                { name: "Descending", value: "desc" },
              ],
            }}
            record={{ sortby: sortBy }}
            setRecord={(newRecord: any) => setSortBy(newRecord.sortby)}
          />
          <ToogleInputField
            field={{
              slug: "sortfield",
              name: "Sort field:",
              required: false,
              defaultValue: model.searchConfig?.sortField || "",
              options: model.fields
                .filter((f: any) => ["string", "time"].includes(f.dataType))
                .map((field: any) => ({ value: field.slug, name: field.name })),
            }}
            record={{ sortfield: sortField }}
            setRecord={(newRecord: any) => setSortField(newRecord.sortfield)}
          />

          <Button
            onClick={() => {
              setSearchQuery(query);
              setOpenFilter(false);
            }}
          >
            Apply filters
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
