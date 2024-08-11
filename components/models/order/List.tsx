"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { allModels, prePath } from "@/lib/schemas";
import {
  ArrowRight,
  BarChart2,
  Loader,
  Pencil,
  Plus,
  Trash,
} from "lucide-react";
import useInfiniteQuery from "@/lib/hooks/useQuery";
import { cn, isoToDate, timeAgo } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { FilterTools } from "../FilterTools";

export const ListOrderData = ({ modelSlug }: any) => {
  const [searchQuery, setSearchQuery] = useState(
    `&sortby=desc&sortfield=${
      allModels.find((model) => model.model === modelSlug)?.searchConfig
        ?.sortField
    }`
  );

  const { data, isLoading, isFailed, isEnd } = useInfiniteQuery({
    modelSlug,
    searchQuery,
  });
  const [loading, setLoading] = useState(true);
  const [model, setModel] = useState<any>({});

  const totalSales = data?.reduce(
    (acc: any, curr: any) => acc + curr?.total,
    0
  );

  useEffect(() => {
    setModel(allModels.find((model) => model.model === modelSlug));

    const fields = model.searchConfig?.searchFields;
    const sortField = model.searchConfig?.sortField;
    const sortBy = model.searchConfig?.sortBy;
    const search = "";
    setSearchQuery(
      `${search?.length > 0 ? `&s=${search}` : ""}${
        fields?.length > 0 ? `&fields=${fields.join(",")}` : ""
      }${sortField?.length > 0 ? `&sortfield=${sortField}` : ""}${
        sortBy?.length > 0 ? `&sortby=${sortBy}` : ""
      }`
    );
    setLoading(false);
  }, [modelSlug]);

  if (!model) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center">
        <p className="text-destructive text-2xl font-semibold">
          Page not found!
        </p>
      </div>
    );
  }

  if (isFailed) {
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
    <div className="mt-10 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {model?.name && (
        <>
          <div className="mb-10 text-center flex items-center justify-between flex-col md:flex-row">
            <h1 className="text-3xl font-bold">
              {model.name.toUpperCase()} ({data?.length})
            </h1>
            <FilterTools model={model} setSearchQuery={setSearchQuery} />
          </div>
          <div className="flex justify-between mb-4">
            <Link
              href={`/${prePath}/${modelSlug}/analytics`}
              className={buttonVariants({ variant: "default", size: "sm" })}
            >
              <BarChart2 className="h-5 w-5" />
              Analytics
            </Link>
            <Link
              href={`/${prePath}/${modelSlug}/create`}
              className={buttonVariants({ variant: "default", size: "sm" })}
            >
              <Plus className="h-5 w-5" />
            </Link>
          </div>
        </>
      )}
      <div className="overflow-x-auto border rounded-md p-2">
        <Table className="min-w-full rounded-lg">
          <TableCaption>A list of your Orders</TableCaption>
          <TableHeader>
            <TableRow className="">
              <TableHead className="w-[100px] py-3 px-4 text-left text-sm font-medium">
                No.
              </TableHead>
              <TableHead className="w-[100px] py-3 px-4 text-left text-sm font-medium">
                ID
              </TableHead>
              <TableHead className="py-3 px-4 text-left text-sm font-medium">
                Customer Name
              </TableHead>
              <TableHead className="py-3 px-4 text-left text-sm font-medium">
                Total
              </TableHead>
              <TableHead className="py-3 px-4 text-right text-sm font-medium">
                CustomerPhone
              </TableHead>
              <TableHead className="py-3 px-4 text-right text-sm font-medium">
                CreatedAt
              </TableHead>
              <TableHead className="py-3 px-4 text-right text-sm font-medium">
                UpdatedAt
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item: any) => (
              <>
                <TableRow key={item.id} className="border-b">
                  <TableCell className="w-[100px] py-4 px-4">
                    {data.indexOf(item) + 1}
                  </TableCell>
                  <TableCell className="w-[100px] py-4 px-4">
                    {item.receiptId}
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    {item.customerName}
                  </TableCell>
                  <TableCell className="py-4 px-4">{item.total}</TableCell>
                  <TableCell className="py-4 px-4 text-right">
                    {item.customerPhone}
                  </TableCell>
                  <TableCell className="py-4 px-4 text-right">
                    {isoToDate(item.createdAt)}
                  </TableCell>
                  <TableCell className="py-4 px-4 text-right">
                    {timeAgo(item.updatedAt)}
                  </TableCell>
                  <TableCell className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/${prePath}/${modelSlug}/edit/${item.id}`}
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" })
                        )}
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/${prePath}/${modelSlug}/delete/${item.id}?deletekey=title`}
                        className={cn(
                          buttonVariants({ variant: "destructive", size: "sm" })
                        )}
                      >
                        <Trash className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/${prePath}/${modelSlug}/view/${item.id}`}
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" })
                        )}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
        <h1 className="text-right text-muted-foreground text-xl font-extrabold">
          Total Sales: {totalSales}$
        </h1>
      </div>
      <div className="mt-6">
        {isLoading && (
          <div className="flex justify-center">
            <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
          </div>
        )}
        {isEnd && (
          <p className="text-muted-foreground text-center">All caught up!</p>
        )}
      </div>
    </div>
  );
};
