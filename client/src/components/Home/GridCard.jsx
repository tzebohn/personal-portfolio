/**
 *  GridCard component 
 * 
 * A reusable card component used in grid layouts.
 * Displays an SVG icon, a title, and a description.
 */

import { createElement, useRef, useState, useEffect, useLayoutEffect } from "react"
import { useInputDevice } from "../../contexts/inputDevice/useInputDevice"
import "../styles.css"

export default function GridCard ({ Icon, title, description }) {
    const iconRef = useRef()                        // Tracks SVG icon
    const [active, setActive] = useState(false)     // Flag for user hover/click

    const { isTouch } = useInputDevice()            // Tracks user input device
    
    /**
     * Pre-calculate path lengths and initialize CSS variables on mount.
     * This avoids recalculating lengths on every hover.
     */
    useLayoutEffect(() => {
        if (!iconRef.current) return;

        const paths = iconRef.current.querySelectorAll(
            "path, line, circle, rect, polyline, polygon"
        );

        paths.forEach((p) => {
            const length = p.getTotalLength();
            p.style.setProperty("--path-length", length);
            p.classList.add("grid-card-path");
        });
    }, []);

    /**
     * Sync the 'active' class with the state to trigger the CSS animation.
     * This avoids forced reflows (getBoundingClientRect).
     */
    useEffect(() => {
        if (!iconRef.current) return;

        const paths = iconRef.current.querySelectorAll(".grid-card-path");
        paths.forEach((p) => {
            p.classList.toggle("active", active);
        });
    }, [active]);

    /**
     * Function gets called when cursor enters container
     */
    const handleHover = () => {
        setActive(true)
    }

    /**
     * Function gets called when cursor exits container
     */
    const handleLeave = () => {
        setActive(false)
    }

    /**
     * Function gets called when user taps container
     * via touchscreen
     */
    const handleMobileClick = () => {
        setActive(!active)
    }

    return (
        <div
            className={`
                h-65
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
                    transform-gpu
                    transition-transform duration-300 ease-out 
                    group-hover:-translate-y-2
                "
            >
                {/* Icon */}
                <div>
                    {createElement(Icon, {
                        ref: iconRef,
                        className: `border-0 transition-transform duration-100 delay-75 ${active ? "grid-card-active" : ""}`
                    })}
                </div>

                {/* Title */}
                <h3 
                    className={`
                        text-center text-gray-500 font-medium tracking-wide
                        ${active && "text-white font-semibold"}
                        transition-transform duration-300 delay-75
                    `}
                >
                    {title}
                </h3>

                {/* Description */}
                <p 
                    className={`
                        text-gray-500 font-medium
                        ${active ? "opacity-100" : "opacity-0"} text-center
                        transition-transform duration-300 delay-100
                    `}>
                    {description}
                </p>
            </div>
        </div>
    )
}
