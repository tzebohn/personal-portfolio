/**
 * 
 * ProjectCards component
 * 
 * Displays the featured project as a clickable card
 * 
 * props:
 * - title: String title to display on the card
 * - description: String description to display on the card
 * - href: Link to redirect to when user clicks (when omitted the card is shown as "Coming Soon")
 * - image: The image to display on the card
 */
export default function ProjectCards ({ title, description, href, image }) {
    const isDisabled = !href;

    const cardContent = (
        <div className="grid grid-cols-[3fr_0.5fr] gap-2 items-stretch">
            <div className="relative">
                <img 
                    src={image}
                    alt={`Image of ${title}`}
                    className={`
                        w-full h-full object-cover 
                        duration-300
                        ${isDisabled
                            ? "opacity-70"
                            : "group-hover:scale-98 group-hover:brightness-65"}
                    `} 
                />

                {isDisabled && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <span className="
                            rounded-full border border-white/70 px-4 py-1
                            font-bold uppercase tracking-widest text-white
                            bg-black/40 backdrop-blur-sm
                        ">
                            Coming Soon
                        </span>
                    </div>
                )}
            </div>

            <div className="flex items-start w-fit py-2">
                <div className="flex items-center justify-between gap-4 [writing-mode:vertical-rl] rotate-[-180] overflow-hidden">
                    {/* Title */}
                    <h2 className={`
                        whitespace-nowrap font-bold uppercase tracking-widest text-white
                        ${isDisabled ? "" : "group-hover:text-blue-600"}
                    `}>
                        {title}
                    </h2>

                    {/* Description */}
                    <span className="text-gray-400 text-sm whitespace-nowrap font-normal">
                        {description}
                    </span>

                    <div className={`
                        w-0 h-0.5 bg-white/40 transition-all duration-300 ease-in-out rotate-90
                        ${isDisabled ? "" : "group-hover:w-full"}
                    `} />
                </div>
                
            </div>
        </div>
    );

    if (isDisabled) {
        return (
            <div 
                className="
                    group relative block
                    max-w-130 w-full
                    font-[Orbitron]
                    opacity-70
                    cursor-default
                "
                aria-disabled="true"
            >
                {cardContent}
            </div>
        );
    }

    return (
        <a 
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`
                group relative block
                max-w-130 w-full
                font-[Orbitron]
            `}
        >
            {cardContent}
        </a>
    );
}
