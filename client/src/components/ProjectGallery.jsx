/**
 * ProjectGallery component
 * 
 * Displays the featured projects
 * 
 * props:
 * - onClose: Function that closes / unmounts ProjectGallery component
 */

import ProjectCards from "./ProjectCards";
import StockscannerImg from "../assets/images/stockscanner.jpg"
import MessageboardImg from "../assets/images/messageboard.png"
import CollegeInvadersImg from "../assets/images/collegeinvaders.png"
import ShopEasyImg from "../assets/images/shopeasy.png"

export default function ProjectGallery ({ onClose }) {
    return (
        <div className="flex flex-col items-center gap-6 text-white relative h-full p-4 overflow-y-auto overscroll-contain">
            {/* Background here */}
            
            {/* Close button */}
            <div className="fixed top-4 right-10 z-50">
                <button className="animate-slideInRight" onClick={onClose}>
                    <svg className={`h-8 w-8`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                        <line className="" x1="5" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <line className="" x1="19" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </button>
            </div>

            {/* Projects container */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-50">
            
                {/* Project 1: Left Aligned */}
                <div className="grid grid-cols-12 w-full mb-16 lg:mb-0">
                    <div className="col-span-12 pr-12 lg:pr-0 lg:col-span-6">
                        <ProjectCards
                            title={"Stock Scanner"}
                            description={"Full-Stack"}
                            href={"#"}
                            image={StockscannerImg}
                        />
                    </div>
                </div>

                {/* Project 2: Right Aligned */}
                <div className="grid grid-cols-12 w-full mb-16 lg:mb-0">
                    <div className="col-span-12 pl-12 lg:pl-0 lg:col-start-7 lg:col-span-6 lg:-mt-40">
                        <ProjectCards
                            title={"College Invaders"}
                            description={"UI & Refactoring"}
                            href={"https://tzebohn.github.io/collegeinvaders/"}
                            image={CollegeInvadersImg}
                        />
                    </div>
                </div>

                {/* Project 3: Left Aligned */}
                <div className="grid grid-cols-12 w-full mb-16 lg:mb-0">
                    <div className="col-span-12 pr-12 lg:pr-0 lg:col-span-6 lg:-mt-40">
                        <ProjectCards
                            title={"MessageBoard"}
                            description={"Full-Stack"}
                            href={"https://odin-message-board-3i88.onrender.com"}
                            image={MessageboardImg}
                        />
                    </div>
                </div>

                {/* Project 4: Right Aligned */}
                <div className="grid grid-cols-12 w-full mb-16 lg:mb-0">
                    <div className="col-span-12 pl-12 lg:pl-0 lg:col-start-7 lg:col-span-6 lg:-mt-40">
                        <ProjectCards
                            title={"ShopEasy"}
                            description={"UX UI frontend"}
                            href={"https://tzebohn.github.io/Odin-Shopping-Cart/"}
                            image={ShopEasyImg}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}