"use client";
import { prePath } from "@/lib/schemas";
import { useEffect, useState } from "react";
import { InputWrapper } from "../custom/inputWrapper";
import { Button } from "../ui/button";
import axios from "axios";
import { CheckCircle, Loader } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const EditField = ({ model, id, callbackFn }: any) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const [editing, setEditing] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [editFail, setEditFail] = useState(false);

  const updateRecord = () => {
    const requiredFields = model.fields?.filter(
      (field: any) => field.required && field.dataType !== "relation"
    );

    if (requiredFields?.length > 0) {
      const isEmptyRecord = requiredFields.find(
        (field: any) =>
          data[field.slug] === undefined || data[field.slug] === ""
      );
      if (isEmptyRecord) {
        alert(`Please fill all required fields. 
            ${JSON.stringify(
              requiredFields?.map((field: any) => field.name)
            )}`);
        return;
      }
    }

    setEditing(true);
    axios
      .put(`/api/v1/dynamic/${model.model}/${id}`, data)
      .then((resp: any) => {
        setEditing(false);
        setEditSuccess(true);
        setTimeout(() => {
          resetFields();
          if (!callbackFn) {
            window.history.back();
          } else {
            callbackFn();
          }
        }, 2000);
      })
      .catch((err: any) => {
        console.log(err);
        setEditFail(true);
      });
  };

  const resetFields = () => {
    setEditing(false);
    setEditSuccess(false);
    setEditFail(false);
    // setData([]);
  };

  useEffect(() => {
    // setModel(allModels.find((model: any) => model.model === model.model));
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`/api/v1/dynamic/${model.model}/${id}`)
      .then((resp: any) => {
        setData(resp.data);
        setLoading(false);
      })
      .catch(() => {
        setFailed(true);
      });
  };

  if (!model) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center">
        <p className="text-destructive text-2xl font-semibold">
          Page not found!
        </p>
      </div>
    );
  }

  if (failed) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center">
        <p className="text-destructive text-2xl font-semibold">
          Failed to get data!
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center">
        <Loader className="mx-auto animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto my-10 px-2">
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${prePath}/${model.model}`}>
              {model.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit {model.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <InputWrapper
        model={model}
        data={data}
        setData={setData}
        action={"update"}
      />
      <Button
        onClick={() => {
          updateRecord();
        }}
        disabled={editing || editFail || editSuccess}
      >
        {editing && <Loader className="h-4 w-4 mr-2 animate-spin" />}
        {editing && "Saving..."}
        {!editing && !editSuccess && !editFail && "Save changes"}
        {editSuccess && <CheckCircle className="h-4 w-4 mr-2" />}
        {editSuccess && `${model.name} saved!`}
        {editFail && "Failed to update!"}
      </Button>
    </div>
  );
};