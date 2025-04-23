import * as React from "react";
import { motion } from 'framer-motion'; // Import motion for animations
import { TypingAnimation } from "./magicui/typing-animation";
import { cn } from "@/lib/utils"; // Import cn if needed for combining classes

// We'll add a typewriter component later
// import Typewriter from './Typewriter'; 

export const Hero: React.FC = () => {
  // Placeholder data - replace with actual content
  const name = "Gracjan";
  const specialty = "Full-Stack Developer";
  const roles = [
    "Building modern web experiences",
    "Solving problems with code",
    "Passionate about open-source",
    "Exploring new technologies",
  ];

  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-3 items-center gap-8 relative overflow-hidden hero-grid-bg px-6 md:px-12 lg:px-20">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="z-10 md:col-span-3"
      >
        <h1 className="text-7xl lg:text-9xl font-extrabold mb-4 text-foreground">
          {name}
        </h1>
        <p className="text-2xl md:text-3xl text-foreground/80 mb-8 font-medium">
          {specialty}
        </p>
        <div className="mt-6 text-left">
          <TypingAnimation
            words={roles}
            duration={70}
            eraseDelay={35}
            pauseDelay={1200}
            className="text-lg md:text-xl text-foreground/60"
          />
        </div>

        <p className="mt-12 text-sm text-foreground/50">
          Press <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">Ctrl K</kbd> to explore
        </p>
      </motion.div>

    </section>
  );
};

export default Hero; 