/**
 * 
 */
import { SpotLightShadow } from "@react-three/drei";
import { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

export default function FaqCards ({ title, description }) {
    const [showDetails, setShowDetails] = useState(false)

    return (
        <div>
            <button
                onClick={() => setShowDetails(prev => !prev)} 
                className={`w-full flex justify-between items-center gap-2 text-white bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700/60 transition-all duration-300 ease-out hover:border-gray-600 hover:bg-gray-800/90 active:scale-[0.98] p-4 px-5 cursor-pointer ${showDetails ? "rounded-t-lg" : "rounded-lg"}`}
            >
                <span className="font-bold tracking-wider text-base sm:text-xl text-start">{title}</span>
                <div className={`text-xl transition-transform duration-300 ${showDetails ? "rotate-180": "rotate-0"}`}>
                    {!showDetails && < IoMdArrowDropdown />}
                    {showDetails && < IoMdArrowDropup />}
                </div>
            </button>
            {showDetails && (
                <div className="bg-gray-900 border border-t-0 border-gray-700/60 px-5 py-4 rounded-b-lg animate-fadeIn">
                    <p className="text-gray-200 text-sm sm:text-base font-semibold tracking-wide leading-7">{description}</p>
                </div>
            )}
        </div>
    )
}