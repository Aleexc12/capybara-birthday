import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSfx } from "@/hooks/use-sfx";
import { CONTENT } from "@/PUT-YOUR-CONTENT-HERE/content";

interface MailboxOverlayProps {
  onClose: () => void;
}

type Step = "envelope" | "letter";

const MailboxOverlay = ({ onClose }: MailboxOverlayProps) => {
  const [step, setStep] = useState<Step>("envelope");
  const { playTear } = useSfx();

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
      >
        <AnimatePresence mode="wait">
          {step === "envelope" && (
            <EnvelopeStep key="envelope" onOpen={() => { playTear(); setStep("letter"); }} />
          )}
          {step === "letter" && (
            <LetterStep key="letter" onClose={onClose} />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

/* Envelope step */
const EnvelopeStep = ({ onOpen }: { onOpen: () => void }) => (
  <motion.div
    className="cursor-pointer"
    onClick={onOpen}
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ type: "spring", stiffness: 200, damping: 15 }}
    whileHover={{ scale: 1.05, rotate: 2 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="relative w-64 h-44">
      {/* Envelope body */}
      <div className="absolute inset-0 bg-kawaii-peach rounded-2xl border-2 border-accent shadow-xl" />
      {/* Envelope flap */}
      <div
        className="absolute top-0 left-0 right-0 h-24 bg-accent rounded-t-2xl"
        style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
      />
      {/* Heart seal */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-3xl">💖</div>
      <p className="absolute bottom-4 w-full text-center text-sm text-accent-foreground font-medium">
        tap to open ✨
      </p>
    </div>
  </motion.div>
);

/* Step 3: Letter with typewriter */
const LetterStep = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div
      className="kawaii-card w-[calc(100vw-2rem)] max-w-[44rem] max-h-[85vh] text-center relative select-none"
      initial={{ scale: 0.3, y: 30, rotateX: 40 }}
      animate={{ scale: 1, y: 0, rotateX: 0 }}
      exit={{ scale: 0.5, opacity: 0 }}
      transition={{ type: "spring", stiffness: 180, damping: 16 }}
    >
      <motion.button
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-md"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
      >
        ×
      </motion.button>

      <motion.div
        className="pt-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-3xl sm:text-4xl mb-3 sm:mb-4">💌</p>
        <div className="font-handwritten text-lg sm:text-xl leading-relaxed text-foreground whitespace-pre-line text-left px-1 sm:px-2 max-h-[60vh] overflow-y-auto">
          {CONTENT.letterText}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MailboxOverlay;
