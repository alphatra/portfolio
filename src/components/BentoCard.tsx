import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming Magic UI setup provides this utility or we create it

interface BentoCardProps {
  className?: string;
  children: React.ReactNode;
  // Add specific props later like title, background style etc.
}

export const BentoCard: React.FC<BentoCardProps> = ({ className, children }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        'card relative overflow-hidden h-full p-4', // Use .card class from global.css
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default BentoCard; 