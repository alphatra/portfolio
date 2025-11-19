import * as React from "react";
import { motion, useReducedMotion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { TypingAnimation } from "./magicui/typing-animation";
import { cn } from "@/lib/utils";
import { useI18n } from '@/i18n';

export const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { t, ta } = useI18n();

  // Spotlight effect state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const name = t('hero.name');
  const specialty = t('hero.specialty');
  const roles = ta('hero.roles').length ? ta('hero.roles') : [
    'Building modern web experiences',
    'Solving problems with code',
    'Passionate about open-source',
    'Exploring new technologies'
  ];

  return (
    <section
      className="min-h-[80vh] grid grid-cols-1 md:grid-cols-3 items-center gap-8 relative overflow-hidden px-6 md:px-12 lg:px-20 group"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Background with Spotlight */}
      <div className="absolute inset-0 -z-10 bg-background">
        <div className="absolute inset-0 hero-grid-bg opacity-[0.15]" />
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(162, 89, 255, 0.15),
                transparent 80%
              )
            `,
          }}
        />
      </div>

      {/* Ambient Glow Blob */}
      <div className="glow-blob top-[-20%] left-[-10%]" />

      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: "easeInOut" }}
        className="z-10 md:col-span-3 relative"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6 text-sm text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Available for new projects
        </div>

        <h1 className="text-7xl lg:text-9xl font-extrabold mb-4 text-foreground tracking-tight">
          {name}
        </h1>
        <p className="text-2xl md:text-3xl text-foreground/80 mb-8 font-medium font-heading">
          {specialty}
        </p>
        <div className="mt-6 text-left h-[60px]"> {/* Fixed height to prevent layout shift */}
          <TypingAnimation
            words={roles}
            duration={70}
            eraseDelay={35}
            pauseDelay={1200}
            className="text-lg md:text-xl text-accent font-mono"
          />
        </div>

        <p className="mt-12 text-sm text-foreground/40 flex items-center gap-2">
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
          to search
        </p>
      </motion.div>
    </section>
  );
};

export default Hero; 