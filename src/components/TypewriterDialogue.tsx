import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import wokeImg from "@/assets/woke.png";
import birthdayImg from "@/assets/birthday.png";
import { useSfx } from "@/hooks/use-sfx";

interface TypewriterDialogueProps {
  lines: string[];
  onComplete: () => void;
}

const TypewriterDialogue = ({ lines, onComplete }: TypewriterDialogueProps) => {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [lineFinished, setLineFinished] = useState(false);
  const { playKeypress } = useSfx();
  const currentLine = lines[lineIndex] || "";
  const displayedText = currentLine.slice(0, charIndex);
  const isLastLine = lineIndex === lines.length - 1;
  const currentImage = lineIndex <= 1 ? wokeImg : birthdayImg;

  useEffect(() => {
    if (charIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setCharIndex((prev) => {
          const next = prev + 1;
          if (next % 3 === 0) playKeypress();
          return next;
        });
      }, 55); // slightly slower pacing
      return () => clearTimeout(timeout);
    } else {
      setLineFinished(true);
    }
  }, [charIndex, currentLine, playKeypress]);

  const handleClick = useCallback(() => {
    if (!lineFinished) {
      // skip to end of line
      setCharIndex(currentLine.length);
      return;
    }

    if (isLastLine) {
      onComplete();
      return;
    }

    // advance to next line
    setLineIndex((prev) => prev + 1);
    setCharIndex(0);
    setLineFinished(false);
  }, [lineFinished, isLastLine, currentLine.length, onComplete]);

  return (
    <motion.div
      className="relative w-full max-w-lg cursor-pointer select-none flex flex-col items-center pt-3 sm:pt-5"
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Chat bubble */}
      <div className="w-full flex justify-start">
        <div className="w-full max-w-[24rem] bg-card rounded-2xl border-2 border-border px-4 py-3 sm:px-5 sm:py-4 shadow-lg min-h-[5rem] flex flex-col justify-between relative">
          {/* Speech tail similar to part 1 */}
          <div className="absolute -bottom-2 left-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-border" />
          <div className="absolute -bottom-[6px] left-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-card" />
          <p className="text-foreground font-semibold text-sm sm:text-base leading-snug sm:leading-relaxed">
            {displayedText}
            {!lineFinished && (
              <span className="inline-block w-0.5 h-4 bg-foreground/60 ml-0.5 animate-pulse align-middle" />
            )}
          </p>

          {/* Blinking continue arrow */}
          <AnimatePresence>
            {lineFinished && (
              <motion.span
                className="absolute bottom-2 right-3 text-primary text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                ▼
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Capybara image below the bubble */}
      <motion.img
        key={currentImage}
        src={currentImage}
        alt="Capybara"
        className="w-48 h-48 sm:w-52 sm:h-52 object-contain mt-8 sm:mt-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default TypewriterDialogue;
