import * as React from 'react';
import { cn } from '@/lib/utils';
import Tag from './Tag'; // Keep Tag for fallback or other uses
import { Code, TerminalSquare, GitBranch } from 'lucide-react'; // Import specific icons

// Map technology names to icons
const techIcons: { [key: string]: React.ReactNode } = {
  TypeScript: <Code className="inline w-4 h-4 mx-1 text-blue-400" />,
  Python: <TerminalSquare className="inline w-4 h-4 mx-1 text-yellow-400" />,
  Rust: <GitBranch className="inline w-4 h-4 mx-1 text-orange-500" />,
  // Add more if needed
};

// Placeholder bio text
const bio = `
I am a passionate developer with experience building robust and scalable web applications. 
My expertise lies primarily in [TypeScript] and [Python], allowing me to work across the full stack, from crafting interactive front-end experiences to designing efficient back-end systems. 
I'm also enthusiastic about performance and exploring languages like [Rust] for systems-level programming.
`;

// Updated parseBio to insert icons or fallback to Tag
const parseBio = (text: string) => {
  const parts = text.split(/(\[.*?\])/g);
  return parts.map((part, index) => {
    if (part.length > 2 && part.indexOf('[') === 0 && part.indexOf(']') === part.length - 1) {
      const tagName = part.slice(1, -1);
      // Check if we have an icon for this tag
      if (techIcons[tagName]) {
        return <React.Fragment key={index}>{techIcons[tagName]}</React.Fragment>;
      } else {
        // Fallback to original Tag component if no icon defined
        return <Tag key={index} name={tagName} />;
      }
    }
    return part.split('\n').map((line, lineIndex) => (
      <React.Fragment key={`${index}-${lineIndex}`}>
        {lineIndex > 0 && <br />}
        {line}
      </React.Fragment>
    ));
  });
};

export const AboutMe: React.FC = () => {
  return (
    // Added subtle inner shadow/border for depth, slightly lighter background
    <div 
      className={cn(
        'minimal-block flex flex-col items-start p-8 h-full relative overflow-hidden',
        'bg-card/80 backdrop-blur-sm' // Slightly lighter/blurred background within card
        // Add subtle glow/border effect (example)
        // 'shadow-[inset_0_0_10px_rgba(var(--accent-raw),0.1)]'
      )}
    >
      {/* Optional: Add subtle background pattern or gradient here */}
      {/* <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-accent to-transparent -z-10"></div> */}
      
      <h2 className="text-2xl font-semibold mb-4 text-foreground z-10"> {/* Ensure text is above potential background effects */}
        Full-Stack Developer
      </h2>
      <p className="text-sm italic text-foreground/60 mb-6 z-10">
        "Hello, welcome to my little corner on the web" 
      </p>
      <p className="text-base leading-relaxed text-foreground/80 z-10">
        {parseBio(bio)}
      </p>
    </div>
  );
};

export default AboutMe; 