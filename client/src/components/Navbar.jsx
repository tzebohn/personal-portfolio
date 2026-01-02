/**
 * Navbar component
 * 
 * Displays the navigation icons at the top of the screen.
 * Typically used for navigating between main sections of the app.
 * 
 * Props: none
 * 
 */

import { NavLink } from "react-router-dom";

export default function Navbar () {

    // Global tailwindcss styles
    const iconButtons = `cursor-pointer`

    return (
        <nav 
            className="absolute top-0 left-0 w-full z-50 flex justify-between items-center border"
        >
            {/* Logo that navigates back to root */}
            <NavLink to="/" className="border cursor-pointer"> 
                <svg className="h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 498 127" fill="none">
                    <path d="M49.44 91.76L8.16 71.12V61.52L49.44 40.88V49.232L19.68 63.824C18.464 64.4 17.312 64.912 16.224 65.36C15.2 65.744 14.432 66 13.92 66.128C14.496 66.256 15.328 66.544 16.416 66.992C17.504 67.376 18.592 67.856 19.68 68.432L49.44 83.12V91.76ZM139.605 98V35.696H120.405V27.824H167.445V35.696H148.245V98H139.605ZM183.728 98V27.92H192.368V90.128H224.048V98H183.728Z" fill="black"/>
                    <rect className="logo-cursor" x="247" y="117" width="60" height="10" rx="2" fill="#2BA0FF"/>
                    <path d="M387.763 108.56L421.843 18.32H430.963L396.883 108.56H387.763Z" fill="black"/>
                    <path d="M447.16 91.76V83.408L476.92 68.816C478.136 68.24 479.256 67.76 480.28 67.376C481.368 66.928 482.168 66.64 482.68 66.512C482.104 66.384 481.272 66.128 480.184 65.744C479.096 65.296 478.008 64.784 476.92 64.208L447.16 49.52V40.88L488.44 61.52V71.12L447.16 91.76Z" fill="black"/>
                </svg>
            </NavLink>

            {/* Container for stack and hamburger icons */}
            <div className="flex items-center gap-4 border">
                <button 
                    className={`${iconButtons}`}
                    aria-label="Open projects menu"
                >
                    <svg className="h-8 w-8" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.063 1.456a1.749 1.749 0 0 1 1.874 0l8.383 5.316a1.751 1.751 0 0 1 0 2.956l-8.383 5.316a1.749 1.749 0 0 1-1.874 0L2.68 9.728a1.751 1.751 0 0 1 0-2.956Zm1.071 1.267a.25.25 0 0 0-.268 0L3.483 8.039a.25.25 0 0 0 0 .422l8.383 5.316a.25.25 0 0 0 .268 0l8.383-5.316a.25.25 0 0 0 0-.422Z"></path>
                        <path d="M1.867 12.324a.75.75 0 0 1 1.035-.232l8.964 5.685a.25.25 0 0 0 .268 0l8.964-5.685a.75.75 0 0 1 .804 1.267l-8.965 5.685a1.749 1.749 0 0 1-1.874 0l-8.965-5.685a.75.75 0 0 1-.231-1.035Z"></path><path d="M1.867 16.324a.75.75 0 0 1 1.035-.232l8.964 5.685a.25.25 0 0 0 .268 0l8.964-5.685a.75.75 0 0 1 .804 1.267l-8.965 5.685a1.749 1.749 0 0 1-1.874 0l-8.965-5.685a.75.75 0 0 1-.231-1.035Z"></path>
                    </svg>
                </button>
                <button 
                    className={`${iconButtons}`}
                    aria-label="Open menu"
                >
                    <svg className="h-8 w-8" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <path d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"></path>
                    </svg>
                </button>
            </div>      
        </nav>
    )
}