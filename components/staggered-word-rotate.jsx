"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const letterVariants = {
  initial: {
    y: -8,
    opacity: 0,
    filter: "blur(2px)",
  },
  animate: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: {
    y: 8,
    opacity: 0,
    filter: "blur(2px)",
  },
};

const wordVariants = {
  animate: {
    transition: {
      staggerChildren: 0.02,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.02,
    },
  },
};

function splitToChars(text) {
  return Array.from(text);
}

export default function StaggeredWordRotate({
  words = [],
  interval = 2300,
  className = "",
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length < 2) return undefined;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return undefined;

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => window.clearInterval(timer);
  }, [words, interval]);

  if (!words.length) return null;

  const current = words[index % words.length];
  const chars = splitToChars(current);

  return (
    <span className={`staggered-word-rotate ${className}`.trim()} aria-live="polite">
      <span className="staggered-word-rotate-sizer" aria-hidden="true">
        {words.map((word) => (
          <span key={word} className="staggered-word-rotate-sizer-item">
            {word}
          </span>
        ))}
      </span>

      <AnimatePresence mode="sync" initial={false}>
        <motion.span
          key={current}
          className="staggered-word-rotate-word"
          variants={wordVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {chars.map((char, charIndex) => (
            <motion.span
              key={`${current}-${charIndex}`}
              className="staggered-word-rotate-char"
              variants={letterVariants}
              transition={{
                duration: 0.38,
                ease: [0.33, 1, 0.32, 1],
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
