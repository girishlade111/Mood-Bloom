"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { getMoodOption, moodOptions } from '@/lib/mood-options';
import { Card, CardContent } from "@/components/ui/card";

const chartConfig = {
  mood: {
    label: "Mood Score",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

type MoodTrendsChartProps = {
  data: { date: string; mood: number }[];
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const moodOption = getMoodOption(moodOptions.find(mo => mo.valueNum === data.mood)?.value!);
      const Icon = moodOption?.icon;
  
      return (
        <Card>
            <CardContent className="p-3 flex items-center gap-3">
            {Icon && <Icon className="w-8 h-8"/>}
            <div>
                <p className="font-bold">{moodOption?.label}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          </CardContent>
        </Card>
      );
    }
  
    return null;
  };

export function MoodTrendsChart({ data }: MoodTrendsChartProps) {
  return (
    <div className="h-[450px] w-full">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              domain={[0, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tickFormatter={(value) => moodOptions.find(o => o.valueNum === value)?.label.slice(0, 3) ?? ''}
              width={35}
            />
            <RechartsTooltip cursor={{ fill: 'hsl(var(--accent))', radius: 'var(--radius)' }} content={<CustomTooltip />} />
            <Bar dataKey="mood" fill="var(--color-mood)" radius={4} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
