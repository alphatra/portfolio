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

    {/* Repeat symbols - Adjust positions, scale, rotation for better pattern */}
    <use href="#cat-face" x="10" y="10" transform="scale(1.5)"/>
    <use href="#plus" x="50" y="30" />
    <use href="#integral" x="80" y="70" transform="scale(1.2)"/>
    <use href="#sqrt" x="30" y="90" />
    <use href="#cat-face" x="100" y="110" transform="scale(0.8)"/>
    <use href="#plus" x="150" y="80" transform="scale(1.5)"/>
    {/* Add more repetitions for a denser pattern */}

  </svg>
);

// Add className prop to the interface
interface GitHubCardProps {
  className?: string;
}

export const GitHubCard: React.FC<GitHubCardProps> = ({ className }) => { // Destructure className
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
        <p className="text-sm text-foreground/60 mb-2">
          Working on project-x, fixed bug #123, reviewed PR #456.
        </p>
        <a href="#" className="text-xs accent-underline">View on GitHub</a>
      </div>
      {/* Add BorderBeam with default props */}
      <BorderBeam size={250} duration={12} delay={9} colorFrom="hsl(var(--accent))" colorTo="hsl(var(--primary))" />
    </div>
  );
};

export default GitHubCard; 