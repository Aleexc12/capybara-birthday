import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import sleepingImg from "@/assets/sleeping.png";
import TypewriterDialogue from "@/components/TypewriterDialogue";
import BackButton from "@/components/BackButton";
import { useSfx } from "@/hooks/use-sfx";

type Phase = "sleeping" | "grumpy" | "dialogue";

const DIALOGUE_LINES = [
  "WAIT...",
  "Are we already in that day ??",
  "YES, YES, YES!! It's your BIRTHDAY !!",
  "That means ... another year of us being adorable",
  "Wanna see what this year together looked like?",
];

const GRUMPY_TEXT = "what do you want, let me sleep";

const Index = () => {
  const location = useLocation();
  const restoredPhase = (location.state as { phase?: Phase })?.phase;
  const [phase, setPhase] = useState<Phase>(restoredPhase ?? "sleeping");
  const [grumpyCharIndex, setGrumpyCharIndex] = useState(0);
  const navigate = useNavigate();
  const { playKeypress } = useSfx();

  // Typewriter effect for grumpy speech bubble
  useEffect(() => {
    if (phase !== "grumpy") return;
    if (grumpyCharIndex < GRUMPY_TEXT.length) {
      const timeout = setTimeout(() => {
        setGrumpyCharIndex((prev) => {
          const next = prev + 1;
          if (next % 3 === 0) playKeypress();
          return next;
        });
      }, 55);
      return () => clearTimeout(timeout);
    }
  }, [phase, grumpyCharIndex, playKeypress]);

  const handleTap = () => {
    if (phase === "sleeping") {
      setGrumpyCharIndex(0);
      setPhase("grumpy");
    } else if (phase === "grumpy") {
      setPhase("dialogue");
    }
  };

  const handleBack = () => {
    if (phase === "grumpy") {
      setGrumpyCharIndex(0);
      setPhase("sleeping");
    } else if (phase === "dialogue") {
      setDialogueComplete(false);
      setDialogueKey((k) => k + 1);
      setGrumpyCharIndex(0);
      setPhase("sleeping");
    }
  };
  const [dialogueComplete, setDialogueComplete] = useState(false);
  const [dialogueKey, setDialogueKey] = useState(0);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-background overflow-hidden relative cursor-pointer select-none px-4 sm:px-6 py-6 sm:py-8 max-w-md mx-auto"
      onClick={(phase === "sleeping" || phase === "grumpy") ? handleTap : undefined}
    >

      {phase !== "sleeping" && (
        <BackButton onClick={(e) => { e?.stopPropagation(); handleBack(); }} />
      )}

      <AnimatePresence mode="wait">
        {(phase === "sleeping" || phase === "grumpy") && (
          <motion.div
            key="sleeping"
            className="flex flex-col items-center justify-center flex-1 w-full relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            {/* Grumpy chat bubble with speech tail */}
            <div className="relative">
              <AnimatePresence>
                {phase === "grumpy" && (
                  <motion.div
                    className="absolute -top-14 -left-2 z-10"
                    initial={{ opacity: 0, scale: 0.5, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <div className="bg-card border-2 border-border rounded-2xl px-4 py-2 shadow-lg whitespace-nowrap relative">
                      <p className="text-foreground font-semibold text-sm">
                        {GRUMPY_TEXT.slice(0, grumpyCharIndex)}
                        {grumpyCharIndex < GRUMPY_TEXT.length && (
                          <span className="inline-block w-0.5 h-3.5 bg-foreground/60 ml-0.5 animate-pulse align-middle" />
                        )}
                      </p>
                      {/* Speech bubble tail */}
                      <div className="absolute -bottom-2 left-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-border" />
                      <div className="absolute -bottom-[6px] left-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-card" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Capybara directly on background */}
              <motion.img
                src={sleepingImg}
                alt="Sleeping capybara"
                className="w-52 h-52 object-contain"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* Tap text — not too low */}
            <motion.p
              className="mt-8 text-lg font-semibold text-muted-foreground"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {phase === "sleeping" ? "tap to wake him up" : "tap again…"}
            </motion.p>
          </motion.div>
        )}

        {phase === "dialogue" && (
          <motion.div
            key="dialogue"
            className="flex flex-col items-center w-full max-w-md p-2 sm:p-4 mt-2 sm:mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <TypewriterDialogue
              key={dialogueKey}
              lines={DIALOGUE_LINES}
              onComplete={() => setDialogueComplete(true)}
            />

            {/* Reserved space for show me button */}
            <div className="h-16 sm:h-20 flex items-center justify-center mt-4 sm:mt-6">
              <AnimatePresence>
                {dialogueComplete && (
                  <motion.button
                    className="kawaii-button-secondary text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4"
                    onClick={() => navigate("/hub")}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    show me
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
