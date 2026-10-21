import React, { useState, useEffect } from 'react';

/**
 * TypewriterText Component
 * Types out phrases character by character with blinking cursor and phrase looping.
 */
export default function TypewriterText({
  phrases,
  typingSpeed = 45,
  deletingSpeed = 25,
  pauseMs = 2400,
  loop = true,
  className = '',
  cursorClassName = 'inline-block w-0.5 h-[1.1em] bg-emerald-500 ml-1 translate-y-[2px] animate-cursor align-middle'
}) {
  const phraseList = Array.isArray(phrases) ? phrases : [phrases];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (phraseList.length === 0) return;

    const fullText = phraseList[phraseIndex] || '';
    const speed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && currentText === fullText) {
      if (!loop && phraseIndex === phraseList.length - 1) return;
      const pauseTimer = setTimeout(() => setIsDeleting(true), pauseMs);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phraseList.length);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentText((prev) =>
        isDeleting ? fullText.substring(0, prev.length - 1) : fullText.substring(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex, phraseList, typingSpeed, deletingSpeed, pauseMs, loop]);

  return (
    <span className={className}>
      <span>{currentText}</span>
      <span className={cursorClassName} aria-hidden="true" />
    </span>
  );
}
