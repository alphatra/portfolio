import React, { useState } from 'react';
import { NeonGradientCard } from '@/components/magicui/neon-gradient-card';

const TABS = [
  { key: 'projects', label: 'Projects' },
  { key: 'experiments', label: 'Experiments' },
  { key: 'papers', label: 'Scientific Work' },
  { key: 'deep', label: 'Deep Learning' },
];

// GitHub API repo type (partial, only used fields)
type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  language?: string;
  topics?: string[];
  html_url: string;
  homepage?: string;
};

interface ProjectsTabsProps {
  githubRepos: GitHubRepo[];
  githubError: string | null;
}

export default function ProjectsTabs({ githubRepos, githubError }: ProjectsTabsProps) {
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <>
      <div className="flex gap-4 mb-8">
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={`rounded-lg px-4 py-2 text-base font-semibold border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neon-blue/75 ${
              activeTab === tab.key
                ? 'bg-neon-blue/10 text-neon-blue border-neon-blue'
                : 'bg-gray-900 text-white border-gray-700 hover:bg-neon-blue/10'
            }`}
            aria-pressed={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activeTab === 'projects' && (
          <>
            {githubError && (
              <div className="col-span-full text-red-400">{githubError}</div>
            )}
            {githubRepos.length === 0 && !githubError && (
              <div className="col-span-full text-gray-400">Loading GitHub repositories...</div>
            )}
            {githubRepos.map((repo: GitHubRepo) => (
              <NeonGradientCard className="h-64 flex flex-col justify-between" key={repo.id}>
                <div>
                  <h2 className="text-xl font-semibold mb-2">{repo.name}</h2>
                  <p className="text-gray-300 mb-2 line-clamp-3">{repo.description || 'No description provided.'}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {repo.language && <span className="text-xs px-2 py-1 rounded bg-gray-800 text-neon-blue">{repo.language}</span>}
                    {repo.topics && repo.topics.map((topic: string) => (
                      <span className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-400" key={topic}>{topic}</span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 mt-auto">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-neon-blue hover:underline">GitHub &rarr;</a>
                  {repo.homepage && <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="text-neon-blue hover:underline">Live Demo</a>}
                </div>
              </NeonGradientCard>
            ))}
          </>
        )}
        {activeTab === 'experiments' && (
          <div className="col-span-full">
            <div className="notebook-viewer dark bg-neutral-950 rounded-lg p-4 overflow-x-auto">
              <h2 className="text-2xl font-semibold mb-2">Eksperymenty / Artykuły</h2>
              <p className="text-gray-300 mb-4">
                Tutaj możesz pisać swoje eksperymenty, artykuły lub notatki. Wstaw dowolny tekst, kod, obrazy lub inne treści.
              </p>
              {/* Przykładowy artykuł */}
              <article className="prose prose-invert max-w-none">
                <h3>Przykładowy artykuł</h3>
                <p>To miejsce na Twój eksperyment lub notatkę. Możesz swobodnie edytować ten tekst lub dodać własny.</p>
                <pre>
{`def hello():
    print("Hello, world!")`}
                </pre>
              </article>
            </div>
          </div>
        )}
        {activeTab === 'papers' && (
          <NeonGradientCard className="h-64">
            <div className="flex flex-col h-full justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Scientific Work</h2>
                <p className="text-gray-300 mb-4">Your research papers and articles will be displayed here.</p>
              </div>
              <a href="#" className="text-neon-blue hover:underline mt-auto">Add Paper</a>
            </div>
          </NeonGradientCard>
        )}
        {activeTab === 'deep' && (
          <NeonGradientCard className="h-64">
            <div className="flex flex-col h-full justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Deep Learning</h2>
                <p className="text-gray-300 mb-4">Highlight your deep learning projects, demos, or research here.</p>
              </div>
              <a href="#" className="text-neon-blue hover:underline mt-auto">Add Deep Learning Project</a>
            </div>
          </NeonGradientCard>
        )}
      </div>
    </>
  );
} 