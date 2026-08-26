import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaExpand, FaCompress, FaTimes } from "react-icons/fa";
import { slugify } from "../../utils/projectUtils";

const EASE = [0.22, 1, 0.36, 1];

export default function ProjectArchitecture({
    project,
    onBack,
    onClose,
    reduce = false,
}) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const expandButtonRef = useRef(null);
    const closeButtonRef = useRef(null);
    const fullscreenModalRef = useRef(null);

    const architecture = project.architecture;
    const layoutId = `architecture-viewer-${slugify(project.title)}`;

    // Lock body scroll and manage key bindings when in fullscreen
    useEffect(() => {
        if (!isFullscreen) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        // Focus close button on open
        if (closeButtonRef.current) {
            closeButtonRef.current.focus();
        }

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                e.preventDefault();
                setIsFullscreen(false);
                if (expandButtonRef.current) {
                    expandButtonRef.current.focus();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isFullscreen]);

    const handleOpenFullscreen = () => {
        setIsFullscreen(true);
    };

    const handleCloseFullscreen = () => {
        setIsFullscreen(false);
        setTimeout(() => {
            if (expandButtonRef.current) {
                expandButtonRef.current.focus();
            }
        }, 50);
    };

    if (!architecture) return null;

    return (
        <>
            {/* Inline Architecture Viewer */}
            <Motion.div
                layoutId={reduce ? undefined : layoutId}
                transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
                className="relative overflow-hidden rounded-xl border border-[#2596BE]/25 bg-[#030712]/95 shadow-[0_20px_60px_-25px_rgba(37,150,190,0.3)] backdrop-blur-md"
            >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2596BE]/60 to-transparent" />

                <div className="space-y-6 p-5 sm:p-6 md:p-8">
                    {/* Header Controls */}
                    <Motion.div
                        initial={reduce ? false : { opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : 0.08, ease: EASE }}
                        className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2596BE]/15 pb-4"
                    >
                        <button
                            type="button"
                            onClick={onBack}
                            className="cursor-pointer group inline-flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#2596BE] transition-all duration-200 hover:bg-[#2596BE]/10 hover:text-[#7fd4ef] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2596BE]"
                        >
                            <FaArrowLeft className="h-3 w-3 transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true" />
                            <span>Back to Details</span>
                        </button>

                        <div className="flex items-center gap-2">
                            <button
                                ref={expandButtonRef}
                                type="button"
                                onClick={handleOpenFullscreen}
                                aria-label="Expand architecture diagram to fullscreen"
                                title="Expand to Fullscreen"
                                className="cursor-pointer inline-flex items-center gap-1.5 rounded-md border border-[#2596BE]/30 bg-[#2596BE]/5 px-3 py-1.5 text-xs font-medium text-[#2596BE] shadow-[0_0_12px_-4px_rgba(37,150,190,0.25)] transition-all duration-200 hover:border-[#2596BE]/60 hover:bg-[#2596BE]/15 hover:text-white hover:shadow-[0_0_18px_-2px_rgba(37,150,190,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2596BE]"
                            >
                                <FaExpand className="h-3 w-3" aria-hidden="true" />
                                <span className="hidden sm:inline">Expand</span>
                            </button>

                            {onClose && (
                                <button
                                    type="button"
                                    onClick={onClose}
                                    aria-label="Close project details"
                                    title="Close"
                                    className="cursor-pointer inline-flex items-center justify-center rounded-md border border-[#2596BE]/20 p-2 text-slate-400 transition-all duration-200 hover:border-[#2596BE]/50 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2596BE]"
                                >
                                    <FaTimes className="h-3 w-3" aria-hidden="true" />
                                </button>
                            )}
                        </div>
                    </Motion.div>

                    {/* Viewer Title & Description */}
                    <Motion.div
                        initial={reduce ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : 0.12, ease: EASE }}
                        className="space-y-1.5"
                    >
                        <div className="flex items-center gap-2">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#2596BE] shadow-[0_0_8px_#2596BE]" aria-hidden="true" />
                            <p className="font-[Orbitron] text-[10px] uppercase tracking-[0.3em] text-[#2596BE]">
                                System Architecture
                            </p>
                            {architecture.subtitle && (
                                <span className="hidden text-xs text-slate-500 sm:inline">— {architecture.subtitle}</span>
                            )}
                        </div>

                        <h4 className="text-xl font-bold tracking-tight text-white md:text-2xl">
                            {architecture.title || "Technical Request & Service Architecture"}
                        </h4>

                        {architecture.description && (
                            <p className="text-sm leading-relaxed text-slate-300/90">
                                {architecture.description}
                            </p>
                        )}
                    </Motion.div>

                    {/* Architecture Diagram Canvas */}
                    <Motion.div
                        initial={reduce ? false : { opacity: 0, scale: 0.985, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                            duration: reduce ? 0 : 0.42,
                            delay: reduce ? 0 : 0.2,
                            ease: EASE,
                        }}
                        className="group relative overflow-hidden rounded-lg border border-[#2596BE]/25 bg-[#02050f] p-3 shadow-[0_16px_50px_-20px_rgba(37,150,190,0.35)] transition-colors duration-300 hover:border-[#2596BE]/40 sm:p-5"
                    >
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2596BE]/40 to-transparent" />

                        <div className="overflow-x-auto arch-scrollbar">
                            <img
                                src={architecture.image}
                                alt={architecture.alt || `${project.title} system architecture diagram`}
                                loading="lazy"
                                className="block w-full h-auto rounded transition-all duration-300"
                            />
                        </div>
                    </Motion.div>

                    {/* Optional Data Flow Legend / Architectural Notes */}
                    {architecture.flowLegend && architecture.flowLegend.length > 0 && (
                        <Motion.div
                            initial={reduce ? false : { opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : 0.28, ease: EASE }}
                            className="space-y-2 border-t border-[#2596BE]/10 pt-4"
                        >
                            <p className="font-[Orbitron] text-[10px] uppercase tracking-[0.25em] text-[#2596BE]/80">
                                Data & Control Flow
                            </p>
                            <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                {architecture.flowLegend.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex flex-col gap-1 rounded-md border border-[#2596BE]/15 bg-[#050b18]/60 p-3 text-xs leading-relaxed text-slate-300 backdrop-blur-xs transition-colors hover:border-[#2596BE]/30"
                                    >
                                        <div className="flex items-center gap-1.5 font-semibold text-[#2596BE]">
                                            <span className="h-1.5 w-1.5 rounded-full bg-[#2596BE]" aria-hidden="true" />
                                            <span className="uppercase tracking-wider">{item.badge}</span>
                                        </div>
                                        <span className="text-slate-300/90">{item.path}</span>
                                    </div>
                                ))}
                            </div>
                        </Motion.div>
                    )}
                </div>
            </Motion.div>

            {/* Fullscreen Technical Workspace (Shared Layout Expansion) */}
            {typeof document !== "undefined" &&
                createPortal(
                    <AnimatePresence>
                        {isFullscreen && (
                            <div
                                className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10"
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby={`fullscreen-title-${slugify(project.title)}`}
                            >
                                {/* Darkened Blur Backdrop */}
                                <Motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
                                    onClick={handleCloseFullscreen}
                                    className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
                                    aria-hidden="true"
                                />

                                {/* Expanded Fullscreen Card with Shared Layout ID */}
                                <Motion.div
                                    ref={fullscreenModalRef}
                                    layoutId={reduce ? undefined : layoutId}
                                    transition={{ duration: reduce ? 0 : 0.42, ease: EASE }}
                                    className="relative z-10 flex h-full max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-[#2596BE]/40 bg-[#030713] shadow-[0_0_80px_-15px_rgba(37,150,190,0.35)]"
                                >
                                    {/* Top Ambient Glow Line */}
                                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2596BE] to-transparent" />

                                    {/* Fullscreen Header */}
                                    <div className="flex shrink-0 items-center justify-between border-b border-[#2596BE]/20 bg-[#020611] px-5 py-4 sm:px-7">
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-2 w-2 rounded-full bg-[#2596BE] shadow-[0_0_10px_#2596BE]" aria-hidden="true" />
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3
                                                        id={`fullscreen-title-${slugify(project.title)}`}
                                                        className="font-[Orbitron] text-xs font-bold uppercase tracking-[0.25em] text-[#2596BE] sm:text-sm"
                                                    >
                                                        System Architecture Workspace
                                                    </h3>
                                                    <span className="rounded bg-[#2596BE]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#7fd4ef]">
                                                        Full-Scale
                                                    </span>
                                                </div>
                                                <p className="mt-0.5 text-xs text-slate-300">
                                                    {project.title} {architecture.subtitle ? `— ${architecture.subtitle}` : ""}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <span className="hidden items-center gap-1 font-mono text-[11px] text-slate-500 sm:inline-flex">
                                                <kbd className="rounded border border-slate-700 bg-slate-900 px-1.5 py-0.5 text-slate-400">ESC</kbd>
                                                <span>to exit</span>
                                            </span>

                                            <button
                                                type="button"
                                                onClick={handleCloseFullscreen}
                                                aria-label="Collapse fullscreen view"
                                                title="Collapse (Exit Fullscreen)"
                                                className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-[#2596BE]/30 bg-[#2596BE]/10 px-3 py-1.5 text-xs font-semibold text-[#7fd4ef] transition-all hover:border-[#2596BE]/60 hover:bg-[#2596BE]/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2596BE]"
                                            >
                                                <FaCompress className="h-3.5 w-3.5" aria-hidden="true" />
                                                <span className="hidden sm:inline">Collapse</span>
                                            </button>

                                            <button
                                                ref={closeButtonRef}
                                                type="button"
                                                onClick={handleCloseFullscreen}
                                                aria-label="Close fullscreen view"
                                                title="Close"
                                                className="cursor-pointer inline-flex items-center justify-center rounded-lg border border-slate-700/60 p-2 text-slate-400 transition-all hover:border-red-500/50 hover:bg-red-500/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                                            >
                                                <FaTimes className="h-4 w-4" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Main Fullscreen Diagram Stage */}
                                    <div className="flex flex-1 items-center justify-center overflow-auto arch-scrollbar bg-[#01040b] p-4 sm:p-8">
                                        <img
                                            src={architecture.image}
                                            alt={architecture.alt || `${project.title} system architecture diagram`}
                                            className="
                                                block
                                                w-full
                                                h-auto
                                                max-h-full
                                                max-w-full
                                                rounded-lg
                                                object-contain
                                                drop-shadow-[0_12px_40px_rgba(0,0,0,0.8)]
                                            "
                                        />
                                    </div>

                                    {/* Fullscreen Footer Summary */}
                                    {architecture.flowLegend && architecture.flowLegend.length > 0 && (
                                        <div className="shrink-0 border-t border-[#2596BE]/20 bg-[#020611] px-5 py-3 sm:px-7">
                                            <div className="flex flex-wrap items-center justify-between gap-3">
                                                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                                                    {architecture.flowLegend.map((item, idx) => (
                                                        <div key={idx} className="flex items-center gap-2">
                                                            <span className="font-[Orbitron] text-[10px] uppercase tracking-wider text-[#2596BE]">
                                                                {item.badge}:
                                                            </span>
                                                            <span className="text-slate-300/90">{item.path}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={handleCloseFullscreen}
                                                    className="text-xs font-semibold text-[#2596BE] underline hover:text-[#7fd4ef] focus-visible:outline-none"
                                                >
                                                    Return to Card
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </Motion.div>
                            </div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
        </>
    );
}