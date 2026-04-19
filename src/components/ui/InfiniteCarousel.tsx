'use client';

import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { useRef, useState } from 'react';

// --- card Data ---
const DEMO_CARDS = [
  { emoji: '🎂', title: 'Happy Birthday!', subtitle: 'To my best friend', isTrending: true },
  { emoji: '💖', title: 'Valentine Wish', subtitle: 'You have my heart', isTrending: false },
  { emoji: '🎇', title: 'Happy New Year!', subtitle: '2027 Loading...', isTrending: false },
  { emoji: '💍', title: 'Wedding Invite', subtitle: 'Join us on our big day', isTrending: true },
  { emoji: '🌞', title: 'Subho Nababarsho!', subtitle: 'Year 1433', isTrending: false },
  { emoji: '🎓', title: 'Congratulations!', subtitle: 'On your graduation', isTrending: true },
];

export const InfiniteCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Framer Motion value (best for animations)
  const x = useMotionValue(0);

  // Pause control
  const [isPaused, setIsPaused] = useState(false);

  // Speed (you can tweak this)
  const speed = 0.05;

  useAnimationFrame((_, delta) => {
    if (isPaused) return;

    const container = containerRef.current;
    if (!container) return;

    const width = container.scrollWidth / 2;

    let next = x.get() - delta * speed;

    // Reset seamlessly
    if (Math.abs(next) >= width) {
      next = 0;
    }

    x.set(next);
  });

  // Duplicate for seamless loop
  const duplicated = [...DEMO_CARDS, ...DEMO_CARDS];

  return (
    <div className="w-full overflow-hidden py-10 mt-8 relative">
      {/* Gradient fade (left/right) */}
      <div className="faded-overlay bg-linear-to-r left-0" />
      <div className="faded-overlay bg-linear-to-l right-0" />

      <motion.div
        ref={containerRef}
        style={{ x }}
        className="flex"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {duplicated.map((card, index) => (
          <motion.div
            key={index}
            className="relative w-44 sm:w-54 h-56 sm:h-66 mx-2 sm:mx-3 shrink-0 rounded-3xl p-0.5 sm:p-1 bg-linear-to-br from-red-300 via-green-300 to-indigo-300 shadow-lg"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-full h-full rounded-3xl bg-white flex flex-col items-center justify-center text-center p-4 relative">
              {card.isTrending && (
                <span className="absolute top-3 sm:top-4 left-1/2 transform -translate-x-1/2 text-lg px-2 py-1 rounded-full bg-pink-100 text-primary font-semibold">
                  Trending
                </span>
              )}
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-linear-to-br from-pink-200 to-purple-200 mb-2">
                <span className="text-2xl">{card.emoji}</span>
              </div>

              <p className="text-lg font-semibold leading-tight">
                {card.title}
              </p>

              <p className="text-xs text-gray-500 mt-2 uppercase tracking-tight">
                {card.subtitle}
              </p>

            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};