"use client";

import { useState, useEffect } from 'react';
import type { JournalEntry } from '@/lib/types';
import { JournalEntryForm } from './journal-entry-form';
import { JournalLog } from './journal-log';
import { MoodTrends } from './mood-trends';
import { AIInsights } from './ai-insights';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BrainCircuit, Book, BarChart } from 'lucide-react';

export function MoodJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const savedEntries = localStorage.getItem('mood-bloom-entries');
      if (savedEntries) {
        setEntries(JSON.parse(savedEntries, (key, value) => {
            if (key === 'date') return new Date(value);
            return value;
        }));
      }
    } catch (error) {
        console.error("Failed to load entries from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if(isClient) {
        try {
            localStorage.setItem('mood-bloom-entries', JSON.stringify(entries));
        } catch(error) {
            console.error("Failed to save entries to localStorage", error);
        }
    }
  }, [entries, isClient]);

  const addEntry = (entry: Omit<JournalEntry, 'id' | 'date'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: Date.now().toString(),
      date: new Date(),
    };
    setEntries(prev => [newEntry, ...prev]);
  };

  if (!isClient) {
    return null; // Or a loading spinner
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-7xl mx-auto">
      <div className="md:col-span-2">
        <Card className="shadow-lg bg-card/80 backdrop-blur-sm border-border/50 sticky top-8">
          <CardHeader>
            <CardTitle>How are you today?</CardTitle>
            <CardDescription>Record your mood and thoughts.</CardDescription>
          </CardHeader>
          <CardContent>
            <JournalEntryForm onAddEntry={addEntry} />
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-3">
        <Tabs defaultValue="log" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3">
            <TabsTrigger value="log"><Book className="w-4 h-4 mr-2" />Journal Log</TabsTrigger>
            <TabsTrigger value="trends"><BarChart className="w-4 h-4 mr-2" />Mood Trends</TabsTrigger>
            <TabsTrigger value="insights"><BrainCircuit className="w-4 h-4 mr-2" />AI Insights</TabsTrigger>
          </TabsList>
          <TabsContent value="log">
            <JournalLog entries={entries} />
          </TabsContent>
          <TabsContent value="trends">
            <MoodTrends entries={entries} />
          </TabsContent>
          <TabsContent value="insights">
            <AIInsights entries={entries} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
