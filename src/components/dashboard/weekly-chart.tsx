'use client';

import { Bar, BarChart } from 'recharts';
import type { WeeklyChartData } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartXAxis, ChartYAxis } from '@/components/ui/chart';

interface WeeklyChartProps {
  data: WeeklyChartData;
  title: string;
  description: string;
  dataKey: string;
  unit: string;
}

export function WeeklyChart({ data, title, description, dataKey, unit }: WeeklyChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] w-full">
        <ChartContainer config={{}} className="h-full w-full">
          <BarChart data={data} accessibilityLayer>
            <ChartXAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              
            />
            <ChartYAxis
              tickFormatter={(value) => `${value}${unit}`}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
             <ChartTooltip
              cursor={{ fill: 'hsl(var(--muted))' }}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey={dataKey} fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
