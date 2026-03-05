import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  CalendarDays,
  Image as ImageIcon,
  Briefcase,
  Package,
  Diamond,
  LogOut,
  Menu,
  X,
  UserPlus,
  Users,
  BarChart3
} from "lucide-react";

const VendorNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Get logged user safely
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isAdmin = user?.role === "admin";

  const vendorLinks = [
    { to: "/vendor-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/vendor/bookings", label: "Bookings", icon: CalendarDays },
    { to: "/vendor/portfolio", label: "Portfolio", icon: ImageIcon },
    { to: "/vendor/service", label: "Services", icon: Briefcase },
    { to: "/vendor/package", label: "Packages", icon: Package },
  ];

  const adminLinks = [
    { to: "/admin-dashboard", label: "Admin Console", icon: BarChart3 },
    { to: "/admin/add-user", label: "Add User", icon: UserPlus },
    { to: "/admin/manage-vendors", label: "Manage Vendors", icon: Users },
    { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  ];

  const links = isAdmin ? adminLinks : vendorLinks;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-[#B76E79]/20 px-6 py-4 flex items-center justify-between shadow-sm">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-[#5C3A2E] bg-white rounded-xl border border-[#B76E79]/10 transition-colors hover:bg-[#F8C8DC]/10"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate(isAdmin ? "/admin-dashboard" : "/vendor-dashboard")}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B76E79] to-[#F8C8DC] flex items-center justify-center text-white shadow-md transition-transform duration-500 group-hover:scale-105">
            <Diamond size={20} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-serif text-[#5C3A2E] leading-none mb-1 tracking-tight">
              Everlasting
            </h1>
            <p className="text-[9px] text-[#B76E79] font-bold uppercase tracking-[0.2em]">
              {isAdmin ? "Authority Suite" : "Vendor Portal"}
            </p>
          </div>
        </div>
      </div>

      {/* Center Links (Desktop) */}
      <div className="hidden lg:flex items-center gap-1 bg-[#FDF5E6]/50 p-1 rounded-2xl border border-[#B76E79]/10">
        {links.map((link) => {
          const isActive = location.pathname === link.to;
          const Icon = link.icon;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`px-5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 flex items-center gap-2 uppercase ${isActive
                ? "bg-white text-[#B76E79] shadow-sm border border-[#B76E79]/10"
                : "text-[#5C3A2E]/60 hover:text-[#B76E79] hover:bg-white/50"
                }`}
            >
              <Icon size={14} />
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 bg-white border border-[#B76E79]/10 px-2 py-2 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="hidden md:flex flex-col text-right pl-3 pr-1">
            <span className="text-xs font-bold text-[#5C3A2E]">
              {user?.name || "Partner"}
            </span>
            <span className="text-[9px] text-[#B76E79] font-bold uppercase tracking-tighter">
              {isAdmin ? "Administrator" : "Verified Partner"}
            </span>
          </div>

          <div className="w-9 h-9 rounded-xl bg-[#F8C8DC]/20 border border-[#B76E79]/10 flex items-center justify-center text-[#B76E79] font-serif text-lg shadow-inner">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          <button
            onClick={handleLogout}
            className="w-8 h-8 flex items-center justify-center text-stone-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
            title="Sign Out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm lg:hidden z-[60]"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 bg-[#FFFDF0] w-72 p-8 shadow-2xl flex flex-col z-[70] lg:hidden"
            >
              <div className="flex items-center gap-3 mb-12 border-b border-[#B76E79]/10 pb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#B76E79] to-[#F8C8DC] flex items-center justify-center text-white shadow-lg">
                  <Diamond size={24} />
                </div>
                <h1 className="text-2xl font-serif text-[#5C3A2E]">Everlasting</h1>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-[10px] text-[#B76E79] font-bold uppercase tracking-widest mb-4 px-4">Menu</p>
                {links.map((link) => {
                  const isActive = location.pathname === link.to;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`px-5 py-4 rounded-2xl text-sm font-bold tracking-wide transition-all flex items-center gap-3 ${isActive
                        ? "bg-white text-[#B76E79] shadow-md border border-[#B76E79]/10"
                        : "text-[#5C3A2E]/70 hover:bg-white/50"
                        }`}
                    >
                      <Icon size={18} />
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <button
                onClick={handleLogout}
                className="mt-auto w-full bg-[#B76E79] text-white py-4 rounded-2xl font-bold uppercase tracking-widest shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <LogOut size={18} />
                Logout
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default VendorNavbar;