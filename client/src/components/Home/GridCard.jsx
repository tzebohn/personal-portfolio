/**
 *  GridCard component 
 * 
 * A reusable card component used in grid layouts.
 * Displays an SVG icon, a title, and a description.
 */

import { useRef, useState } from "react"
import { useInputDevice } from "../../contexts/inputDevice/useInputDevice"

export default function GridCard ({ Icon, title, description }) {
    const iconRef = useRef()                        // Tracks SVG icon
    const [active, setActive] = useState(false)     // Flag for user hover/click

    const { isTouch } = useInputDevice()            // Tracks user input device
    
    /**
     * Function draws SVG icon when user hovers on (PC)
     * or clicks (Mobile) on container.
     */
    const triggerDraw = () => {
        if (!iconRef.current) return

        const paths = iconRef.current.querySelectorAll(
            "path, line, circle, rect, polyline, polygon"
        )

        paths.forEach((p) => {
            const length = p.getTotalLength();

            // Step 1: hide instantly icon (no animation)
            p.style.transition = "none";
            p.style.strokeDasharray = length;
            p.style.strokeDashoffset = length;

            // Step 2: force browser reflow
            p.getBoundingClientRect();

            // Step 3: animate draw
            p.style.transition = "stroke-dashoffset 1s ease-out";
            p.style.strokeDashoffset = 0;
        });
    }

    /**
     * Function resets SVG CSS styles when mouse exits container
     */
    const resetDraw = () => {
        const paths = iconRef.current.querySelectorAll(
            "path, line, circle, rect, polyline, polygon"
        )

        paths.forEach((p) => {
            p.style.transition = "none"
            p.style.strokeDasharray = ""
            p.style.strokeDashoffset = ""
        })
    }

    /**
     * Function gets called when cursor enters container
     */
    const handleHover = () => {
        triggerDraw()
        setActive(true)
    }

    /**
     * Function gets called when cursor exits container
     */
    const handleLeave = () => {
        resetDraw()
        setActive(false)
    }

    /**
     * Function gets called when user taps container
     * via touchscreen
     */
    const handleMobileClick = () => {
        // Check if already displaying details
        if (!active) {
            triggerDraw()
            setActive(true)
        } else {
            resetDraw()
            setActive(false)            
        }
    }

    return (
        <div
            className={`
                h-[260px]
                sm:h-auto
                p-6  
                transition-colors duration-300
                group
                ${active && "bg-white/10"}
            `}
            onMouseEnter={!isTouch ? handleHover : undefined}
            onMouseLeave={!isTouch ? handleLeave : undefined}
            onClick={isTouch ? handleMobileClick : undefined}
        >   
            <div 
                className="
                    flex flex-col gap-4 items-center
                    transition-transform duration-300 ease-out 
                    group-hover:-translate-y-2
                "
            >
                {/* Icon */}
                <div>
                    <Icon 
                        ref={iconRef}
                        className={`border-0 transition-transform duration-100 delay-75 ${active && "-translate-y-1"}`}
                    />
                </div>

                {/* Title */}
                <h3 
                    className={`
                        text-center text-gray-500 font-medium tracking-wide
                        ${active && "text-white font-semibold"}
                        transition-transform duration-300 delay-75 group-hover:-translate-y-1
                    `}
                >
                    {title}
                </h3>

                {/* Description */}
                <p 
                    className={`
                        text-gray-500 font-medium
                        ${active ? "opacity-100" : "opacity-0"} text-center
                        transition-transform duration-300 delay-100 group-hover:-translate-y-1
                    `}>
                    {description}
                </p>
            </div>
        </div>
    )
}