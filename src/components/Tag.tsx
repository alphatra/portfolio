import React from 'react';
import { cn } from '@/lib/utils';

interface TagProps {
  name: string;
  className?: string;
}

// Update colors to use neon accents
const tagColors: { [key: string]: string } = {
  TypeScript: 'bg-blue-950/80 text-neon-blue-light border-neon-blue/50', // Neon blue accent
  Python: 'bg-yellow-950/70 text-yellow-300 border-yellow-700/80', // Kept yellow similar
  Rust: 'bg-orange-950/70 text-orange-400 border-orange-700/80', // Adjusted orange
  default: 'bg-gray-800/80 text-gray-300 border-gray-600/80', // Darker default
};

export const Tag: React.FC<TagProps> = ({ name, className }) => {
  const colors = tagColors[name] || tagColors.default;
  return (
    <span
      className={cn(
        'inline-block rounded-md border px-2 py-0.5 mx-1 text-xs font-medium leading-tight align-middle',
        colors,
        className
      )}
    >
      {name}
    </span>
  );
};

export default Tag; 