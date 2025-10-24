import { Leaf } from 'lucide-react';

export function Header() {
  return (
    <header className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <div className="bg-primary p-2 rounded-lg shadow-md">
          <Leaf className="h-6 w-6 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold text-foreground font-headline">
          Mood Bloom
        </h1>
      </div>
    </header>
  );
}
