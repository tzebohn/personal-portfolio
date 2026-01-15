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

export default function MainLayout () {
    const {isTouch} = useInputDevice()

    return (
        <div className="relative min-h-screen">
            {!isTouch && <Cursor />}
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}