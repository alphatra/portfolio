import * as React from "react";
import { cn } from "@/lib/utils";
import { Globe } from "@/components/magicui/globe"; // Assuming this is the correct path

// Add className prop interface
interface GlobeCardProps {
  className?: string;
}

export function GlobeCard({ className }: GlobeCardProps) { // Destructure className
  // Configuration for the Globe - adjust as needed
  const globeConfig = {
    velocity: 1,
    radius: 400,
    offset: [0, 0],
    markers: [
      // Example markers - replace or fetch dynamically
      { location: [37.7749, -122.4194], size: 0.03 }, // San Francisco
      { location: [51.5074, -0.1278], size: 0.03 }, // London
      { location: [35.6895, 139.6917], size: 0.03 }, // Tokyo
    ],
    className: "absolute -right-0 -bottom-60 md:-bottom-80 lg:-bottom-72", // Positioning within the card
  };

  return (
    // Merge incoming className with existing styles
    <div className={cn(
      "minimal-block relative flex flex-col items-start p-6 h-full overflow-hidden",
      // Min height to ensure globe has space, adjust as needed
      "min-h-[200px]", // Adjusted min-height based on fixed row height
      className // Apply incoming className (e.g., aspect-square)
    )}>
      {/* Card Content */}
      <div>
        <h3 className="text-lg font-semibold mb-1 text-foreground">Around the World</h3>
        <p className="text-sm text-foreground/60">Visualizing connections...</p>
      </div>

      {/* Globe Component */}
      <div className="absolute inset-0 flex items-center justify-center opacity-50 dark:opacity-30">
        {/* Ensure Globe component exists and path is correct */}
        <Globe {...globeConfig} />
      </div>
    </div>
  );
}

export default GlobeCard; 