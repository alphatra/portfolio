"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface TypingAnimationProps {
  words: string[];
  className?: string;
  duration?: number; // ms per char
  eraseDelay?: number; // ms per char when erasing
  delay?: number; // ms before start
  pauseDelay?: number; // ms after word is typed
  as?: React.ElementType;
  startOnView?: boolean;
}

export function TypingAnimation({
  words,
  className,
  duration = 80,
  eraseDelay = 40,
  delay = 0,
  pauseDelay = 1200,
  as: Component = "span",
  startOnView = false,
  ...props
}: TypingAnimationProps) {
  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true,
  });

  const [displayedText, setDisplayedText] = useState<string>("");
  const [started, setStarted] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!startOnView) {
      const startTimeout = setTimeout(() => {
        setStarted(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setStarted(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, startOnView]);

  useEffect(() => {
    if (!started) return;
    let i = isDeleting ? words[wordIndex].length : 0;
    setDisplayedText(isDeleting ? words[wordIndex] : "");
    let timeout: number;

    function type() {
      if (!isDeleting && i <= words[wordIndex].length) {
        setDisplayedText(words[wordIndex].substring(0, i));
        i++;
        if (i <= words[wordIndex].length) {
          timeout = setTimeout(type, duration);
        } else {
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDelay);
        }
      } else if (isDeleting && i >= 0) {
        setDisplayedText(words[wordIndex].substring(0, i));
        i--;
        if (i >= 0) {
          timeout = setTimeout(type, eraseDelay);
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }
    type();
    return () => clearTimeout(timeout);
  }, [started, wordIndex, isDeleting, words, duration, eraseDelay, pauseDelay]);

  useEffect(() => {
    if (!started) setStarted(true);
  }, [started]);

  return (
    <MotionComponent
      ref={elementRef}
      className={cn(
        "inline-block align-middle text-center text-base md:text-xl font-medium tracking-tight text-foreground transition-all duration-400",
        className,
      )}
      {...props}
    >
      {displayedText}
      <span className="typewriter-cursor ml-1">|</span>
    </MotionComponent>
  );
}
