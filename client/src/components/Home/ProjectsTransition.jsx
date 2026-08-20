/**
 * ProjectsTransition component
 * 
 * Creates a nice transition to Projects section on scroll 
 */

import { motion as Motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import DivingGif from "../../assets/images/diving.gif"
import "./project.css"

export default function ProjectsTransition() {

    const transitionRef = useRef(null)    // Tracks the main container

    // Tracks the scroll height
    const { scrollYProgress } = useScroll({
        target: transitionRef,
        offset: ["start end", "end start"]
    })

    // Darkens the container to black
    const darkness = useTransform(
        scrollYProgress,
        [0.2, 0.45, 0.7],
        [0, 0.5, 1]
    );
    

    return (
        <div>
            <div
                ref={transitionRef}
                className="relative min-h-[600px] h-[80vh]"
            >   
                {/* Possible colors #161c44 #0a092d #1e1d25 */}
                <div className="absolute inset-0 bg-[#03050C]" />

                <Motion.div
                    className="absolute inset-0 bg-black"
                    style={{ opacity: darkness }}
                />

                <div className="absolute inset-0 flex flex-col items-center gap-8 px-4 sm:gap-12 md:gap-16 lg:gap-20">
                    {/* Falling visual GIF */}
                    <img
                        src={DivingGif}
                        alt="GIF of someone free diving"
                        className="
                            relative z-10
                            w-[300px] sm:w-[400px] md:w-[460px] lg:w-[520px]
                            h-[300px] sm:h-[400px] md:h-[460px] lg:h-[520px]
                            object-contain
                        "
                    />
                    <h4
                        className="
                            relative z-0
                            text-white/90 text-4xl sm:text-5xl
                            tracking-[0.3em] font-[Orbitron]
                            text-center uppercase font-bold
                            transition-all duration-300
                            drop-shadow-[0_0_8px_rgba(37,150,190,0.25)]
                            glow-text
                        "
                        >
                            PROJECT ARCHIVE
                            <span className="ml-1 text-[#2596be] animate-pulse">|</span>
                    </h4>
                </div>
            </div>
        </div>
    )
}
