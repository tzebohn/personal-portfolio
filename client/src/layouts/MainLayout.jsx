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
import Cursor from "../components/Cursor";
import '../App.css'
import { useInputDevice } from "../contexts/inputDevice/useInputDevice";
import { useEffect, useState } from "react";
import ProjectGallery from "../components/ProjectGallery";

export default function MainLayout () {
    const {isTouch} = useInputDevice()

    const [menuOpen, setMenuOpen] = useState(false)         // Tracks whether 
    const [showProjects, setShowProjects] = useState(false) // Tracks visibility of ProjectsGallery component

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
        }
    }

    return (
        <div className=" relative min-h-screen bg-linear-to-br from-[#0f0a1a] to-[#05070a]">
            {!isTouch && <Cursor />}

            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} showProjects={showProjects} setShowProjects={setShowProjects}/>

            {/* Menu overlay links */}
            {menuOpen && (
                <div className="fixed top-0 left-0 w-full pointer-events-auto z-40 pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-24">
                    <ul 
                        className="
                            max-w-7xl mx-auto px-6
                            grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 md:gap-12 lg:gap-16
                        "
                    >
                        <li className="flex items-center justify-center">
                            <a 
                                href="/resume/TzeBohn_Ling_Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white font-semibold text-sm sm:text-base md:text-lg lg:text-xl tracking-wide hover:text-blue-600 transition-colors duration-300"
                            >
                                Resume
                            </a>
                        </li>
                        <li className="flex items-center justify-center">
                            <a className="text-white font-semibold text-sm sm:text-base md:text-lg lg:text-xl tracking-wide hover:text-blue-600 transition-colors duration-300" onClick={() => scrollToSection("contact")}>Contact</a>
                        </li>
                        <li className="flex items-center justify-center">
                            <a className="text-white font-semibold text-sm sm:text-base md:text-lg lg:text-xl tracking-wide hover:text-blue-600 transition-colors duration-300" onClick={() => scrollToSection("roadmap")}>Roadmap</a>
                        </li>
                        <li className="flex items-center justify-center">
                            <a className="text-white font-semibold text-sm sm:text-base md:text-lg lg:text-xl tracking-wide hover:text-blue-600 transition-colors duration-300" onClick={() => scrollToSection("projects")}>Projects</a>
                        </li>
                    </ul>
                </div>
            )}

            {/* ProjectGallery overlay */}
            {showProjects && 
                <div className="fixed inset-0 z-50 bg-black">
                    <ProjectGallery onClose={() => setShowProjects(false)}/>
                </div>
            }

            {/* Main content wrapper */}
            <div 
                className={
                    `relative transition-all duration-300 ease-in-out
                    ${menuOpen ? "scale-90 -translate-y-100 xs:-translate-y-75 md:-translate-y-70 filter brightness-50 pointer-events-none" : "scale-100 translate-y-0 filter brightness-100 pointer-events-auto"}
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