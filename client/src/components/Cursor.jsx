import { useEffect, useRef } from "react"

export default function Cursor() {

    const cursorRef = useRef(null)
    const pos = useRef({ x: 0, y: 0 })
    const visible = useRef(false)

    useEffect(() => {
        // Updates cursor's position and visibility
        const moveCursor = (e) => {
            pos.current.x = e.clientX
            pos.current.y = e.clientY

            // Make sure cursor is visible
            if (!visible.current) {
                visible.current = true
                cursorRef.current.style.opacity = "1"
            }
        }

        // Hides cursor when outside of window
        const handleMouseOut = (e) => {
            if (!e.relatedTarget) {
                visible.current = false
                cursorRef.current.style.opacity = "0"
            }
        }

        // Mouse Event Listeners
        document.addEventListener("mousemove", moveCursor)      // Tracks cursor position
        document.addEventListener("mouseout", handleMouseOut)   // Verifies cursor is outside window

        let rafId   // Tracks the latest ID of scheduled frame
                    // This allows us to safely break the animation loop
        const render = () => {
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(
                ${pos.current.x - 6}px,
                ${pos.current.y - 6}px,
                0
                )`
            }
            rafId = requestAnimationFrame(render)
        }

        render()

        // Clean up event listeners and frames on unmount
        return () => {
            document.removeEventListener("mousemove", moveCursor)
            document.removeEventListener("mouseout", handleMouseOut)
            cancelAnimationFrame(rafId)
        }
    }, [])

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 12,
        height: 12,
        borderRadius: "50%",
        backgroundColor: "#60a5fa",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0,
        willChange: "transform, opacity",
      }}
    />
  )
}