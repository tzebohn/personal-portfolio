import { useState, useEffect, useRef, useCallback } from "react"
import { IoChevronBack, IoChevronForward } from "react-icons/io5"

const SLIDE_TRANSITION_MS = 400

export default function SkillsCarousel ({ skills }) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)
    const [isPaused, setIsPaused] = useState(false)
    const intervalRef = useRef(null)
    const isManualNavigationLockedRef = useRef(false)
    const unlockTimerRef = useRef(null)
    const hasMultipleSlides = skills.length > 1

    const lockManualNavigation = useCallback(() => {
        clearTimeout(unlockTimerRef.current)
        isManualNavigationLockedRef.current = true
        unlockTimerRef.current = setTimeout(() => {
            isManualNavigationLockedRef.current = false
            unlockTimerRef.current = null
        }, SLIDE_TRANSITION_MS)
    }, [])

    const resetTimer = useCallback(() => {
        clearInterval(intervalRef.current)
        if (!hasMultipleSlides || isPaused) return
        intervalRef.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % skills.length)
        }, 7000)
    }, [hasMultipleSlides, skills.length, isPaused])

    const goToSlide = useCallback((index) => {
        resetTimer()
        if (index !== currentSlide) lockManualNavigation()
        setCurrentSlide(index)
    }, [currentSlide, lockManualNavigation, resetTimer])

    const nextSlide = useCallback(() => {
        if (isManualNavigationLockedRef.current) return
        resetTimer()
        lockManualNavigation()
        setCurrentSlide((prev) => (prev + 1) % skills.length)
    }, [lockManualNavigation, resetTimer, skills.length])

    const prevSlide = useCallback(() => {
        if (isManualNavigationLockedRef.current) return
        resetTimer()
        lockManualNavigation()
        setCurrentSlide((prev) => (prev - 1 + skills.length) % skills.length)
    }, [lockManualNavigation, resetTimer, skills.length])

    useEffect(() => {
        resetTimer()
        return () => clearInterval(intervalRef.current)
    }, [resetTimer])

    useEffect(() => {
        return () => clearTimeout(unlockTimerRef.current)
    }, [])

    const handleTouchStart = (e) => {
        setIsPaused(true)
        setTouchEnd(null)
        setTouchStart(e.targetTouches[0].clientX)
    }

    const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)

    const handleTouchEnd = () => {
        setIsPaused(false)
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > 40
        const isRightSwipe = distance < -40
        if (isLeftSwipe) nextSlide()
        if (isRightSwipe) prevSlide()
    }

    if (!skills.length) return null

    return (
        <div 
            className="relative select-none overflow-hidden border border-[#2596BE]/15 bg-[#050b18]/70 p-4 shadow-[0_24px_70px_-48px_rgba(37,150,190,0.65)] backdrop-blur-sm"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2596BE]/55 to-transparent" />
            <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#2596BE]/10 blur-3xl" />

            <div className="relative mb-5 flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <span className="block font-[Orbitron] text-[10px] uppercase tracking-[0.3em] text-[#2596BE]/80">Domain Brief</span>
                    <h3 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-white">
                        {skills[currentSlide].category}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-400">
                        {skills[currentSlide].items.length} technologies with practical implementation context.
                    </p>
                </div>

                <span className="font-[Orbitron] text-xl text-[#2596BE]">0{currentSlide + 1}</span>
            </div>

            {hasMultipleSlides && (
                <div className="relative mb-5 flex items-center gap-1.5">
                    {skills.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goToSlide(i)}
                            className={`h-1 cursor-pointer transition-all duration-300 ${
                                i === currentSlide
                                    ? "w-9 bg-[#2596BE] shadow-[0_0_12px_rgba(37,150,190,0.65)]"
                                    : "w-4 bg-[#2596BE]/20 hover:bg-[#2596BE]/40"
                            }`}
                            aria-label={`Go to ${skills[i].category}`}
                        />
                    ))}
                </div>
            )}

            <div className="relative overflow-hidden">
                <div
                    className="flex transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {skills.map((category) => (
                        <div
                            key={category.category}
                            className="w-full shrink-0 divide-y divide-[#2596BE]/10"
                        >
                            {category.items.map((skill) => (
                                <div 
                                    key={skill.name}
                                    className="grid grid-cols-[auto_1fr] gap-x-3 py-4 text-left"
                                >
                                    <div className="mt-0.5 flex h-9 w-9 items-center justify-center border border-[#2596BE]/15 bg-black/20">
                                        <skill.Icon className="h-4.5 w-4.5" style={{ color: skill.color }} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold tracking-wide text-white">{skill.name}</h4>
                                        <p className="mt-1.5 text-xs leading-relaxed text-slate-300/90">
                                            {skill.context}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative mt-5 flex items-center justify-between border-t border-[#2596BE]/10 pt-4 text-xs text-slate-200">
                <button
                    onClick={prevSlide}
                    className="flex cursor-pointer items-center gap-1.5 px-1 py-1 text-slate-400 transition-colors hover:text-white"
                    aria-label="Previous domain"
                >
                    <IoChevronBack className="h-3.5 w-3.5" />
                    <span>Prev</span>
                </button>
                <span className="font-mono text-[11px] text-slate-500">
                    {currentSlide + 1} / {skills.length}
                </span>
                <button
                    onClick={nextSlide}
                    className="flex cursor-pointer items-center gap-1.5 px-1 py-1 text-slate-400 transition-colors hover:text-white"
                    aria-label="Next domain"
                >
                    <span>Next</span>
                    <IoChevronForward className="h-3.5 w-3.5" />
                </button>
            </div>
        </div>
    )
}
