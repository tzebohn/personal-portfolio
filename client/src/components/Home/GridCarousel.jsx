import { createElement, useEffect, useState } from "react";

export default function GridCarousel({ cards }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false)

  const total = cards.length;

  // Every 5 seconds, advance to the next bubble
  useEffect(() => {
    if (isPaused) return

    const timeout = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [activeIndex, isPaused, cards.length]);

  const sizeStyles = {
    "-2": "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)] h-8 w-8",
    "-1": "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)] h-12 w-12 circle-2",
    "0": "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] h-16 w-16 rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)] circle-3",
    "1": "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)] h-12 w-12 circle-4",
    "2": "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)] h-8 w-8 circle-5",
  };

  const iconSizes = {
    "-2": "w-4 h-4",
    "-1": "w-6 h-6",
    "0": "w-8 h-8",
    "1": "w-6 h-6",
    "2": "w-4 h-4",
  };

  // Returns the index in the array for a bubble at relative position -2, -1, 0, 1, 2
  const getIndexForPosition = (relativePos) => {
    // Modulo to wrap around circularly
    return (activeIndex + relativePos + total) % total;
  };

  const activeCard = cards[activeIndex]

  return (
    <>
    <div className="w-full mx-auto px-6 pt-6">
      <div className="h-60 md:h-80 rounded-xl z-40 bg-neutral-300 dark:bg-[rgba(40,40,40,0.70)] [mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)]">
        <div className="p-8 overflow-hidden h-full relative flex items-center justify-center">
          <div className="flex flex-row flex-shrink-0 justify-center items-center gap-2">
            {[-2, -1, 0, 1, 2].map((position) => {
              const index = getIndexForPosition(position);
              const CardIcon = cards[index].Icon;

              return (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  onTouchStart={() => setIsPaused(true)}
                  onTouchEnd={() => setIsPaused(false)}
                  className={sizeStyles[position]}
                >
                  {createElement(CardIcon, { className: iconSizes[position] })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
    {/* Card Info */}
    <div className="flex justify-center px-4">
      {activeCard && (
        <div
          className="text-white text-center max-w-xs
                    bg-[rgba(248,248,248,0.01)] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)]
                    rounded-xl p-4
                    min-h-50 flex flex-col justify-center"
        >
          <h3 className="text-lg font-semibold mb-2">
            {activeCard.title}
          </h3>
          <p className="text-sm text-neutral-400 leading-relaxed">
            {activeCard.description}
          </p>
        </div>
      )}
    </div>
    {/* Dot progress */}
    </>

  );
}
