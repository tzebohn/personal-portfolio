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
import { FaReact, FaNodeJs } from "react-icons/fa";
import { RiTailwindCssFill, RiNextjsFill } from "react-icons/ri";
import { SiVitest, SiVite, SiExpress, SiMysql, SiPrisma, SiReactquery, SiPostman } from "react-icons/si";
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
            { Icon: SiReactquery, name: "TanStack", rating: 3, color: "#FF4154" },
            { Icon: SiVite, name: "Vite", rating: 3, color: "#646CFF" },
            { Icon: RiNextjsFill, name: "Next.js", rating: 3, color: "#ffffff" },
        ]
    },
    {
        category: "backend",
        items: [
            { Icon: FaNodeJs, name: "Node.js", rating: 4, color: "#339933" },
            { Icon: SiExpress, name: "Express", rating: 4, color: "#ffffff" },
            { Icon: DiRedis, name: "Redis", rating: 3, color: "#D82C20" },
            { Icon: RiNextjsFill, name: "Next.js", rating: 3, color: "#ffffff" },
        ]
    }, 
    {
        category: "database",
        items: [
            { Icon: IoLogoFirebase, name: "Firebase", rating: 3, color: "#FFA000" },
            { Icon: SiMysql, name: "MySQL", rating: 3, color: "#00758F" },
            { Icon: BiLogoPostgresql, name: "PostgreSQL", rating: 2, color: "#336791" },
            { Icon: SiPrisma, name: "Prisma", rating: 3, color: "#0C77C0" },
        ]
    }, 
    {
        category: "testing",
        items: [
            { Icon: SiVitest, name: "Vitest", rating: 2, color: "#6E4FF5" },
            { Icon: SiPostman, name: "Postman", rating: 3, color: "#FF6C37" },
        ]
    }
]

export default function Home () {
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
                        <div className="relative overflow-hidden rounded-2xl border border-[#2f3a55]/10 bg-[#0b1231]/5 p-8">
                            <div className="pointer-events-none absolute -right-10 -top-12 h-44 w-44 rounded-full bg-[#3a8dff]/8 blur-3xl" />
                            <div className="pointer-events-none absolute -bottom-14 -left-10 h-40 w-40 rounded-full bg-[#1ecad3]/5 blur-3xl" />

                            <div className="relative mb-10">
                                <h2 className="text-white font-bold text-xl sm:text-2xl">Core Skills</h2>
                                <p className="mt-1.5 text-sm font-medium text-slate-300">A quick snapshot of my main tools across the stack</p>
                            </div>

                            <div className="relative grid grid-cols-2 gap-x-12 gap-y-12">
                                {skills.map((cat) => (
                                    <section key={cat.category}>
                                        <h3 className="mb-3 text-base text-[#8ad7ff] font-semibold capitalize tracking-wide">{cat.category}</h3>
                                        <div className="mb-5 h-px bg-linear-to-r from-[#67cbff]/25 to-transparent" />

                                        <div className="grid grid-cols-2 gap-x-5 gap-y-6">
                                            {cat.items.map((skill) => (
                                                <div key={skill.name}>
                                                    <div className="flex items-center gap-3">
                                                        <skill.Icon className="shrink-0 w-5 h-5" style={{ color: skill.color }} />
                                                        <span className="truncate text-sm font-medium text-gray-100">{skill.name}</span>
                                                    </div>
                                                    <div
                                                        className="mt-2.5 h-0.5 overflow-hidden rounded-full bg-[#1a2747]"
                                                        role="progressbar"
                                                        aria-valuenow={skill.rating}
                                                        aria-valuemin={0}
                                                        aria-valuemax={5}
                                                        aria-label={`${skill.name} proficiency: ${skill.rating} out of 5`}
                                                    >
                                                        <div
                                                            className="h-full rounded-full transition-all duration-500"
                                                            style={{
                                                                width: `${(skill.rating / 5) * 100}%`,
                                                                background: `linear-gradient(90deg, ${skill.color}60, ${skill.color})`
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
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
                                            stats: [{ label: "TEAM SIZE", value: "2" }]
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
                                        href: "https://odin-message-board-3i88.onrender.com"
                                    }}
                                    isAvailable={true}
                                />
                            </div>
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

                    <div className="relative w-full max-w-7xl mx-auto py-20 px-4">
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
