import * as React from 'react';
import { cn } from '@/lib/utils';
// Use Lucide Music icon as a fallback
import { Music } from 'lucide-react'; 

export function SpotifyCard() {
  // Placeholder data - Replace with actual Spotify API integration later
  const isPlaying = true; // Example state
  const trackName = 'Example Track Name';
  const artistName = 'Example Artist Name';
  const trackUrl = '#'; // Example URL

  return (
    <div className={cn('minimal-block flex flex-col justify-between p-6 h-full')}>
      <div>
        {/* Use Lucide Music icon */}
        <Music className="w-6 h-6 mb-3 text-green-500" /> {/* Style as Spotify */}
        <h3 className="text-lg font-semibold mb-1 text-foreground">Listening On Spotify</h3>
        {isPlaying ? (
          <>
            <p className="text-sm text-foreground/80 truncate">{trackName}</p>
            <p className="text-xs text-foreground/60">{artistName}</p>
          </>
        ) : (
          <p className="text-sm text-foreground/60">Not currently playing anything.</p>
        )}
      </div>
      {isPlaying && (
        <a
          href={trackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm accent-underline self-end mt-3"
        >
          Listen on Spotify →
        </a>
      )}
    </div>
  );
}

export default SpotifyCard; 