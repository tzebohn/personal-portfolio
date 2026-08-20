/**
 * RoadmapItems component
 * 
 * Displays a milestone card on the engineering experience timeline.
 * Each card shows a year, title, description, and technical highlights.
 * 
 * Props:
 * - side (string): Determines which side to display the card on
 * (e.g. "left" or "right")
 * 
 * - year (string): The year or date range for this milestone
 * 
 * - title (string): The main heading of the milestone
 * 
 * - description (string): A 1–2 sentence summary of what was accomplished
 * 
 * - highlights (string[]): An array of technology/skill tags
 */

import "./project.css"
import PhaseDots from "./PhaseDots";

export default function RoadmapItems ({ side, year, title, description, highlights = [] }) {
    const isRight = side === "right"

    return (
        <div className="relative">
            {/* Timeline node */}
            <PhaseDots />

            <div 
                className={`
                    relative
                    w-full md:w-1/2
                    ${isRight ? "md:ml-auto" : "md:mr-auto"}
                    p-4 md:p-8
                    flex
                `}
            >

                <div className="flex-1 relative p-4 text-white bg-[#070B17] rounded-md transition-all duration-100 shadow-md hover:shadow-lg hover:shadow-[#2596BE]/30 group">
                    {/* Rounded borders on each 4 corners */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 rounded-tl-md border-[#2596BE]/80 group-hover:border-white/90"/>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 rounded-tr-md border-[#2596BE]/80 group-hover:border-white/90"/>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 rounded-bl-md border-[#2596BE]/80 group-hover:border-white/90"/>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 rounded-br-md border-[#2596BE]/80 group-hover:border-white/90"/>

                    {/* Card content */}
                    <div className="flex flex-col gap-4 font-mono">
                        {/* Year badge */}
                        <span className="font-[Orbitron] text-[#2596BE] tracking-wider text-sm">{year}</span>

                        {/* Divider */}
                        <div className="border-t border-neutral-600/30"/>
                        
                        {/* Milestone title */}
                        <h3 className="font-[Orbitron] text-xl md:text-2xl tracking-wide text-white">{title}</h3>

                        {/* Description */}
                        <p className="text-slate-300/90 text-sm md:text-base leading-relaxed">{description}</p>

                        {/* Technical highlights */}
                        {highlights.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-1">
                                {highlights.map((tech, index) => (
                                    <span 
                                        key={index}
                                        className="text-xs font-[Orbitron] tracking-wide text-[#2596BE]/90 bg-[#2596BE]/10 px-2.5 py-1 rounded-sm border border-[#2596BE]/20"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}