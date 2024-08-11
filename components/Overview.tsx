"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const graphData = [
  { day: "Sunday", total: 18 },
  { day: "Monday", total: 50 },
  { day: "Tuesday", total: 12 },
  { day: "Wednesday", total: 13 },
  { day: "Thursday", total: 102 },
  { day: "Friday", total: 15 },
  { day: "Saturday", total: 18 },
];

const chartConfig = {
  total: {
    label: "Total",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function Overview({ data }: any) {
  return (
    <Card className="p-4 md:p-6 lg:p-8">
      <CardHeader className="mb-4">
        <CardTitle className="text-xl font-semibold">
          Total Sales - Chart
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          Showing total Sales for the last 7 days
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <ChartContainer
          config={chartConfig}
          className="w-full h-[300px] lg:h-[400px]"
        >
          <AreaChart
            data={data}
            margin={{ left: 12, right: 12 }}
            className="w-full h-full"
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="day"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
              tick={{ fontSize: 12, fill: "#666" }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="total"
              type="natural"
              fill="#4a90e2"
              fillOpacity={0.3}
              stroke="#4a90e2"
              strokeWidth={2}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-col md:flex-row justify-between items-start text-sm text-gray-700">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <div className="flex items-center gap-2 font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
        </div>
        <div className="text-muted-foreground">
          Total sales for the last 7 days
        </div>
      </CardFooter>
    </Card>
  );
}
