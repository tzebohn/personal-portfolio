/**
 * PhaseDots component
 * 
 * Displays a visual dot on the vertical timeline line
 * for better visual hierarchy and UX.
 */

export default function PhaseDots() {
  return (
    <div 
        className="
            relative 
            w-8 h-8 
            md:w-12 md:h-12 
            md:absolute 
            md:top-1/2 md:left-1/2 
            md:-translate-x-1/2 md:-translate-y-1/2 
            md:z-10 
            rounded-full 
            bg-[#03050C]
            flex items-center justify-center
        "
    >
        <div className="w-4 h-4 xs:w-5 xs:h-5 md:w-6 md:h-6 rounded-full bg-[#2596BE] drop-shadow-[0_0_4px_#2596BE] border-2 border-[#2596BE]/60"/>
    </div>
  )
}
