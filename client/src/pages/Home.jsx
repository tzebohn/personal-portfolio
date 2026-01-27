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
import ProjectsTransition from "../components/Home/ProjectsTransition";
import StockMarketVideo from "../assets/videos/stockmarket.mp4"
import CollegeInvadersImg from "../assets/images/collegeinvaders.png"
import MessageboardImg from "../assets/images/messageboard.png"
import ShopeasyImg from "../assets/images/shopeasy.png"
import "./home.css"
import RoadmapItems from "../components/Home/RoadmapItems";
import { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion"

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

    const lineScrollRef = useRef(null)      // Tracks the current scroll height for roadmap container

    /**
     * Transform the length of the vertical line visually
     * as the user scrolls
     */
    const { scrollYProgress } = useScroll({
        target: lineScrollRef,
        offset: ["start 85%", "end 25%"]
    })
    const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

    return (
        <>
            {/* Hero Banner */}
            <section className="h-screen">
                <Hero /> 
            </section>

            {/* Main body content */}
            <main>
                {/* Introduction section */}
                <section className="bg-[#03050C] pt-4 px-8">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-gray-500 font-semibold text-xl lg:text-2xl tracking-wide">Introduction</h2>
                        <div className="flex flex-col gap-4 lg:items-center">
                            <h1 className="text-white font-bold text-3xl lg:text-5xl tracking-wide">Overview</h1>
                            <p className="text-gray-500 font-semibold max-w-xl text-sm xs:text-base md:text-lg lg:text-xl lg:text-center leading-relaxed">
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

                {/* Project highlights */}
                <section>
                    {/* Nice transition into projects */}
                    < ProjectsTransition />
                    
                    {/* Projects go down here */}
                    <div className="bg-black pt-20">
                        <div className="relative overflow-hidden">
                            {/* Grid layer goes here */}
                            <div className="astral-grid" />

                            {/* Project Content */}
                            <div className="relative flex flex-col items-center px-5 lg:px-10">
                                {/* Featured Project 1 */}
                                <article className="w-full max-w-[1350px] mx-auto xl:mb-[200px] lg:mb-[150px] md:mb-[120px] mb-20">
                                    <div className="flex flex-col items-center gap-10 text-white md:flex-row">

                                        {/* Project card */}
                                        <div 
                                            className="
                                                project-card
                                                flex-1 max-w-[583px]
                                                text-white/90 font-[Orbitron]
                                                border border-[#2596BE]/30 hover:border-[#2596BE]/60
                                                rounded-lg p-6 
                                                bg-black
                                                shadow-lg shadow-[#2596BE]/20
                                                hover:shadow-xl hover:shadow-[#2596BE]/30
                                                order-1 md:order-1
                                            "
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
                                                Stock Scanner
                                            </h3>

                                            {/* Add project descriptions below here */}
                                            <div className="mb-6 border-l-2 border-[#2596BE]/30 pl-4">
                                                <p className="text-xl text-[#2596BE]">
                                                    MARKET DATA: <span className="text-white">LIVE & CONTINUOUS</span>
                                                </p>
                                                <p className="text-xl text-[#2596BE]">
                                                    SIGNAL TYPE: <span className="text-white text-shadow-glow-sm">MOMENTUM & NEWS</span>
                                                </p>
                                            </div>

                                            
                                            <div className="xl:text-2xl md:text-xl text-lg xl:leading-[36px] text-gray-300 mb-8 space-y-2">
                                                <p>
                                                    A data-driven tool for monitoring stock momentum. Aggregates live news and market data to help users quickly identify trending stocks.
                                                </p>
                                                <ul className="space-y-1 mt-4">
                                                    <li className="text-white"><span className="text-[#2596BE]">&gt;</span> Real-time data aggregation</li>
                                                    <li className="text-white"><span className="text-[#2596BE]">&gt;</span> Clean, responsive data visualizations</li>
                                                </ul>
                                            </div>

                                            
                                            <button 
                                                className="
                                                    text-[#2596BE] uppercase border
                                                    rounded-tl-lg rounded-br-lg
                                                    p-2 px-6
                                                    hover:bg-[rgba(37,150,190,0.1)]
                                                    hover:shadow-[0_0_15px_rgba(237,63,10,0.3)]
                                                    hover:[text-shadow:0_0_8px_rgba(237,63,10,0.8)]
                                                    hover:-translate-y-0.5
                                                    overflow-hidden
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
                                                Stock Scanner
                                            </button>
                                        </div>

                                        {/* Video Container*/}
                                        <div className="project-card flex-1 w-full rounded-lg border border-[#2596BE]/30 shadow-lg shadow-[#2596BE]/20 order-2 md:order-2">
                                            <video 
                                                src={StockMarketVideo}
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                className="w-full h-full object-cover rounded-lg"
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                </article>

                                {/* Featured Project 2 */}
                                <article className="w-full max-w-[1350px] mx-auto xl:mb-[200px] lg:mb-[150px] md:mb-[120px] mb-20">
                                    <div className="flex flex-col items-center gap-10 text-white md:flex-row">

                                        {/* Project card */}
                                        <div 
                                            className="
                                                project-card
                                                order-2
                                                flex-1 max-w-[583px]
                                                text-white/90 font-[Orbitron]
                                                border border-[#2596BE]/30 hover:border-[#2596BE]/60
                                                rounded-lg p-6 
                                                bg-black
                                                shadow-lg shadow-[#2596BE]/20
                                                hover:shadow-xl hover:shadow-[#2596BE]/30
                                                order-1 md:order-2
                                            "
                                        >

                                            <h3
                                                className="
                                                    text-[#2596BE]
                                                    xl:text-[40px] lg:text-[32px] md:text-[28px] text-2xl
                                                    xl:leading-[50px] lg:leading-[42px] leading-8
                                                    [text-shadow:0_0_6px_rgba(37,150,190,0.6),0_0_18px_rgba(37,150,190,0.35)]
                                                    mb-6
                                                    uppercase
                                                "
                                            >
                                                College Invaders
                                            </h3>

                                            {/* Add project descriptions below here */}
                                            <div className="mb-6 border-l-2 border-[#2596BE]/30 pl-4">
                                                <p className="text-xl text-[#2596BE]">
                                                    GAMEPLAY STATUS: <span className="text-white">FULLY OPERATIONAL</span>
                                                </p>
                                                <p className="text-xl text-[#2596BE]">
                                                    CORE MECHANICS: <span className="text-white text-shadow-glow-sm">SHOOT & DODGE</span>
                                                </p>
                                            </div>

                                            
                                            <div className="xl:text-2xl md:text-xl text-lg xl:leading-[36px] text-gray-300 mb-8 space-y-2">
                                                <p>
                                                    A modern take on the classic Space Invaders arcade shooter. Players defend College against descending agents with responsive controls and smooth gameplay.
                                                </p>
                                                <ul className="space-y-1 mt-4">
                                                    <li className="text-white"><span className="text-[#2596BE]">&gt;</span> Progressive enemy waves with escalating difficulty</li>
                                                    <li className="text-white"><span className="text-[#2596BE]">&gt;</span> Score tracking</li>
                                                </ul>
                                            </div>

                                            
                                            <a
                                                href="https://tzebohn.github.io/collegeinvaders/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="
                                                    inline-flex items-center justify-center
                                                    text-[#2596BE] uppercase border
                                                    rounded-tl-lg rounded-br-lg
                                                    p-2 px-6
                                                    hover:bg-[rgba(37,150,190,0.1)]
                                                    hover:shadow-[0_0_15px_rgba(237,63,10,0.3)]
                                                    hover:[text-shadow:0_0_8px_rgba(237,63,10,0.8)]
                                                    hover:-translate-y-0.5
                                                    overflow-hidden
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
                                                College Invaders
                                            </a>
                                        </div>

                                        {/* Video Container*/}
                                        <div className="project-card flex-1 order-1 w-full rounded-lg border border-[#2596BE]/30 shadow-lg shadow-[#2596BE]/20 order-2 md:order-1">
                                            <img 
                                                src={CollegeInvadersImg}
                                                className="w-full h-full object-cover rounded-lg"
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                </article>

                                {/* Featured Project 3 */}
                                <article className="w-full max-w-[1350px] mx-auto xl:mb-[200px] lg:mb-[150px] md:mb-[120px] mb-20">
                                    <div className="flex flex-col items-center gap-10 text-white md:flex-row">

                                        {/* Project card */}
                                        <div 
                                            className="
                                                project-card
                                                flex-1 max-w-[583px]
                                                text-white/90 font-[Orbitron]
                                                border border-[#2596BE]/30 hover:border-[#2596BE]/60
                                                rounded-lg p-6 
                                                bg-black
                                                shadow-lg shadow-[#2596BE]/20
                                                hover:shadow-xl hover:shadow-[#2596BE]/30
                                                order-1 md:order-1
                                            "
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
                                                Message Board
                                            </h3>

                                            {/* Add project descriptions below here */}
                                            <div className="mb-6 border-l-2 border-[#2596BE]/30 pl-4">
                                                <p className="text-xl text-[#2596BE]">
                                                    MESSAGES: <span className="text-white">VALIDATED & VERIFIED</span>
                                                </p>
                                                <p className="text-xl text-[#2596BE]">
                                                    STATUS: <span className="text-white text-shadow-glow-sm">ACTIVE & MODERATED</span>
                                                </p>
                                            </div>

                                            
                                            <div className="xl:text-2xl md:text-xl text-lg xl:leading-[36px] text-gray-300 mb-8 space-y-2">
                                                <p>
                                                    A platform for open conversations and discussions.
                                                </p>
                                                <ul className="space-y-1 mt-4">
                                                    <li className="text-white"><span className="text-[#2596BE]">&gt;</span> Automatic strict profanity filtering</li>
                                                    <li className="text-white"><span className="text-[#2596BE]">&gt;</span> Real-time messaging via WebSockets</li>
                                                </ul>
                                            </div>

                                            
                                            <a  
                                                href="https://odin-message-board-3i88.onrender.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="
                                                    inline-flex items-center justify-center
                                                    text-[#2596BE] uppercase border
                                                    rounded-tl-lg rounded-br-lg
                                                    p-2 px-6
                                                    hover:bg-[rgba(37,150,190,0.1)]
                                                    hover:shadow-[0_0_15px_rgba(237,63,10,0.3)]
                                                    hover:[text-shadow:0_0_8px_rgba(237,63,10,0.8)]
                                                    hover:-translate-y-0.5
                                                    overflow-hidden
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
                                                Message Board
                                            </a>
                                        </div>

                                        {/* Video Container*/}
                                        <div className="project-card flex-1 w-full rounded-lg border border-[#2596BE]/30 shadow-lg shadow-[#2596BE]/20 order-2 md:order-2">
                                            <img 
                                                src={MessageboardImg}
                                                className="w-full h-full object-cover rounded-lg"
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                </article>

                                {/* Featured Project 4 */}
                                <article className="w-full max-w-[1350px] mx-auto xl:mb-[200px] lg:mb-[150px] md:mb-[120px] mb-20">
                                    <div className="flex flex-col items-center gap-10 text-white md:flex-row">

                                        {/* Project card */}
                                        <div 
                                            className="
                                                project-card
                                                order-2
                                                flex-1 max-w-[583px]
                                                text-white/90 font-[Orbitron]
                                                border border-[#2596BE]/30 hover:border-[#2596BE]/60
                                                rounded-lg p-6 
                                                bg-black
                                                shadow-lg shadow-[#2596BE]/20
                                                hover:shadow-xl hover:shadow-[#2596BE]/30
                                                order-1 md:order-2
                                            "
                                        >

                                            <h3
                                                className="
                                                    text-[#2596BE]
                                                    xl:text-[40px] lg:text-[32px] md:text-[28px] text-2xl
                                                    xl:leading-[50px] lg:leading-[42px] leading-8
                                                    [text-shadow:0_0_6px_rgba(37,150,190,0.6),0_0_18px_rgba(37,150,190,0.35)]
                                                    mb-6
                                                    uppercase
                                                "
                                            >
                                                ShopEasy
                                            </h3>

                                            {/* Add project descriptions below here */}
                                            <div className="mb-6 border-l-2 border-[#2596BE]/30 pl-4">
                                                <p className="text-xl text-[#2596BE]">
                                                    STATUS: <span className="text-white">ACTIVE</span>
                                                </p>
                                                <p className="text-xl text-[#2596BE]">
                                                    PRODUCTS: <span className="text-white text-shadow-glow-sm">AVAILABLE</span>
                                                </p>
                                            </div>

                                            
                                            <div className="xl:text-2xl md:text-xl text-lg xl:leading-[36px] text-gray-300 mb-8 space-y-2">
                                                <p>
                                                    A simple e-commerce site for browsing and purchasing products online.
                                                </p>
                                                <ul className="space-y-1 mt-4">
                                                    <li className="text-white"><span className="text-[#2596BE]">&gt;</span> Clear product listings</li>
                                                    <li className="text-white"><span className="text-[#2596BE]">&gt;</span> Simple checkout flow</li>
                                                </ul>
                                            </div>

                                            
                                            <a 
                                                href="https://tzebohn.github.io/Odin-Shopping-Cart/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="
                                                    inline-flex items-center justify-center
                                                    text-[#2596BE] uppercase border
                                                    rounded-tl-lg rounded-br-lg
                                                    p-2 px-6
                                                    hover:bg-[rgba(37,150,190,0.1)]
                                                    hover:shadow-[0_0_15px_rgba(237,63,10,0.3)]
                                                    hover:[text-shadow:0_0_8px_rgba(237,63,10,0.8)]
                                                    hover:-translate-y-0.5
                                                    overflow-hidden
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
                                                ShopEasy
                                            </a>
                                        </div>

                                        {/* Video Container*/}
                                        <div className="project-card flex-1 order-1 w-full rounded-lg border border-[#2596BE]/30 shadow-lg shadow-[#2596BE]/20 order-2 md:order-1">
                                            <img 
                                                src={ShopeasyImg}
                                                className="w-full h-full object-cover rounded-lg"
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Roadmap / Timeline Section*/}
                <section ref={lineScrollRef} className="bg-[#03050C] py-10">
                    {/* Heading */}
                    <h1 
                        className="
                            text-white/90 text-4xl sm:text-5xl 
                            tracking-[0.3em] font-[Orbitron]
                            text-center uppercase font-bold 
                            transition-all duration-300
                            drop-shadow-[0_0_8px_rgba(37,150,190,0.25)]
                            glow-text py-10 mb-10
                        " 
                        >
                            ROADMAP
                    </h1>

                    {/* Timeline content cards */}
                    <div className="relative max-w-7xl mx-auto px-4">
                        {/* Vertical line */}
                        <motion.div 
                            style={{ scaleY: lineScale }}
                            className="absolute top-0 left-4 md:left-1/2 md:-translate-x-1/2 h-full w-[4px] bg-[#2596BE] origin-top"
                        />

                        {/* Roadmap items */}
                        <div className="space-y-10">
                            <RoadmapItems 
                                side={"left"}
                                phase={1}
                                status={"complete"}
                                title={"Learned Java Programming"}
                                descriptions={[
                                    "Mastered Java syntax and OOP concepts (inheritance, polymorphism, encapsulation)", 
                                    "Built proficient programs", 
                                    "Implemented data structures and sorting algorithms to optimize performance",
                                    "Developed strong skills in debugging and error handling"
                                ]}
                            />

                            <RoadmapItems 
                                side={"right"}
                                phase={2}
                                status={"complete"}
                                title={"Intermediate C++ Programming"}
                                descriptions={[
                                    "Gained experience in C++ syntax, structuring classes and objects", 
                                    "Learned pointers, references, and memory management techniques (stack & heap)", 
                                    "Applied advanced C++ features like constructors and destructors ",
                                ]}
                            />

                            <RoadmapItems 
                                side={"left"}
                                phase={3}
                                status={"complete"}
                                title={"Learned Robotics Basics & Developed Autonomous Behaviors"}
                                descriptions={[
                                    "Developed a wavefront algorithm to calculate the most optimal path for the robot",
                                    "Studied the fundamentals of robotics, focused on sensors like infrared laser, camera and bumpers", 
                                    "Programmed custom algorithms in C++ to enable robot navigation and obstacle avoidance",
                                    "Integrated sensor data for real-time decison-making"
                                ]}
                            />

                            <RoadmapItems 
                                side={"right"}
                                phase={4}
                                status={"complete"}
                                title={"Graduate College"}
                                descriptions={[
                                    "Bachelor's Degree in Computer Science", 
                                    "Completed core CS coursework and projects", 
                                    "Built strong problem-solving and technical skills"
                                ]}
                            />

                            <RoadmapItems 
                                side={"left"}
                                phase={5}
                                status={"progress"}
                                title={"Self-Learning Web Development Basics"}
                                descriptions={[
                                    "Learned core HTML, CSS, and Javascript concepts", 
                                    "Built projects using React, Tailwind, Node.js, and Express", 
                                    "Used modern tools like Vitest for testing",
                                    "Practiced debugging and problem-solving through hands-on development"
                                ]}
                            />

                            <RoadmapItems 
                                side={"right"}
                                phase={6}
                                status={"progress"}
                                title={"Networking & Career Development"}
                                descriptions={[
                                    "Build professional connections through networking and outreach", 
                                    "Actively searching and applying for internships and entry-level roles", 
                                    "Preparing for interviews through Leetcode and resume refinement"
                                ]}
                            />
                            <RoadmapItems 
                                side={"left"}
                                phase={7}
                                status={"planned"}
                                title={"Finally Getting a Job"}
                                descriptions={[
                                    "Passed interviews, coding challenges, and vibes checks", 
                                    "Successfully landed a job and achieved employed status 🙂", 
                                ]}
                            />
                        </div>
                    </div>
                </section>
                {/* FAQ Section */}
            </main>
        </>
    )
} 