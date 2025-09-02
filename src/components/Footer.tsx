import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react'; // Example social icons

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-gray-800/50 py-8">
      <div className="container mx-auto px-4 text-center text-gray-500">
        <div className="flex justify-center space-x-6 mb-4">
          {/* Replace # with actual links, Added focus styles and aria-label */}
          <a href="https://github.com/alphatra" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-neon-blue/75 focus:rounded-sm">
            <Github size={20} />
          </a>
          <a href="https://linkedin.com/in/gracjan-ziemiański/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-neon-blue/75 focus:rounded-sm">
            <Linkedin size={20} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile" className="hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-neon-blue/75 focus:rounded-sm">
            <Twitter size={20} />
          </a>
          {/* Add other social links as needed */}
        </div>
        <p className="text-sm">
          &copy; {currentYear} Gracjan. All rights reserved.
        </p>
        {/* Optional: Add built with Astro/React/etc. text */}
      </div>
    </footer>
  );
};

export default Footer; 