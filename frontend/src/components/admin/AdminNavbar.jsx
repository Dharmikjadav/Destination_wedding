import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = ({ isCollapsed }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // 🔥 Get logged-in user from localStorage
    useEffect(() => {
        try {
            const userData = JSON.parse(localStorage.getItem('user'));
            if (userData) {
                setUser(userData);
            }
        } catch (err) {
            console.error('Failed to load user:', err);
        }
    }, []);

    const handleLogout = () => {
        try {
            localStorage.removeItem('user');
        } catch (e) {
            // ignore
        }
        navigate('/');
    };

    return (
        <header
            className={`fixed top-0 right-0 h-16 bg-white border-b border-slate-200 z-40 transition-all duration-300 flex items-center justify-between px-8
        ${isCollapsed ? 'left-20' : 'left-64'}`}
        >
            {/* Page Title / Info */}
            <div className="flex flex-col">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest px-1">Global Overview</h2>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6">
                {/* Search */}
                <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 rounded-lg px-4 py-1.5 w-64 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                    <span className="material-symbols-outlined text-slate-400 text-lg">search</span>
                    <input
                        className="bg-transparent border-none text-xs w-full focus:ring-0 placeholder:text-slate-400 ml-2 font-medium"
                        placeholder="Search records..."
                    />
                </div>

                {/* Icons
                <div className="flex items-center gap-2">
                    <button className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all relative">
                        <span className="material-symbols-outlined text-lg">notifications</span>
                        <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
                    </button>
                    <button className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
                        <span className="material-symbols-outlined text-lg">help_outline</span>
                    </button>
                </div> */}

                {/* Profile + Logout */}
                <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
                    <div className="flex flex-col items-end mr-4">
                        <span className="text-xs font-bold text-slate-900">{user?.name || 'Admin Team'}</span>
                        <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-tighter">Superadmin</span>
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600 text-xs font-bold transition-transform group-hover:scale-105">
                        {user?.name ? user.name.substring(0, 2).toUpperCase() : 'AT'}
                    </div>
                    <button onClick={handleLogout} className="ml-4 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AdminNavbar;
