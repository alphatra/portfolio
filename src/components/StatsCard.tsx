import React, { useState, useEffect } from 'react';
import { NeonGradientCard } from './magicui/neon-gradient-card'; // Use Magic UI card
import { cn } from '@/lib/utils';
import { Star, Users, GitBranch } from 'lucide-react'; // Import icons

export const StatsCard: React.FC = () => {
  const [stats, setStats] = useState({ stars: 0, followers: 0, repos: 0 });
  const username = import.meta.env.PUBLIC_GITHUB_USERNAME;
  
  useEffect(() => {
    async function fetchStats() {
      try {
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userRes.json();
        // Basic fields
        const repos = userData.public_repos;
        const followers = userData.followers;
        // Fetch starred repos count
        const starredRes = await fetch(`https://api.github.com/users/${username}/starred`);
        const starredData = await starredRes.json();
        const stars = Array.isArray(starredData) ? starredData.length : 0;
        setStats({ stars, followers, repos });
      } catch (err) {
        console.error('Failed to fetch GitHub stats', err);
      }
    }
    fetchStats();
  }, [username]);

  return (
    <NeonGradientCard
      neonColors={{ firstColor: '#22d3ee', secondColor: '#34d399' }}
      className={cn(
        'flex flex-col items-center justify-center text-center p-6'
      )}
    >
      {/* Removed internal h3 as the stats are the main content */}
      <div className="flex justify-around w-full max-w-xs">
        <div className="flex flex-col items-center">
          <Star className="w-6 h-6 mb-2 text-yellow-400" />
          {/* <span className="text-2xl font-bold text-green-400">⭐️</span> */}
          <span className="text-4xl font-bold">{stats.stars}</span>
          <span className="text-xs text-gray-400">Stars</span>
        </div>
        <div className="flex flex-col items-center">
          <Users className="w-6 h-6 mb-2 text-blue-400" />
          {/* <span className="text-2xl font-bold text-blue-400">👥</span> */}
          <span className="text-4xl font-bold">{stats.followers}</span>
          <span className="text-xs text-gray-400">Followers</span>
        </div>
        <div className="flex flex-col items-center">
          <GitBranch className="w-6 h-6 mb-2 text-purple-400" />
          {/* <span className="text-2xl font-bold text-purple-400">📦</span> */}
          <span className="text-4xl font-bold">{stats.repos}</span>
          <span className="text-xs text-gray-400">Repos</span>
        </div>
      </div>
    </NeonGradientCard>
  );
};

export default StatsCard; 