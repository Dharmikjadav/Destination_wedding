import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Layout from './Layout';
import HomeSection from './user/HomeSection';
import DestinationsSection from './user/DestinationsSection';
import PackagesSection from './user/PackagesSection';
import VendorsSection from './user/VendorsSection';
import GuestListSection from './user/GuestListSection';
import PaymentsSection from './user/PaymentsSection';
import InvitationsSection from './user/InvitationsSection';
import MyBookingsSection from './user/MyBookingsSection';
// Admin components
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import UserManagement from './admin/UserManagement';
import VendorServices from './admin/VendorServices';
import BookingManagement from './admin/BookingManagement';
import PaymentManagement from './admin/PaymentManagement';
import PackageManagement from './admin/PackageManagement';

// Vendor components
import VendorDashboard from './vendor/VendorDashboard';
import Booking from './vendor/Booking';
import Package from './vendor/Package';
import Portfolio from './vendor/Portfolio';
import Service from './vendor/Service';
import VendorLayout from './vendor/VendorLayout';

import ScrollToTop from "./ScrollToTop";
import { addUser, loginUser } from "../api/userApi";

import { packages, destinations, vendors, testimonials, HERO_SLIDES, resortShowcase, navItems } from '../data';

const AppRouter = () => {
  const routerNavigate = useNavigate();
  const location = useLocation();

  // 🔐 Auth state (only)
  const [showLogin, setShowLogin] = React.useState(false);
  const [loginMode, setLoginMode] = React.useState("login");
  const [formData, setFormData] = React.useState({ email: "", password: "", name: "", role: "user", number: "", businessName: "", adminKey: "" });
  const [loggedUser, setLoggedUser] = React.useState(null);

  const handleLogin = async () => {
    try {

      if (!formData.email || !formData.password) {
        alert("Please fill all required fields");
        return;
      }

      let response;

      // 🔹 SIGNUP
      if (loginMode === "signup") {

        response = await addUser(formData);

        if (response.id) {
          alert("Account Created Successfully ✅");
          window.location.reload();
          // setLoginMode("login");
        } else {
          alert("Signup failed ❌");
        }


      }

      // 🔹 LOGIN
      else {

        const response = await loginUser(formData);

        if (response.status === "success") {
          localStorage.setItem("user", JSON.stringify(response.user)
          );
          alert("Login Successful ✅");
          setFormData({
            email: "",
            password: "",
            // role: "user"
          });
          // Role based redirect
          if (response.user.role === "admin") {
            routerNavigate("/admin-dashboard");
          }
          else if (response.user.role === "vendor") {
            routerNavigate("/vendor-dashboard");
          }
          else {
            routerNavigate("/");
          }

          setShowLogin(false);
          window.location.reload();

        } else {
          alert(response.message || "Invalid credentials ❌");
        }
      }

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedUser(null);
    alert("Logged out successfully");
    window.location.reload();
    routerNavigate("/");
  };

  const openlogin = () => {
    const token = localStorage.getItem("user");
    if (!token) {
      setShowLogin(true);
      setLoginMode("login");
    }
  };

  const ProtectedRoute = ({ children, allowedRoles }) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      return <Navigate to="/" />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to="/" />;
    }

    return children;
  };

  // 🎨 Auth props for Layout
  const authProps = {
    showLogin,
    setShowLogin,
    loginMode,
    setLoginMode,
    formData,
    setFormData,
    handleLogin,
    handleLogout,
    openlogin,
    navItems
  };


  return (
    <Routes>
      {/* Admin Routes - Wrapped in AdminLayout */}
      <Route element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/services" element={<VendorServices />} />
        <Route path="/admin/bookings" element={<BookingManagement />} />
        <Route path="/admin/payments" element={<PaymentManagement />} />
        <Route path="/admin/packages" element={<PackageManagement />} />
      </Route>

      {/* Vendor Routes - Wrapped in VendorLayout */}
      <Route element={
        <ProtectedRoute allowedRoles={["vendor"]}>
          <VendorLayout />
        </ProtectedRoute>
      }>
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />
        <Route path="/vendor/bookings" element={<Booking />} />
        <Route path="/vendor/portfolio" element={<Portfolio />} />
        <Route path="/vendor/service" element={<Service />} />
        <Route path="/vendor/package" element={<Package />} />
      </Route>

      {/* User Routes - Wrapped in Layout */}
      <Route element={<Layout {...authProps} />}>
        <Route path="/" element={<HomeSection />} />
        <Route path="/destinations" element={<DestinationsSection />} />
        <Route path="/packages" element={<PackagesSection />} />
        <Route path="/vendors" element={<VendorsSection />} />
        <Route path="/guests" element={<GuestListSection />} />
        <Route path="/payments" element={<PaymentsSection />} />
        <Route path="/invitations" element={<InvitationsSection />} />
        <Route path="/bookings" element={<MyBookingsSection />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;