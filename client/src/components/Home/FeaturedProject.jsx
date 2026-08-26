/**
 * FeaturedProject component
 *
 * A single Tier-1 (featured) project rendered from a data object.
 * Reusable: render many from an array via <FeaturedProject project={p} index={i} />.
 *
 * Data shape:
 *   {
 *     title, description, longDescription,
 *     technologies: string[], githubUrl, liveUrl,
 *     highlights: string[], techHighlights?: string[],
 *     architecture?: { title, subtitle?, description, image, alt, flowLegend? }
 *   }
 */

import { useState } from "react";
import { motion as Motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaChevronDown, FaArrowRight } from "react-icons/fa";
import { ProjectVisual, TechTag, ProjectLink } from "./ProjectShared";
import { slugify } from "../../utils/projectUtils";
import ProjectArchitecture from "./ProjectArchitecture";

const EASE = [0.22, 1, 0.36, 1];

export default function FeaturedProject({ project, index, isOpen, onToggle }) {
    const prefersReducedMotion = useReducedMotion();
    const reduce = import.meta.env.DEV ? false : prefersReducedMotion;
    const detailsId = `featured-details-${slugify(project.title)}`;

    const [view, setView] = useState("details"); // "details" | "architecture"
    const [isEnteringArch, setIsEnteringArch] = useState(false);
    const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

    // Reset view to details when the card is collapsed without triggering cascading effect renders
    if (prevIsOpen !== isOpen) {
        setPrevIsOpen(isOpen);
        if (!isOpen) {
            setView("details");
            setIsEnteringArch(false);
        }
    }

    const handleExploreArchitecture = () => {
        if (isEnteringArch) return;
        setIsEnteringArch(true);

        setTimeout(() => {
            setView("architecture");
            setIsEnteringArch(false);
        }, 200);
    };

    return (
        <Motion.article
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="group relative overflow-hidden rounded-xl border border-[#2596BE]/15 bg-[#050b18]/60 shadow-[0_24px_80px_-60px_rgba(37,150,190,0.5)] backdrop-blur-sm transition-colors duration-300 hover:border-[#2596BE]/35"
        >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2596BE]/30 to-transparent" />

            <div className="grid md:grid-cols-[320px_1fr]">
                {/* Visual */}
                <div className="relative border-b border-[#2596BE]/10 md:border-b-0 md:border-r">
                    <ProjectVisual project={project} imgStyle={project.imgStyle}/>
                </div>

                {/* Content */}
                <div className="flex flex-col p-6 md:p-8">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="font-[Orbitron] text-[11px] uppercase tracking-[0.3em] text-[#2596BE]/80">
                                {String(index + 1).padStart(2, "0")} — Featured
                            </p>
                            <h3 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
                                {project.title}
                            </h3>
                        </div>
                        {project.liveUrl && (
                            <span className="mt-1 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#2596BE]/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#2596BE]">
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2596BE]" aria-hidden="true" />
                                Live
                            </span>
                        )}
                    </div>

                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300/90 md:text-[15px]">
                        {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                            <TechTag key={tech}>{tech}</TechTag>
                        ))}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <ProjectLink
                            href={project.githubUrl}
                            label={`View ${project.title} source on GitHub`}
                            icon={FaGithub}
                        >
                            GitHub
                        </ProjectLink>
                        {project.liveUrl && (
                            <ProjectLink
                                href={project.liveUrl}
                                label={`Open ${project.title} live demo`}
                                icon={FaExternalLinkAlt}
                            >
                                Live Demo
                            </ProjectLink>
                        )}
                    </div>
                </div>
            </div>

            {/* Expand / collapse control + details */}
            <div className="border-t border-[#2596BE]/10">
                <button
                    type="button"
                    onClick={onToggle}
                    aria-expanded={isOpen}
                    aria-controls={detailsId}
                    className="cursor-pointer flex w-full items-center justify-between gap-4 rounded px-6 md:px-8 py-4 text-left text-sm font-semibold uppercase tracking-wider text-[#2596BE] transition-colors duration-200 hover:text-[#7fd4ef] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2596BE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050b18]"
                >
                    <span>{isOpen ? (view === "architecture" ? "Hide Project View" : "Hide details") : "View details"}</span>
                    <Motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: reduce ? 0 : 0.3 }}
                        className="inline-flex"
                    >
                        <FaChevronDown className="h-4 w-4" aria-hidden="true" />
                    </Motion.span>
                </button>

                <AnimatePresence initial={false}>
                    {isOpen && (
                        <Motion.div
                            id={detailsId}
                            role="region"
                            aria-label={`${project.title} details`}
                            initial={reduce ? false : { height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={reduce ? undefined : { height: 0, opacity: 0 }}
                            transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
                            className="overflow-hidden border-t border-[#2596BE]/10"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {view === "details" ? (
                                    <Motion.div
                                        key="details-content"
                                        initial={reduce ? false : { opacity: 0, scale: 0.985, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                                        exit={reduce ? undefined : {
                                            opacity: 0,
                                            scale: 0.985,
                                            y: -8,
                                            filter: "blur(4px)",
                                            transition: { duration: 0.22, ease: EASE }
                                        }}
                                        transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
                                        className="space-y-6 px-6 py-5 md:px-8"
                                    >
                                        <div className="grid gap-6 md:grid-cols-2">
                                            <div>
                                                <h4 className="font-[Orbitron] text-[11px] uppercase tracking-[0.25em] text-[#2596BE]/80">
                                                    Overview
                                                </h4>
                                                <p className="mt-3 text-sm leading-relaxed text-slate-300/90">
                                                    {project.longDescription}
                                                </p>
                                            </div>
                                            <div className="space-y-5">
                                                <div>
                                                    <h4 className="font-[Orbitron] text-[11px] uppercase tracking-[0.25em] text-[#2596BE]/80">
                                                        Key Highlights
                                                    </h4>
                                                    <ul className="mt-3 space-y-2">
                                                        {project.highlights.map((item, i) => (
                                                            <li key={i} className="flex gap-2 text-sm leading-relaxed text-slate-300/90">
                                                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2596BE]" aria-hidden="true" />
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                {project.techHighlights?.length > 0 && (
                                                    <div>
                                                        <h4 className="font-[Orbitron] text-[11px] uppercase tracking-[0.25em] text-[#2596BE]/80">
                                                            Technical Highlights
                                                        </h4>
                                                        <ul className="mt-3 space-y-2">
                                                            {project.techHighlights.map((item, i) => (
                                                                <li key={i} className="flex gap-2 text-sm leading-relaxed text-slate-300/90">
                                                                    <span className="mt-1 text-[#2596BE]" aria-hidden="true">&gt;</span>
                                                                    {item}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Technical Architecture Entry Point CTA */}
                                        {project.architecture && (
                                            <div className="pt-2">
                                                <button
                                                    type="button"
                                                    onClick={handleExploreArchitecture}
                                                    className={`${!isEnteringArch && "cursor-pointer"} group/cta relative flex w-full items-center justify-between overflow-hidden rounded-xl border border-[#2596BE]/30 bg-[#030915]/85 p-4 text-left shadow-[0_4px_24px_-8px_rgba(37,150,190,0.25)] transition-all duration-300 hover:border-[#2596BE]/80 hover:bg-[#2596BE]/[0.08] hover:shadow-[0_0_25px_-3px_rgba(37,150,190,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2596BE] sm:p-5`}
                                                >
                                                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2596BE]/70 to-transparent" />
                                                    
                                                    {/* Subtle Light Scanline Sweep on hover */}
                                                    <span className="cta-scanline group-hover/cta:animate-[ctaSweep_1.5s_infinite_linear]" />

                                                    <div className="relative flex items-center gap-3.5">
                                                        <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#2596BE]/30 bg-[#2596BE]/10 text-xs text-[#2596BE] shadow-[0_0_10px_rgba(37,150,190,0.3)] transition-all duration-300 group-hover/cta:border-[#2596BE]/60 group-hover/cta:scale-105">
                                                            ◈
                                                        </span>
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-[Orbitron] text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors duration-200 group-hover/cta:text-[#e8f8ff] sm:text-sm">
                                                                    {isEnteringArch ? "LOADING ARCHITECTURE..." : "EXPLORE SYSTEM ARCHITECTURE"}
                                                                </span>
                                                                <span className="hidden rounded bg-[#2596BE]/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#2596BE] sm:inline-block">
                                                                    Deep Dive
                                                                </span>
                                                            </div>
                                                            <p className="mt-0.5 text-xs text-slate-400">
                                                                Inspect data flow, authentication gateways, and backend services.
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="relative flex items-center gap-2 text-sm text-[#2596BE]">
                                                        <span className="hidden font-[Orbitron] text-[10px] uppercase tracking-wider text-[#2596BE]/70 group-hover/cta:text-[#2596BE] sm:inline">
                                                            {isEnteringArch ? "Opening..." : "View Diagram"}
                                                        </span>
                                                        <FaArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-1.5" aria-hidden="true" />
                                                    </div>
                                                </button>
                                            </div>
                                        )}
                                    </Motion.div>
                                ) : (
                                    <Motion.div
                                        key="architecture-content"
                                        initial={reduce ? false : { opacity: 0, scale: 0.98, y: 16 }}
                                        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                                        exit={reduce ? undefined : {
                                            opacity: 0,
                                            scale: 0.985,
                                            y: -8,
                                            filter: "blur(4px)",
                                            transition: { duration: 0.22, ease: EASE }
                                        }}
                                        transition={{ duration: reduce ? 0 : 0.38, ease: EASE }}
                                        className="p-3 sm:p-5 md:p-6"
                                    >
                                        <ProjectArchitecture
                                            project={project}
                                            onBack={() => setView("details")}
                                            onClose={onToggle}
                                            reduce={reduce}
                                        />
                                    </Motion.div>
                                )}
                            </AnimatePresence>
                        </Motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Motion.article>
    );
}

