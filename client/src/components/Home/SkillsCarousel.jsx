import { useState, useEffect, useRef, useCallback } from "react"

export default function SkillsCarousel ({ skills }) {
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
        }, 8000)
    }, [hasMultipleSlides, skills.length])

    const goToSlide = (index) => {
        setCurrentSlide(index)
        startTimer()
    }

    const nextSlide = () => goToSlide((currentSlide + 1) % skills.length)
    const prevSlide = () => goToSlide((currentSlide - 1 + skills.length) % skills.length)

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

    const maxItems = Math.max(...skills.map((category) => category.items.length))
    const cardsPerRow = 2
    const totalRows = Math.ceil(maxItems / cardsPerRow)
    const rowHeight = 68
    const rowGap = 12
    const slidePadding = 16
    const minSlideHeight = totalRows * rowHeight + (totalRows - 1) * rowGap + slidePadding

    return (
        <div className="select-none">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-white capitalize tracking-wide">
                    {skills[currentSlide].category}
                </h2>
                {hasMultipleSlides && (
                    <div className="flex items-center gap-1.5">
                        {skills.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goToSlide(i)}
                                className={`rounded-full transition-all duration-300 ${
                                    i === currentSlide
                                        ? "w-5 h-1.5 bg-[#62c6ff]"
                                        : "w-1.5 h-1.5 bg-[#1e3055]"
                                }`}
                                aria-label={`Go to ${skills[i].category}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="overflow-hidden rounded-xl">
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
                            className="w-full shrink-0"
                            style={{ minHeight: `${minSlideHeight}px` }}
                        >
                            <div className="grid grid-cols-2 gap-3">
                                {category.items.map((skill) => (
                                    <div key={skill.name} className="flex flex-col items-center py-3">
                                        <skill.Icon
                                            className="text-[1.75rem] mb-2.5"
                                            style={{ color: skill.color }}
                                        />
                                        <p className="text-xs font-semibold text-gray-100 text-center leading-tight mb-2.5">
                                            {skill.name}
                                        </p>
                                        <div className="w-full max-w-25 h-1 rounded-full bg-[#1a2747] overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-500 ease-out"
                                                style={{
                                                    width: `${(skill.rating / 5) * 100}%`,
                                                    backgroundColor: skill.color
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}