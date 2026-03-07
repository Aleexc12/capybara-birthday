import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/BackButton";
import { useSfx } from "@/hooks/use-sfx";

const MEMORY_IMAGE_MODULES = import.meta.glob(
  "../assets/memories/*.{png,jpg,jpeg,webp,avif}",
  {
    eager: true,
    import: "default",
  },
);

const MEMORY_IMAGES = Object.entries(MEMORY_IMAGE_MODULES)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, src]) => src as string);

const DEFAULT_CAPTIONS = [
  "day 1",
  "yummy",
  "hammering",
  "matching rings",
  "us",
  "qiqihari",
  'photoshoot',
  'simba',
  'jeje'
];

type Polaroid = {
  id: number;
  rotation: number;
  caption: string;
  src: string | null;
};

const POLAROIDS: Polaroid[] = (
  MEMORY_IMAGES.length > 0 ? MEMORY_IMAGES : Array.from({ length: 6 }, () => null)
).map((src, i) => ({
  id: i,
  src,
  rotation: (Math.random() - 0.5) * 12,
  caption: DEFAULT_CAPTIONS[i] ?? `memory ${i + 1}`,
}));

const Memories = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const { playFlip } = useSfx();
  const selectedPhoto = selected !== null ? POLAROIDS[selected] : null;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4">
      <BackButton to="/hub" />

      {/* Contained card */}
      <motion.div
        className="mt-20 w-full max-w-md bg-card border border-border rounded-3xl shadow-lg p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-xl font-bold text-foreground mb-6">memories</h1>

        {/* Polaroid grid */}
          <div className="grid grid-cols-3 gap-3">
            {POLAROIDS.map((p, i) => (
              <motion.div
                key={p.id}
                className={`group ${p.src ? "cursor-pointer" : "cursor-default opacity-80"}`}
                initial={{ opacity: 0, y: 20, rotate: p.rotation }}
                animate={{ opacity: 1, y: 0, rotate: p.rotation }}
                whileHover={p.src ? { rotate: 0, scale: 1.05, zIndex: 10 } : undefined}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                onClick={() => {
                  if (!p.src) return;
                  playFlip();
                  setSelected(p.id);
                }}
              >
                <div className="bg-background rounded-lg shadow-md p-1.5 pb-6 relative">
                  {i % 3 === 0 && (
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-3 bg-kawaii-cream/80 rounded-sm rotate-[-2deg] shadow-sm z-10" />
                  )}

                  <div className="aspect-square bg-muted rounded-md overflow-hidden flex items-center justify-center">
                    {p.src ? (
                      <img
                        src={p.src}
                        alt={`Memory ${i + 1}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <span className="text-2xl opacity-30">pic</span>
                    )}
                  </div>

                  <p className="text-center text-xs font-handwritten text-muted-foreground mt-1 absolute bottom-1 left-0 right-0">
                    {p.caption}
                  </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto?.src && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-card rounded-2xl shadow-2xl p-3 pb-12 max-w-sm w-full relative"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-md"
                onClick={() => setSelected(null)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>

              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.caption}
                  className="h-full w-full object-cover"
                  decoding="async"
                />
              </div>

              <p className="text-center font-handwritten text-lg text-muted-foreground mt-3 absolute bottom-3 left-0 right-0">
                {selectedPhoto.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Memories;
