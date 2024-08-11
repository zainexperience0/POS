import { prismaInstance } from "@/lib/prismaInit";
import { NextResponse } from "next/server";

export async function GET() {
    const products = await prismaInstance.product.findMany(
        {
            select: {
                name: true,
                salesIndex: true,
            }
        }
    );
    return NextResponse.json(products);
}