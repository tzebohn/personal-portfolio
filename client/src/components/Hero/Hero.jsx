/**
 * Hero banner component
 * 
 * Container with animated particles background and CTA buttons
 */

import heroBg from "../../assets/images/background.jpg"
import TypingText from "./TypingText"
import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import AstralParticles from "./AstralParticles"
import { FaEnvelope, FaFilePdf, FaGithub, FaLinkedin } from "react-icons/fa6"

export default function Hero () {
    const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 })
    const [isTrackingResume, setIsTrackingResume] = useState(false)

    /**
     * Create a subtle chase effect only while the cursor is inside the Resume button.
     */
    const handleResumeMouseMove = (e) => {
        const buttonRect = e.currentTarget.getBoundingClientRect()
        const buttonCenterX = buttonRect.left + buttonRect.width / 2
        const buttonCenterY = buttonRect.top + buttonRect.height / 2

        // Calculate distance from button to cursor
        const distX = e.clientX - buttonCenterX
        const distY = e.clientY - buttonCenterY

        // Subtle chase effect - only move 15% of the distance
        const offsetX = distX * 0.15
        const offsetY = distY * 0.5

        setButtonOffset({ x: offsetX, y: offsetY })
    }

    const handleResumeMouseEnter = (e) => {
        setIsTrackingResume(true)
        handleResumeMouseMove(e)
    }

    const handleResumeMouseLeave = () => {
        setIsTrackingResume(false)
        setButtonOffset({ x: 0, y: 0 })
    }

    const secondaryButtonStyles = `
        inline-flex items-center justify-center gap-2
        rounded-full px-5 py-3
        border border-white/20 bg-white/5
        text-white font-semibold text-sm sm:text-base
        hover:border-blue-500/70 hover:bg-blue-600/15
        hover:shadow-[0_0_15px_rgba(37,150,190,0.3)]
        transition-all duration-300 ease-out
        active:scale-95
        pointer-events-auto
    `

    return (
        <section className="relative w-full h-screen overflow-hidden pointer-events-none touch-action-none">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-95 mix-blend-overlay"
                style={{ backgroundImage: `url(${heroBg})` }}
            />

            {/* Animated particle background */}
            <div 
                className="absolute inset-0"
            >
                <Canvas 
                    camera={{ position: [0, 0, 6], fov: 35, near: 0.1, far: 100 }} 
                    dpr={[1, 2]}
                >
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[2, 2, 5]} intensity={1} />

                    {/* Far stars */}
                    <AstralParticles
                        count={120}
                        size={.08}
                        opacity={0.25}
                        depth={14}
                        speed={0.08}
                        drift={0.001}
                        color="#facc15"
                        parallaxFactor={0.02}
                    />

                    {/* Mid stars */}
                    <AstralParticles
                        count={80}
                        size={.1}
                        opacity={0.45}
                        depth={8}
                        speed={0.1}
                        drift={0.01}
                        parallaxFactor={0.04}
                    />

                    {/* Glow overlay */}
                    <AstralParticles
                        count={80}
                        size={0.08}
                        opacity={0.15}
                        depth={8}
                        speed={0.03}
                        drift={0.015}
                        color="#c084fc"
                        parallaxFactor={0.06}
                    />
                </Canvas>
            </div>

            {/* Hero text and connect button */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center justify-center lg:justify-start">
                <div className="text-center lg:text-left lg:pl-8">
                    <div className="max-w-2xl mx-auto lg:mx-0 text-white">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                            Hi, I'm 
                            <span className="text-blue-600"> TzeBohn</span>
                        </h1>

                        <p className="mt-4 text-xl sm:text-2xl lg:text-3xl text-white font-semibold leading-snug">
                            Full-Stack Developer seeking Entry-Level & Internship Opportunities
                        </p>

                        <p className="mt-3 text-sm sm:text-base text-white/80 font-semibold font-mono">
                            <TypingText
                                text="React | Vite | Next.js | Node.js | TypeScript | PostgreSQL"
                                speed={45}
                            />
                        </p>

                        <p className="mt-5 text-sm sm:text-base leading-7 text-white/75 max-w-xl mx-auto lg:mx-0">
                            I build responsive, data-driven web applications with clean user experiences and practical full-stack architecture.
                        </p>

                        {/* Recruiter CTAs */}
                        <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                            <a 
                                href="/resume/TzeBohn_Ling_Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    inline-flex items-center justify-center gap-2
                                    border border-blue-500 bg-blue-600/20
                                    rounded-full px-6 py-3
                                    text-white font-semibold text-sm sm:text-base
                                    shadow-[0_0_20px_rgba(37,150,190,0.25)]
                                    hover:bg-blue-600/20
                                    hover:shadow-[0_0_15px_rgba(37,150,190,0.4)]
                                    transition-all duration-300 ease-out
                                    active:scale-95
                                    pointer-events-auto
                                "
                                onMouseEnter={handleResumeMouseEnter}
                                onMouseMove={handleResumeMouseMove}
                                onMouseLeave={handleResumeMouseLeave}
                                style={{
                                    transform: `translate(${buttonOffset.x}px, ${buttonOffset.y}px)`,
                                    transition: isTrackingResume 
                                        ? "transform 0.1s ease-out" 
                                        : "transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)"
                                }}
                                aria-label="View my resume"
                            >
                                <FaFilePdf className="h-4 w-4" />
                                <span>Resume</span>
                            </a>
                            <a
                                href="https://github.com/tzebohn"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={secondaryButtonStyles}
                                aria-label="View my GitHub"
                            >
                                <FaGithub className="h-4 w-4" />
                                <span>GitHub</span>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/tzebohn-ling-100a992b1/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={secondaryButtonStyles}
                                aria-label="Connect with me on LinkedIn"
                            >
                                <FaLinkedin className="h-4 w-4" />
                                <span>LinkedIn</span>
                            </a>
                            <a
                                href="mailto:bohnling@gmail.com"
                                className={secondaryButtonStyles}
                                aria-label="Email me"
                            >
                                <FaEnvelope className="h-4 w-4" />
                                <span>Email</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}