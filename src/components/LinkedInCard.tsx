import * as React from 'react';
import { cn } from '@/lib/utils';
import { Linkedin } from 'lucide-react'; // Using Lucide for consistency

export function LinkedInCard() {
  const linkedInUrl = 'https://linkedin.com/in/gracjan-ziemiański/';

  return (
    <a
      href={linkedInUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'minimal-block flex flex-col items-start justify-between p-6 h-full group',
        'transition-colors hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-neon-blue/75 focus:rounded-sm'
      )}
    >
      <div>
        <Linkedin className="w-6 h-6 mb-3 text-blue-600" /> {/* LinkedIn Blue */}
        <h3 className="text-lg font-semibold mb-1 text-foreground">LinkedIn</h3>
        <p className="text-sm text-foreground/60">Connect with me professionally.</p>
      </div>
      <span className="text-sm accent-underline self-end mt-3">
        View Profile →
      </span>
    </a>
  );
}

export default LinkedInCard; 