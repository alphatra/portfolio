import React from 'react';
import { cn } from '@/lib/utils';
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

interface ResearchCardProps {
  imageUrl?: string;
  title: string;
  description: string | null;
  author: string;
  date: string;
  url: string;
  className?: string;
}

// Placeholder matching Aceternity demo's neutral image vibe
const generatePlaceholderBg = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  const hue = hash % 360;
  // More subtle gradient
  const color = `hsl(${hue}, 15%, 80%)`; 
  const colorLight = `hsl(${hue}, 20%, 90%)`;
  return `linear-gradient(135deg, ${color} 0%, ${colorLight} 100%)`;
};

export default function ResearchCard({
  imageUrl,
  title,
  description,
  author,
  date,
  url,
  className
}: ResearchCardProps) {
  const placeholderBg = generatePlaceholderBg(title);

  return (
    <CardContainer className={cn("inter-var w-full", className)} containerClassName="py-0 w-full">
      {/* CardBody: Styles matching the Aceternity demo */}
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border">
        {/* 1. Image Area: Contained within padding, rounded */}
        <CardItem
          translateZ="100"
          className="w-full rounded-xl overflow-hidden aspect-[16/10]" // Removed negative margins, ensure rounding
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover group-hover/card:shadow-xl"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center rounded-xl" style={{ background: placeholderBg }}>
              {/* Placeholder */}
            </div>
          )}
        </CardItem>
        {/* 2. Title: No extra margin needed */}
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white mt-4" // Keep mt-4 for spacing below image
        >
          <h3 className="truncate">{title}</h3>
        </CardItem>
        {/* 3. Description: Matching demo style */}
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 line-clamp-3" // Added line-clamp as description can be long
        >
          {description || 'No description provided.'}
        </CardItem>
        {/* Bottom section: Matching demo layout */}
        <div className="flex flex-wrap justify-between items-center mt-6 gap-4">
          {/* Tags styled similar to 'Try now' button */}
          <div className="flex flex-wrap gap-2">
             <CardItem
              translateZ={20}
              as="span"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white border border-black/[0.1] dark:border-white/[0.2]"
            >
              {author}
            </CardItem>
             <CardItem
              translateZ={20}
              as="span"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white border border-black/[0.1] dark:border-white/[0.2]"
            >
              {date}
            </CardItem>
          </div>
          {/* Button styled similar to 'Sign up' button */}
          <CardItem
            translateZ={20}
            as="a"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            View &rarr;
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
} 