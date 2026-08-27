/**
 * MainLayout component
 * 
 * This layout component contains global elements that 
 * should be present on every page.
 * 
 * Props: none
 */

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import '../App.css'
import { useEffect, useState } from "react";
import ProjectGallery from "../components/ProjectGallery";

export default function MainLayout () {
    const [menuOpen, setMenuOpen] = useState(false)         // Tracks whether 
    const [showProjects, setShowProjects] = useState(false) // Tracks visibility of ProjectsGallery component
    const menuLinkClass = "relative inline-flex min-h-9 cursor-pointer items-center justify-center px-2 py-2 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white/85 transition-[color,opacity,transform] duration-200 after:absolute after:-bottom-0.5 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-[#2BA0FF] after:transition-all after:duration-200 hover:scale-[1.03] hover:text-[#2BA0FF] hover:after:w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2BA0FF] sm:text-[0.78rem] md:text-sm lg:text-base"

    /**
     * Called when menuOpen state changes
     * 
     * Forces user back to the top of the page
     * and prevents scrolling.
     */
    useEffect(() => {
        if (menuOpen) {
            // Instantly jump to top
            window.scrollTo({ top: 0 })

            // Then lock scroll
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
    }, [menuOpen])

    /**
     * Called when showProjects state changes
     * 
     * Prevents background scrolling when ProjectGallery component overlay
     * is on the screen
     */
    useEffect(() => {
        // ProjectGallery overlay is on
        if (showProjects) {
            document.body.style.overflow = "hidden"
        }
        // ProjectGallery overlay is off 
        else {
            document.body.style.overflow = ""
        }
    }, [showProjects])

    /**
     * Function allows users an alternate way of closing Menu
     */
    const handleMenuClose = () => {
        if (menuOpen) {
            setMenuOpen(false)
        }
    }

    /**
     * Function scrolls to a specific section of the page when a menu link is clicked
     * @param {string} id - id of the section to scroll to
     */
    const scrollToSection = (id) => {
        const element = document.getElementById(id)
        if (element) {
            setMenuOpen(false)
            const y = element.getBoundingClientRect().top + window.scrollY
            window.scrollTo({ top: y })
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-linear-to-br from-[#0f0a1a] to-[#05070a]">
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} showProjects={showProjects} setShowProjects={setShowProjects}/>

            {/* Menu overlay links */}
            <div 
                className={
                    `main-layout-menu fixed inset-x-0 top-0 z-40 px-5 pt-17 pb-4 transition-[opacity,transform] duration-300 ease-out xs:pt-19 sm:px-6 sm:pt-20 md:pt-24 lg:pt-28
                    ${menuOpen ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-[0.985] opacity-0"}
                    `
                }
                aria-hidden={!menuOpen}
            >
                <ul 
                    className="mx-auto grid w-full max-w-152 grid-cols-2 gap-x-3 gap-y-2 sm:max-w-3xl sm:grid-cols-4 sm:gap-x-6 sm:rounded-full sm:border sm:border-white/10 sm:bg-white/4.5 sm:px-3 sm:py-2 sm:shadow-[0_18px_70px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.08)] sm:backdrop-blur-md md:gap-x-8 lg:gap-x-10"
                >
                    <li 
                        className={`main-layout-menu-item flex items-center justify-center transition-[opacity,transform] duration-300 ease-out ${menuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                        style={{ transitionDelay: menuOpen ? "0ms" : "0ms" }}
                    >
                        <a 
                            href="/resume/TzeBohn_Ling_Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            tabIndex={menuOpen ? undefined : -1}
                            className={menuLinkClass}
                        >
                            Resume
                        </a>
                    </li>
                    <li 
                        className={`main-layout-menu-item flex items-center justify-center transition-[opacity,transform] duration-300 ease-out ${menuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                        style={{ transitionDelay: menuOpen ? "40ms" : "0ms" }}
                    >
                        <a className={menuLinkClass} onClick={() => scrollToSection("projects")}>Projects</a>
                    </li>
                    <li 
                        className={`main-layout-menu-item flex items-center justify-center transition-[opacity,transform] duration-300 ease-out ${menuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                        style={{ transitionDelay: menuOpen ? "80ms" : "0ms" }}
                    >
                        <a className={menuLinkClass} onClick={() => scrollToSection("experience")}>Experience</a>
                    </li>
                    <li 
                        className={`main-layout-menu-item flex items-center justify-center transition-[opacity,transform] duration-300 ease-out ${menuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                        style={{ transitionDelay: menuOpen ? "120ms" : "0ms" }}
                    >
                        <a className={menuLinkClass} onClick={() => scrollToSection("contact")}>Contact</a>
                    </li>
                </ul>
            </div>

            {/* ProjectGallery overlay */}
            {showProjects && 
                <div className="fixed inset-0 z-50 bg-black">
                    <ProjectGallery onClose={() => setShowProjects(false)}/>
                </div>
            }

            {/* Main content wrapper */}
            <div 
                className={
                    `main-layout-shell relative z-0 origin-top transition-[transform,filter,border-radius,box-shadow] duration-300 ease-out will-change-transform
                    ${menuOpen ? "pointer-events-none translate-y-40 scale-[0.955] overflow-hidden rounded-4xl shadow-[0_30px_90px_rgba(0,0,0,0.45)] brightness-[0.62] saturate-[0.9] sm:translate-y-24 sm:scale-[0.965] md:translate-y-28 md:scale-[0.97] lg:translate-y-32 lg:scale-[0.975]" : "pointer-events-auto translate-y-0 scale-100 rounded-none shadow-none brightness-100 saturate-100"}
                    `
                }
                onClick={handleMenuClose}
            >
                <Outlet />
                <Footer />
            </div>
        </div>
    )
}
