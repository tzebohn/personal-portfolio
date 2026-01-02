/**
 * MainLayout component
 * 
 * This layout component contains global elements that 
 * should be present on every page.
 * 
 * Props: none
 */

import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

export default function MainLayout () {
    return (
        <div className="relative min-h-screen">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}