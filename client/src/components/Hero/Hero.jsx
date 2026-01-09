/**
 * Hero banner component
 * 
 * Container that holds the canvas for 3D model
 */

import { Canvas } from "@react-three/fiber"
import Model from "./Model"
import heroBg from "../../assets/images/background.jpg"
import TypingText from "./TypingText"
import { PresentationControls } from "@react-three/drei"

export default function Hero () {
    return (
        <section className="relative w-full h-screen overflow-hidden pointer-events-none touch-action-none">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-95 mix-blend-overlay"
                style={{ backgroundImage: `url(${heroBg})` }}
            />

            {/* Animated particles */}

            {/* 3D Model */}
            <div 
                className="absolute left-1/2 top-1/2 mt-20 lg:mt-40 w-[max(80vw,480px)] max-h-[50vh] lg:max-h-[70vh] 
                            aspect-[4/5] -translate-x-1/2 -translate-y-1/2
                            pointer-events-auto touch-action-none"
            >
                    <Canvas 
                        camera={{ position: [0, 0, 6], fov: 35, near: 0.1, far: 100 }} 
                        dpr={[1, 2]}
                        className="touch-action-none"
                    >
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[2, 2, 5]} intensity={1} />
                        <PresentationControls
                            global
                            polar={[-0.35, 0.35]}
                            azimuth={[-0.7, 0.7]}
                            config={{ mass: 2, tension: 400 }}
                            snap={false}
                        >
                            <Model />
                        </PresentationControls>
                    </Canvas>
            </div>

            {/* Hero text */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-6">
                <div className="flex h-full items-start">
                    <div className="
                        mt-24
                        max-w-md
                        text-white
                        mt-48
                        md:mt-32
                        lg:mt-40
                    ">
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
                    </div>
                </div>
            </div>

        </section>
    )
}