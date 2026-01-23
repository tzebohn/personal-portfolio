/**
 * 
 * ProjectCards component
 * 
 * Displays the featured project as a clickable card
 * 
 * props:
 * - title: String title to display on the card
 * - description: String description to display on the card
 * - href: Link to redirect to when user clicks
 * - image: The image to display on the card
 */
export default function ProjectCards ({ title, description, href, image }) {
    return (
        <a 
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`
                group relative block w-full
                block max-w-[520px] w-full
                font-[Orbitron]
            `}
            >
                <div className="grid grid-cols-[3fr_0.5fr] gap-2 items-stretch">
                    <img 
                        src={image}
                        alt="Image of ShopEasy"
                        className="
                            w-full h-full object-cover 
                            duration-300 group-hover:scale-98 group-hover:brightness-65
                        " 
                    />

                    <div className="flex items-start w-fit py-2">
                        <div className="flex items-center justify-between gap-4 [writing-mode:vertical-rl] rotate-[-180] overflow-hidden">
                            {/* Title */}
                            <h2 className="whitespace-nowrap font-bold uppercase tracking-widest text-white group-hover:text-blue-600">
                                {title}
                            </h2>

                            {/* Description */}
                            <span className="text-gray-400 text-sm whitespace-nowrap font-normal">
                                {description}
                            </span>

                            <div className="w-0 h-[2px] bg-white/40 transition-all duration-300 ease-in-out rotate-90 group-hover:w-full" />
                        </div>
                        
                    </div>
                </div>
        </a>
    )
}