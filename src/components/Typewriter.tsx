import React, { useState, useEffect, useCallback } from 'react';

interface TypewriterProps {
  words: string[];
  typingDelay?: number;
  eraseDelay?: number;
  pauseDelay?: number;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  words,
  typingDelay = 200,
  eraseDelay = 100,
  pauseDelay = 2000,
}) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentWord = words[wordIndex];
    const shouldDelete = isDeleting;

    // Determine the next text state
    let nextText = '';
    if (shouldDelete) {
      nextText = currentWord.substring(0, text.length - 1);
    } else {
      nextText = currentWord.substring(0, text.length + 1);
    }
    setText(nextText);

    // Determine the delay for the next tick
    let delta = shouldDelete ? eraseDelay : typingDelay;

    // Logic for state transitions
    if (!shouldDelete && nextText === currentWord) {
      // Finished typing the word
      delta = pauseDelay;
      setIsDeleting(true);
    } else if (shouldDelete && nextText === '') {
      // Finished deleting the word
      setIsDeleting(false);
      setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      delta = typingDelay / 2; // Small pause before typing next word
    }

    const timer = setTimeout(() => {
      tick();
    }, delta);

    return () => clearTimeout(timer); // Cleanup timeout on component unmount or re-render

  }, [text, isDeleting, wordIndex, words, typingDelay, eraseDelay, pauseDelay]);

  useEffect(() => {
    const cleanup = tick();
    return cleanup; // Initial call and setup cleanup
  }, [tick]); // Depend on tick to restart effect if props change

  return (
    <span className="typewriter-text">
      {text}
      <span className="typewriter-cursor">|</span>
    </span>
  );
};

export default Typewriter; 