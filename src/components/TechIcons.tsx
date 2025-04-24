import * as React from "react";
import { 
  CodeXml, Palette, AppWindow, Wind, Database, Container, Server, Cloud, Braces, Component
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion'; // Import useReducedMotion

const technologies = [
  { name: 'HTML5', Icon: CodeXml, color: 'text-orange-500' },
  { name: 'CSS3', Icon: Palette, color: 'text-blue-500' },
  { name: 'React', Icon: AppWindow, color: 'text-cyan-400' },
  { name: 'Next.js', Icon: Component, color: 'text-white' }, 
  { name: 'Svelte', Icon: Component, color: 'text-orange-600' },
  { name: 'Tailwind CSS', Icon: Wind, color: 'text-teal-400' },
  { name: 'Django', Icon: Braces, color: 'text-green-700' }, 
  { name: 'Python', Icon: Braces, color: 'text-yellow-500' }, 
  { name: 'Node.js', Icon: Server, color: 'text-green-500' },
  { name: 'Prisma', Icon: Database, color: 'text-teal-600' },
  { name: 'NestJS', Icon: Server, color: 'text-red-600' },
  { name: 'Supabase', Icon: Cloud, color: 'text-green-600' },
  { name: 'Docker', Icon: Container, color: 'text-blue-600' },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Faster stagger for icons
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

export const TechIcons: React.FC = () => {
  const shouldReduceMotion = useReducedMotion(); // Użyj hooka

  // Conditional variants based on reduced motion preference
  const reducedContainerVariants = {
    hidden: { opacity: 1 }, // Skip initial fade-in for container
    visible: { opacity: 1 },
  };

  const reducedItemVariants = {
    hidden: { opacity: 1, y: 0 }, // Skip initial fade-in/slide-up for items
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Apply container variants, conditionally based on reduced motion */}
        <motion.div 
          className="flex flex-row flex-wrap justify-center items-center gap-x-10 gap-y-4"
          variants={shouldReduceMotion ? reducedContainerVariants : containerVariants}
          initial="hidden"
          animate="visible"
        >
          {technologies.map(({ name, Icon }, i) => (
            // Apply item variants, conditionally based on reduced motion
            <motion.div
              key={name}
              variants={shouldReduceMotion ? reducedItemVariants : itemVariants}
              className="flex flex-row items-center gap-2 group cursor-default select-none focus:outline-none focus:ring-2 focus:ring-neon-blue/75 focus:rounded-sm"
              tabIndex={0}
              role="img"
              aria-label={name}
              title={name}
            >
              <Icon className="w-6 h-6 text-foreground group-hover:accent transition-colors duration-200" />
              <span className="text-xs font-mono text-foreground/70 group-hover:accent transition-colors duration-200">
                {name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechIcons; 