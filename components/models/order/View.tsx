"use client";
import { allModels, prePath } from "@/lib/schemas";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ArrowLeft, Info, Loader, Pencil, Printer, Trash } from "lucide-react";

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
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useReactToPrint } from "react-to-print";
import BarCode  from "react-barcode";
export const ViewOrderField = ({ modelSlug, id }: any) => {
  const [data, setData] = useState<any>({});
  const [model, setModel] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
  });

  const receiptRef = useRef<HTMLDivElement | null>(null);
  

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
    <>
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
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" })
              )}
            >
              <Pencil className="h-4 w-4 mr-2" />
              Update
            </Link>
            <Link
              href={`/${prePath}/${modelSlug}/delete/${data.id}`}
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" })
              )}
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </Link>
          </div>
        </div>
        <p className="text-5xl font-semibold ">{data[model.meta.title]}</p>
        <p className="text-lg text-muted-foreground whitespace-nowrap text-right">
          Updated {timeAgo(data?.updatedAt)}
        </p>
        <Separator className="h-1 w-full my-2" />
        <div className="flex flex-col justify-between  mt-10">
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableCaption className="text-right font-bold text-lg">
                Total: ${data.total}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/4">Number</TableHead>
                  <TableHead className="w-1/4">Name</TableHead>
                  <TableHead className="w-1/4">Quantity</TableHead>
                  <TableHead className="w-1/4">Original Price</TableHead>
                  <TableHead className="w-1/4 text-right">
                    Total Price
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {JSON.parse(data.orderItems).map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="w-1/4">{index + 1}</TableCell>
                    <TableCell className="w-1/4">{item.name}</TableCell>
                    <TableCell className="w-1/4">{item.quantity}</TableCell>
                    <TableCell className="w-1/4">${item.price}</TableCell>
                    <TableCell className="w-1/4 text-right">
                      ${item.price * item.quantity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Button
            variant={"outline"}
            onClick={() => {
              handlePrint();
            }}
            className="mt-4 ml-auto"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
        </div>
      </div>
      <div className="hidden">
        <div
          ref={receiptRef}
          className="max-w-md mx-auto p-6 shadow-lg rounded-lg"
        >
          <h2 className="text-2xl font-bold text-center mb-4">Order Receipt</h2>
          <div className="mb-6 flex justify-center">
            <BarCode value={data.receiptId} />
          </div>
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Customer Name:</span>
              <span>{data.customerName}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Customer Phone:</span>
              <span>{data.customerPhone}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Order Date:</span>
              <span>{isoToDate(data.createdAt)}</span>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Order Items:</h3>
            <ul>
              {JSON.parse(data.orderItems).map((item: any, index: number) => (
                <li
                  key={index}
                  className="flex justify-between p-2 mb-2 rounded-lg shadow-sm transition-colors duration-200"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">${item.price * item.quantity}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Price:</span>
              <span>${data.total}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};