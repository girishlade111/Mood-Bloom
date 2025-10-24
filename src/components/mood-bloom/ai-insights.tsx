"use client";

import { useState } from 'react';
import type { JournalEntry } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateMoodInsights } from '@/ai/flows/generate-mood-insights';
import { Sparkles, Loader2, Wand2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from '../ui/scroll-area';

type AIInsightsProps = {
  entries: JournalEntry[];
};

export function AIInsights({ entries }: AIInsightsProps) {
  const [insights, setInsights] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateInsights = async () => {
    if (entries.length < 3) {
      toast({
        title: "Not enough entries",
        description: "Please add at least 3 journal entries to generate insights.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setInsights('');

    try {
      const journalEntriesText = entries
        .map(e => `Date: ${e.date.toISOString()}\nMood: ${e.mood}\nNotes: ${e.notes}`)
        .join('\n\n---\n\n');

      const result = await generateMoodInsights({ journalEntries: journalEntriesText });
      setInsights(result.insights);
    } catch (error) {
      console.error("Failed to generate insights:", error);
      toast({
        title: "Error generating insights",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>AI-Powered Insights</CardTitle>
        <CardDescription>Discover patterns and reflections from your journal.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleGenerateInsights} disabled={isLoading || entries.length < 3} className="w-full">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Generate Insights {entries.length < 3 && `(${entries.length}/3 entries)`}
        </Button>
        <ScrollArea className="h-[360px] pr-4">
            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                    <p className='font-semibold'>Generating your insights...</p>
                    <p className='text-sm text-muted-foreground'>This may take a moment.</p>
                </div>
            ) : insights ? (
              <div className="p-4 bg-accent/50 rounded-lg border">
                <h3 className="font-semibold mb-2 flex items-center gap-2"><Wand2 className="w-4 h-4" />Your Personalized Reflections</h3>
                <p className="text-sm whitespace-pre-wrap font-sans">{insights}</p>
              </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-[360px] text-center p-8 border-dashed border-2 rounded-lg bg-muted/50">
                    <Sparkles className="w-10 h-10 mb-4 text-muted-foreground" />
                    <p className="font-semibold text-lg">Your insights will appear here</p>
                    <p className="text-muted-foreground">You need at least 3 entries to get started.</p>
                </div>
            )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
