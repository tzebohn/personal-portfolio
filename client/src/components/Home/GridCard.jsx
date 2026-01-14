/**
 *  GridCard component 
 * 
 * A reusable card component used in grid layouts.
 * Displays an SVG icon, a title, and a description.
 */

import { useRef } from "react"

export default function GridCard ({ Icon, title, description }) {
    const iconRef = useRef()    // Tracks SVG icon

    /**
     * Function draws SVG icon when user hovers over container
     */
    const handleHover = () => {
        if (!iconRef.current) return

        console.log(iconRef.current)

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
    const handleLeave = () => {
        const paths = iconRef.current.querySelectorAll(
            "path, line, circle, rect, polyline, polygon"
        )

        paths.forEach((p) => {
            p.style.transition = "none"
            p.style.strokeDasharray = ""
            p.style.strokeDashoffset = ""
        })
    }

    return (
        <div
            className="
                h-[260px]
                sm:h-auto
                p-6  
                transition-colors duration-300
                group
                hover:bg-white/10
            "
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
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
                        className="border-0 transition-transform duration-100 delay-75 group-hover:-translate-y-1"
                    />
                </div>

                {/* Title */}
                <h3 
                    className="
                        text-center text-gray-500 font-medium tracking-wide
                        group-hover:text-white
                        group-hover:font-semibold
                        transition-transform duration-300 delay-75 group-hover:-translate-y-1
                    "
                >
                    {title}
                </h3>

                {/* Description */}
                <p 
                    className="
                        text-gray-500 font-medium
                        opacity-0 group-hover:opacity-100 text-center
                        transition-transform duration-300 delay-100 group-hover:-translate-y-1
                    ">
                    {description}
                </p>
            </div>
        </div>
    )
}