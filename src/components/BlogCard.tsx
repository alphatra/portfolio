import * as React from 'react';
import { cn } from '@/lib/utils';

interface BlogCardProps {
  slug: string;
  title: string;
  description?: string;
  heroImage?: string;
  pubDate: string; // ISO string
  tags?: string[];
  className?: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  slug,
  title,
  description,
  heroImage,
  pubDate,
  tags = [],
  className,
}) => {
  const date = new Date(pubDate).toLocaleDateString('pl-PL', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <a
      href={`/blog/${slug}/`}
      className={cn(
        'group block focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:rounded-lg',
        className,
      )}
    >
      <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md">
        {heroImage && (
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={heroImage}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-5">
          <p className="mb-2 text-xs text-muted-foreground">{date}</p>
          <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            {title}
          </h3>
          {description && (
            <p className="mb-3 line-clamp-3 text-sm text-foreground/80">{description}</p>
          )}
          {tags.length > 0 && (
            <div className="mt-auto flex flex-wrap gap-2 pt-2">
              {tags.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
          <div className="mt-4 text-right">
            <span className="text-xs font-medium text-primary group-hover:underline">Czytaj dalej →</span>
          </div>
        </div>
      </article>
    </a>
  );
};

export default BlogCard;


