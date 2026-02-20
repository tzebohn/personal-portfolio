/**
 * FeaturedProjects component
 * 
 * This component renders a list of featured projects.
 * 
 * Each project can include:
 *  - A title
 *  - Stats (label/value pairs)
 *  - A description
 *  - Features (list of bullet points)
 *  - Media (image or video)
 *  - Href (link to project)
 * 
 * props:
 *  - project: Project object (title, stats, description, features, media)
 *  - isAvailable (Boolean): Determines the current status/availability of the project
 *  - reverse: Ensures a nice alternating pattern between each FeaturedProjects component
 */

export default function FeaturedProjects ({ project, isAvailable, reverse }) {
    return (
        <article className="w-full max-w-[1350px] mx-auto xl:mb-[200px] lg:mb-[150px] md:mb-[120px] mb-20">
            <div className={`flex flex-col items-center gap-10 text-white ${reverse ? "md:flex-row-reverse" : "md:flex-row"}`}>

                {/* Project card */}
                <div 
                    className={`
                        project-card
                        flex-1 max-w-[583px]
                        text-white/90 font-[Orbitron]
                        border border-[#2596BE]/30
                        rounded-lg p-6 
                        bg-black
                        shadow-lg shadow-[#2596BE]/20
                        ${isAvailable ? "hover:border-[#2596BE]/60 hover:shadow-xl hover:shadow-[#2596BE]/30 brightness-150" : "grayscale-50"}
                    `}
                >

                    <h3
                        className="
                            text-[#2596BE]
                            xl:text-[40px] lg:text-[32px] md:text-[28px] text-2xl
                            xl:leading-[50px] lg:leading-[42px] leading-8
                            [text-shadow:0_0_6px_rgba(37,150,190,0.6),0_0_18px_rgba(37,150,190,0.35)]
                            mb-6 
                        "
                    >
                        {project.title}
                    </h3>

                    {/* Add project descriptions below here */}
                    <div className="mb-6 border-l-2 border-[#2596BE]/30 pl-4">
                        {project.stats.map((stat, index) => (
                            <p key={index} className="text-xl text-[#2596BE]">
                                {`${stat.label}: `}<span className="text-white">{stat.value}</span>
                            </p>
                        ))}
                    </div>

                    
                    <div className="xl:text-2xl md:text-xl text-lg xl:leading-[36px] text-gray-300 mb-8 space-y-2">
                        <p>
                            {project.description}
                        </p>
                        <ul className="space-y-1 mt-4">
                            {project.features.map((item, index) => (
                                <li key={index} className="text-white"><span className="text-[#2596BE]">&gt;</span>{` ${item}`}</li>
                            ))}
                        </ul>
                    </div>

                    {isAvailable ? (
                        <a  
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                uppercase overflow-hidden cursor-pointer
                                border rounded-tl-lg rounded-br-lg border-[#2596BE]
                                p-2 px-6
                                text-[#2596BE]
                                hover:bg-[rgba(37,150,190,0.1)]
                                hover:shadow-[0_0_15px_rgba(37,150,190,0.4)]
                                hover:[text-shadow:0_0_8px_rgba(37,150,190,0.8)]
                                hover:-translate-y-0.5
                            "
                            style={{ 
                                clipPath: `
                                    polygon(
                                    10px 0,100% 0,
                                    100% calc(100% - 10px),
                                    calc(100% - 10px) 100%,
                                    0 100%,0 10px)
                                `
                            }}
                        >
                            {project.title}
                        </a>
                    ) : (
                        <button 
                            className={`
                                uppercase border
                                rounded-tl-lg rounded-br-lg
                                p-2 px-6
                                overflow-hidden
                                text-[#ED3F0A]
                                border-[#ED3F0A]/70
                                bg-[rgba(237,63,10,0.08)]
                                cursor-not-allowed
                                opacity-90
                            `}
                            style={{ 
                                clipPath: `
                                    polygon(
                                    10px 0,100% 0,
                                    100% calc(100% - 10px),
                                    calc(100% - 10px) 100%,
                                    0 100%,0 10px)
                                `
                            }}
                        >
                            🔒 LOCKED
                        </button>
                    )}
                </div>

                {/* Video Container*/}
                <div className="project-card flex-1 w-full rounded-lg border border-[#2596BE]/30 shadow-lg shadow-[#2596BE]/20">
                    {project.media.type === "video" ? (
                        <video 
                            src={project.media.src}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover rounded-lg"
                            loading="lazy"
                        />
                    ) : (
                        <img 
                            src={project.media.src}
                            className="w-full h-full object-cover rounded-lg"
                            loading="lazy"
                        />
                    )}
                </div>
            </div>
        </article>        
    )
}