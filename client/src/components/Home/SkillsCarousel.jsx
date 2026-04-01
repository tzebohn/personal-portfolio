import { useState, useEffect, useRef } from "react"

export default function SkillsCarousel ({ skills}) {
    const [currentSlide, setCurrentSlide] = useState(0) // Current slide index for mobile slideshow
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)
    const intervalRef = useRef(null)

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % skills.length)
        resetTimer()
    }
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + skills.length) % skills.length)
        resetTimer()
    }
    const goToSlide = (index) => {
        setCurrentSlide(index)
        resetTimer()
    }

    // Reset the auto-advance timer
    const resetTimer = () => {
        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(nextSlide, 5000)
    }

    // Auto-advance every 5 seconds
    useEffect(() => {
        intervalRef.current = setInterval(nextSlide, 5000)
        return () => clearInterval(intervalRef.current)
    }, [])

    // Handle touch start
    const handleTouchStart = (e) => {
        setTouchEnd(0)
        setTouchStart(e.targetTouches[0].clientX)
    }

    // Handle touch move
    const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)

    // Handle touch end
    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > 50
        const isRightSwipe = distance < -50
        if (isLeftSwipe) nextSlide()
        if (isRightSwipe) prevSlide()
    }

    // Keep slideshow height stable by choosing the largest category height
    const maxItems = Math.max(...skills.map((category) => category.items.length))
    const rowHeight = 120 // approx per row height in px (card + spacing)
    const minContentHeight = Math.ceil(maxItems / 2) * rowHeight

    return (
        <div className="rounded-2xl border border-[#2f3a55] bg-[#0e162f] p-5 sm:p-8">
            <h2 className="text-white font-bold text-xl sm:text-2xl mb-4">Core Skills</h2>
            <div className="relative">
                <div 
                    className="rounded-lg border border-[#2f3a55] bg-[#111b33] p-4"
                    style={{ minHeight: `${minContentHeight}px` }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <h3 className="text-blue-400 font-semibold capitalize mb-3">{skills[currentSlide].category}</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {skills[currentSlide].items.map((skill, idx) => (
                            <div key={idx} className="rounded-md border border-[#2f3a55] bg-[#0b1231] p-2 text-center">
                                <skill.Icon className="mx-auto text-2xl sm:text-3xl mb-1" style={{ color: skill.color }} />
                                <p className="text-gray-200 text-xs sm:text-sm font-medium">{skill.name}</p>
                                <div className="mt-1 flex justify-center gap-0.5">
                                    {[...Array(5)].map((_, starIndex) => (
                                        <span key={starIndex} className={starIndex < skill.rating ? "text-yellow-400" : "text-gray-600"}>
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Dots indicator */}
                <div className="flex justify-center mt-4 space-x-2">
                    {skills.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-1 h-1 rounded-full ${index === currentSlide ? 'bg-blue-400' : 'bg-gray-600'}`}
                        />
                    ))}
                </div>
                <div className="flex justify-between mt-4 text-xs text-slate-200">
                    <button onClick={prevSlide} className="px-3 py-1 bg-white/10 border border-white/15 rounded text-white/70 hover:text-white/90 hover:bg-white/15">←</button>
                    <button onClick={nextSlide} className="px-3 py-1 bg-white/10 border border-white/15 rounded text-white/70 hover:text-white/90 hover:bg-white/15">→</button>
                </div>
            </div>
        </div>
    )
}