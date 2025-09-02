import * as React from "react";
import { BentoCard } from '@/components/BentoCard';
import { cn } from '@/lib/utils';
import { Play, Pause, SkipForward, Music } from 'lucide-react'; // Import icons

export const LastFmCard: React.FC = () => {
  const [nowPlaying, setNowPlaying] = React.useState({ artist: '', song: '', albumArtUrl: '', nowPlaying: false });

  React.useEffect(() => {
    async function fetchNowPlaying() {
      try {
        const res = await fetch('/api/lastfm-nowplaying');
        const data = await res.json();
        setNowPlaying(data);
      } catch (err) {
        // fallback stays empty
      }
    }
    fetchNowPlaying();
  }, []);

  return (
    <BentoCard className={cn(
      'flex flex-col', // Arrange content vertically
    )}>
      <h3 className="text-lg font-semibold mb-2 flex items-center">
        <Music className="w-5 h-5 mr-2 text-red-500"/> {/* Use Music icon */}
        {/* <span className="text-xl mr-2">🎧</span> */}
        Now Listening
      </h3>
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="flex items-center space-x-4">
          {nowPlaying.albumArtUrl ? (
            <img 
              src={nowPlaying.albumArtUrl} 
              alt={`${nowPlaying.artist} - ${nowPlaying.song}`}
              className="w-20 h-20 md:w-24 md:h-24 rounded-md shadow-lg object-cover"
            />
          ) : (
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-md shadow-lg bg-gray-800 flex items-center justify-center">
              <Music className="w-8 h-8 text-gray-500" />
            </div>
          )}
          <div className="flex flex-col justify-center">
            <p className="font-semibold text-base md:text-lg truncate" title={nowPlaying.song}>{nowPlaying.song}</p>
            <p className="text-sm text-gray-400 truncate" title={nowPlaying.artist}>{nowPlaying.artist}</p>
            {/* Placeholder Controls with icons */}
            <div className="flex space-x-3 mt-3 text-gray-400">
              {nowPlaying.nowPlaying ? (
                <Pause className="w-5 h-5 hover:text-white cursor-pointer" />
              ) : (
                <Play className="w-5 h-5 hover:text-white cursor-pointer" />
              )}
              <SkipForward className="w-5 h-5 hover:text-white cursor-pointer" />
              {/* <span className="text-lg">⏯️</span>
              <span className="text-lg">⏭️</span> */}
            </div>
          </div>
        </div>
      </div>
    </BentoCard>
  );
};

export default LastFmCard; 