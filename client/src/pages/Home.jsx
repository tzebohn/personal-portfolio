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
import HandyAndyFlowchartSvg from "../assets/diagrams/handyandy_flowchart.svg"
import StockScannerSvg from "../assets/diagrams/stock-scanner.svg"
import faqBackground from "../assets/images/faqbackground.jpg"
import "./home.css"
import RoadmapItems from "../components/Home/RoadmapItems";
import { useEffect, useRef, useState } from "react";
import { motion as Motion, useTransform, useScroll, useReducedMotion } from "framer-motion"
import FaqCards from "../components/Home/FaqCards";
import FeaturedProject from "../components/Home/FeaturedProject";
import SideProject from "../components/Home/SideProject";
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

const featuredProjects = [
    {
        title: "HandyANDY",
        accent: "cyan",
        description:
            "Built a secure, centralized admin dashboard that streamlines customer inquiry management by allowing administrators to review, organize, filter, and update requests through a responsive interface.",
        longDescription:
            "Customer inquiries required a centralized and efficient management system that could securely organize incoming requests while protecting the platform from spam and abuse. I developed a full-stack administrative dashboard using Next.js, TypeScript, Prisma, and PostgreSQL, allowing administrators to efficiently review, sort, filter, paginate, and update customer inquiries. To strengthen reliability and security, I implemented Google OAuth authentication with NextAuth.js, Redis-based IP rate limiting, and honeypot spam detection for public forms. The result is a scalable and responsive management system that improves administrative workflow while providing a secure foundation for future business features.",
        technologies: ["Next.js", "React", "TailwindCSS", "TypeScript", "Prisma & PostgreSQL", "Google OAuth", "NextAuth.js", "Upstash Redis", "Neon", "Nodemailer", "Cloudinary"],
        githubUrl: "https://github.com/tzebohn/HandyANDY",
        liveUrl: "https://handy-andy-nine.vercel.app/",
        image: HandyAndyImg,
        imgStyle: "object-[20%_center]",
        highlights: [
            "Developed a hidden, secure centralized dashboard for administrators to manage and organize customer inquiries.",
            "Implemented optimized pagination, sorting, and filtering to efficiently handle and navigate large volumes of requests.",
            "Protected public forms from abuse using Upstash Redis IP rate limiting and honeypot-based spam detection.",
            "Created a responsive administrative workflow for reviewing, updating, and organizing customer requests."
        ],
        techHighlights: [
            "Built the full-stack application with Next.js, React, TypeScript, Tailwind CSS, Prisma, and PostgreSQL.",
            "Implemented secure Google OAuth authentication and protected dashboard access using NextAuth.js.",
            "Integrated Upstash Redis, Neon PostgreSQL, Cloudinary and Nodemailer for rate limiting, cloud database infrastructure, and email notifications."
        ],
        architecture: {
            title: "System Architecture",
            subtitle: "Full-Stack Next.js Application",
            description: "Request flow, authentication gateways, distributed rate limiting, and relational database persistence.",
            image: HandyAndyFlowchartSvg,
            alt: "System architecture diagram showing users interacting with Next.js client, API routes, Upstash Redis, Google OAuth, and PostgreSQL.",
            flowLegend: [
                { badge: "User Flow", path: "Public Inquiry Form → Next.js API Routes → Upstash Redis Check → PostgreSQL (Neon)" },
                { badge: "Auth Flow", path: "Google OAuth 2.0 → NextAuth.js Callback → Protected Admin Session & Dashboard" },
                { badge: "Security", path: "Sliding-Window IP Rate Limiter (Redis) + Honeypot Anti-Spam Protection" }
            ]
        }
    },
    {
        title: "Stock Scanner",
        accent: "blue",
        description:
            "Built a real-time market news scanner and RESTful API that continuously monitors stock tickers, processes market data, stores normalized results, and exposes the data through backend endpoints.",
        longDescription:
            "Developed a full-stack, long-running Node.js data processing system that continuously scans configurable stock tickers for market news and pricing data, persists normalized results to MySQL, and exposes stored data through RESTful API endpoints. Built a concurrency-controlled scanning pipeline using Promise.all() and a limiter to process multiple tickers while preventing uncontrolled request spikes. Implemented a cached token management system with Puppeteer and request interception, using a shared Promise lock to prevent concurrent refresh operations. Normalized and validated external responses before asynchronously persisting results through a database write queue, while adding adaptive cooldowns, randomized scheduling, and error handling to improve reliability when external services return unexpected or incomplete responses.",
        technologies: ["React", "TailwindCSS", "Node.js", "Express", "MySQL", "Puppeteer", "p-limit"],
        githubUrl: "https://github.com/tzebohn/stock-scanner",
        liveUrl: null,
        image: StockMarketImg,
        imgStyle: "",
        highlights: [
            "Built a continuous scanning pipeline that processes multiple stock tickers concurrently while controlling workload through a concurrency limiter.",
            "Developed RESTful API endpoints to expose stored market and news data, separating data collection, persistence, and client access responsibilities.",
            "Implemented token caching and a shared Promise-based refresh lock to prevent duplicate browser automation and concurrent token refresh operations.",
            "Improved scanner resilience with adaptive cooldowns, randomized scheduling, queued database writes, and fault isolation so individual ticker failures do not stop the scanner."
        ],
        techHighlights: [
            "Node.js & JavaScript — built a long-running asynchronous scanner and RESTful API using async/await, Promise.all(), and controlled concurrency.",
            "Puppeteer & Axios — used browser network inspection for token acquisition alongside HTTP requests for efficient data retrieval.",
            "MySQL & Async Queues — normalized and persisted market data with queued database writes and clear separation between scanning, storage, and API layers."
        ],
        architecture: {
            title: "System Architecture",
            subtitle: "Full-Stack Vite Application",
            description: "Automated scanning, token extraction, hidden API services, queued article processing, and relational database persistence.",
            image: StockScannerSvg,
            alt: "System architecture diagram showing the life cycle of the stock scanner.",
            flowLegend: [
                { badge: "Scanner Flow", path: "Scanner loop → Hidden API Services → Write Queue → MySQL → Repeat" },
                { badge: "Client Flow", path: "Client polling → RESTful API → MySQL → Display Newly Posted Articles" },
            ]
        }
    },
    {
        title: "UberCuts",
        accent: "violet",
        description:
            "A centralized platform that connects users with haircut providers and businesses, enabling service discovery, role-based access, appointment management, and AI-powered face shape analysis.",
        longDescription:
            "Built a full-stack haircut marketplace designed to centralize the process of discovering haircut services and connecting users with providers and businesses. The platform implements role-based authentication and authorization for administrators, moderators, providers, and regular users, using Firebase for authentication while synchronizing user identities with a PostgreSQL database for application-level authorization. Users can browse listed services and schedule appointments, while providers and businesses can manage their offerings. The platform also integrates Google MediaPipe to analyze facial features and provide face shape analysis. TanStack Query is used to optimize client-side data fetching by caching and reusing requests, while the backend uses Express, Prisma, PostgreSQL, Redis, and Zod to support scalable data management, validation, and API operations.",
        technologies: ["React", "TailwindCSS", "TypeScript", "Firebase", "TanStack Query", "Node.js", "Express", "Zod", "Google MediaPipe", "Prisma", "PostgreSQL", "Redis"],
        githubUrl: "https://github.com/tzebohn/uber-cuts",
        liveUrl: null,
        image: UbercutsImg,
        imgStyle: "object-left",
        highlights: [
            "Developed a centralized platform that allows users to discover haircut services, connect with providers and businesses, and schedule appointments through a unified system.",
            "Implemented a role-based authentication and authorization system supporting administrators, moderators, providers, and regular users with controlled access to platform features.",
            "Integrated Firebase authentication with a PostgreSQL database to synchronize user identities and enforce application-level authorization across the platform.",
            "Added AI-powered face shape analysis using Google MediaPipe, allowing the application to analyze facial features as part of a personalized haircut discovery experience."
        ],
        techHighlights: [
            "Built the full-stack application with React, TypeScript, TailwindCSS, Node.js, and Express, using Zod for type-safe request validation and structured API handling.",
            "Used TanStack Query to optimize client-side data fetching through caching and request reuse, reducing unnecessary duplicate API requests.",
            "Designed the backend data layer with Prisma, PostgreSQL, and Redis to support structured data management, authorization, and scalable application performance."
        ],
    },
]

const sideProjects = [
    {
        title: "Mini MessageBoard",
        description: "A platform for real-time open conversations and discussions.",
        technologies: ["React", "TailwindCSS", "JavaScript", "Node.js", "Express", "MySQL", "WebSockets", "leo-profanity", "AWS", "Render"],
        githubUrl: "https://github.com/tzebohn/mini-message-board",
    },
    {
        title: "CollegeInvaders",
        description: "A modern take on the classic Space Invaders arcade shooter.",
        technologies: ["Phaser 3", "JavaScript", "HTML/CSS", "Subversion"],
        githubUrl: "https://github.com/tzebohn/collegeinvaders",
    },
    {
        title: "ShopEasy",
        description: "A modern eCommerce website inspired by ShopEasy, featuring product browsing, searching, and cart checkouts.",
        technologies: ["React", "TailwindCSS", "JavaScript", "Framer Motion", "Vitest"],
        githubUrl: "https://github.com/tzebohn/Odin-Shopping-Cart",
    },
    {
        title: "DineFinder",
        description: "DineFiner uses the Yelp Fusion API to help indecisive people find and choose where to eat.",
        technologies: ["JavaScript", "Node.js", "Express", "Yelp Fusion"],
        githubUrl: "https://github.com/tzebohn/DineFinder",
    },
    {
        title: "GROQ Todolist",
        description: "An experimental WebGL landing page exploring shader-driven backgrounds.",
        technologies: ["Python", "GROQ"],
        githubUrl: "https://github.com/tzebohn/Todolist",
    },
    {
        title: "Tic-Tac-Toe",
        description: "A simple Tic-Tac-Toe game where you can play against a friend or challenge the computer",
        technologies: ["React", "TailwindCSS", "JavaScript", "Vitest", "Github Actions"],
        githubUrl: "https://github.com/tzebohn/tic-tac-toe",
    },
]

export default function Home () {
    const [activeSkillCategory, setActiveSkillCategory] = useState(0)   // Tracks selected domain tab on desktop
    const [isMdUp, setIsMdUp] = useState(false)                         // Tracks if current screen width is 768px or greater
    const [activeProject, setActiveProject] = useState(null)            // Tracks which FeaturedProject is currently expanded
    const [activeFaq, setActiveFaq] = useState(null)                    // Tracks which FAQ is currently expanded

    const lineScrollRef = useRef(null)                   // Tracks the current scroll height for experience timeline container

    const isMobile = useIsMobile()                      // Custom hook to track if user is on mobile device
    const prefersReducedMotion = useReducedMotion()    // Respects prefers-reduced-motion
    const reduceMotion = import.meta.env.DEV ? false: prefersReducedMotion

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
                <section id="overview" className="relative overflow-hidden bg-[#03050C] pt-24 pb-16 sm:pb-20 md:pb-28 lg:pb-36 px-4 sm:px-8 lg:px-12">
                    <div className="pointer-events-none absolute inset-0 overview-field" />
                    <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[80vw] -translate-x-1/2 bg-linear-to-r from-transparent via-[#2596BE]/35 to-transparent" />
                    <div className="pointer-events-none absolute -left-32 top-16 h-72 w-72 rounded-full bg-[#2596BE]/10 blur-3xl" />
                    <div className="pointer-events-none absolute -right-48 bottom-10 h-96 w-96 rounded-full bg-[#3a8dff]/10 blur-3xl" />

                    <div className="relative max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[0.85fr_1.15fr] gap-12 xl:gap-16 items-start">
                        <Motion.div
                            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            className="xl:sticky xl:top-28 space-y-8"
                        >
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
                                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#2596BE]/30 to-transparent" />
                                
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
                                                group p-4 sm:p-5 transition-colors duration-200 hover:bg-[#2596BE]/3
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
                        </Motion.div>
                        
                        {/* Skills section */}
                        <Motion.div
                            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {isMobile ? (
                                <SkillsCarousel skills={skills}/>
                            ) : (
                                <div className="relative overflow-hidden border border-[#2596BE]/15 bg-[#050b18]/65 shadow-[0_24px_80px_-48px_rgba(37,150,190,0.55)] backdrop-blur-sm">
                                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#2596BE]/60 to-transparent" />
                                    <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#2596BE]/10 blur-3xl" />

                                    <div className="grid min-h-155 grid-cols-[240px_1fr]">
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
                                                        className="group grid grid-cols-[auto_1fr] gap-x-4 py-5 transition-colors duration-300 hover:bg-[#2596BE]/2.5"
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
                        </Motion.div>
                    </div>
                </section>

                {/* Project highlights */}
                <section id="projects">
                    {/* Nice transition into projects */}
                    < ProjectsTransition />
                    

                    <div className="bg-black pb-24 pt-20 md:pb-32">
                        <div className="relative overflow-hidden">
                            {/* Grid layer goes here */}
                            <div className="astral-grid" />

                            {/* Project Content */}
                            <div className="relative flex flex-col items-center px-5 lg:px-10 pt-16">
                                <Motion.div
                                    initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    className="w-full max-w-6xl"
                                >
                                    {/* Featured projects — Tier 1 */}
                                    <header className="max-w-3xl">
                                        <p className="font-[Orbitron] text-[11px] uppercase tracking-[0.35em] text-[#2596BE]">
                                            Portfolio / Selected Work
                                        </p>
                                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                                            Featured Projects
                                        </h2>
                                        <p className="mt-4 text-sm leading-relaxed text-slate-300/85 md:text-base">
                                            A few of the systems I am most proud of. Expand any project for the deeper technical story, then jump straight to the source.
                                        </p>
                                    </header>

                                    <div className="mt-10 space-y-6 md:space-y-8">
                                        {featuredProjects.map((project, index) => (
                                            <FeaturedProject 
                                                key={project.title} 
                                                project={project} 
                                                index={index} 
                                                isOpen={activeProject === index}
                                                onToggle={() => setActiveProject(activeProject === index ? null : index)} 
                                            />
                                        ))}
                                    </div>

                                    {/* Side projects — Tier 2 */}
                                    <section className="mt-20 md:mt-28" aria-labelledby="side-projects-heading">
                                        <div className="flex flex-col gap-4 border-b border-[#2596BE]/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
                                            <div>
                                                <p className="font-[Orbitron] text-[11px] uppercase tracking-[0.35em] text-[#2596BE]">
                                                    More / Experiments
                                                </p>
                                                <h3
                                                    id="side-projects-heading"
                                                    className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl"
                                                >
                                                    Side Projects
                                                </h3>
                                            </div>
                                            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
                                                Smaller builds and explorations across different tools and ideas.
                                            </p>
                                        </div>

                                        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                            {sideProjects.map((project, index) => (
                                                <SideProject key={project.title} project={project} index={index} />
                                            ))}
                                        </div>
                                    </section>
                                </Motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What I do section */}
                <section id="capabilities" className="relative bg-[#03050C] pt-24 pb-12 px-6 sm:px-8">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#2596BE]/25 to-transparent" />

                    <Motion.div
                        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col space-y-4 text-center max-w-3xl mx-auto"
                    >
                        <p className="font-[Orbitron] text-[11px] uppercase tracking-[0.35em] text-[#2596BE]">
                            Capabilities / Systems
                        </p>
                        <h2 className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl tracking-wide">
                            What I do
                        </h2>
                        <p className="text-slate-400 font-medium text-sm sm:text-base md:text-lg leading-relaxed">
                            I specialize in creating modern, responsive web applications using cutting-edge technologies. My approach combines technical excellence with a focus on user experience.
                        </p>
                    </Motion.div>

                    {/* Grid layout section */}
                    <Motion.div
                        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-6xl mx-auto"
                    >
                        {isMobile ? (
                            <GridCarousel cards={cards}/>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-white mt-12 sm:mt-16 md:mt-20">
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
                    </Motion.div>

                    {/* Vertical transition divider */}
                    <div className="mt-12 flex items-center justify-center">
                        <div className="w-0.5 h-24 bg-linear-to-b from-[#2596BE]/60 via-[#2596BE]/20 to-transparent shadow-[0_0_12px_rgba(37,150,190,0.5)]"/>
                    </div>
                </section>

                {/* FAQ Section */}
                <section id="faq" className="relative min-h-screen flex items-center justify-center overflow-hidden">
                    {/* Background image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${faqBackground})` }}
                    />

                    {/* Soft gradient blend over background */}
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#03050C] via-black/60 to-[#03050C]"/>

                    <div className="relative z-10 w-full max-w-7xl mx-auto py-20 px-4">
                        <Motion.h2
                            initial={reduceMotion ? false : { opacity: 0, y: 35, filter: "blur(8px)" }}
                            whileInView={
                                reduceMotion
                                    ? undefined
                                    : { opacity: 1, y: 0, filter: "blur(0px)" }
                            }
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                                duration: 0.8,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="
                                text-white/90 text-xl xs:text-4xl sm:text-5xl
                                tracking-[0.3em] font-[Orbitron]
                                text-center uppercase font-bold
                                drop-shadow-[0_0_8px_rgba(37,150,190,0.25)]
                                glow-text py-10 mb-8
                            "
                        >
                            Frequently Asked Questions
                        </Motion.h2>


                        {/* Questions section */}
                        <Motion.div
                            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                            className="flex flex-col gap-4 md:max-w-3xl md:mx-auto"
                        >
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
                                    description: "React, Next.js, Vite, TailwindCSS, JavaScript, TypeScript, HTML & CSS, TanStackQuery, Firebase, Node.js, Express, Axios, Prisma, Redis, SQL, AWS, Render, Git, etc."
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
                        </Motion.div>
                    </div>
                </section>

                {/* Engineering Experience & Academic Milestones */}
                <section ref={lineScrollRef} id="experience" className="bg-[#03050C] py-14">
                    {/* Heading */}
                    <Motion.div
                        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center mb-12"
                    >
                        <h2 
                            className="
                                text-white/90 text-4xl sm:text-5xl 
                                tracking-[0.3em] font-[Orbitron]
                                text-center uppercase font-bold 
                                transition-all duration-300
                                drop-shadow-[0_0_8px_rgba(37,150,190,0.25)]
                                glow-text py-4 mb-2
                            " 
                        >
                            EXPERIENCE
                        </h2>
                        <p className="text-center text-slate-400/80 text-sm sm:text-base font-mono tracking-wide max-w-2xl mx-auto px-4">
                            A progression of the engineering projects, academic milestones, and technical experiences that have shaped my development.
                        </p>
                    </Motion.div>

                    {/* Timeline content cards */}
                    <div className="relative max-w-7xl mx-auto px-4">
                        {/* Vertical line */}
                        <Motion.div 
                            style={{ scaleY: lineScale }}
                            className="absolute top-0 left-4 md:left-1/2 md:-translate-x-1/2 h-full w-1 bg-[#2596BE] origin-top"
                        />

                        {/* Timeline milestones */}
                        <div className="space-y-10">
                            <RoadmapItems 
                                side={"left"}
                                year={"2021 – 2023"}
                                title={"CS Foundations & Algorithm Design"}
                                description={"Built core engineering fundamentals through Java OOP, C++ memory management, and autonomous robotics programming — including a wavefront pathfinding algorithm with real-time sensor integration."}
                                highlights={["Java", "C++", "Data Structures", "Algorithms", "Robotics"]}
                            />

                            <RoadmapItems 
                                side={"right"}
                                year={"May 2025"}
                                title={"B.S. Computer Science — CUNY Brooklyn College"}
                                description={"Graduated with a GPA > 3.5 and Dean's List honors. Coursework included Data Structures & Algorithms, Large-Scale Application Design, Databases, Networks & Protocols, and a 25+ person collaborative game engineering project."}
                                highlights={["Dean's List", "GPA > 3.5", "Large-Scale Apps", "Data Structures", "Databases", "Networks"]}
                            />

                            <RoadmapItems 
                                side={"left"}
                                year={"2024 – 2025"}
                                title={"Full-Stack Web Applications"}
                                description={"Developed and deployed multiple full-stack applications — a real-time messaging platform with WebSockets, an interactive e-commerce storefront, and this portfolio featuring Three.js 3D particle effects and Framer Motion animations."}
                                highlights={["React", "Node.js", "Express", "JavaScript", "MySQL", "WebSockets", "Three.js", "Axios", "Cors", "Figma", "Postman", "Vitest", "AWS", "Render"]}
                            />

                            <RoadmapItems 
                                side={"right"}
                                year={"2025 - 2026"}
                                title={"Production Backend Systems & Data Engineering"}
                                description={"Engineered a high-throughput news bot monitoring 3,000+ stock tickers with concurrency queues and bot-evasion strategies. Built a service marketplace with on-device AI vision, multi-tier RBAC, Redis caching, and PostgreSQL persistence."}
                                highlights={["TypeScript", "Puppeteer", "MySQL", "PostgreSQL", "Redis", "Prisma", "MediaPipe", "RBAC", "TanStack Query"]}
                            />

                            <RoadmapItems 
                                side={"left"}
                                year={"2026 – Present"}
                                title={"Freelance Full-Stack Development"}
                                description={"Delivered a production client inquiry management platform as a freelance developer — featuring an admin dashboard with server-side filtering, cursor-based pagination, Redis rate limiting, Google OAuth 2.0 authentication, and automated email notifications."}
                                highlights={["Next.js", "TypeScript", "PostgreSQL", "Redis", "OAuth 2.0", "Prisma", "Nodemailer", "Vercel"]}
                            />
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
} 
