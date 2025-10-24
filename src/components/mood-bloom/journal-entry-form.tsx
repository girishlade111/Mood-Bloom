"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import type { JournalEntry } from '@/lib/types';
import { moodOptions } from '@/lib/mood-options';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  mood: z.enum(['ecstatic', 'happy', 'neutral', 'sad', 'anxious'], {
    required_error: "Please select your mood.",
  }),
  notes: z.string().min(3, "Notes must be at least 3 characters.").max(1000, "Notes are too long."),
});

type JournalEntryFormProps = {
  onAddEntry: (entry: Omit<JournalEntry, 'id' | 'date'>) => void;
};

export function JournalEntryForm({ onAddEntry }: JournalEntryFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddEntry(values);
    form.reset();
    toast({
      title: "Entry Saved!",
      description: "Your mood has been recorded.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="mood"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>How are you feeling?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-5 gap-2"
                >
                  {moodOptions.map(({ value, label, icon: Icon }) => (
                    <FormItem key={value} className="flex flex-col items-center space-y-2">
                       <FormControl>
                          <RadioGroupItem value={value} id={value} className="sr-only" />
                       </FormControl>
                       <Label
                         htmlFor={value}
                         className={cn(
                           "flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer w-full aspect-square transition-all",
                           field.value === value && "border-primary bg-primary/20 shadow-md"
                         )}
                       >
                         <Icon className="w-8 h-8 mb-2" />
                         <span className="text-xs text-center font-semibold">{label}</span>
                       </Label>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add some notes</FormLabel>
              <FormControl>
                <Textarea rows={4} placeholder="What's on your mind? Activities, thoughts, feelings..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Save Entry</Button>
      </form>
    </Form>
  );
}
