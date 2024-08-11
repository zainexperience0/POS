"use client";
import { allModels } from "@/lib/schemas";
import React, { useEffect, useState } from "react";
import { RenderInput } from "./renderInput";

export const InputWrapper = ({ model, data, setData, action }: any) => {
  const [fields, setFields] = useState<any>([]);
  useEffect(() => {
    const fieldsList = model.fields;
    setFields(fieldsList);
    const defaultData: any = data;
    fieldsList?.forEach((field: any) => {
      if (
        field.backend?.includes(action)
      ) {
        if(action === "create"){
          if (!data[field.slug]) {
            defaultData[field.slug] = field?.valueGetter() 
          }
        }
      }
    });
    setData({ ...data, ...defaultData });
  }, []);

  // console.log({ modelSlug, data, fields });
  return (
    <div>
      {fields[0] &&
        fields
          ?.filter(
            (field: any) =>  field.frontend?.includes(action)
          )
          ?.map((field: any) => (
            <RenderInput
              field={field}
              record={data}
              setRecord={setData}
              key={field.slug}
            />
          ))}
    </div>
  );
};
