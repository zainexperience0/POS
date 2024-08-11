import { nanoid } from "nanoid";

export const prePath = "main";

export const searchTypes = ["email", "name", "phone", "phone"];

export const allModels = [
  {
    name: "Products",
    model: "product",
    meta: {
      title: "name",
    },
    updateField: "updatedAt",
    searchConfig: {
      searchFields: ["name", "nanoId"],
      sortBy: "desc",
      sortField: "createdAt",
    },
    fields: [
      {
        name: "Name",
        slug: "name",
        type: "textInput",
        defaultValue: "",
        required: true, // tells whether this field is required in UI inputs
        dataType: "string", // Schema datatype mapping
        customClassName: "",
        backend: [
          "findFirst",
          "findUnique",
          "findMany",
          "create",
          "update",
          "delete",
        ],
        frontend: ["list", "view", "update", "delete", "create"],
        valueGetter: () => {
          return "";
        },
      },
      {
        name: "id",
        slug: "nanoId",
        type: "textInput",
        defaultValue: "",
        required: true, // tells whether this field is required in UI inputs
        dataType: "string", // Schema datatype mapping
        customClassName: "",
        backend: [
          "findFirst",
          "findUnique",
          "findMany",
          "create",
          "update",
          "delete",
        ],
        frontend: ["list", "view"],
        valueGetter: () => {
          return nanoid(6);
        },
      },
      {
        name: "Price",
        slug: "price",
        type: "numberInput",
        defaultValue: 0,
        required: false,
        dataType: "string",
        customClassName: "",
        backend: [
          "findFirst",
          "findUnique",
          "findMany",
          "create",
          "update",
          "delete",
        ],
        frontend: ["list", "view", "update", "delete", "create"],
        valueGetter: () => {
          return 0;
        },
      },
      {
        name: "salesIndex",
        slug: "salesIndex",
        type: "numberInput",
        defaultValue: 0,
        required: false,
        dataType: "string",
        customClassName: "",
        backend: [
          "findFirst",
          "findUnique",
          "findMany",
          "update",
          "delete",
        ],
        frontend: [],
        valueGetter: () => {
          return 0;
        },
      },
      {
        name: "TotalSales",
        slug: "TotalSales",
        type: "numberInput",
        defaultValue: 0,
        required: false,
        dataType: "string",
        customClassName: "",
        backend: [
          "findFirst",
          "findUnique",
          "findMany",
          "update",
          "delete",
        ],
        frontend: [],
        valueGetter: () => {
          return 0;
        },
      },
      {
        name: "Quantity",
        slug: "quantity",
        type: "numberInput",
        defaultValue: 0,
        required: false,
        dataType: "string",
        customClassName: "",
        backend: [
          "findFirst",
          "findUnique",
          "findMany",
          "create",
          "update",
          "delete",
        ],
        frontend: ["list", "view", "update", "delete", "create"],
        valueGetter: () => {
          return 0;
        },
      },
      {
        name: "Created At",
        slug: "createdAt",
        type: "",
        defaultValue: "",
        required: false,
        dataType: "time",
        customClassName: "",
        backend: ["findFirst", "findUnique", "findMany"],
        frontend: ["list", "view"],
        valueGetter: () => {
          return "";
        },
      },
      {
        name: "Updated At",
        slug: "updatedAt",
        type: "",
        defaultValue: "",
        required: false,
        dataType: "time",
        customClassName: "",
        backend: ["findFirst", "findUnique", "findMany"],
        frontend: ["list", "view"],
        valueGetter: () => {
          return "";
        },
      },
    ],
  },
  {
    name: "Order",
    model: "order",
    meta: {
      title: "name",
    },
    updateField: "updatedAt",
    searchConfig: {
      searchFields: ["name", "nanoId"],
      sortBy: "desc",
      sortField: "createdAt",
    },
    fields: [
      {
        name: "Name",
        slug: "customerName",
        type: "textInput",
        defaultValue: "",
        required: true, // tells whether this field is required in UI inputs
        dataType: "string", // Schema datatype mapping
        customClassName: "",
        backend: [
          "findFirst",
          "findUnique",
          "findMany",
          "create",
          "update",
          "delete",
        ],
        frontend: ["list", "view", "update", "delete", "create"],
        valueGetter: () => {
          return "";
        },
      },
      {
        name: "id",
        slug: "receiptId",
        type: "textInput",
        defaultValue: "",
        required: true, // tells whether this field is required in UI inputs
        dataType: "string", // Schema datatype mapping
        customClassName: "",
        backend: [
          "findFirst",
          "findUnique",
          "findMany",
          "create",
          "update",
          "delete",
        ],
        frontend: ["list", "view"],
        valueGetter: () => {
          return nanoid(6);
        },
      },
      {
        name: "Phone Number",
        slug: "customerPhone",
        type: "phoneInput",
        defaultValue: "",
        required: false,
        dataType: "string",
        customClassName: "",
        backend: [
          "findFirst",
          "findUnique",
          "findMany",
          "create",
          "update",
          "delete",
        ],
        frontend: ["list", "view", "update", "delete", "create"],
        valueGetter: () => {
          return "";
        },
      },
      {
        name: "total",
        slug: "total",
        type: "numberInput",
        defaultValue: 0,
        required: true,
        dataType: "number",
        customClassName: "",
        backend: [
          "findFirst",
          "findUnique",
          "findMany",
          "create",
          "update",
          "delete",
        ],
        frontend: ["list", "view", "update", "delete"],
        valueGetter: () => {
          return 0;
        },
      },
      {
        name: "Created At",
        slug: "createdAt",
        type: "",
        defaultValue: "",
        required: false,
        dataType: "time",
        customClassName: "",
        backend: ["findFirst", "findUnique", "findMany"],
        frontend: ["list", "view"],
        valueGetter: () => {
          return "";
        },
      },
      {
        name: "Updated At",
        slug: "updatedAt",
        type: "",
        defaultValue: "",
        required: false,
        dataType: "time",
        customClassName: "",
        backend: ["findFirst", "findUnique", "findMany"],
        frontend: ["list", "view"],
        valueGetter: () => {
          return "";
        },
      },
      {
        name: "Order Items",
        slug: "orderItems",
        type: "",
        defaultValue: [],
        required: false,
        dataType: "string",
        customClassName: "",
        backend: ["findFirst", "findUnique", "findMany", "create"],
        frontend: ["list", "view"],
        valueGetter: () => {
          return [];
        },
      },
    ],
  },
];
