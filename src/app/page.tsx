import { Header } from '@/components/mood-bloom/header';
import { MoodJournal } from '@/components/mood-bloom/mood-journal';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <MoodJournal />
      </main>
    </div>
  );
}
