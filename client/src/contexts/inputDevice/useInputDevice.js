import { useContext } from "react"
import { InputDeviceContext } from "./InputDeviceContext"


/**
 * Custom Hook 
 */
export function useInputDevice () {
    const ctx = useContext(InputDeviceContext)
    if (!ctx) {
        throw new Error("useInputDevice must be used inside InputDeviceProvider")
    }
    return ctx
}