import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Image, Mail } from "lucide-react";
import BackButton from "@/components/BackButton";
import MailboxOverlay from "@/components/MailboxOverlay";
import phoneBg from "@/assets/phone_bg.png";

const Hub = () => {
  const [showMailbox, setShowMailbox] = useState(false);
  const [wiggle, setWiggle] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    if (showMailbox) {
      setShowMailbox(false);
    } else {
      navigate("/", { state: { phase: "dialogue" } });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setWiggle(true);
      setTimeout(() => setWiggle(false), 600);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <BackButton onClick={handleBack} />

      {/* Phone frame */}
      <motion.div
        className="relative w-64 h-[500px] rounded-[2.5rem] border-[3px] border-border bg-card shadow-xl overflow-hidden flex flex-col mt-2 sm:mt-4"
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Phone notch */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-20 h-5 bg-border rounded-full" />
        </div>

        {/* Phone screen with capybara wallpaper */}
        <div className="flex-1 relative flex flex-col">
          {/* Wallpaper capybara centered */}
          <div className="flex-1 flex items-center justify-center">
            <img
              src={phoneBg}
              alt="Capybara wallpaper"
              className="w-36 h-36 object-contain opacity-60"
            />
          </div>

          {/* Dock at the bottom */}
          <div className="bg-card/80 backdrop-blur-sm border-t border-border/50 px-4 py-3">
            <div className="flex justify-center gap-6">
              {/* Photos app */}
              <motion.button
                className="flex flex-col items-center gap-1"
                onClick={() => navigate("/memories")}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center shadow-md">
                  <Image className="w-6 h-6 text-accent-foreground" />
                </div>
                <span className="text-[10px] font-semibold text-foreground">photos</span>
              </motion.button>

              {/* Mailbox app */}
              <motion.button
                className="flex flex-col items-center gap-1 relative"
                onClick={() => setShowMailbox(true)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center shadow-md relative">
                  <Mail className="w-6 h-6 text-secondary-foreground" />
                  <motion.span
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-md"
                    animate={wiggle ? { rotate: [0, -15, 15, -10, 10, 0], scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    1
                  </motion.span>
                </div>
                <span className="text-[10px] font-semibold text-foreground">mailbox</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Phone home indicator */}
        <div className="flex justify-center pb-2">
          <div className="w-20 h-1 bg-border rounded-full" />
        </div>
      </motion.div>

      <AnimatePresence>
        {showMailbox && (
          <MailboxOverlay onClose={() => setShowMailbox(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hub;
