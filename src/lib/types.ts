export type Mood = 'ecstatic' | 'happy' | 'neutral' | 'sad' | 'anxious';

export interface JournalEntry {
  id: string;
  date: Date;
  mood: Mood;
  notes: string;
}
