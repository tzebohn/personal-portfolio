/**
 * Hero banner component
 * 
 * Container that holds the canvas for 3D model
 */

import { Canvas } from "@react-three/fiber"
import Model from "./Model"
import heroBg from "../../assets/images/background.jpg"
import TypingText from "./TypingText"

export default function Hero () {
    return (
        <section className="relative w-full h-screen overflow-hidden">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-95 mix-blend-overlay"
                style={{ backgroundImage: `url(${heroBg})` }}
            />

            {/* Animated particles */}

            {/* 3D Model */}
            <div className="absolute inset-0">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[2, 2, 5]} intensity={1} />
                    <Model />
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