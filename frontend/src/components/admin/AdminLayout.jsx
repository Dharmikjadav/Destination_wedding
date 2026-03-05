import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';

const AdminLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-[#FFFDF0] flex font-sans text-[#5C3A2E] overflow-x-hidden">
            {/* Ambient Background Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#F8C8DC]/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-[#B76E79]/5 blur-[100px] rounded-full" />
                <div className="absolute top-[20%] left-[10%] w-[20%] h-[20%] bg-[#FDF5E6]/40 blur-[80px] rounded-full" />
            </div>

            {/* Sidebar */}
            <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

            <div
                className={`flex-grow flex flex-col transition-all duration-500 ease-in-out relative z-10
                ${isCollapsed ? 'md:pl-24' : 'md:pl-72'}`}
            >
                {/* Navbar */}
                <AdminNavbar isCollapsed={isCollapsed} />

                {/* Main Content Area */}
                <main className="mt-20 p-4 md:p-8 flex-grow">
                    <div className="max-w-7xl mx-auto w-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={window.location.pathname}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                <Outlet />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>

                {/* Footer Subtle Branding */}
                <footer className="py-6 px-8 text-center">
                    <p className="text-[10px] text-[#5C3A2E]/30 font-bold uppercase tracking-[0.3em]">
                        Admin Excellence &bull; Powered by Destination Wedding Pro
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default AdminLayout;
