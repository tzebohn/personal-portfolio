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
import StockMarketImg from "../assets/images/stockscanner.jpg"
import CollegeInvadersImg from "../assets/images/collegeinvaders.png"
import MessageboardImg from "../assets/images/messageboard.png"
import ShopeasyImg from "../assets/images/shopeasy.png"
import faqBackground from "../assets/images/faqbackground.jpg"
import "./home.css"
import RoadmapItems from "../components/Home/RoadmapItems";
import { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll } from "framer-motion"
import FaqCards from "../components/Home/FaqCards";
import FeaturedProjects from "../components/Home/FeaturedProjects";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiVitest, SiVite, SiExpress, SiMysql, SiPrisma } from "react-icons/si";
import { IoLogoFirebase } from "react-icons/io5";
import { BiLogoPostgresql } from "react-icons/bi";
import { useIsMobile } from "../hooks/useIsMobile";
import SkillsCarousel from "../components/Home/SkillsCarousel";
import GridCarousel from "../components/Home/GridCarousel";

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

// Skills to display in overview section
const skills = [
    {
        category: "frontend",
        items: [
            { Icon: FaReact, name: "React", rating: 4, color: "#61DAFB" },
            { Icon: RiTailwindCssFill, name: "TailwindCSS", rating: 4, color: "#38B2AC" },
            { Icon: SiVite, name: "Vite", rating: 2, color: "#646CFF" },
        ]
    },
    {
        category: "backend",
        items: [
            { Icon: FaNodeJs, name: "Node.js", rating: 3, color: "#339933" },
            { Icon: SiExpress, name: "Express", rating: 3, color: "#ffffff" },
        ]
    }, 
    {
        category: "database",
        items: [
            { Icon: IoLogoFirebase, name: "Firebase", rating: 3, color: "#FFA000" },
            { Icon: SiMysql, name: "MySQL", rating: 3, color: "#00758F" },
            { Icon: BiLogoPostgresql, name: "PostgreSQL", rating: 2, color: "#336791" },
            { Icon: SiPrisma, name: "Prisma", rating: 2, color: "#0C77C0" },
        ]
    }, 
    {
        category: "testing",
        items: [
            { Icon: SiVitest, name: "Vitest", rating: 2, color: "#6E4FF5" },
        ]
    }
]

export default function Home () {
    const [isMdUp, setIsMdUp] = useState(false) // Tracks if current screen width is 768px or greater

    const lineScrollRef = useRef(null)      // Tracks the current scroll height for roadmap container

    const isMobile = useIsMobile()            // Custom hook to track if user is on mobile device

    /**
     * Checks if current screen width is >= 768px
     * on component mount or resizing 
     */
    useEffect(() => {
        const check = () => setIsMdUp(window.innerWidth >= 768)
        check() // Check width on mount

        // Event listener for resizing
        window.addEventListener("resize", check)

        return () => window.removeEventListener("resize", check)
    })

    /**
     * Transform the length of the vertical line visually
     * as the user scrolls
     */
    const { scrollYProgress } = useScroll({
        target: lineScrollRef,
        offset: ["start 85%", "end 25%"]
    })
    const lineScale = useTransform(
        scrollYProgress, 
        [0, isMdUp ? .9 : 1], 
        [0, 1]
    )

    return (
        <>
            {/* Hero Banner */}
            <section className="h-screen">
                <Hero /> 
            </section>

            {/* Main body content */}
            <main>
                {/* Overview section */}
                <section className="bg-[#03050C] pt-24 pb-8 px-4 sm:px-8 lg:px-12">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-10">
                        <div className="space-y-5">
                            <h1 className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl tracking-wide">Overview</h1>
                            <p className="text-gray-400 font-medium text-sm sm:text-base md:text-lg leading-relaxed">
                                I am a Computer Science bachelor's graduate at CUNY Brooklyn College, with a passion for building modern web experiences.
                                I enjoy combining clean UI with robust backend systems, and I’m always learning new ways to improve user experience and code quality.
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="rounded-xl border border-[#2f3a55] bg-[#0b1231]/70 p-4">
                                    <h3 className="text-[#85cfff] text-xs sm:text-sm font-semibold">Preferred Location</h3>
                                    <p className="text-gray-300 text-xs sm:text-sm">New York, USA</p>
                                </div>
                                <div className="rounded-xl border border-[#2f3a55] bg-[#0b1231]/70 p-4">
                                    <h3 className="text-[#85cfff] text-xs sm:text-sm font-semibold">Availability</h3>
                                    <p className="text-gray-300 text-xs sm:text-sm">Open for part-time & full-time</p>
                                </div>
                                <div className="rounded-xl border border-[#2f3a55] bg-[#0b1231]/70 p-4">
                                    <h3 className="text-[#85cfff] text-xs sm:text-sm font-semibold">Education</h3>
                                    <p className="text-gray-300 text-xs sm:text-sm">Bachelor's in Computer Science</p>
                                </div>
                                <div className="rounded-xl border border-[#2f3a55] bg-[#0b1231]/70 p-4">
                                    <h3 className="text-[#85cfff] text-xs sm:text-sm font-semibold">Role</h3>
                                    <p className="text-gray-300 text-xs sm:text-sm">Full-Stack Software Engineer</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Skills section */}
                        {isMobile ? (
                            <SkillsCarousel skills={skills}/>
                        ) : (
                        <div className="rounded-2xl border border-[#2f3a55] bg-[#0e162f] p-5 sm:p-8">
                            <h2 className="text-white font-bold text-xl sm:text-2xl mb-4">Core Skills</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {skills.map((category) => (
                                    <div key={category.category} className="rounded-lg border border-[#2f3a55] bg-[#111b33] p-4">
                                        <h3 className="text-blue-400 font-semibold capitalize mb-3">{category.category}</h3>
                                        <div className="grid grid-cols-2 gap-2">
                                            {category.items.map((skill, idx) => (
                                                <div key={idx} className="rounded-md border border-[#2f3a55] bg-[#0b1231] p-2 text-center">
                                                    <skill.Icon className="mx-auto text-2xl sm:text-3xl mb-1" style={{ color: skill.color }} />
                                                    <p className="text-gray-200 text-xs sm:text-sm font-medium">{skill.name}</p>
                                                    <div className="mt-1 flex justify-center gap-0.5">
                                                        {[...Array(5)].map((_, starIndex) => (
                                                            <span key={starIndex} className={starIndex < skill.rating ? "text-yellow-400" : "text-gray-600"}>
                                                                ★
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        )}
                    </div>
                </section>

                {/* What I do section */}
                <section className="bg-[#03050C] pt-24 px-8">
                    <div className="flex flex-col space-y-5 text-center">
                        <h1 className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl tracking-wide">What I do</h1>
                        <p className="text-gray-500 font-semibold text-sm xs:text-base md:text-lg lg:text-xl lg:text-center leading-relaxed">
                            I specialize in creating modern, responsive web applications using cutting-edge technologies. My approach combines technical excellence with a focus on user experience.
                        </p>
                    </div>
                    {/* Grid layout section */}
                    {isMobile ? (
                        <GridCarousel cards={cards}/>
                    ) : (
                        <div className="grid grid-cols-3 md:grid-cols-4 text-white mt-48">
                            {cards.map((card, i) => (
                                <GridCard
                                    key={i}
                                    Icon={card.Icon}
                                    title={card.title}
                                    description={card.description}
                                />
                            ))}
                        </div>        
                    )}

                    {/* Vertical divider */}
                    <div className="mt-4 flex items-center justify-center">
                        <div className="w-0.5 h-40 bg-gray-700"/>
                    </div>

                </section>

                {/* Project highlights */}
                <section id="projects">
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
                                <FeaturedProjects
                                    project={{
                                        title: "Stock Scanner",
                                        stats: [
                                            { label: "MARKET DATA", value: "LIVE & CONTINUOUS" },
                                            { label: "SIGNAL TYPE", value: "MOMENTUM & NEWS" }
                                        ],
                                        description: "A data-driven tool for monitoring stock momentum. Aggregates live news and market data to help users quickly identify trending stocks.",
                                        features: [
                                            "Real-time data aggregation",
                                            "Clean, responsive data visualizations"
                                        ],
                                        media: {
                                            type: "image",
                                            src: StockMarketImg
                                        }
                                    }}
                                    isAvailable={false}
                                />

                                {/* Featured Project 2 */}
                                <FeaturedProjects
                                    project={{
                                        title: "College Invaders",
                                        stats: [
                                            { label: "GAMEPLAY STATUS", value: "FULLY OPERATIONAL" },
                                            { label: "CORE MECHANICS", value: "SHOOT & DODGE" }
                                        ],
                                        description: "A modern take on the classic Space Invaders arcade shooter. Players defend College against descending agents with responsive controls and smooth gameplay.",
                                        features: [
                                            "Progressive enemy waves with escalating difficulty",
                                            "Score tracking"
                                        ],
                                        media: {
                                            type: "image",
                                            src: CollegeInvadersImg
                                        },
                                        href: "https://tzebohn.github.io/collegeinvaders/"
                                    }}
                                    isAvailable={true}
                                    reverse
                                />

                                {/* Featured Project 3 */}
                                <FeaturedProjects
                                    project={{
                                        title: "Message Board",
                                        stats: [
                                            { label: "MESSAGES", value: "VALIDATED & VERIFIED" },
                                            { label: "STATUS", value: "ACTIVE & MODERATED" }
                                        ],
                                        description: "A platform for open conversations and discussions.",
                                        features: [
                                            "Automatic strict profanity filtering",
                                            "Real-time messaging via WebSockets"
                                        ],
                                        media: {
                                            type: "image",
                                            src: MessageboardImg
                                        },
                                        href: "https://odin-message-board-3i88.onrender.com"
                                    }}
                                    isAvailable={true}
                                />

                                {/* Featured Project 4 */}
                                <FeaturedProjects
                                    project={{
                                        title: "ShopEasy",
                                        stats: [
                                            { label: "STATUS", value: "ACTIVE" },
                                            { label: "PRODUCTS", value: "AVAILABLE" }
                                        ],
                                        description: "A simple e-commerce site for browsing and purchasing products online.",
                                        features: [
                                            "Clear product listings",
                                            "Simple checkout flow"
                                        ],
                                        media: {
                                            type: "image",
                                            src: ShopeasyImg
                                        },
                                        href: "https://tzebohn.github.io/Odin-Shopping-Cart/"
                                    }}
                                    isAvailable={true}
                                    reverse
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Roadmap / Timeline Section*/}
                <section ref={lineScrollRef} id="roadmap" className="bg-[#03050C] py-10">
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
                                    "Passed interviews, coding challenges, and vibe checks", 
                                    "Successfully landed a job and achieved employed status 🙂", 
                                ]}
                            />
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="relative min-h-screen flex items-center justify-center">
                    {/* Background image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${faqBackground})` }}
                    />

                    {/* Grayed out overlay */}
                    <div className="absolute inset-0 bg-black/50"/>

                    <div className="relative flex justify-center items-center max-w-7xl mx-auto py-20">
                        <div className="">
                            <h1 
                                className="
                                    text-white/90 text-xl xs:text-4xl sm:text-5xl 
                                    tracking-[0.3em] font-[Orbitron]
                                    text-center uppercase font-bold 
                                    transition-all duration-300
                                    drop-shadow-[0_0_8px_rgba(37,150,190,0.25)]
                                    glow-text py-10 mb-10
                                " 
                                >
                                    Frequently Asked Questions
                            </h1>

                            {/* Questions section */}
                            <div className="flex flex-col gap-8 p-4 md:max-w-5xl md:mx-auto">
                                <FaqCards
                                    title={"Who are you and what do you do?"}
                                    description={`
                                        I'm an aspiring software engineer with a passion for building clean, efficient,
                                        and scalable solutions. I specialize in full-stack development, where I get to
                                        work on both the frontend and backend logic. I'm always experimenting with new 
                                        tools and tech to keep improving and stay on top of what's trending in the industry.
                                        `
                                    }
                                />
                                <FaqCards
                                    title={"What makes you different from others in your field?"}
                                    description={`
                                        I'd say one of my strongest traits is how adaptable I am. In the fast 
                                        evolving field of software engineering, staying flexible and continuously
                                        learning is crucial. Whenever new technologies or tools emerge, I make it
                                        a priority to understand the concepts behind them. I dive deep into exploring
                                        how they work, how they can be applied, and how they can improve the way
                                        I approach problems.
                                        `
                                    }
                                />                         
                                <FaqCards
                                    title={"How do you pronounce your name?"}
                                    description={"I know my name can be a little tricky at first glance — it's pronounced [Tea-zz Bohn]. Like John but with a B."} 
                                />
                                <FaqCards
                                    title={"Where are you based?"}
                                    description={`
                                        My parents are from Hong Kong, but I was born and raised in New York, 
                                        so I’m bilingual and fluent in both English and Cantonese. It's been a huge 
                                        advantage when it comes to understanding different perspectives and 
                                        communicating across cultures.
                                        `
                                    } 
                                />
                                <FaqCards
                                    title={"What's your background in software engineering?"}
                                    description={`
                                        While I don’t have formal job experience yet, I’ve been developing my 
                                        skills through hands-on projects, both on my own and in collaboration with other
                                        students. As a self-taught Full Stack Web Developer, I’m always building, 
                                        experimenting, and pushing my knowledge further. I’m excited to bring that 
                                        learning into a professional environment.
                                        `
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
} 