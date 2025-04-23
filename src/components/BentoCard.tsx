import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming Magic UI setup provides this utility or we create it

interface BentoCardProps {
  className?: string;
  children: React.ReactNode;
  // Add specific props later like title, background style etc.
}

export const BentoCard: React.FC<BentoCardProps> = ({ className, children }) => {
  return (
    <motion.div
      // Add hover animation
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        'bg-gray-900/50 border border-gray-800/80 rounded-lg p-4 shadow-sm relative overflow-hidden h-full', // Added h-full for consistent height in grid
        className // Allow overriding/extending styles
      )}
    >
      {children}
    </motion.div>
  );
};

export default BentoCard; 