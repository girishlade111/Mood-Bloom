"use client";

import type { JournalEntry } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MoodTrendsChart } from './mood-trends-chart';
import { useMemo } from 'react';
import { moodOptions } from '@/lib/mood-options';
import { BarChart } from 'lucide-react';

type MoodTrendsProps = {
  entries: JournalEntry[];
};

export function MoodTrends({ entries }: MoodTrendsProps) {
  const chartData = useMemo(() => {
    return entries.slice().reverse().map(entry => ({
      date: entry.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      mood: moodOptions.find(o => o.value === entry.mood)?.valueNum ?? 0,
    })).slice(-30); // Show last 30 entries
  }, [entries]);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Mood Trends</CardTitle>
        <CardDescription>Your mood fluctuations over the last 30 entries.</CardDescription>
      </CardHeader>
      <CardContent>
        {entries.length > 1 ? (
          <MoodTrendsChart data={chartData} />
        ) : (
            <div className="flex flex-col items-center justify-center h-[450px] text-center p-8 border-dashed border-2 rounded-lg bg-muted/50">
                <BarChart className="w-10 h-10 mb-4 text-muted-foreground" />
                <p className="font-semibold text-lg">Not Enough Data</p>
                <p className="text-muted-foreground">Keep journaling to see your mood patterns!</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
