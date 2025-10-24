'use server';

/**
 * @fileOverview A mood insights generation AI agent.
 *
 * - generateMoodInsights - A function that handles the mood insights generation process.
 * - GenerateMoodInsightsInput - The input type for the generateMoodInsights function.
 * - GenerateMoodInsightsOutput - The return type for the generateMoodInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMoodInsightsInputSchema = z.object({
  journalEntries: z
    .string()
    .describe("A string containing all of the user's journal entries."),
});
export type GenerateMoodInsightsInput = z.infer<typeof GenerateMoodInsightsInputSchema>;

const GenerateMoodInsightsOutputSchema = z.object({
  insights: z.string().describe('Personalized insights and reflections based on the journal entries.'),
});
export type GenerateMoodInsightsOutput = z.infer<typeof GenerateMoodInsightsOutputSchema>;

export async function generateMoodInsights(input: GenerateMoodInsightsInput): Promise<GenerateMoodInsightsOutput> {
  return generateMoodInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMoodInsightsPrompt',
  input: {schema: GenerateMoodInsightsInputSchema},
  output: {schema: GenerateMoodInsightsOutputSchema},
  prompt: `You are a mood insights expert. Analyze the following journal entries and provide personalized insights and reflections to better understand mood patterns and triggers.\n\nJournal Entries: {{{journalEntries}}}`,
});

const generateMoodInsightsFlow = ai.defineFlow(
  {
    name: 'generateMoodInsightsFlow',
    inputSchema: GenerateMoodInsightsInputSchema,
    outputSchema: GenerateMoodInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
