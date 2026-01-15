import Hero from "../components/Hero/Hero";
import UIIcon from "../assets/icons/ui.svg?react";
import ResponsiveIcon from "../assets/icons/responsive.svg?react"
import UxIcon from "../assets/icons/UX.svg?react"
import SecurityIcon from "../assets/icons/security.svg?react"
import ApiIcon from "../assets/icons/api.svg?react"
import DatabaseIcon from "../assets/icons/database.svg?react"
import DeployIcon from "../assets/icons/deploy.svg?react"
import DevopsIcon from "../assets/icons/devops.svg?react"
import GridCard from "../components/Home/GridCard";

// Grid Cards to display 
const cards = [
    {
        Icon: UIIcon,
        title: "UI",
        description: "I design modern interfaces tailored to my clients’ needs.",
    },
    {
        Icon: UxIcon,
        title: "UX",
        description: "I aim to deliver the most intuitive and satisfying user experience possible."
    },
    {
        Icon: ResponsiveIcon,
        title: "Responsive Design",
        description: "All my websites are fully responsive, adapting seamlessly to mobile phones, tablets, and all screen sizes.",
    },
    {
        Icon: ApiIcon,
        title: "API",
        description: "I design and build reliable backend systems and APIs that power modern web applications."
    },
    {
        Icon: DatabaseIcon,
        title: "Database",
        description: "I design and manage databases, including MySQL, to ensure reliable and efficient data storage."
    },
    {
        Icon: DeployIcon,
        title: "Deployment",
        description: "I deploy and host web applications on modern plaforms, ensuring they are fast, reliable, and accessible.",
    },
    {
        Icon: DevopsIcon,
        title: "Testing",
        description: "DevOps and CI/CD for modern web apps, with automated testing using Vitest.",
    },
    {
        Icon: SecurityIcon,
        title: "Security",
        description: "I prioritize security by applying best practices that safeguard applications and user information.",
    },
]

export default function Home () {
    return (
        <>
            {/* Hero Banner */}
            <section className="h-screen">
                <Hero /> 
            </section>

            {/* Main body content */}
            <main>
                {/* Introduction section */}
                <section className="bg-[#03050C] p-4 px-8">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-gray-500 font-semibold text-xl lg:text-2xl tracking-wide">Introduction</h2>
                        <div className="flex flex-col gap-4 lg:items-center">
                            <h1 className="text-white font-bold text-3xl lg:text-5xl tracking-wide">Overview</h1>
                            <p className="text-gray-500 font-semibold max-w-xl xs:text-sm sm:text-base md:text-lg lg:text-xl lg:text-center leading-relaxed">
                                I am a Computer Science bachelor's graduate at CUNY Brooklyn College
                                with a passion for technology and learning. My interests 
                                include web development, modern programming frameworks,
                                and Artifical Intelligence. This portfolio highlights my
                                projects, technical skills, and growth as a developer.
                            </p>
                        </div>
                    </div>

                    {/* Grid layout section */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 text-white mt-48">
                        {cards.map((card, i) => (
                            <GridCard
                                key={i}
                                Icon={card.Icon}
                                title={card.title}
                                description={card.description}
                            />
                        ))}
                    </div>

                    {/* Vertical divider */}
                    <div className="mt-4 flex items-center justify-center">
                        <div className="w-[2px] h-40 bg-gray-700"/>
                    </div>

                </section>

            </main>
        </>
    )
} 