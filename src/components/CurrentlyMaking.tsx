import * as React from "react";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Code2, Download } from 'lucide-react';

// Simplified project data
const latestProject = {
  title: 'Personal Portfolio v3',
  description: 'Rebuilding my portfolio with Next.js, Tailwind, and Magic UI concepts.',
  lastUpdated: 'June 2024',
  repoUrl: 'https://github.com/example/portfolio-v3', // Example URL
  cvUrl: '/path/to/your/cv.pdf', // Replace with actual path
  readCvUrl: 'https://read.cv/yourprofile', // Replace with actual Read.cv profile
};

// Removed ProjectThumbnailPlaceholder component

export function CurrentlyMaking() {
  return (
    <section aria-labelledby="currently-making-title">
      <h2 id="currently-making-title" className="sr-only">
        Currently Making
      </h2>
      <div
        className={cn(
          'minimal-block flex flex-col items-start p-6 h-full relative overflow-hidden group',
          'bg-card/80 backdrop-blur-sm',
          // Add subtle hover effect: slightly scale up or change shadow/border
          'transition-transform duration-300 ease-out group-hover:scale-[1.02]', // Slight scale on hover
          'border border-border/20 hover:border-accent/80', // Adjusted border
        )}
      >
        {/* Title Section with Icon */}
        <div className="flex items-center gap-2 mb-2">
          <Code2 className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">
            {latestProject.title}
          </h3>
        </div>

        {/* Description and Date */}
        <p className="text-sm text-muted-foreground mb-1">
          {latestProject.description}
        </p>
        <p className="text-xs text-muted-foreground/70 mb-6">
          Last updated: {latestProject.lastUpdated}
        </p>

        {/* Buttons Section */}
        <div className="flex flex-col sm:flex-row gap-3 w-full mt-auto">
          {/* Primary Button - Download CV */}
          <Button
            asChild
            className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground flex-1 focus:outline-none focus:ring-2 focus:ring-neon-blue/75"
          >
            <a href={latestProject.cvUrl} download>
              <Download className="mr-2 h-4 w-4" /> Download CV
            </a>
          </Button>

          {/* Secondary Button - Read.cv */}
          <Button
            variant="secondary"
            asChild
            className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-secondary-foreground flex-1 focus:outline-none focus:ring-2 focus:ring-neon-blue/75"
          >
            <a
              href={latestProject.readCvUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowUpRight className="mr-2 h-4 w-4" /> Visit read.cv
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default CurrentlyMaking; 