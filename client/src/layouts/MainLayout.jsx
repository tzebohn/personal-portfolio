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
            // Scroll up to the top
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
            // Prevent scrolling
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

    return (
        <div className="relative min-h-screen bg-[#1d1e21]">
            {!isTouch && <Cursor />}

            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} showProjects={showProjects} setShowProjects={setShowProjects}/>

            {/* Menu overlay links */}
            {menuOpen && (
                <div className="absolute top-0 left-0 w-full pointer-events-auto">
                    <ul 
                        className="
                            w-[60%] mx-auto mt-[120px] mb-[50px]
                            grid grid-cols-2 gap-4
                            md:grid-none 
                            md:flex md:justify-between 
                        "
                    >
                        <li className="flex items-center justify-center">
                            <a className="text-white font-semibold text-lg tracking-wide hover:underline" href="">Home</a>
                        </li>
                        <li className="flex items-center justify-center">
                            <a className="text-white font-semibold text-lg tracking-wide hover:underline" href="">About</a>
                        </li>
                        <li className="flex items-center justify-center">
                            <a className="text-white font-semibold text-lg tracking-wide hover:underline" href="">Projects</a>
                        </li>
                        <li className="flex items-center justify-center">
                            <a className="text-white font-semibold text-lg tracking-wide hover:underline" href="">Pictures</a>
                        </li>
                        <li className="flex items-center justify-center">
                            <a className="text-white font-semibold text-lg tracking-wide hover:underline" href="">Contacts</a>
                        </li>
                        <li className="flex items-center justify-center">
                            <a className="text-white font-semibold text-lg tracking-wide hover:underline" href="">Blog</a>
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
                    ${menuOpen ? "scale-90 -translate-y-30 filter brightness-50 pointer-events-none" : "scale-100 translate-y-0 filter brightness-100"}
                    `
                }>
                <Outlet />
                <Footer />
            </div>
        </div>
    )
}