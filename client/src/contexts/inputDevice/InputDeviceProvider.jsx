import { useEffect, useState } from "react";
import { InputDeviceContext } from "./InputDeviceContext";

export default function InputDeviceProvider ({ children }) {
    // Tracks if user on Mobile touch screen
    const [isTouch, setIsTouch] = useState(() => {
        if (typeof window === "undefined") return false

        return window.matchMedia("(hover: none)").matches
    })

    /**
     * Check if user is on Mobile touch screen on component mount
     */
    useEffect(() => {
        if (typeof window === "undefined") return 

        // Check primary input device (Mouse or Touch)
        const mq = window.matchMedia("(hover: none)")

        const handler = (e) => setIsTouch(e.matches)
        mq.addEventListener("change", handler)
        
        return () => mq.removeEventListener("change", handler)
    }, [])

    return (
        <InputDeviceContext.Provider value={{ isTouch }}>
            {children}
        </InputDeviceContext.Provider>
    )
}
