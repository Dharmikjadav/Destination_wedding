import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Bell,
    LogOut,
    User as UserIcon,
    Moon,
    Sun,
    Settings
} from 'lucide-react';

const AdminNavbar = ({ isCollapsed }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);

        try {
            const userData = JSON.parse(localStorage.getItem('user'));
            if (userData) setUser(userData);
        } catch (err) {
            console.error('Failed to load user:', err);
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        try {
            localStorage.removeItem('user');
        } catch (e) { }
        navigate('/');
    };

    return (
        <header
            className={`fixed top-0 right-0 h-20 z-40 transition-all duration-500 ease-in-out flex items-center justify-between px-8
        ${isCollapsed ? 'left-24' : 'left-72'} 
        ${isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-[#B76E79]/10 shadow-sm' : 'bg-transparent'}`}
        >
            {/* Page Context */}
            <div className="flex flex-col">
                <motion.h2
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[10px] font-bold text-[#B76E79] uppercase tracking-[0.3em]"
                >
                    Administrative Suite
                </motion.h2>
                <p className="text-[9px] text-[#5C3A2E]/40 font-bold uppercase tracking-widest mt-1 italic">Control Center &bull; Operational Excellence</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-8">
                {/* Search */}
                <div className="hidden lg:flex items-center bg-[#FDF5E6]/50 border border-[#B76E79]/10 rounded-2xl px-5 py-2.5 w-72 focus-within:bg-white focus-within:border-[#B76E79] focus-within:shadow-xl focus-within:shadow-[#B76E79]/5 transition-all group">
                    <Search className="text-[#B76E79] group-focus-within:scale-110 transition-transform" size={16} />
                    <input
                        className="bg-transparent border-none text-[11px] w-full focus:ring-0 placeholder:text-[#5C3A2E]/30 ml-3 font-bold uppercase tracking-widest text-[#5C3A2E]"
                        placeholder="Search Intelligence..."
                    />
                </div>

                <div className="flex items-center gap-4">
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-10 h-10 rounded-xl bg-white border border-[#B76E79]/10 flex items-center justify-center text-[#B76E79] hover:text-[#5C3A2E] hover:shadow-lg transition-all relative"
                    >
                        <Bell size={18} />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                    </motion.button>
                </div>

                {/* Profile + Logout */}
                <div className="flex items-center gap-4 border-l border-[#B76E79]/10 pl-8">
                    <div className="flex flex-col items-end mr-2">
                        <span className="text-[11px] font-bold text-[#5C3A2E] uppercase tracking-wider">{user?.name || 'Grand Admin'}</span>
                        <span className="text-[9px] text-[#B76E79] font-bold uppercase tracking-tighter">System Overseer</span>
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative group cursor-pointer"
                    >
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#5C3A2E] to-[#B76E79] flex items-center justify-center text-white text-xs font-bold shadow-xl shadow-[#B76E79]/20 transform transition-transform group-hover:rotate-6">
                            {user?.name ? user.name.substring(0, 2).toUpperCase() : <UserIcon size={18} />}
                        </div>
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.1, x: 2 }}
                        onClick={handleLogout}
                        className="ml-2 p-2.5 rounded-xl bg-[#FDF5E6] text-[#B76E79] hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                    >
                        <LogOut size={18} />
                    </motion.button>
                </div>
            </div>
        </header>
    );
};

export default AdminNavbar;
