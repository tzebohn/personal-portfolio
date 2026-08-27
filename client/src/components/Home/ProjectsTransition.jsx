/**
 * ProjectsTransition component
 * 
 * Creates a cinematic scroll transition into the Projects archive.
 */

import { motion as Motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { useRef } from "react"
import DivingGif from "../../assets/images/diving.gif"
import "./project.css"

export default function ProjectsTransition() {
    const transitionRef = useRef(null)    // Tracks the main container
    const prefersReducedMotion = useReducedMotion()
    const reduce = import.meta.env.DEV ? false : prefersReducedMotion

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

    // Subtle parallax motion for the diving visual
    const gifY = useTransform(
        scrollYProgress,
        [0, 1],
        reduce ? [0, 0] : [-30, 35]
    );

    const gifScale = useTransform(
        scrollYProgress,
        [0.1, 0.5, 0.9],
        reduce ? [1, 1, 1] : [0.94, 1, 1.03]
    );

    const titleOpacity = useTransform(
        scrollYProgress,
        [0.15, 0.42],
        reduce ? [1, 1] : [0, 1]
    );

    const titleY = useTransform(
        scrollYProgress,
        [0.15, 0.42],
        reduce ? [0, 0] : [20, 0]
    );

    return (
        <div className="relative overflow-hidden">
            {/* Top ambient blend */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-linear-to-b from-[#03050C] to-transparent" />

            <div
                ref={transitionRef}
                className="relative min-h-150 h-[80vh] flex items-center justify-center"
            >   
                <div className="absolute inset-0 bg-[#03050C]" />

                <Motion.div
                    className="absolute inset-0 bg-black"
                    style={{ opacity: darkness }}
                />

                <div className="relative z-10 flex flex-col items-center gap-6 px-4 sm:gap-10 md:gap-14">
                    {/* Falling visual GIF with subtle scroll parallax */}
                    <Motion.img
                        src={DivingGif}
                        alt="Visual animation transitioning into the project archive"
                        style={{ y: gifY, scale: gifScale }}
                        className="
                            w-70 sm:w-95 md:w-110 lg:w-120
                            h-70 sm:h-95 md:h-110 lg:h-120
                            object-contain drop-shadow-[0_0_35px_rgba(37,150,190,0.2)]
                        "
                    />
                    <Motion.h4
                        style={{ opacity: titleOpacity, y: titleY }}
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
                    </Motion.h4>
                </div>
            </div>
        </div>
    )
}
