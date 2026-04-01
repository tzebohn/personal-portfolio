import UIIcon from "../../assets/icons/ui.svg?react";
import ResponsiveIcon from "../../assets/icons/responsive.svg?react";
import UxIcon from "../../assets/icons/UX.svg?react";
import SecurityIcon from "../../assets/icons/security.svg?react";
import ApiIcon from "../../assets/icons/api.svg?react";
import DatabaseIcon from "../../assets/icons/database.svg?react";
import DeployIcon from "../../assets/icons/deploy.svg?react";
import DevopsIcon from "../../assets/icons/devops.svg?react";
import { useState } from "react";

export default function GridCarousel({ cards }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = cards.length;

  const sizeStyles = {
    "-2": "rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)] h-8 w-8",
    "-1": "rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)] h-12 w-12 circle-2",
    "0": "h-16 w-16 rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)] circle-3",
    "1": "rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)] h-12 w-12 circle-4",
    "2": "rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)] h-8 w-8 circle-5",
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

  
  return (
    <div className="w-full mx-auto p-6">
      <div className="h-60 md:h-80 rounded-xl z-40 bg-neutral-300 dark:bg-[rgba(40,40,40,0.70)] [mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)]">
        <div className="p-8 overflow-hidden h-full relative flex items-center justify-center">
          <div className="flex flex-row flex-shrink-0 justify-center items-center gap-2">
            {[-2, -1, 0, 1, 2].map((position) => {
              const index = getIndexForPosition(position);
              const card = cards[index];

              return (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={sizeStyles[position]}
                >
                  <card.Icon className={iconSizes[position]} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}