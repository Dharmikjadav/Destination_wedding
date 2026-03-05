import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = ({ isCollapsed, setIsCollapsed }) => {
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', path: '/admin/dashboard' },
        { name: 'Users', path: '/admin/users' },
        { name: 'Vendors Services', path: '/admin/services' },
        { name: 'Packages', path: '/admin/packages' },
        { name: 'Bookings', path: '/admin/bookings' },
        { name: 'Payments', path: '/admin/payments' },
    ];

    return (
        <aside
            className={`fixed left-0 top-0 h-screen bg-white border-r border-slate-200 transition-all duration-300 z-50 flex flex-col
        ${isCollapsed ? 'w-20' : 'w-64'}`}
        >
            {/* Brand Section */}
            <div className="p-6 flex items-center gap-3 overflow-hidden whitespace-nowrap">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex-shrink-0 flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                    {/* <span className="material-symbols-outlined text-2xl font-bold">security</span> */}
                </div>
                {!isCollapsed && (
                    <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-lg leading-none tracking-tight">Admin</span>
                        {/* <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest mt-1">Management Portal</span> */}
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-grow px-3 py-4 flex flex-col gap-1">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all relative group
                ${isActive
                                    ? 'bg-indigo-50 text-indigo-700 font-bold shadow-sm border border-indigo-100/50'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                        >
                            <span className={`material-symbols-outlined text-xl ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
                                {item.icon}
                            </span>
                            {!isCollapsed && <span className="text-sm tracking-wide">{item.name}</span>}
                            {isActive && !isCollapsed && (
                                <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-indigo-600" />
                            )}
                            {isCollapsed && (
                                <div className="absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                                    {item.name}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Collapse Toggle */}
            <div className="p-4 border-t border-slate-100">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-full flex items-center justify-center py-2 rounded-lg hover:bg-slate-50 text-slate-400 transition-colors"
                >
                    <span className={`material-symbols-outlined transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}>
                        first_page
                    </span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
