import { prismaInstance } from "@/lib/prismaInit";
import { NextResponse } from "next/server";

export async function GET() {
  const orders = await prismaInstance.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      total: true,
      createdAt: true,
    },
  });

  // Initialize graphData with days of the week and total set to 0
  const graphData = [
    { day: "Sunday", total: 0 },
    { day: "Monday", total: 0 },
    { day: "Tuesday", total: 0 },
    { day: "Wednesday", total: 0 },
    { day: "Thursday", total: 0 },
    { day: "Friday", total: 0 },
    { day: "Saturday", total: 0 },
  ];

  // Iterate through each order
  for (const order of orders) {
    // Get the day index (0 for Sunday, 6 for Saturday)
    const dayIndex = new Date(order.createdAt).getDay();

    // Add the order total to the corresponding day in graphData
    graphData[dayIndex].total += order.total || 0;
  }

  // Return the graphData as a JSON response
  return NextResponse.json(graphData);
}
