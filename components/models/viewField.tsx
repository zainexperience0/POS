"use client";
import { allModels, prePath } from "@/lib/schemas";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, Info, Loader, Pencil, Trash } from "lucide-react";
import { Separator } from "../ui/separator";
import { cn, isoToDate, timeAgo } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";

export const ViewField = ({ modelSlug, id }: any) => {
  const [data, setData] = useState<any>({});
  const [model, setModel] = useState<any>({});
  const [loading, setLoading] = useState(true);
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

  if (!data?.id) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center ">
        <div className="flex flex-row space-x-2 items-center justify-center">
          <Info className="h-8 w-8 text-muted-foreground" />
          <p className="text-2xl text-muted-foreground">
            This page doesn&apos;t exist!
          </p>
        </div>
        <Link
          className={cn(buttonVariants({ variant: "secondary" }), "mt-4")}
          href={`/${prePath}/${modelSlug}`}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto my-10 px-4">
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${prePath}/${modelSlug}`}>
              {model.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{data[model.meta.title]}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-row justify-between items-center">
        <p className="text-xl text-muted-foreground">
          {isoToDate(data?.createdAt)}
        </p>
        <div className="flex flex-row items-center justify-end space-x-2">
          <Link
            href={`/${prePath}/${modelSlug}/edit/${data.id}`}
            className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
          >
            <Pencil className="h-4 w-4 mr-2" />
            Update
          </Link>
          <Link
            href={`/${prePath}/${modelSlug}/delete/${data.id}`}
            className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </Link>
        </div>
      </div>
      <p className="text-5xl font-semibold ">{data[model.meta.title]}</p>

      <Separator className="h-1 w-full my-2" />
      <div className="flex flex-row justify-between  mb-10">
        <p className="text-lg text-muted-foreground whitespace-nowrap">
          Updated {timeAgo(data?.updatedAt)}
        </p>
      </div>
    </div>
  );
};