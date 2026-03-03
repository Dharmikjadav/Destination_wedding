import React from 'react'
import { Link, useLocation } from 'react-router-dom';

export const Sidebar = ({ loggedUser }) => {
  const location = useLocation();
  const isAdmin = loggedUser?.role === 'admin';

  const vendorLinks = [
    { to: "/vendor-dashboard", label: "Dashboard", icon: "dashboard" },
    { to: "/vendor/bookings", label: "Bookings", icon: "calendar_month" },
    { to: "/vendor/portfolio", label: "Portfolio", icon: "photo_library" },
    { to: "/vendor/service", label: "Services", icon: "home_repair_service" },
    { to: "/vendor/package", label: "Packages", icon: "inventory_2" },
  ];

  const adminLinks = [
    { to: "/admin/dashboard", label: "Admin Console", icon: "admin_panel_settings" },
    { to: "/admin/add-user", label: "Add User", icon: "person_add" },
    { to: "/admin/manage-vendors", label: "Manage Vendors", icon: "storefront" },
    { to: "/admin/analytics", label: "Analytics", icon: "analytics" },
  ];

  const links = isAdmin ? adminLinks : vendorLinks;

  return (
    <aside className="w-72 bg-white h-screen sticky top-0 border-r border-slate-200 flex-shrink-0 flex flex-col z-20 hidden lg:flex shadow-sm">
      <div className="h-full flex flex-col justify-between p-8">
        <div className="flex flex-col gap-10">

          {/* Brand Section */}
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-300">
              <span className="material-symbols-outlined text-2xl">
                {isAdmin ? "security" : "dashboard"}
              </span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-slate-900 text-xl font-bold leading-none tracking-tight">
                {isAdmin ? "Authority" : "Everlasting"}
              </h1>
              <p className="text-pink-600 text-[10px] font-bold uppercase tracking-widest mt-1.5">
                {isAdmin ? "Portal" : "Dashboard"}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-2 px-4">Menu</p>
            {links.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center justify-between px-5 py-3 rounded-lg transition-all duration-200 group ${isActive
                    ? "bg-pink-50 text-pink-700 border border-pink-100/50"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`material-symbols-outlined text-xl transition-transform duration-200 ${isActive ? "text-pink-600" : "text-slate-400 group-hover:text-slate-600"}`}>
                      {link.icon}
                    </span>
                    <span className="text-sm font-semibold tracking-wide">{link.label}</span>
                  </div>
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-600 shadow-sm"></div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Profile / Status Widget */}
        <div className="flex flex-col gap-6 mt-auto">
          <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-white/10 transition-all duration-700" />

            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                {isAdmin ? "Integrity" : "Business Rank"}
              </span>
              <span className="text-xs font-bold text-pink-400">
                {isAdmin ? "Active" : "Elite"}
              </span>
            </div>

            {!isAdmin && (
              <>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-pink-500 h-full rounded-full transition-all duration-1000"
                    style={{ width: '85%' }}
                  ></div>
                </div>
                <p className="text-[10px] text-slate-400 mt-3 leading-relaxed font-medium">
                  Your business is in the top <span className="text-indigo-400 font-bold">5%</span> for your category.
                </p>
              </>
            )}

            {isAdmin && (
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">All Services Live</span>
              </div>
            )}
          </div>

          <button className="flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all text-xs font-bold shadow-sm">
            <span className="material-symbols-outlined text-sm">settings</span>
            Account Settings
          </button>
        </div>
      </div>
    </aside>
  );
}
