/**
 * SideProject component
 *
 * A single Tier-2 (side / smaller) project rendered from a data object.
 * Reusable: render many from an array via <SideProject project={p} index={i} />.
 *
 * Data shape:
 *   { title, description, technologies: string[], githubUrl }
 */

import { motion as Motion, useReducedMotion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { TechTag, ProjectLink } from "./ProjectShared";

const EASE = [0.22, 1, 0.36, 1];

export default function SideProject({ project, index }) {
    const prefersReducedMotion = useReducedMotion();
    const reduce = import.meta.env.DEV ? false : prefersReducedMotion

    return (
        <Motion.article
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3), ease: EASE }}
            className="group relative flex flex-col rounded-lg border border-[#2596BE]/15 bg-[#050b18]/50 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-[#2596BE]/35"
        >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2596BE]/25 to-transparent" />

            <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-[#e8f8ff] md:text-lg">
                    {project.title}
                </h3>
                <ProjectLink
                    href={project.githubUrl}
                    label={`View ${project.title} source on GitHub`}
                    icon={FaGithub}
                    iconOnly
                    className="shrink-0"
                />
            </div>

            <p className="mt-2 text-sm leading-relaxed text-slate-300/85">
                {project.description}
            </p>

            {project.technologies?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                        <TechTag key={tech}>{tech}</TechTag>
                    ))}
                </div>
            )}
        </Motion.article>
    );
}
