"use client";
import { prePath } from "@/lib/schemas";
import { useEffect, useRef, useState } from "react";
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
import axios from "axios";
import { CheckCircle, Loader, ReceiptText, Trash, X } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { InputWrapper } from "@/components/custom/inputWrapper";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Barcode from "react-barcode";

export const EditOrderField = ({ model, id, callbackFn }: any) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [products, setProducts] = useState<any>([]);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [editing, setEditing] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [editFail, setEditFail] = useState(false);

  const receiptRef = useRef<HTMLDivElement | null>(null);

  const total = orderItems.reduce(
    (acc: any, item: any) => acc + item.price * item.quantity,
    0
  );
  // Print the receipt section
  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
  });

  const fetchProducts = () => {
    setLoading(true);
    axios
      .get(`/api/v1/dynamic/product`)
      .then((resp: any) => {
        setProducts(resp.data);
        setLoading(false);
      })
      .catch((err: any) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    setData((prevData: any) => ({
      ...prevData,
      total,
      orderItems: [JSON.stringify(orderItems)],
    }));
  }, [orderItems]);

  const updateProductQuantities = async () => {
    try {
      await Promise.all(
        orderItems.map((item: any) =>
          axios.put(`/api/v1/dynamic/product/${item.productId}`, {
            quantity:
              parseInt(
                products.find((product: any) => product?.id === item.productId)
                  ?.quantity || 0
              ) - parseInt(item.quantity),
          })
        )
      );
    } catch (error) {
      console.error("Error updating product quantities:", error);
      throw new Error("Failed to update product quantities");
    }
  };

  // console.log({ data, products });
  const updateRecord = async () => {
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
    try {
      await axios.put(`/api/v1/dynamic/${model.model}/${id}`, data);
      await updateProductQuantities();
      setEditing(false);
      setEditSuccess(true);
      resetFields();
      setTimeout(() => {
        if (!callbackFn) {
          window.history.back();
        } else {
          callbackFn();
        }
      }, 2000);
    } catch (error) {
      console.error(error);
      resetFields();
      setEditFail(true);
    }
    setEditing(false);
    setEditSuccess(true);
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
        setOrderItems(JSON.parse(resp.data.orderItems));
        setLoading(false);
      })
      .catch(() => {
        setFailed(true);
      });
  };
  
  const handleOrderItemChange = (productId: string, newQuantity: number) => {
    setOrderItems((prevItems: any[]) => {
      const product = products.find((p: any) => p.id === productId);
      if (!product) return prevItems;
  
      const productCurrentQuantity = parseInt(product.quantity) || 0;
      const currentItemIndex = prevItems.findIndex(
        (item: any) => item.productId === productId
      );
  
      // Check if new quantity is less than zero
      if (newQuantity < 0) {
        alert("Quantity cannot be less than zero.");
        return prevItems;
      }
  
      // Check if the product is out of stock
      if (productCurrentQuantity === 0) {
        alert("This product is currently out of stock.");
        return prevItems;
      }
  
      // Check if new quantity is greater than current available quantity
      if (newQuantity > productCurrentQuantity) {
        alert("Quantity exceeds available stock.");
        return prevItems;
      }
  
      if (currentItemIndex >= 0) {
        const currentQuantity = prevItems[currentItemIndex].quantity;
        const quantityDifference = newQuantity - currentQuantity;
  
        // Check if the change would result in a negative available stock
        if (productCurrentQuantity >= quantityDifference) {
          const updatedItems = [...prevItems];
          updatedItems[currentItemIndex].quantity = newQuantity;
  
          setProducts((prevProducts: any[]) =>
            prevProducts.map((p: any) =>
              p.id === productId
                ? {
                    ...p,
                    quantity: productCurrentQuantity - quantityDifference,
                  }
                : p
            )
          );
  
          return updatedItems;
        } else {
          alert("Not enough stock available.");
          return prevItems;
        }
      } else {
        if (productCurrentQuantity >= newQuantity) {
          setProducts((prevProducts: any[]) =>
            prevProducts.map((p: any) =>
              p.id === productId
                ? { ...p, quantity: productCurrentQuantity - newQuantity }
                : p
            )
          );
  
          return [
            ...prevItems,
            {
              productId,
              quantity: newQuantity,
              name: product.name,
              price: product.price,
            },
          ];
        } else {
          alert("Not enough stock available.");
          return prevItems;
        }
      }
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
      <div className="mt-10 border-b">
        <Popover>
          <PopoverTrigger className="mb-2">
            <Command className="rounded-lg shadow-md border">
              <CommandInput
                placeholder="Type a command or search..."
                className="rounded-t-lg"
              />
              <PopoverContent className="max-h-60 overflow-auto">
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandList>
                  {products.map((product: any) => (
                    <CommandItem
                      className="py-2 flex justify-between"
                      key={product.id}
                      onSelect={() => handleOrderItemChange(product.id, 1)}
                    >
                      {product.name}
                    </CommandItem>
                  ))}
                </CommandList>
              </PopoverContent>
            </Command>
          </PopoverTrigger>
        </Popover>
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableCaption className="text-right font-bold text-lg">
              Total: ${data.total}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4">Name</TableHead>
                <TableHead className="w-1/4">Quantity</TableHead>
                <TableHead className="w-1/4">Original Price</TableHead>
                <TableHead className="w-1/4 text-right">Total Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderItems.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="flex items-center space-x-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() =>
                        handleOrderItemChange(
                          item.productId,
                          Math.max(0, item.quantity - 1)
                        )
                      }
                    >
                      -
                    </Button>
                    <span className="text-center">{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() =>
                        handleOrderItemChange(item.productId, item.quantity + 1)
                      }
                    >
                      +
                    </Button>
                  </TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell className="text-right">
                    ${item.price * item.quantity}
                  </TableCell>
                  <TableCell className="text-right flex items-center ">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleOrderItemChange(item.productId, 0)}
                    >
                      <X />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() =>
                        setOrderItems(orderItems.filter((_, i) => i !== index))
                      }
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
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
      <Button
        className="ml-10 w-full sm:w-auto"
        onClick={() => {
          updateRecord();
          handlePrint();
        }}
      >
        Print <ReceiptText className="h-4 w-4 ml-2" /> and save
      </Button>
      <div className="hidden">
        <div
          ref={receiptRef}
          className="max-w-md mx-auto p-6 shadow-lg rounded-lg"
        >
          <h2 className="text-xl font-bold text-center mb-4">Order Receipt</h2>
          <div className="mb-6 flex justify-center">
            <Barcode value={data.receiptId} />
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
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Order Items:</h3>
            <ul>
              {orderItems.map((item: any, index: number) => (
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
                  <div>
                    <p className="font-semibold">${item.price.toFixed(2)}</p>
                  </div>
                  <p className="font-semibold">
                    ${item.price.toFixed(2) * item.quantity}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Price:</span>
              <span>${total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
