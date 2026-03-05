import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import VendorNavbar from './VendorNavbar';
import { Footer } from './Footer';
import { motion, AnimatePresence } from 'framer-motion';

const VendorLayout = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-[#FFFDF0] flex flex-col font-sans selection:bg-[#B76E79]/20 text-[#5C3A2E]">
            {/* Top Navbar */}
            <VendorNavbar />

            {/* Page Content */}
            <main className="flex-grow w-full relative overflow-hidden">
                {/* Luxury Wedding Flourishes */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F8C8DC]/30 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#B76E79]/10 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none" />

                {/* Subtle Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/linen.png")` }}></div>

                <div className="relative z-10 w-full lg:max-w-7xl lg:mx-auto p-4 md:p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default VendorLayout;
