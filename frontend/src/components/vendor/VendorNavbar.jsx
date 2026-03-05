import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const VendorNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Get logged user safely
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isAdmin = user?.role === "admin";

  const vendorLinks = [
    { to: "/vendor-dashboard", label: "Dashboard" },
    { to: "/vendor/bookings", label: "Bookings" },
    { to: "/vendor/portfolio", label: "Portfolio" },
    { to: "/vendor/service", label: "Services" },
    { to: "/vendor/package", label: "Packages" },
  ];

  const adminLinks = [
    { to: "/admin-dashboard", label: "Admin Console" },
    { to: "/admin/add-user", label: "Add User" },
    { to: "/admin/manage-vendors", label: "Manage Vendors" },
    { to: "/admin/analytics", label: "Analytics" },
  ];

  const links = isAdmin ? adminLinks : vendorLinks;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 md:px-6 py-2 flex items-center justify-between shadow-sm">

      {/* Left Section */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden w-8 h-8 flex items-center justify-center text-slate-600 bg-slate-50 rounded-lg border border-slate-200"
        >
          <span className="material-symbols-outlined text-xl">
            {isMobileMenuOpen ? "close" : "menu"}
          </span>
        </button>

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() =>
            navigate(isAdmin ? "/admin-dashboard" : "/vendor-dashboard")
          }
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-lg">
              admin_panel_settings
            </span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-slate-900">
              Everlasting
            </h1>
            <p className="text-[10px] text-slate-500 uppercase">
              {isAdmin ? "Admin Console" : "Vendor Portal"}
            </p>
          </div>
        </div>
      </div>

      {/* Center Links (Desktop) */}
      <div className="hidden lg:flex items-center gap-2">
        {links.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Logged User */}
        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg">

          {/* User Initial */}
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          {/* User Info */}
          <div className="hidden md:flex flex-col text-left">
            <span className="text-sm font-bold text-slate-900">
              {user?.name || "User"}
            </span>
            <span className="text-[10px] text-slate-500 uppercase">
              {user?.role || "Role"}
            </span>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-red-500 ml-2"
          >
            <span className="material-symbols-outlined text-lg">
              logout
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/40 lg:hidden">
          <div className="bg-white w-64 h-full p-5 shadow-lg">
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2 rounded-md hover:bg-slate-100"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <button
              onClick={handleLogout}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default VendorNavbar;