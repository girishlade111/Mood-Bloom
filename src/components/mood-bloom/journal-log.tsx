"use client";

import { useState } from 'react';
import type { JournalEntry } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getMoodOption } from '@/lib/mood-options';
import { Calendar as CalendarIcon, Info } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type JournalLogProps = {
  entries: JournalEntry[];
};

export function JournalLog({ entries }: JournalLogProps) {
  const [date, setDate] = useState<Date | undefined>();

  const filteredEntries = entries.filter(entry => 
    !date || format(entry.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
  );

  return (
    <Card className="bg-transparent border-0 shadow-none">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
                <CardTitle>Your Journal</CardTitle>
                <CardDescription>A log of your daily reflections.</CardDescription>
            </div>
            <div className='flex gap-2 items-center'>
                {date && <Button variant="ghost" size="sm" onClick={() => setDate(undefined)}>Clear</Button>}
                <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                        "w-full sm:w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Filter by date</span>}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[450px] pr-4">
          {filteredEntries.length > 0 ? (
            <div className="space-y-4">
              {filteredEntries.map(entry => {
                const moodOption = getMoodOption(entry.mood);
                const Icon = moodOption?.icon;
                return (
                  <Card key={entry.id} className="bg-muted/50">
                    <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                            {Icon && <Icon className="w-10 h-10 mt-1 flex-shrink-0" />}
                            <div className="flex-1">
                                <div className="flex justify-between items-center flex-wrap gap-2">
                                    <p className="font-semibold text-lg">{moodOption?.label}</p>
                                    <p className="text-sm text-muted-foreground">{format(entry.date, 'PPp')}</p>
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">{entry.notes}</p>
                            </div>
                        </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[450px] text-center p-8 border-dashed border-2 rounded-lg bg-muted/50">
              <Info className="w-10 h-10 mb-4 text-muted-foreground" />
              <p className="font-semibold text-lg">No Entries Found</p>
              <p className="text-muted-foreground">
                {date ? `No entries for ${format(date, "PPP")}.` : 'Start by adding your mood for today!'}
              </p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
