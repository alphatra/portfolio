import React, { useState, useMemo } from 'react';
import ResearchCard from './ResearchCard'; // Import the card component
import { cn } from '@/lib/utils';

// Define formatDate function directly within the component file
function formatDate(isoString: string): string {
  if (!isoString) return '';
  try {
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (e) {
    console.error("Error formatting date:", e);
    return ''; // Handle invalid date
  }
}

// Assume GitHubRepo and formatDate are passed or defined here
// If not passed, define a basic type
type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  owner: { login: string };
  updated_at: string;
  html_url: string;
  // Add topics if available and needed for filtering
  topics?: string[];
};

interface ProjectGridProps {
  githubRepos: GitHubRepo[];
  githubError: string | null;
  filters: string[];
}

export default function ProjectGrid({ githubRepos, githubError, filters }: ProjectGridProps) {
  const [activeFilter, setActiveFilter] = useState(filters[0] || 'All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRepos = useMemo(() => {
    let repos = githubRepos;

    // --- Filtering Logic (placeholder - requires mapping repos to filters) ---
    // For a real implementation, you'd filter based on repo.topics or a predefined mapping
    // Example: if (activeFilter !== 'All') {
    //   repos = repos.filter(repo => repo.topics?.includes(activeFilter.toLowerCase().replace(' ', '-'))));
    // }

    // --- Search Logic ---
    if (searchQuery.trim() !== '') {
      const lowerQuery = searchQuery.toLowerCase();
      repos = repos.filter(repo =>
        repo.name.toLowerCase().includes(lowerQuery) ||
        (repo.description && repo.description.toLowerCase().includes(lowerQuery)) ||
        repo.owner.login.toLowerCase().includes(lowerQuery)
      );
    }

    return repos;
  }, [githubRepos, activeFilter, searchQuery]);

  return (
    <div>
      {/* Filter and Search UI - Updated light mode styles */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-gray-500 dark:text-gray-400 mr-2">Filter:</span>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                'px-4 py-1 rounded-full border text-sm transition-colors duration-200',
                activeFilter === filter
                  ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white' // Active: Black on White (dark), White on Black (light) - Reversed from image based on common practice
                  : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100 dark:bg-transparent dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-800 dark:hover:border-gray-600' // Inactive styles for light/dark
              )}
            >
              {filter}
            </button>
          ))}
        </div>
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-neutral-100 dark:bg-gray-800/50 border border-neutral-300 dark:border-gray-700 rounded-full pl-4 pr-10 py-1 text-sm text-neutral-800 dark:text-gray-300 placeholder-neutral-500 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-neon-blue focus:border-transparent dark:focus:border-transparent w-48"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-neutral-500 dark:text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <hr className="border-neutral-200 dark:border-gray-800 my-6" />

      {/* Error Message */}
      {githubError && (
        <div className="text-red-500 dark:text-red-400 mb-6">Error loading projects: {githubError}</div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredRepos.length > 0 ? (
          filteredRepos.map(repo => (
            <ResearchCard
              key={repo.id}
              title={repo.name}
              description={repo.description}
              author={repo.owner.login}
              date={formatDate(repo.updated_at)}
              url={repo.html_url}
              // imageUrl={...} // Add placeholder/image logic if needed
            />
          ))
        ) : (
          <div className="col-span-full text-neutral-500 dark:text-gray-400 text-center py-8">
            {searchQuery.trim() !== '' ? 'No projects match your search.' : 'No projects found or still loading...'}
          </div>
        )}
      </div>
    </div>
  );
} 