import InstaIcon from "../assets/icons/insta.svg?react"
import GithubIcon from "../assets/icons/github.svg?react"
import LinkedinIcon from "../assets/icons/linkedin.svg?react"
import EmailIcon from "../assets/icons/email.svg?react"
import TwitterIcon from "../assets/icons/twitter.svg?react"
import DiscordIcon from "../assets/icons/discord.svg?react"
import { FaRegHandshake } from "react-icons/fa6"
import { useInputDevice } from "../contexts/inputDevice/useInputDevice"
import { useState } from "react"

export default function Footer () {
    const { isTouch } = useInputDevice()

    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText("bohnling@gmail.com")
            setCopied(true)
            setTimeout(() => setCopied(false), 1000)
        } catch (err) {
            console.error(err)
        }
    }

    const iconStyles = `w-11 h-11 md:w-14 md:h-14`
    const anchorStyles = `
        flex items-center justify-center

        transition-all duration-200 ease-out
        transition-transform

        hover:shadow-[0_0_18px_rgba(255,255,255,0.35)]
        hover:-translate-y-1

        ${isTouch && "focus:shadow-[0_0_18px_rgba(255,255,255,0.45)]"}

        active:shadow-[0_0_22px_rgba(255,255,255,0.5)]
    `
    const buttonStyles = `
        hover:text-[#ED3F0A] focus:text-[#ED3F0A] 
        transition-colors duration-300 uppercase py-3
        text-xs 
    `

    return (
        <>  
            {/* Extra spacing for blending background */}
           <div className="h-48 bg-gradient-to-b from-[#090e1a] via-[#05070a] to-black"></div>

            <footer className="relative bg-black pt-24 px-20 border-t-2 border-gray-900">
                {/* Upper feature panel */}
                <section className="relative mx-auto max-w-4xl -mt-46 mb-16 text-white">
                    <div 
                        className="
                            flex flex-col gap-4 items-center p-8
                            md:flex-none md:grid md:grid-cols-3 md:gap-6
                            rounded-lg bg-[#03050C] 
                            border-2 border-purple-500/30 backdrop-blur-xl 
                            shadow-[0_0_50px_-12px_rgba(168,85,247,0.4)]
                            text-white
                            overflow-hidden
                        "
                    >
                        <h2 className="text-center text-2xl font-semibold tracking-wide">Thanks for visiting</h2>
                        <p className="text-center text-sm md:text-base tracking-wide">If you're interested in collaborating,
                            let's schedule a conversation. I'll
                            bring the coffee.
                        </p>
                        <a 
                            href="https://forms.gle/yqccyh2pZwnyPuHY6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`
                                flex items-center justify-center gap-4 
                                border rounded-full p-2 xs:px-4
                                hover:bg-gray-800
                                active:bg-gray-800
                            `}
                            aria-label="Fill out contact form"
                        >
                            <FaRegHandshake className="w-6 h-6 sm:w-8 sm:h-8 text-white"/>
                            <span className="text-sm xs:text-lg font-semibold">Let's Connect</span>
                        </a>
                    </div>
                </section>

                {/* Bottom meta footer */}
                <div className="relative overflow-hidden w-full">
                    {/* Atmosphere background layer */}
                    <div
                        className="
                            absolute inset-0 z-0
                        "
                    />

                    {/* Social buttons */}
                    <div className="relative z-10 flex justify-center pt-12">
                        <div className="grid grid-cols-3 gap-6">
                            {/* Github link */}
                            <a
                                href="https://github.com/tzebohn"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${anchorStyles}`}
                                aria-label="View my Github"
                            >
                                <GithubIcon className={`${iconStyles}`}/>
                            </a>

                            {/* Linkedin link */}
                            <a
                                href="https://www.linkedin.com/in/tzebohn-ling-100a992b1/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${anchorStyles}`}
                                aria-label="Connect with me on Linkedin"
                            >
                                <LinkedinIcon className={`${iconStyles}`}/>
                            </a>

                            {/* Discord link */}
                            <a
                                href="https://discord.com/users/922332604622077964"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${anchorStyles}`}
                                aria-label="Message me on Discord"
                            >
                                <DiscordIcon className={`${iconStyles}`}/>
                            </a>

                            {/* Email link */}
                            <button
                                onClick={handleCopy}
                                className={`${anchorStyles} relative`}
                                aria-label="Copy email to clipboard"
                            >
                                <EmailIcon className={`${iconStyles}`}/>
                                {copied && (
                                    <span className="absolute -top-6 text-xs bg-black text-white px-2 py-1 rounded">
                                    Copied!
                                    </span>
                                )}
                            </button>


                            {/* Twitter link */}
                            <a
                                href="https://x.com/tzebohn"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${anchorStyles}`}
                                aria-label="Follow me on X"
                            >
                                <TwitterIcon className={`${iconStyles}`}/>
                            </a>

                            {/* Instagram link */}
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${anchorStyles}`}
                                aria-label="Follow my Instagram"
                            >
                                <InstaIcon className={`${iconStyles}`}/>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="mt-10 pb-2 border-t border-gray-900"></div>
            </footer>

            <div className="text-white bg-gradient-to-b from-black via-[#04060d] to-[#090e1a]">
                <div className="min-h-24 flex flex-col items-center md:flex-row md:justify-between md:items-end px-4">
                    <nav className="flex flex-wrap justify-center gap-8 order-1 md:order-2">
                        <a 
                            href="https://github.com/tzebohn" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="hover:text-[#ED3F0A] focus:text-[#ED3F0A] transition-colors duration-300 uppercase py-3 text-xs"
                        >
                            Github
                        </a>
                        <button className={`${buttonStyles}`}>Blog</button>
                        <button className={`${buttonStyles}`}>Terms of Use</button>
                        <button className={`${buttonStyles}`}>Privacy Policy</button>
                        <button className={`${buttonStyles}`}>Cookie Policy</button>
                    </nav>

                    <div className="p-2 flex items-end order-2 md:order-1">
                        <h6 className="flex gap-1 items-center text-sm tracking-wide">
                            <span>©</span>
                            2026 TzeBohn Ling. All rights reserved.
                        </h6>
                    </div>
                </div>
            </div>
        </>
    )
}