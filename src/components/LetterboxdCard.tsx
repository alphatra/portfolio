import * as React from 'react';
import { cn } from '@/lib/utils';
import { Film } from 'lucide-react'; // Using Film icon as placeholder

export function LetterboxdCard() {
  const letterboxdUrl = 'https://letterboxd.com/your-username'; // <-- Replace with your actual Letterboxd URL

  return (
    <a
      href={letterboxdUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'minimal-block flex flex-col items-start justify-between p-6 h-full group',
        'transition-colors hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-neon-blue/75 focus:rounded-sm'
      )}
    >
      <div>
        <Film className="w-6 h-6 mb-3 text-orange-500" /> {/* Letterboxd-ish Orange */}
        <h3 className="text-lg font-semibold mb-1 text-foreground">Letterboxd</h3>
        <p className="text-sm text-foreground/60">My recent film activity.</p>
      </div>
      <span className="text-sm accent-underline self-end mt-3">
        View Profile →
      </span>
    </a>
  );
}

export default LetterboxdCard; 