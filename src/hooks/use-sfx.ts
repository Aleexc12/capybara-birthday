import { useCallback, useRef } from "react";
import { playSound } from "@/lib/sound-engine";
import { bookFlip1Sound } from "@/lib/book-flip-1";
import { cardsPackOpen1Sound } from "@/lib/cards-pack-open-1";
import { keypressSounds } from "@/lib/keypress";

const BASE_VOLUME = 0.3;

export function useSfx() {
  const lastKeypress = useRef(0);

  const playFlip = useCallback(() => {
    playSound(bookFlip1Sound.dataUri, {
      volume: BASE_VOLUME,
      playbackRate: 1,
    });
  }, []);

  const playTear = useCallback(() => {
    playSound(cardsPackOpen1Sound.dataUri, {
      volume: BASE_VOLUME,
      playbackRate: 1,
    });
  }, []);

  const playKeypress = useCallback(() => {
    const now = Date.now();
    if (now - lastKeypress.current < 40) return;
    lastKeypress.current = now;
    const sound = keypressSounds[Math.floor(Math.random() * keypressSounds.length)];
    playSound(sound.dataUri, {
      volume: BASE_VOLUME * 0.4,
      playbackRate: 0.78 + Math.random() * 0.08,
    });
  }, []);

  return { playFlip, playTear, playKeypress };
}
