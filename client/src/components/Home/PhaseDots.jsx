/**
 * PhaseDot component
 * 
 * Displays a nice visual dot on the vertical line
 * for better UX
 * 
 * props:
 * - status (string): Determines the type of Dot to display
 * (e.g. "complete", "progress", "planned") 
 */

import { FaCheckCircle } from "react-icons/fa";

export default function PhaseDots({ status }) {
  return (
    <div 
        className="
            relative 
            w-8 h-8 
            md:w-12 md:h-12 
            md:absolute 
            md:top-1/2 md:left-1/2 
            md:-translate-x-1/2 md:-translate-y-1/2 
            md:z-10 
            rounded-full 
            bg-[#03050C]
            flex items-center justify-center
        "
    >
        {status === "complete" && <FaCheckCircle className="w-4 h-4 xs:w-6 xs:h-6 md:w-8 md:h-8 text-[#2596BE] drop-shadow-[0_0_2px_#2596BE]"/>}
        {status === "progress" && <div className="w-4 h-4 xs:w-6 xs:h-6 md:w-8 md:h-8 rounded-full bg-[#2596BE] drop-shadow-[0_0_2px_#2596BE] animate-pulse"/>}
        {status === "planned" && <div className="w-4 h-4 rounded-full bg-gray-300/50 border border-gray-400"/>}
    </div>
  )
}
