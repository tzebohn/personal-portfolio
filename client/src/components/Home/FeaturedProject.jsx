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
 *     highlights: string[], techHighlights?: string[]
 *   }
 */

import { motion as Motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaChevronDown } from "react-icons/fa";
import { ProjectVisual, TechTag, ProjectLink } from "./ProjectShared";
import { slugify } from "../../utils/projectUtils";

const EASE = [0.22, 1, 0.36, 1];

export default function FeaturedProject({ project, index, isOpen, onToggle }) {
    const prefersReducedMotion = useReducedMotion();
    const reduce = import.meta.env.DEV ? false : prefersReducedMotion;
    const detailsId = `featured-details-${slugify(project.title)}`;

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
                    <span>{isOpen ? "Hide details" : "View details"}</span>
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
                            <div className="grid gap-6 pb-7 md:grid-cols-2 px-6 md:px-8 py-4">
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
                        </Motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Motion.article>
    );
}
