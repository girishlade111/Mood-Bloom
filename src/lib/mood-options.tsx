import type { Mood } from './types';
import { Smile, Meh, Frown, Laugh } from 'lucide-react';
import type * as React from 'react';

// A simple SVG for "Anxious" as lucide-react doesn't have a perfect fit
const AnxiousIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="M8 15s1.5-2 4-2 4 2 4 2" />
        <path d="M9 9l.01.01" />
        <path d="M15 9l.01.01" />
        <path d="M16.5 12.5c0-1.5-1.5-3-4.5-3s-4.5 1.5-4.5 3" />
    </svg>
);


export const moodOptions: {
  value: Mood;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  valueNum: number;
}[] = [
  { value: 'ecstatic', label: 'Ecstatic', icon: Laugh, valueNum: 5 },
  { value: 'happy', label: 'Happy', icon: Smile, valueNum: 4 },
  { value: 'neutral', label: 'Neutral', icon: Meh, valueNum: 3 },
  { value: 'sad', label: 'Sad', icon: Frown, valueNum: 2 },
  { value: 'anxious', label: 'Anxious', icon: AnxiousIcon, valueNum: 1 },
];

export const getMoodOption = (mood: Mood) => moodOptions.find(o => o.value === mood);
