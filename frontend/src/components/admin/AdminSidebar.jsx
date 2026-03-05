import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    Ship,
    Layers,
    CalendarCheck,
    CreditCard,
    ChevronLeft,
    ChevronRight,
    ShieldCheck,
    LogOut,
    Bell
} from 'lucide-react';

const AdminSidebar = ({ isCollapsed, setIsCollapsed }) => {
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Users', path: '/admin/users', icon: Users },
        { name: 'Vendors Services', path: '/admin/services', icon: Ship },
        { name: 'Packages', path: '/admin/packages', icon: Layers },
        { name: 'Bookings', path: '/admin/bookings', icon: CalendarCheck },
        { name: 'Payments', path: '/admin/payments', icon: CreditCard },
    ];

    return (
        <aside
            className={`fixed left-0 top-0 h-screen bg-white/80 backdrop-blur-xl border-r border-[#B76E79]/10 transition-all duration-500 ease-in-out z-50 flex flex-col shadow-2xl
        ${isCollapsed ? 'w-24' : 'w-72'}`}
        >
            {/* Brand Section */}
            <div className={`p-8 flex items-center gap-4 overflow-hidden whitespace-nowrap border-b border-[#B76E79]/5`}>
                <motion.div
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    className="w-12 h-12 rounded-[1.25rem] bg-gradient-to-br from-[#5C3A2E] to-[#B76E79] flex-shrink-0 flex items-center justify-center text-white shadow-xl shadow-[#B76E79]/20"
                >
                    <ShieldCheck size={24} />
                </motion.div>
                <AnimatePresence>
                    {!isCollapsed && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex flex-col"
                        >
                            <span className="font-serif font-bold text-[#5C3A2E] text-xl leading-none tracking-tight">Admin</span>
                            <span className="text-[9px] text-[#B76E79] font-bold uppercase tracking-[0.2em] mt-1.5 px-0.5">Control Essence</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Navigation */}
            <nav className="flex-grow px-4 py-8 flex flex-col gap-2 overflow-y-auto scrollbar-hide">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-4 px-4 py-4 rounded-3xl transition-all relative group
                            ${isActive
                                    ? 'bg-[#5C3A2E] text-white shadow-2xl shadow-[#5C3A2E]/20'
                                    : 'text-[#5C3A2E]/50 hover:bg-[#FDF5E6] hover:text-[#5C3A2E]'}`}
                        >
                            <motion.div
                                animate={{ scale: isActive ? 1 : 0.9 }}
                                className={`flex-shrink-0 transition-colors ${isActive ? 'text-white' : 'text-[#B76E79]'}`}
                            >
                                <Icon size={22} />
                            </motion.div>

                            <AnimatePresence>
                                {!isCollapsed && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="text-[11px] font-bold uppercase tracking-[0.15em]"
                                    >
                                        {item.name}
                                    </motion.span>
                                )}
                            </AnimatePresence>

                            {isActive && !isCollapsed && (
                                <motion.div
                                    layoutId="sidebarActive"
                                    className="absolute right-4 w-1.5 h-1.5 rounded-full bg-[#B76E79]"
                                />
                            )}

                            {isCollapsed && (
                                <div className="absolute left-full ml-6 px-4 py-2 bg-[#5C3A2E] text-white text-[10px] font-bold uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 whitespace-nowrap shadow-2xl">
                                    {item.name}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Collapse Toggle */}
            <div className="p-6 border-t border-[#B76E79]/5">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-full flex items-center justify-center py-4 rounded-2xl bg-[#FDF5E6] text-[#B76E79] hover:bg-[#B76E79] hover:text-white transition-all duration-300 shadow-sm"
                >
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </motion.button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
