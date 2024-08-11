// GET
// baseurl/api/v1/dynamic/model_name      return all records

import { prismaInstance } from "@/lib/prismaInit";
import { allModels } from "@/lib/schemas";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, params: any) {
  const model_name = params["params"]["route"][0];
  const id = params["params"]["route"][1];
  const url = new URL(req.url);
  const page = (url.searchParams.get("page") as any) || 1;
  const search = url.searchParams.get("s") as any;
  const equal = url.searchParams.get("eq") as any;
  const fields = url.searchParams.get("fields") as any;
  const sortBy = url.searchParams.get("sortby") as any;
  const sortField = url.searchParams.get("sortfield") as any;

  // console.log({ model_name, id, page, search, fields });

  const schema = allModels.find((model) => model.model === model_name);
  if (!schema?.model) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }
  let selectObj: any = {};

  // baseurl/api/v1/dynamic/model_name/id    return a single record
  if (id) {
    //@ts-ignore

    schema.fields
      ?.filter((field: any) => field.backend?.includes("findUnique"))
      ?.map((field) => {
        selectObj[field.slug] = true;
      });

    const data = await prismaInstance[model_name].findUnique({
      where: { id },
      select: { ...selectObj, id: true },
    });
    return NextResponse.json(data, { status: 200 });
  }

  schema.fields
    ?.filter((field: any) => field.backend?.includes("findMany"))
    ?.map((field) => {
      selectObj[field.slug] = true;
    });

  const obj: any = {};

  if (page) {
    obj["skip"] = parseInt(page) * 5 - 5;
    obj["take"] = 5;
  }

  if (equal === "true") {
    obj.where = {
      OR: [],
    };
    if (fields) {
      const fields_1 = fields.split(",");
      fields_1.forEach((field: any) => {
        obj.where.OR.push({
          [field]: url.searchParams.get(field) || "",
        });
      });
    }
  } else if (search) {
    obj.where = {
      OR: [],
    };
    if (fields) {
      const fields_1 = fields.split(",");
      const stringFields = schema.fields
        .filter(
          (field: any) =>
            field.dataType === "string" && fields_1.includes(field.slug)
        )
        ?.map((field: any) => field.slug);
      const arrayFields = schema.fields
        .filter(
          (field: any) =>
            field.dataType === "array" && fields_1.includes(field.slug)
        )
        ?.map((field: any) => field.slug);
      stringFields.forEach((field: any) => {
        obj.where.OR.push({
          [field]: {
            contains: search,
            mode: "insensitive",
          },
        });
      });
      arrayFields.forEach((field: any) => {
        obj.where.OR.push({
          [field]: {
            has: search,
          },
        });
      });
    }
  }

  if (sortBy && sortField) {
    obj["orderBy"] = {
      [sortField]: sortBy,
    };
  }

  // console.log(JSON.stringify(obj));

  const data = await prismaInstance[model_name].findMany({
    select: { ...selectObj, id: true },
    ...obj,
  });
  // console.log(JSON.stringify(selectObj));

  return NextResponse.json(data, { status: 200 });
}

// POST
// baseurl/api/v1/dynamic/model_name      create a record
export async function POST(req: NextRequest, params: any) {
  const model_name = params["params"]["route"][0];
  const data_0 = await req.json();
  const schema = allModels.find((model) => model.model === model_name);
  if (!schema?.model) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  let data_2: any = {};

  const createFields = schema.fields
    ?.filter((field: any) => field.backend.includes("create"))
    ?.map((field) => {
      if (field?.required) {
        data_2[field.slug] = data_0[field.slug];
      } else {
        data_2[field.slug] = data_0[field.slug] || "";
      }
      return { slug: field.slug, value: data_0[field.slug] };
    });

    console.log(JSON.stringify(createFields));

  if (createFields.filter((v: any) => !v.value)?.length !== 0) {
    return NextResponse.json(
      {
        error: `Required fields are missing. ${createFields
          .filter((v: any) => !v.value).map((v:any) => v.slug)
          ?.join(" , ")}`,
      },
      { status: 404 }
    );
  }

  console.log(JSON.stringify(data_2));

  //@ts-ignore
  const data = await prismaInstance[model_name].create({ data: data_2 });
  return NextResponse.json(data, { status: 200 });
}

// PUT
// baseurl/api/v1/dynamic/model_name/id    update a record

export async function PUT(req: NextRequest, params: any) {
  const model_name = params["params"]["route"][0];
  const id = params["params"]["route"][1];
  const data_0 = await req.json();

  const schema: any = allModels.find((model) => model.model === model_name);
  if (!schema?.model) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  let data_2: any = {};
  const fields = schema.fields.map((field: any) => {
    return field.slug;
  });
  Object.keys(data_0).map((key) => {
    if (fields.includes(key)) {
      data_2[key] = data_0[key];
    }
  });

  const updateFields = schema.fields
    ?.filter((field: any) => field.backend.includes("update"))
    ?.map((field: any) => {
      data_2[field.slug] = data_0[field.slug];
    });

  if (schema.updateField) {
    data_2[schema.updateField] = new Date();
  }

  if (updateFields.length === 0) {
    return NextResponse.json(
      { error: "Update operation not allowed" },
      { status: 404 }
    );
  }

  //@ts-ignore
  const data = await prismaInstance[model_name].update({
    where: { id },
    data: data_2,
  });
  return NextResponse.json(data, { status: 200 });
}

// DELETE
// baseurl/api/v1/dynamic/model_name/id    delete a record
export async function DELETE(req: NextRequest, params: any) {
  const model_name = params["params"]["route"][0];
  const id = params["params"]["route"][1];
  // console.log(model_name, id);

  const schema = allModels.find((model) => model.model === model_name);
  if (!schema?.model) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  const checkField = schema.fields?.filter((field: any) =>
    field.backend.includes("delete")
  );

  if (!checkField) {
    return NextResponse.json(
      { error: "Delete operation not allowed" },
      { status: 404 }
    );
  }
  try {
    //@ts-ignore
    const data = await prismaInstance[model_name].delete({ where: { id } });
    return NextResponse.json({ message: "deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 404 });
  }
}

export const OPTIONS = () => NextResponse.json({});
