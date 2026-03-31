/**
 * Hero banner component
 * 
 * Container with animated particles background and CTA buttons
 */

import heroBg from "../../assets/images/background.jpg"
import TypingText from "./TypingText"
import { useState, useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import AstralParticles from "./AstralParticles"

export default function Hero () {
    const heroRef = useRef(null)
    const buttonRef = useRef(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 })
    const [isMouseInHero, setIsMouseInHero] = useState(false)

    /**
     * Attach mouse listeners to hero container on mount
     */
    useEffect(() => {
        const hero = heroRef.current
        if (!hero) return

        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY })
        }

        const handleMouseEnter = () => {
            setIsMouseInHero(true)
        }

        const handleMouseLeave = () => {
            setIsMouseInHero(false)
            // Reset button position when cursor leaves hero section
            setButtonOffset({ x: 0, y: 0 })
        }

        hero.addEventListener("mousemove", handleMouseMove)
        hero.addEventListener("mouseenter", handleMouseEnter)
        hero.addEventListener("mouseleave", handleMouseLeave)

        return () => {
            hero.removeEventListener("mousemove", handleMouseMove)
            hero.removeEventListener("mouseenter", handleMouseEnter)
            hero.removeEventListener("mouseleave", handleMouseLeave)
        }
    }, [])

    /**
     * Create a subtle chase effect for the Let's Connect button
     * Only when mouse is inside the hero section
     */
    useEffect(() => {
        if (!buttonRef.current || !isMouseInHero) return

        const buttonRect = buttonRef.current.getBoundingClientRect()
        const buttonCenterX = buttonRect.left + buttonRect.width / 2
        const buttonCenterY = buttonRect.top + buttonRect.height / 2

        // Calculate distance from button to cursor
        const distX = mousePos.x - buttonCenterX
        const distY = mousePos.y - buttonCenterY

        // Subtle chase effect - only move 15% of the distance
        const offsetX = distX * 0.15
        const offsetY = distY * 0.5

        setButtonOffset({ x: offsetX, y: offsetY })
    }, [mousePos, isMouseInHero])


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
                    <div className="max-w-md mx-auto lg:mx-0 text-white">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                            Hi, I'm 
                            <span className="text-blue-600"> TzeBohn</span>
                        </h1>

                        <p className="mt-4 text-base sm:text-lg text-white/80 font-semibold font-mono">
                            <TypingText
                                text="Software Engineer · Web Developer · Builder"
                                speed={45}
                            />
                        </p>

                        {/* Connect Button */}
                        <div ref={heroRef}>
                            <a 
                                ref={buttonRef}
                                href="https://forms.gle/yqccyh2pZwnyPuHY6"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    inline-flex items-center justify-center gap-2
                                    mt-8
                                    border border-blue-600
                                    rounded-full px-6 py-3
                                    text-white font-semibold text-sm sm:text-base
                                    hover:bg-blue-600/20
                                    hover:shadow-[0_0_15px_rgba(37,150,190,0.4)]
                                    transition-all duration-300 ease-out
                                    active:scale-95
                                    pointer-events-auto
                                "
                                style={{
                                    transform: `translate(${buttonOffset.x}px, ${buttonOffset.y}px)`,
                                    transition: "transform 0.1s ease-out"
                                }}
                                aria-label="Connect with me"
                            >
                                <span>Let's Connect</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}