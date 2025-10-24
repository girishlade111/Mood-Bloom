import { Header } from '@/components/mood-bloom/header';
import { MoodJournal } from '@/components/mood-bloom/mood-journal';
import { Footer } from '@/components/mood-bloom/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-grow px-4 sm:px-6 lg:px-8 pb-8">
        <MoodJournal />
      </main>
      <Footer />
    </div>
  );
}
