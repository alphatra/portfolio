import * as React from 'react';
import { NeonGradientCard } from '@/components/magicui/neon-gradient-card';
import { cn } from '@/lib/utils';

interface ModernProjectCardProps {
  title: string;
  description?: string | null;
  language?: string | null;
  topics?: string[];
  stars?: number;
  repoUrl: string;
  homepage?: string | null;
  updatedAt?: string;
  className?: string;
}

export const ModernProjectCard: React.FC<ModernProjectCardProps> = ({
  title,
  description,
  language,
  topics = [],
  stars,
  repoUrl,
  homepage,
  updatedAt,
  className,
}) => {
  return (
    <NeonGradientCard disabled className={cn('flex flex-col p-0 overflow-hidden', className)}>
      <div className="flex flex-col h-full bg-white text-black dark:bg-neutral-900 dark:text-white">
        <div className="p-5">
          <h3 className="text-lg font-semibold truncate">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
            {description || 'No description provided.'}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {language && (
              <span className="text-xs px-2 py-1 rounded-full bg-muted text-foreground/80">
                {language}
              </span>
            )}
            {topics?.slice(0, 4).map((t) => (
              <span key={t} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                {t}
              </span>
            ))}
            {typeof stars === 'number' && (
              <span className="text-xs px-2 py-1 rounded-full bg-muted text-foreground/80">
                ★ {stars}
              </span>
            )}
          </div>
        </div>
        <div className="mt-auto border-t border-border/50 px-5 py-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground truncate">
            {updatedAt ? new Date(updatedAt).toLocaleDateString() : ''}
          </span>
          <div className="flex gap-3">
            {homepage && (
              <a
                href={homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-accent hover:underline"
              >
                Live
              </a>
            )}
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent hover:underline"
            >
              GitHub →
            </a>
          </div>
        </div>
      </div>
    </NeonGradientCard>
  );
};

export default ModernProjectCard;


