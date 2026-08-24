/**
 * Shared building blocks for the Projects section.
 *
 * These are intentionally small and presentational so that the featured and
 * side-project components stay focused on layout and behavior.
 */

import { FaGithub } from "react-icons/fa";

/** Technology tag / badge. */
export function TechTag({ children }) {
    return (
        <span className="inline-flex items-center rounded-md border border-[#2596BE]/30 bg-[#2596BE]/[0.06] px-2.5 py-1 text-xs font-medium tracking-wide text-slate-200/90 transition-colors duration-200 group-hover:border-[#2596BE]/45">
            {children}
        </span>
    );
}

const CTA_CLIP_PATH =
    "polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px)";

/**
 * Outbound link styled as the project's signature CTA.
 *
 * Mirrors the angled-corner button already present in the portfolio so the
 * Projects section feels native. Pass `iconOnly` for compact icon buttons.
 */
export function ProjectLink({ href, label, icon, iconOnly = false, children, className = "" }) {
    const IconComponent = icon || FaGithub
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={`
                bg-slate-950 text-slate-400 border border-slate-400 border-b-4 
                font-medium overflow-hidden relative px-4 py-2 rounded-md 
                hover:brightness-150 
                hover:border-t-4 
                hover:border-b 
                active:opacity-75 outline-none duration-300
                group/button
                ${className}
            `}
        >
            <span className="bg-slate-400 shadow-slate-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover/button:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"/>
            <span className="flex items-center gap-2">
                <IconComponent className="h-4 w-4" aria-hidden="true" />
                {!iconOnly && <span>{children}</span>}
            </span>
        </a>
    );
}

const ACCENTS = {
    cyan: "radial-gradient(120% 120% at 15% 10%, rgba(37,150,190,0.30), transparent 55%), radial-gradient(100% 100% at 90% 90%, rgba(58,141,255,0.22), transparent 60%), #050b18",
    blue: "radial-gradient(120% 120% at 15% 10%, rgba(58,141,255,0.30), transparent 55%), radial-gradient(100% 100% at 90% 90%, rgba(37,150,190,0.20), transparent 60%), #050b18",
    violet: "radial-gradient(120% 120% at 15% 10%, rgba(139,92,246,0.28), transparent 55%), radial-gradient(100% 100% at 90% 90%, rgba(37,150,190,0.20), transparent 60%), #050b18",
};

const GRID_OVERLAY = {
    backgroundColor: "transparent",
    backgroundImage:
        "linear-gradient(rgba(37,150,190,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(37,150,190,0.5) 1px, transparent 1px)",
    backgroundSize: "28px 28px",
};

/**
 * Visual placeholder for a project.
 *
 * Uses a tasteful accent gradient + faint grid so cards look intentional even
 * before a real screenshot is dropped in. If `project.image` is provided it is
 * rendered on top of the placeholder.
 */
export function ProjectVisual({ project, imgStyle = "" }) {
    const gradient = ACCENTS[project.accent] || ACCENTS.cyan;

    return (
        <div className="relative min-h-[200px] w-full overflow-hidden md:h-full md:min-h-full">
            <div
                className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-105"
                style={{ background: gradient }}
            >
                <div className="absolute inset-0 opacity-[0.15]" style={GRID_OVERLAY} />
            </div>

            {project.image && (
                <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    loading="lazy"
                    className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105 ${imgStyle}`}
                />
            )}
        </div>
    );
}
