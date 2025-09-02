import * as React from 'react';
import { cn } from '@/lib/utils';
import { Github } from 'lucide-react';
import { BorderBeam } from "@/components/magicui/border-beam";

// Simple placeholder SVG for cat + math theme
const CatMathBackground = () => (
  <svg 
    aria-hidden="true"
    className="absolute inset-0 w-full h-full opacity-[0.05] fill-current text-foreground/50 pointer-events-none"
    // Preserve aspect ratio, allow SVG to scale/tile interestingly if needed
    preserveAspectRatio="xMidYMid slice" 
  >
    {/* Define patterns or symbols - very basic example */}
    <defs>
      {/* Simple Cat Face */}
      <g id="cat-face">
        <circle cx="15" cy="15" r="10" stroke="currentColor" strokeWidth="1" fill="none" />
        <path d="M10 12 Q15 8 20 12" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="12" cy="14" r="1" fill="currentColor" />
        <circle cx="18" cy="14" r="1" fill="currentColor" />
        <path d="M15 16 Q15 18 17 18" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <path d="M15 16 Q15 18 13 18" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <path d="M10 8 L 12 5 L 14 8 Z" fill="currentColor" /> { /* Ear */ }
        <path d="M20 8 L 18 5 L 16 8 Z" fill="currentColor" /> { /* Ear */ }
      </g>
      {/* Simple Math Symbols */}
      <text id="plus" x="0" y="10" fontSize="12" fill="currentColor">+</text>
      <text id="integral" x="0" y="10" fontSize="15" fill="currentColor">∫</text>
      <text id="sqrt" x="0" y="12" fontSize="15" fill="currentColor">√</text>
    </defs>

    {/* Denser tiled pattern */}
    {Array.from({ length: 12 }).map((_, row) => (
      <g key={`row-${row}`}>
        {Array.from({ length: 16 }).map((__, col) => {
          const baseX = col * 40;
          const baseY = row * 30;
          const mod = (row + col) % 3;
          return (
            <g key={`cell-${row}-${col}`}>
              {mod === 0 && <use href="#cat-face" x={baseX + 10} y={baseY + 6} transform="scale(0.6)" />}
              {mod === 1 && <use href="#integral" x={baseX + 8} y={baseY + 18} />}
              {mod === 2 && <use href="#sqrt" x={baseX + 12} y={baseY + 16} />}
              <use href="#plus" x={baseX + 24} y={baseY + 10} />
            </g>
          );
        })}
      </g>
    ))}

  </svg>
);

// Add className prop to the interface
interface GitHubCardProps {
  className?: string;
}

export const GitHubCard: React.FC<GitHubCardProps> = ({ className }) => { // Destructure className
  const [stats, setStats] = React.useState<{stars: number; followers: number; public_repos: number; html_url?: string; login?: string}>({stars: 0, followers: 0, public_repos: 0});
  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/github-stats?user=alphatra');
        const data = await res.json();
        setStats(data);
      } catch (e) {
        // keep defaults
      }
    })();
  }, []);
  return (
    // Ensure relative and overflow-hidden are applied here or via className prop
    <div className={cn(
      'minimal-block flex flex-col items-start p-8 h-full', // Added h-full
      className // Ensure className includes relative overflow-hidden if needed
    )}>
      {/* Add the background SVG */}
      <CatMathBackground />
      
      {/* Content needs higher z-index to be above the background */}
      <div className="relative z-10 w-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-foreground">GitHub Activity</h3>
          <Github className="w-6 h-6 text-foreground/60" />
        </div>
        <div className="text-sm text-foreground/80 grid grid-cols-3 gap-3 mb-3">
          <div><span className="text-foreground/60">Stars</span><div className="font-semibold">{stats.stars}</div></div>
          <div><span className="text-foreground/60">Followers</span><div className="font-semibold">{stats.followers}</div></div>
          <div><span className="text-foreground/60">Repos</span><div className="font-semibold">{stats.public_repos}</div></div>
        </div>
        <a href={stats.html_url || 'https://github.com/alphatra'} target="_blank" rel="noopener noreferrer" className="text-xs accent-underline focus:outline-none focus:ring-2 focus:ring-neon-blue/75 focus:rounded-sm">View on GitHub</a>
      </div>
      {/* Add BorderBeam with default props */}
      <BorderBeam size={250} duration={12} delay={9} colorFrom="hsl(var(--accent))" colorTo="hsl(var(--primary))" />
    </div>
  );
};

export default GitHubCard; 