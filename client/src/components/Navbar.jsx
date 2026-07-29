/**
 * Navbar component
 * 
 * Displays the navigation icons at the top of the screen.
 * Typically used for navigating between main sections of the app.
 * 
 * Props: 
 * - menuOpen: Boolean indicating whether the menu is open
 * - setMenuOpen: Function to update the menuOpen state
 * - showProjects: Boolean indicating whether ProjectGallery component is open
 * - setShowProjects: Function to update the showProjects state
 * 
 */

import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./styles.css"

export default function Navbar ({ menuOpen, setMenuOpen, showProjects, setShowProjects }) {
    const [showBar, setShowBar] = useState(true)    // Tracks Navbar visibility
    const lastScrollY = useRef(window.scrollY)      // Tracks the last scroll position

    const location = useLocation()                  // Tracks current URL path      
    
    /**
     * Runs on component mount
     * 
     * Attachs a scroll eventlistener to track scroll position
     * and controls the Navbar's visibility
     */
    useEffect(() => {
        const treshold = 5  // Prevents micro scrolls, improves UX

        /**
         * Function checks whether scroll scrolled up or down
         */
        const updateScroll = () => {
            const currentScrollY = window.scrollY

            // User scrolled up
            if (currentScrollY < lastScrollY.current - treshold) {
                setShowBar(true)
            } 
            // User scrolled down
            else if (currentScrollY > lastScrollY.current + treshold) {
                setShowBar(false)
            }
            // Update lastScrollY
            lastScrollY.current = currentScrollY
        }

        // Attach scroll eventlistener
        window.addEventListener("scroll", updateScroll)

        // Clean up event listener(s)
        return (() => removeEventListener("scroll", updateScroll))
    }, [])

    // Global tailwindcss styles
    const iconButtons = `cursor-pointer text-white transition-transform duration-200 hover:scale-110`
    const iconSize = `h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-9 lg:w-9`
    const badgeSize = `w-[14px] h-[14px] sm:w-4 sm:h-4 text-[7px] sm:text-[8px]`
    const logoSize = `h-8 sm:h-9 md:h-10 lg:h-12`

    /**
     * Called when user presses < TL /> Home Logo
     * 
     * Handles going back to the top of the homepage
     * if the user is already currently at the homepage.
     * 
     * Otherwise, react router will handle navigating to homepage
     */
    function handleNavigate (e) {
        // User is already at homepage when button was clicked
        if (location.pathname === "/") {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
        // Else let react router handle navigation to home
    }

    return (
        <>
            {showBar && !showProjects &&
                <nav 
                    className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-3 sm:p-4 md:px-8 lg:px-12 gap-4"
                >
                    {/* Logo that navigates back to root */}
                    <NavLink to="/" className="group cursor-pointer shrink-0" onClick={handleNavigate}>
                        <svg className={logoSize} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 498 127" fill="none">
                            <g className="logo-stroke">
                                <path d="M49.44 91.76L8.16 71.12V61.52L49.44 40.88V49.232L19.68 63.824C18.464 64.4 17.312 64.912 16.224 65.36C15.2 65.744 14.432 66 13.92 66.128C14.496 66.256 15.328 66.544 16.416 66.992C17.504 67.376 18.592 67.856 19.68 68.432L49.44 83.12V91.76ZM139.605 98V35.696H120.405V27.824H167.445V35.696H148.245V98H139.605ZM183.728 98V27.92H192.368V90.128H224.048V98H183.728Z" fill="white"/>

                                <path className="logo-path" d="M49.44 91.76L8.16 71.12V61.52L49.44 40.88V49.232L19.68 63.824C18.464 64.4 17.312 64.912 16.224 65.36C15.2 65.744 14.432 66 13.92 66.128C14.496 66.256 15.328 66.544 16.416 66.992C17.504 67.376 18.592 67.856 19.68 68.432L49.44 83.12V91.76ZM139.605 98V35.696H120.405V27.824H167.445V35.696H148.245V98H139.605ZM183.728 98V27.92H192.368V90.128H224.048V98H183.728Z" 
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                            <rect className="logo-cursor" x="247" y="117" width="60" height="10" rx="2" fill="#2BA0FF"/>
                            <g className="logo-stroke">
                                <path className="logo-path" d="M387.763 108.56L421.843 18.32H430.963L396.883 108.56H387.763Z" fill="white"/>

                                <path className="logo-path" d="M387.763 108.56L421.843 18.32H430.963L396.883 108.56H387.763Z" 
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                            <g className="logo-stroke">
                                <path className="logo-path" d="M447.16 91.76V83.408L476.92 68.816C478.136 68.24 479.256 67.76 480.28 67.376C481.368 66.928 482.168 66.64 482.68 66.512C482.104 66.384 481.272 66.128 480.184 65.744C479.096 65.296 478.008 64.784 476.92 64.208L447.16 49.52V40.88L488.44 61.52V71.12L447.16 91.76Z" fill="white"/>

                                <path className="logo-path" d="M447.16 91.76V83.408L476.92 68.816C478.136 68.24 479.256 67.76 480.28 67.376C481.368 66.928 482.168 66.64 482.68 66.512C482.104 66.384 481.272 66.128 480.184 65.744C479.096 65.296 478.008 64.784 476.92 64.208L447.16 49.52V40.88L488.44 61.52V71.12L447.16 91.76Z" 
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                            
                        </svg>
                    </NavLink>

                    {/* Container for stack and hamburger icons */}
                    <div className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                        {/* View projects button */}
                        <div className="flex gap-2 sm:gap-3 items-center group">
                            <span className={`hidden xs:group-hover:inline text-white text-xs sm:text-sm font-semibold see-projects`}>View Projects</span>
                            <button 
                                className={`${iconButtons} relative group`}
                                aria-label="Open projects menu"
                                onClick={() => {
                                    setMenuOpen(false)
                                    setShowProjects(true)
                                }}
                            >   
                                <div 
                                className={`
                                    absolute -top-1.5 sm:-top-2 -right-0.5 sm:-right-0.75 bg-[#4e4d6e] text-black rounded-full flex items-center justify-center
                                    transition-transform duration-300 ease-out
                                    group-hover:-translate-y-1
                                    ${badgeSize}
                                `}
                                >
                                    <span className="text-white font-semibold">6</span>
                                </div>
                                <svg className={iconSize} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.063 1.456a1.749 1.749 0 0 1 1.874 0l8.383 5.316a1.751 1.751 0 0 1 0 2.956l-8.383 5.316a1.749 1.749 0 0 1-1.874 0L2.68 9.728a1.751 1.751 0 0 1 0-2.956Zm1.071 1.267a.25.25 0 0 0-.268 0L3.483 8.039a.25.25 0 0 0 0 .422l8.383 5.316a.25.25 0 0 0 .268 0l8.383-5.316a.25.25 0 0 0 0-.422Z"></path>
                                    <path d="M1.867 12.324a.75.75 0 0 1 1.035-.232l8.964 5.685a.25.25 0 0 0 .268 0l8.964-5.685a.75.75 0 0 1 .804 1.267l-8.965 5.685a1.749 1.749 0 0 1-1.874 0l-8.965-5.685a.75.75 0 0 1-.231-1.035Z"></path>
                                    <path d="M1.867 16.324a.75.75 0 0 1 1.035-.232l8.964 5.685a.25.25 0 0 0 .268 0l8.964-5.685a.75.75 0 0 1 .804 1.267l-8.965 5.685a1.749 1.749 0 0 1-1.874 0l-8.965-5.685a.75.75 0 0 1-.231-1.035Z"></path>
                                </svg>
                            </button>
                        </div>

                        {/* Navigation stack button */}
                        <button 
                            className={`${iconButtons}`}
                            aria-label="Open menu"
                            onClick={() => setMenuOpen(prev => !prev)}
                        >   
                            <svg 
                                className={`nav-toggle ${iconSize} ${menuOpen ? 'open' : ''}`}
                                viewBox="0 0 24 24" 
                                fill="currentColor" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect className="hamburger-line top" x="3" y="5" width="18" height="2" rx="1"/>
                                <rect className="hamburger-line middle" x="3" y="11" width="18" height="2" rx="1"/>
                                <rect className="hamburger-line bottom" x="3" y="17" width="18" height="2" rx="1"/>
                            </svg>
                        </button>
                    </div>      
                </nav>
            }
        </>
    )
}