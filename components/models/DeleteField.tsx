"use client";
import axios from "axios";
import { allModels, prePath } from "@/lib/schemas";
import { Button } from "../ui/button";
import { CheckCircle, Loader, Trash2 } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";

export const DeleteField = ({ modelSlug, id, callbackFn, field }: any) => {
  const [deleting, setDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteFail, setDeleteFail] = useState(false);
  const [model, setModel] = useState<any>({});

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setModel(allModels.find((model: any) => model.model === modelSlug));
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`/api/v1/dynamic/${modelSlug}/${id}`)
      .then((resp: any) => {
        setData(resp.data);
        setLoading(false);
      })
      .catch(() => {
        setFailed(true);
      });
  };

  const onDelete = () => {
    setDeleting(true);
    axios
      .delete(`/api/v1/dynamic/${modelSlug}/${id}`)
      .then((resp: any) => {
        setDeleting(false);
        setDeleteSuccess(true);
        setTimeout(() => {
          setDeleteSuccess(false);
          if (!callbackFn) {
            window.history.back();
          } else {
            callbackFn();
          }
        }, 2000);
      })
      .catch((err: any) => {
        console.log(err);
        setDeleteFail(true);
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
    <div className="mt-10 max-w-xl mx-auto">
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/${prePath}/${modelSlug}`}
              className="capitalize"
            >
              {modelSlug}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Delete {modelSlug}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className=" border p-4 rounded-md">
        <p className="text-2xl font-semibold">{data[field]}</p>
        <p className="text-muted-foreground font-medium">
          Are you sure to delete this data?
        </p>
        <div className="mt-2 flex flex-row justify-end items-center">
          <Button
            variant={"destructive"}
            onClick={() => onDelete()}
            disabled={deleting || deleteFail || deleteSuccess}
          >
            {deleting && <Loader className="h-4 w-4 mr-2 animate-spin" />}
            {deleting && "Deleting..."}
            {!deleting && !deleteSuccess && !deleteFail && (
              <Trash2 className="w-4 h-4 mr-2" />
            )}
            {!deleting && !deleteSuccess && !deleteFail && "Delete, I'm sure!"}
            {deleteSuccess && <CheckCircle className="h-4 w-4 mr-2" />}
            {deleteSuccess && `${model.name} deleted!`}
            {deleteFail && "Failed to delete!"}
          </Button>
        </div>
      </div>
    </div>
  );
};
