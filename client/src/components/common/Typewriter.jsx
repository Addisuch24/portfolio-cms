import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

function Typewriter({
  text,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 2000,
  className = "",
}) {
  const [phase, setPhase] = useState("typing");
  const [index, setIndex] = useState(0);
  const chars = useMemo(() => text.split(""), [text]);

  useEffect(() => {
    let timeoutId;

    if (phase === "typing") {
      if (index < text.length) {
        timeoutId = window.setTimeout(() => setIndex(index + 1), typingSpeed);
      } else {
        timeoutId = window.setTimeout(() => setPhase("pauseAfterTyping"), pauseTime);
      }
    } else if (phase === "pauseAfterTyping") {
      timeoutId = window.setTimeout(() => setPhase("deleting"), 1000);
    } else if (phase === "deleting") {
      if (index > 0) {
        timeoutId = window.setTimeout(() => setIndex(index - 1), deletingSpeed);
      } else {
        timeoutId = window.setTimeout(() => setPhase("pauseAfterDeleting"), 1000);
      }
    } else if (phase === "pauseAfterDeleting") {
      timeoutId = window.setTimeout(() => setPhase("typing"), 0);
    }

    return () => window.clearTimeout(timeoutId);
  }, [phase, index, text, typingSpeed, deletingSpeed, pauseTime]);

  useEffect(() => {
    setPhase("typing");
    setIndex(0);
  }, [text]);

  return (
    <span className={`typewriter ${className}`} aria-label={text}>
      <span className="typewriter-placeholder">{text}</span>
      <span className="typewriter-text">
        <AnimatePresence>
          {chars.slice(0, index).map((char, idx) => (
            <motion.span
              key={`${char}-${idx}`}
              initial={{ x: 80, y: -50, opacity: 0, scale: 0.85, rotate: 8, filter: "blur(8px)" }}
              animate={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(6px)" }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
                delay: idx * 0.08,
              }}
              style={{ display: "inline-block", whiteSpace: "pre" }}
            >
              {char}
            </motion.span>
          ))}
        </AnimatePresence>
      </span>
      <span className="typewriter-cursor">|</span>
    </span>
  );
}

export default Typewriter;
