import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const VendorNavbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user?.role === 'admin';

    const vendorLinks = [
        { to: "/vendor-dashboard", label: "Dashboard", },
        { to: "/vendor/bookings", label: "Bookings" },
        { to: "/vendor/portfolio", label: "Portfolio" },
        { to: "/vendor/service", label: "Services" },
        { to: "/vendor/package", label: "Packages", },
    ];

    const adminLinks = [
        { to: "/admin-dashboard", label: "Admin Console", icon: "admin_panel_settings" },
        { to: "/admin/add-user", label: "Add User", icon: "person_add" },
        { to: "/admin/manage-vendors", label: "Manage Vendors", icon: "storefront" },
        { to: "/admin/analytics", label: "Analytics", icon: "analytics" },
    ];

    const links = isAdmin ? adminLinks : vendorLinks;

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 md:px-6 py-2 flex items-center justify-between shadow-sm backdrop-blur-md">
            {/* Brand & Mobile Toggle */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="lg:hidden w-8 h-8 flex items-center justify-center text-slate-600 bg-slate-50 rounded-lg border border-slate-200 active:scale-95 transition-transform"
                >
                    <span className="material-symbols-outlined text-xl">
                        {isMobileMenuOpen ? "close" : "menu"}
                    </span>
                </button>

                <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => navigate(isAdmin ? "/admin-dashboard" : "/vendor-dashboard")}>
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-all duration-500">
                        <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-slate-900 text-xs md:text-sm font-bold leading-none tracking-tight">
                            Everlasting
                        </h1>
                        <p className="text-slate-500 text-[7px] font-bold uppercase tracking-widest mt-0.5">
                            {isAdmin ? "Admin Console" : "Vendor Portal"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Center Navigation Links (Desktop) */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-200">
                {links.map((link) => {
                    const isActive = location.pathname === link.to;
                    return (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-md transition-all duration-200 group ${isActive
                                ? "bg-white shadow-sm text-indigo-600 border border-slate-200"
                                : "text-slate-600 hover:text-slate-900 hover:bg-white"
                                }`}
                        >
                            <span className={`material-symbols-outlined text-base ${isActive ? "text-white" : "text-[#c8956c]/70"}`}>
                                {link.icon}
                            </span>
                            <span className="text-[9px] font-bold uppercase tracking-widest">{link.label}</span>
                        </Link>
                    );
                })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3 md:gap-4">
                <div className="hidden xl:flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-48 focus-within:w-64 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">

                    <input
                        className="bg-transparent border-none text-[10px] w-full focus:ring-0 placeholder:text-slate-400 text-slate-600 ml-1.5 font-medium"
                        placeholder="Search dashboard..."
                        type="text"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all relative group shadow-sm">
                        {/* <span className="material-symbols-outlined text-lg">notifications</span> */}
                        <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-indigo-500 rounded-full border-2 border-white"></span>
                    </button>

                    <div className="h-6 w-[1px] bg-slate-200 mx-0.5 hidden sm:block"></div>

                    <div className="flex items-center gap-2.5 cursor-pointer group p-1 pr-2 rounded-lg hover:bg-slate-50 transition-all text-left">
                        <div className="w-8 h-8 rounded-lg bg-cover bg-center border border-slate-200 shadow-sm"
                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80')" }}>
                        </div>
                        <div className="hidden md:flex flex-col">
                            <span className="text-[10px] font-bold text-slate-900 leading-none">Elena Vance</span>
                            <span className="text-[7px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Manager</span>
                        </div>
                        <button onClick={handleLogout} className="ml-1 text-slate-300 hover:text-red-500 transition-colors">
                            <span className="material-symbols-outlined text-base">logout</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            <div className={`lg:hidden fixed inset-0 z-[60] transition-all duration-300 ${isMobileMenuOpen ? "visible" : "invisible"}`}>
                <div
                    className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
                <div className={`absolute top-0 left-0 bottom-0 w-[280px] bg-white shadow-2xl transition-transform duration-300 flex flex-col ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
                                <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
                            </div>
                            <span className="font-bold text-slate-900">Everlasting</span>
                        </div>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="w-9 h-9 flex items-center justify-center bg-slate-50 text-slate-500 rounded-xl active:scale-95 transition-transform border border-slate-100">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-1">
                        {links.map((link) => {
                            const isActive = location.pathname === link.to;
                            return (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all ${isActive
                                        ? "bg-indigo-50 text-indigo-600 shadow-sm border border-indigo-100"
                                        : "text-slate-600 hover:bg-slate-50"
                                        }`}
                                >
                                    <span className="text-[11px] font-bold uppercase tracking-widest">{link.label}</span>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="p-6 border-t border-slate-100 mt-auto bg-slate-50">
                        <button onClick={handleLogout} className="flex items-center gap-4 px-5 py-3.5 w-full text-red-600 bg-white border border-red-100 rounded-xl transition-all shadow-sm">
                            <span className="material-symbols-outlined text-lg">logout</span>
                            <span className="text-[11px] font-bold uppercase tracking-widest">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default VendorNavbar;
