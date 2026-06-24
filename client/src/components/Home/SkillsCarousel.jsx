import { useState, useEffect, useRef, useCallback } from "react"

export default function SkillsCarousel ({ skills}) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)
    const intervalRef = useRef(null)
    const hasMultipleSlides = skills.length > 1

    const startTimer = useCallback(() => {
        if (!hasMultipleSlides) return
        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % skills.length)
        }, 5000)
    }, [hasMultipleSlides, skills.length])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % skills.length)
        startTimer()
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + skills.length) % skills.length)
        startTimer()
    }

    const goToSlide = (index) => {
        setCurrentSlide(index)
        startTimer()
    }

    useEffect(() => {
        startTimer()
        return () => clearInterval(intervalRef.current)
    }, [startTimer])

    const handleTouchStart = (e) => {
        setTouchEnd(null)
        setTouchStart(e.targetTouches[0].clientX)
    }

    const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > 50
        const isRightSwipe = distance < -50
        if (isLeftSwipe) nextSlide()
        if (isRightSwipe) prevSlide()
    }

    if (!skills.length) return null

    const activeSlide = currentSlide % skills.length
    const maxItems = Math.max(...skills.map((category) => category.items.length))
    const cardsPerRow = 2
    const cardHeight = 132
    const rowGap = 10
    const contentHeaderHeight = 52
    const totalRows = Math.ceil(maxItems / cardsPerRow)
    const minContentHeight = contentHeaderHeight + (totalRows * cardHeight) + ((totalRows - 1) * rowGap)
    const currentCategory = skills[activeSlide]
    const progressWidth = `${((activeSlide + 1) / skills.length) * 100}%`

    return (
        <div className="rounded-2xl border border-[#2f3a55] bg-linear-to- from-[#121d3d] to-[#0a1228] p-5 shadow-[0_14px_45px_rgba(2,6,23,0.45)] sm:p-8">
            <h2 className="text-white font-bold text-xl sm:text-2xl">Core Skills</h2>
            <p className="mt-1 text-xs font-medium tracking-wide text-slate-300">Browse by category and swipe between groups</p>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                {skills.map((category, index) => (
                    <button
                        key={category.category}
                        onClick={() => goToSlide(index)}
                        className={`w-full min-w-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-center text-xs font-semibold capitalize transition sm:w-auto sm:min-w-fit ${
                            index === activeSlide
                                ? "border-[#62c6ff] bg-[#0b2c53] text-[#a8e3ff]"
                                : "border-[#2f3a55] bg-[#0d1733] text-slate-300"
                        }`}
                        aria-label={`Go to ${category.category} skills`}
                    >
                        {category.category}
                    </button>
                ))}
            </div>

            <div className="relative mt-3">
                <div 
                    className="rounded-xl border border-[#2f3a55] bg-[#101a36] p-4"
                    style={{ minHeight: `${minContentHeight}px` }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="mb-3 flex items-center justify-between gap-3">
                        <h3 className="text-sm font-semibold capitalize tracking-wide text-[#8ad7ff]">{currentCategory.category}</h3>
                        <span className="rounded-full border border-[#2f3a55] bg-[#0a142f] px-2.5 py-1 text-[11px] font-semibold text-slate-300">
                            {currentCategory.items.length} tools
                        </span>
                    </div>

                    <div key={currentCategory.category} className="grid grid-cols-2 gap-2.5">
                        {currentCategory.items.map((skill) => (
                            <div key={skill.name} className="h-33 rounded-lg border border-[#324368] bg-[#0b1330] px-2.5 py-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                                <skill.Icon className="mx-auto mb-2 text-[1.6rem]" style={{ color: skill.color }} />
                                <p className="mx-auto flex min-h-7.5 items-center justify-center text-xs font-semibold leading-tight text-gray-100">{skill.name}</p>
                                <div className="mt-2 flex justify-center gap-0.5">
                                    {[...Array(5)].map((_, level) => (
                                        <span
                                            key={level}
                                            className={`text-sm leading-none ${level < skill.rating ? "text-[#fbbf24]" : "text-[#31466f]"}`}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                                <p className="mt-1 text-[10px] font-medium tracking-wide text-slate-400">{skill.rating}/5 proficiency</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                    <button
                        onClick={prevSlide}
                        disabled={!hasMultipleSlides}
                        aria-label="Previous skill category"
                        className="rounded-full border border-[#35507a] bg-[#0d2143] px-3 py-2 text-sm font-semibold text-[#b5e8ff] transition hover:bg-[#15315f] disabled:cursor-not-allowed disabled:opacity-45"
                    >
                        ←
                    </button>

                    <div className="flex-1">
                        <div className="h-1.5 rounded-full bg-[#1a2747]">
                            <div className="h-full rounded-full bg-linear-to-r from-[#5ec6ff] to-[#2f82ff] transition-all duration-300" style={{ width: progressWidth }} />
                        </div>
                        <p className="mt-1 text-center text-[11px] font-semibold text-slate-300">{activeSlide + 1} of {skills.length}</p>
                    </div>

                    <button
                        onClick={nextSlide}
                        disabled={!hasMultipleSlides}
                        aria-label="Next skill category"
                        className="rounded-full border border-[#35507a] bg-[#0d2143] px-3 py-2 text-sm font-semibold text-[#b5e8ff] transition hover:bg-[#15315f] disabled:cursor-not-allowed disabled:opacity-45"
                    >
                        →
                    </button>
                </div>

                {hasMultipleSlides && (
                    <p className="mt-2 text-center text-[11px] font-medium tracking-wide text-slate-400">Tip: swipe left or right to move quickly</p>
                )}
            </div>
        </div>
    )
}
