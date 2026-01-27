/**
 * RoadmapItems component
 * 
 * Displays the details of easch roadmap phase as a card.
 * Each card shows information like phase title, description, status, etc.
 * 
 * Props:
 * - side (string): Determines which side to display the card on
 * (e.g. "left" or "right")
 * 
 * - phase (number): The phase label
 * 
 * - status (string): Current status of the phase (e.g. "complete" or "in progress")
 * 
 * - title (string): The main heading of the roadmap phase
 * 
 * - description (string[]): An array of bullet point descriptions 
 * 
 * - registerDot (React state function): Updates array Dots state from parent (Home.jsx)
 */

// Global tailwindcss 
const cardContainer = `flex items-center justify-between gap-2`

import "./project.css"
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaSpinner } from "react-icons/fa";
import { FaHourglassHalf } from "react-icons/fa6";
import { useRef } from "react";
import PhaseDots from "./PhaseDots";

export default function RoadmapItems ({ side, phase, status, title, descriptions = [] }) {
    const isRight = side === "right"    // Determines whether to display left or right

    const itemRef = useRef(null)    // Tracks the RoadmapItems container

    return (
        <div className="relative">
            {/* Phase Dots */}
            <PhaseDots status={status}/>

            <div 
                ref={itemRef}
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

                    {/* Card content goes here */}
                    <div className="flex flex-col gap-4 font-mono">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[#2596BE] tracking-wider">Phase {phase}</h3>
                            {status === "complete" && (
                            <div className={`${cardContainer}`}>
                                <IoIosCheckmarkCircle className="text-sm text-green-300"/>
                                <span className="font-[Orbitron] text-white text-sm">{status}</span>
                            </div>                           
                            )}
                            {status === "progress" && (
                            <div className={`${cardContainer}`}>
                                <FaSpinner className="text-sm text-red-600 animate-spin"/>
                                <span className="font-[Orbitron] text-red-600 text-sm">{status}</span>
                            </div>                           
                            )}
                            {status === "planned" && (
                            <div className={`${cardContainer}`}>
                                <FaHourglassHalf className="text-sm text-gray-500"/>
                                <span className="font-[Orbitron] text-gray-500 text-sm">{status}</span>
                            </div>                           
                            )}
                        </div>
                        
                        {/* Divider */}
                        <div className="border-t border-neutral-600/30"/>
                        
                        <h2 className="font-[Orbitron] text-2xl md:text-3xl tracking-wide">{title}</h2>

                        {/* Bullets */}
                        <ul className="list-disc pl-4 mt-4 space-y-2 text-sm md:text-base">
                            {descriptions.map((item, index) => (
                                <li className="marker:text-[#2596BE]" key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}