/**
 * TypingText
 * 
 * Displays text with a typing animation effect.
 * Characters are revealed one at a time at a configurable speed.
 */

import { useEffect, useState } from "react";

export default function TypingText ({ text, speed = 50, className = ""}) {

    const [displayedText, setDisplayedText] = useState("")  // Holds the portion of text that has been typed so far
    const [index, setIndex] = useState(0)                   // Tracks the current character index we are typing
    const [showCursor, setShowCursor] = useState(true)      // Controls whether cursor "|" is visible

    // Typing effect
    useEffect(() => {
        // Stop running once we've typed the entire text
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[index])
                setIndex(prev => prev + 1)
            }, speed)

            return () => clearTimeout(timeout)
        }
    }, [index, text, speed])

    // Cursor blinking
    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor(prev => !prev)
        }, 500)

        return () => clearInterval(interval)
    }, [])


    return (
        <span className={className}>
            {displayedText}
            <span className="inline-block w-[1ch]">
                {showCursor ? "|" : " "}
            </span>
        </span>
    )
}