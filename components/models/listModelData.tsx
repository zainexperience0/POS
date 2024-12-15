"use client";
import React, { Fragment, useEffect, useState } from "react";
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
import { ArrowRight, Loader, Pencil, Plus, Trash } from "lucide-react";
import useInfiniteQuery from "@/lib/hooks/useQuery";
import { FilterTools } from "./FilterTools";
import { cn, isoToDate, timeAgo } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { ProductOverView } from "../ProductOverview";
import axios from "axios";

export const ListModelData = ({ modelSlug }: any) => {
  const [graphData, setGraphData] = useState([]);
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

  useEffect(() => {
    axios
      .get(`/api/v1/productgraph`)
      .then((res) => {
        setGraphData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);
  
  // console.log({ data });

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
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold">
              {model.name.toUpperCase()} ({data?.length})
            </h1>
            <FilterTools model={model} setSearchQuery={setSearchQuery} />
          </div>
          <div className="flex justify-end mb-4 gap-x-2 items-center">
            <Link
              href={`/${prePath}/${modelSlug}/create`}
              className={buttonVariants({ variant: "default", size: "sm" })}
            >
              <Plus className="h-5 w-5" />
            </Link>
            <Link href={`/${prePath}/order`}>
              <Button variant={"default"}>
                Order
              </Button>
            </Link>
          </div>
        </>
      )}
      <div className="overflow-x-auto border rounded-md p-2">
        <Table className="min-w-full rounded-lg">
          <TableCaption>A list of your Products</TableCaption>
          <TableHeader>
            <TableRow className="">
              <TableHead className="w-[100px] py-3 px-4 text-left text-sm font-medium">
                No.
              </TableHead>
              <TableHead className="w-[100px] py-3 px-4 text-left text-sm font-medium">
                ID
              </TableHead>
              <TableHead className="py-3 px-4 text-left text-sm font-medium">
                Name
              </TableHead>
              <TableHead className="py-3 px-4 text-left text-sm font-medium">
                Price
              </TableHead>
              <TableHead className="py-3 px-4 text-right text-sm font-medium">
                Quantity
              </TableHead>
              <TableHead className="py-3 px-4 text-right text-sm font-medium">
                Sale Count
              </TableHead>
              <TableHead className="py-3 px-4 text-right text-sm font-medium">
                Total Sales
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
                    {data?.indexOf(item) + 1}
                  </TableCell>
                  <TableCell className="w-[100px] py-4 px-4">
                    {item.nanoId}
                  </TableCell>
                  <TableCell className="py-4 px-4">{item.name}</TableCell>
                  <TableCell className="py-4 px-4">{item.price}</TableCell>
                  <TableCell className="py-4 px-4 text-right">
                    {item.quantity}
                  </TableCell>
                  <TableCell className="py-4 px-4 text-right">
                    {item.salesIndex}
                  </TableCell>
                  <TableCell className="py-4 px-4 text-right">
                    {item.TotalSales}
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
      </div>
      <div className="mt-6">
        <ProductOverView data={graphData}/>
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
