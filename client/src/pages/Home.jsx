import { lazy, Suspense } from "react";
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
import UbercutsImg from "../assets/images/haircut.png"
import HandyAndyImg from "../assets/images/handyandy.png"
import CollegeInvadersImg from "../assets/images/collegeinvaders.png"
import MessageboardImg from "../assets/images/messageboard.png"
import ShopeasyImg from "../assets/images/shopeasy.png"
import faqBackground from "../assets/images/faqbackground.jpg"
import "./home.css"
import RoadmapItems from "../components/Home/RoadmapItems";
import { useEffect, useRef, useState } from "react";
import { motion as Motion, useTransform, useScroll } from "framer-motion"
import FaqCards from "../components/Home/FaqCards";
import FeaturedProjects from "../components/Home/FeaturedProjects";
import { FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import { RiTailwindCssFill, RiNextjsFill } from "react-icons/ri";
import { 
    SiVitest, 
    SiVite, 
    SiExpress, 
    SiMysql, 
    SiPrisma, 
    SiReactquery, 
    SiPostman, 
    SiTypescript, 
    SiJavascript, 
    SiCplusplus, 
    SiHtml5, 
    SiGit, 
    SiPuppeteer,
    SiNodemon
} from "react-icons/si";
import { IoLogoFirebase } from "react-icons/io5";
import { BiLogoPostgresql } from "react-icons/bi";
import { DiRedis } from "react-icons/di";
import { useIsMobile } from "../hooks/useIsMobile";
import SkillsCarousel from "../components/Home/SkillsCarousel";
import GridCarousel from "../components/Home/GridCarousel";

const Hero = lazy(() => import("../components/Hero/Hero"));

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
        description: "I deploy and host web applications on modern platforms, ensuring they are fast, reliable, and accessible.",
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

// Skills to display in overview section organized by technical domain
const skills = [
    {
        category: "Languages",
        items: [
            { Icon: SiTypescript, name: "TypeScript", color: "#3178C6", context: "Full-stack type safety, shared data contracts, and strict component interfaces across Next.js and Node.js applications." },
            { Icon: SiJavascript, name: "JavaScript (ES6+)", color: "#F7DF1E", context: "Modern async/await workflows, event loops, DOM manipulation, and Phaser 3 arcade physics logic." },
            { Icon: FaPython, name: "Python", color: "#3776AB", context: "Object-oriented design patterns, foundational data structures and sorting algorithms." },
            { Icon: SiHtml5, name: "HTML5 & CSS3", color: "#E34F26", context: "Semantic web architecture, responsive layouts, accessibility standards, and custom CSS animations." },
        ]
    },
    {
        category: "Frontend Architecture",
        items: [
            { Icon: FaReact, name: "React", color: "#61DAFB", context: "Component-driven architecture, custom hooks, reusable UI component systems, and state synchronization." },
            { Icon: SiVite, name: "Vite", color: "#646CFF", context: "Used to develop and build React applications with fast HMR, streamlined local tooling, and optimized production bundles." },
            { Icon: RiNextjsFill, name: "Next.js", color: "#ffffff", context: "Production App Router workflows, server-side rendering (SSR), protected admin routes, and API endpoints." },
            { Icon: RiTailwindCssFill, name: "TailwindCSS", color: "#38B2AC", context: "Modern responsive utility styling, futuristic dark-mode themes, and custom animation design tokens." },
            { Icon: SiReactquery, name: "TanStack Query", color: "#FF4154", context: "Server-state caching, automatic background refetching, and optimistic UI mutation updates." },
        ]
    },
    {
        category: "Backend & Distributed Systems",
        items: [
            { Icon: FaNodeJs, name: "Node.js", color: "#339933", context: "Asynchronous backend runtimes, background monitoring daemons, and microservices architecture." },
            { Icon: SiExpress, name: "Express", color: "#ffffff", context: "RESTful API design, modular controller routes, authentication gateways, and centralized error handling." },
            { Icon: DiRedis, name: "Redis", color: "#D82C20", context: "Distributed sliding-window rate limiting, session caching, and token storage via Upstash Redis." },
            { Icon: SiNodemon, name: "Nodemon", color: "#76D04B", context: "Used across Node.js projects to automatically restart the server during development." },
            { Icon: SiPuppeteer, name: "Puppeteer", color: "#40B5A4", context: "Automated real-time stock news scraping across 3,000+ tickers with concurrency queues and bot evasion." },
        ]
    }, 
    {
        category: "Databases & Caching",
        items: [
            { Icon: BiLogoPostgresql, name: "PostgreSQL", color: "#336791", context: "Relational database schema modeling, indexing, foreign keys, and serverless hosting with Neon." },
            { Icon: SiPrisma, name: "Prisma ORM", color: "#0C77C0", context: "Type-safe database client queries, automated relational migrations, and declarative data validation." },
            { Icon: SiMysql, name: "MySQL", color: "#00758F", context: "Relational table architectures, query optimizations, and diagnosis/resolution of transaction deadlocks." },
            { Icon: IoLogoFirebase, name: "Firebase", color: "#FFA000", context: "Role-based authentication, real-time database listeners, and secure cloud authorization rules." },
        ]
    }, 
    {
        category: "DevOps & Tooling",
        items: [
            { Icon: SiVitest, name: "Vitest", color: "#6E4FF5", context: "Automated unit and integration testing suites to verify component logic and utility functions." },
            { Icon: SiPostman, name: "Postman", color: "#FF6C37", context: "API contract testing, HTTP status code validation, header debugging, and automated test runners." },
            { Icon: SiGit, name: "Git & GitHub", color: "#F05032", context: "Version control workflows, multi-developer branch management, pull request reviews, and CI/CD hosting." },
        ]
    }
]

export default function Home () {
    const [activeSkillCategory, setActiveSkillCategory] = useState(0) // Tracks selected domain tab on desktop
    const [isMdUp, setIsMdUp] = useState(false) // Tracks if current screen width is 768px or greater
    const [activeFaq, setActiveFaq] = useState(null) // Tracks which FAQ is currently expanded

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
                <Suspense fallback={<div className="h-screen bg-[#03050C]" />}>
                    <Hero /> 
                </Suspense>
            </section>

            {/* Main body content */}
            <main>
                {/* Overview section */}
                <section className="relative overflow-hidden bg-[#03050C] pt-24 pb-16 sm:pb-20 md:pb-28 lg:pb-36 px-4 sm:px-8 lg:px-12">
                    <div className="pointer-events-none absolute inset-0 overview-field" />
                    <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[80vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#2596BE]/35 to-transparent" />
                    <div className="pointer-events-none absolute -left-32 top-16 h-72 w-72 rounded-full bg-[#2596BE]/10 blur-3xl" />
                    <div className="pointer-events-none absolute right-[-12rem] bottom-10 h-96 w-96 rounded-full bg-[#3a8dff]/10 blur-3xl" />

                    <div className="relative max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[0.85fr_1.15fr] gap-12 xl:gap-16 items-start">
                        <div className="xl:sticky xl:top-28 space-y-8">
                            <div className="space-y-5">
                                <p className="font-[Orbitron] text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#2596BE]">Profile / Systems Focus</p>
                                <h2 className="max-w-xl text-white font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[0.95]">
                                    Overview
                                </h2>
                                <p className="max-w-2xl text-slate-300/90 font-medium text-sm sm:text-base md:text-lg leading-relaxed">
                                    I am a Computer Science graduate from CUNY Brooklyn College (GPA &gt; 3.5, Dean's List)                                                                                                         
                                    with a passion for full-stack engineering and distributed web systems. My experience ranges from                                                                                                
                                    designing concurrent data scrapers and Redis-backed rate limiters to implementing on-device computer vision                                                                                     
                                    pipelines and clean React interfaces. I focus on writing maintainable, tested code and building software                                                                                        
                                    that solves concrete operational problems.
                                </p>
                            </div>

                            <div className="relative overflow-hidden rounded-xl border border-[#2596BE]/15 bg-[#050b18]/60 backdrop-blur-sm">
                                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2596BE]/30 to-transparent" />
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 divide-[#2596BE]/10">
                                    {[
                                        { label: "Preferred Location", value: "New York, USA" },
                                        { label: "Availability", value: "Open for part-time & full-time" },
                                        { label: "Education", value: "Bachelor's in Computer Science" },
                                        { label: "Role", value: "Full-Stack Software Engineer" },
                                    ].map((item, index) => (
                                        <div
                                            key={item.label}
                                            className={`
                                                group p-4 sm:p-5 transition-colors duration-200 hover:bg-[#2596BE]/[0.03]
                                                ${index % 2 === 0 ? "sm:border-r sm:border-[#2596BE]/10" : ""}
                                                ${index < 2 ? "sm:border-b sm:border-[#2596BE]/10" : ""}
                                            `}
                                        >
                                            <span className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2596BE]/70 transition-colors duration-200 group-hover:text-[#2596BE]">
                                                {item.label}
                                            </span>
                                            <span className="mt-1.5 block text-sm sm:text-[15px] font-semibold text-slate-100 leading-snug tracking-tight">
                                                {item.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        {/* Skills section */}
                        {isMobile ? (
                            <SkillsCarousel skills={skills}/>
                        ) : (
                            <div className="relative overflow-hidden border border-[#2596BE]/15 bg-[#050b18]/65 shadow-[0_24px_80px_-48px_rgba(37,150,190,0.55)] backdrop-blur-sm">
                                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2596BE]/60 to-transparent" />
                                <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#2596BE]/10 blur-3xl" />

                                <div className="grid min-h-[620px] grid-cols-[240px_1fr]">
                                    <div className="border-r border-[#2596BE]/10 bg-black/15 p-6">
                                        <p className="font-[Orbitron] text-[10px] uppercase tracking-[0.3em] text-[#2596BE]/80">Technical Domains</p>
                                        <p className="mt-3 text-sm leading-relaxed text-slate-400">Core technologies mapped to practical production context.</p>

                                        <div className="mt-10 space-y-1" role="tablist" aria-label="Technical domain categories">
                                            {skills.map((domain, index) => {
                                                const isActive = index === activeSkillCategory;
                                                return (
                                                    <button
                                                        key={domain.category}
                                                        role="tab"
                                                        aria-selected={isActive}
                                                        onClick={() => setActiveSkillCategory(index)}
                                                        className={`group relative w-full cursor-pointer px-0 py-4 text-left transition-colors duration-300 ${isActive ? "text-white" : "text-slate-500 hover:text-slate-200"}`}
                                                    >
                                                        <span className={`absolute left-0 top-1/2 h-8 w-px -translate-y-1/2 transition-all duration-300 ${isActive ? "bg-[#2596BE] shadow-[0_0_14px_rgba(37,150,190,0.75)]" : "bg-[#2596BE]/15 group-hover:bg-[#2596BE]/35"}`} />
                                                        <span className="block pl-5 font-[Orbitron] text-[10px] tracking-[0.24em] text-[#2596BE]/65">0{index + 1}</span>
                                                        <span className="mt-1 block pl-5 text-sm font-semibold leading-tight tracking-wide">{domain.category}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="relative p-8 lg:p-10">
                                        <div className="mb-8 flex items-end justify-between gap-8 border-b border-[#2596BE]/10 pb-7">
                                            <div>
                                                <h3 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-white lg:text-4xl">
                                                    {skills[activeSkillCategory].category}
                                                </h3>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-[Orbitron] text-3xl text-[#2596BE]">{skills[activeSkillCategory].items.length}</p>
                                                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Technologies</p>
                                            </div>
                                        </div>

                                        <div className="divide-y divide-[#2596BE]/10">
                                            {skills[activeSkillCategory].items.map((skill) => (
                                                <div 
                                                    key={skill.name}
                                                    className="group grid grid-cols-[auto_1fr] gap-x-4 py-5 transition-colors duration-300 hover:bg-[#2596BE]/[0.025]"
                                                >
                                                    <div className="mt-1 flex h-10 w-10 items-center justify-center border border-[#2596BE]/15 bg-black/20 transition-all duration-300 group-hover:border-[#2596BE]/35">
                                                        <skill.Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" style={{ color: skill.color }} />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-base font-semibold tracking-wide text-white transition-colors duration-300 group-hover:text-[#e8f8ff]">{skill.name}</h4>
                                                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300/90">
                                                            {skill.context}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
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
                            <div className="relative flex flex-col items-center px-5 lg:px-10 pt-20">
                                {/* Featured Project 1 */}
                                <FeaturedProjects
                                    project={{
                                        front: {
                                            technologies: [
                                                "Next.js",
                                                "React & TailwindCSS",
                                                "TypeScript",
                                                "Prisma & PostgreSQL",
                                                "Google OAuth",
                                                "NextAuth.js",
                                                "Upstash Redis",
                                                "Neon",
                                                "Nodemailer"
                                            ],
                                            roles: ["Full-Stack"],
                                            stats: [
                                                { label: "TEAM SIZE", value: "2" }
                                            ],
                                            accomplishments: [
                                                "Built a secure admin dashboard with protected routes for managing customer inquiries.",
                                                "Implemented Redis-based IP rate limiting to help prevent abuse and excessive requests.",
                                                "Added honeypot spam detection to reduce automated bot submissions and improve form security."
                                            ]
                                        },
                                        title: "HandyANDY",
                                        stats: [
                                            { label: "INQUIRY MANAGEMENT", value: "FULLY OPERATIONAL" },
                                            { label: "ACCESS CONTROL", value: "GOOGLE OAUTH + RBAC" }
                                        ],
                                        description: "A centralized dashboard for managing customer inquiries, allowing administrators to review, organize, and update requests through a responsive interface.",
                                        features: [
                                            "Search, filtering, sorting, and pagination",
                                            "Redis rate-limiting & honeypot spam detection"
                                        ],
                                        media: {
                                            type: "image",
                                            src: HandyAndyImg
                                        },
                                        href: "https://handy-andy-nine.vercel.app/"
                                    }}
                                    isAvailable={true}
                                />

                                {/* Featured Project 2 */}
                                <FeaturedProjects
                                    project={{
                                        front: {
                                            technologies: [
                                                "React & TailwindCSS",
                                                "Node & Express",
                                                "Google MediaPipe",
                                                "Redis",
                                                "Prisma & PostgreSQL",
                                                "TanStackQuery",
                                                "Firebase",
                                                "TypeScript"
                                            ],
                                            roles: ["Full-Stack"],
                                            stats: [{ label: "TEAM SIZE", value: "2" }],
                                            accomplishments: [
                                                "Built a secure role-based access control system supporting users, providers, moderators, and administrators.",
                                                "Developed a custom face shape analysis feature using Google's Face Landmarker Vision Task.",
                                                "Integrated TanStack Query to optimize data fetching, caching, and overall application performance."
                                            ]
                                        },
                                        title: "UberCuts",
                                        stats: [
                                            { label: "AUTH", value: "SECURE & ROLE-BASED" },
                                            { label: "AI INTEGRATION", value: "MEDIAPIPE TASK-VISION" }
                                        ],
                                        description: "A centralized haircut app for businesses and freelancers with Uber",
                                        features: [
                                            "Role based login/signup system",
                                            "Rate limiting with Redis caching",
                                            "Face-Shape analysis with Google's Mediapipe"
                                        ],
                                        media: {
                                            type: "image",
                                            src: UbercutsImg
                                        }
                                    }}
                                    isAvailable={false}
                                    reverse
                                />

                                {/* Featured Project 3 */}
                                <FeaturedProjects
                                    project={{
                                        front: {
                                            technologies: [
                                                "React & TailwindCSS",
                                                "Node.js",
                                                "Express",
                                                "MySQL",
                                                "p-limit (npm package)",
                                                "Puppeteer"
                                            ],
                                            roles: ["Full-Stack"],
                                            stats: [
                                                { label: "TEAM SIZE", value: "1" }
                                            ],
                                            accomplishments: [
                                                "Built a continuous monitoring system that scans over 3,000+ ticker symbols for newly published news articles in near real time.",
                                                "Designed a polished UI with instant notifications and audio alerts to keep users informed as soon as new articles are detected.",
                                                "Implemented bot avoidance techniques using randomized short-lived cached tokens, rotating user agents, and exponential backoff delays to improve reliability and reduce detection."
                                            ]
                                        },
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
                                
                                {/* Featured Project 4 */}
                                <FeaturedProjects
                                    project={{
                                        front: {
                                            technologies: [
                                                "Phaser",
                                                "Javascript",
                                                "HTML & CSS",
                                                "Subversion",
                                                "Github Pages"
                                            ],
                                            roles: ["Backbone Team", "Codebase Maintainer", "UI/UX Designer"],
                                            stats: [
                                                { label: "TEAM SIZE", value: "20-30" }
                                            ],
                                            accomplishments: [
                                                "Developed a polished, responsive UI/UX for a classic Space Invaders game using Phaser 3.",
                                                "Refactored the codebase into reusable, modular components to improve maintainability and scalability.",
                                                "Collaborated closely with the QA, Documentation, and Specifications teams to align gameplay features with project requirements and ensure a high-quality user experience."
                                            ]
                                        },
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
                                    reverse={true}
                                />

                                {/* Featured Project 5 */}
                                <FeaturedProjects
                                    project={{
                                        front: {
                                            technologies: [
                                                "React & TailwindCSS",
                                                "Node.js & Express",
                                                "MySQL",
                                                "WebSockets",
                                                "AWS & Render for deployment"
                                            ],
                                            roles: ["Full-Stack"],
                                            stats: [
                                                { label: "TEAM SIZE", value: "1" }
                                            ],
                                            accomplishments: [
                                                "Built a real-time messaging system using WebSockets for instant communication between users.",
                                                "Implemented profanity filtering with leo-profanity to help maintain a clean and user-friendly chat experience.",
                                                "Designed and structured a MySQL database schema to efficiently store and manage chat messages."
                                            ]
                                        },
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
                                        href: "https://github.com/tzebohn/Odin-message-board"
                                    }}
                                    isAvailable={true}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* What I do section */}
                <section className="bg-[#03050C] pt-24 px-8">
                    <div className="flex flex-col space-y-5 text-center">
                        <h2 className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl tracking-wide">What I do</h2>
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

                {/* FAQ Section */}
                <section className="relative min-h-screen flex items-center justify-center">
                    {/* Background image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${faqBackground})` }}
                    />

                    {/* Grayed out overlay */}
                    <div className="absolute inset-0 bg-black/50"/>

                    <div className="relative w-full max-w-7xl mx-auto py-20 px-4">
                        <h2
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
                        </h2>

                        {/* Questions section */}
                        <div className="flex flex-col gap-4 md:max-w-3xl md:mx-auto">
                            {[
                                {
                                    title: "How do you pronounce your name?",
                                    description: "I know my name can be a little tricky at first glance — it's pronounced [Tea-zz Bohn]. Like John but with a B."
                                },
                                {
                                    title: "Who are you and what do you do?",
                                    description: "Self-taught Full Stack Web Developer and CUNY Brooklyn College CS graduate. I primarily work with React and Node.js, with experience in authentication, authorization, databases, deployment, and testing."
                                },
                                {
                                    title: "What technologies do you work with?",
                                    description: "React, Next.js, Vite, TailwindCSS, Javascript, Typescript, HTML & CSS, TanStackQuery, Firebase, Node.js, Express, Axios, Prisma, Redis, SQL, AWS, Render, Git, etc."
                                },
                                {
                                    title: "What makes you different from others in your field?",
                                    description: "One of my strongest traits is how adaptable and motivated I am. In the fast evolving field of software engineering with AI, staying flexible and continuously learning is crucial. Therefore, I study to be a generalist, where I focus on the underlying concepts behind commonly used tools, rather than just syntax (which can easily be done by AI). I find it more important to know what tools are available and when to apply them."
                                },
                                {
                                    title: "Do you have any experience with AI",
                                    description: "Yes, I've been enjoying the use of TUIs like OpenCode and Codex. With OpenCode I am able to experiment with lots of different models including lightweight local LLMs like Gemma 4."
                                }
                            ].map((faq, index) => (
                                <FaqCards
                                    key={index}
                                    id={index}
                                    title={faq.title}
                                    description={faq.description}
                                    isOpen={activeFaq === index}
                                    onToggle={() => setActiveFaq(activeFaq === index ? null : index)}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Journey / Timeline Section*/}
                <section ref={lineScrollRef} id="roadmap" className="bg-[#03050C] py-10">
                    {/* Heading */}
                        <h2 
                            className="
                                text-white/90 text-4xl sm:text-5xl 
                                tracking-[0.3em] font-[Orbitron]
                                text-center uppercase font-bold 
                                transition-all duration-300
                                drop-shadow-[0_0_8px_rgba(37,150,190,0.25)]
                                glow-text py-10 mb-10
                            " 
                            >
                            JOURNEY
                        </h2>

                    {/* Timeline content cards */}
                    <div className="relative max-w-7xl mx-auto px-4">
                        {/* Vertical line */}
                        <Motion.div 
                            style={{ scaleY: lineScale }}
                            className="absolute top-0 left-4 md:left-1/2 md:-translate-x-1/2 h-full w-1 bg-[#2596BE] origin-top"
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
                                    "Integrated sensor data for real-time decision-making"
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
                                title={"Getting Employed"}
                                descriptions={[
                                    "Passed interviews, coding challenges, and vibe checks", 
                                    "Successfully landed a job and achieved employed status 🙂", 
                                ]}
                            />
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
} 
