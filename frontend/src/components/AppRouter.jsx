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
import VendorManagement from './admin/VendorManagement';
import BookingManagement from './admin/BookingManagement';
import ContentManagement from './admin/ContentManagement';
import Settings from './admin/Settings';
import VenueManagement from './admin/VenueManagement';
import Reports from './admin/Reports';
import AddUser from './admin/adduser';

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
  const [activeNav, setActiveNav] = React.useState("Home");
  const [expandedDest, setExpandedDest] = React.useState(null);
  const [selectedDestination, setSelectedDestination] = React.useState(null);
  const [selectedPackage, setSelectedPackage] = React.useState(null);
  const [selectedVendors, setSelectedVendors] = React.useState([]);
  const [guests, setGuests] = React.useState([]);
  const [newGuest, setNewGuest] = React.useState({ name: "", email: "", side: "Bride" });
  const [paymentDone, setPaymentDone] = React.useState(false);
  const [inviteDownloaded, setInviteDownloaded] = React.useState(false);
  const [bookingStatus, setBookingStatus] = React.useState("planning");
  const [statusSteps, setStatusSteps] = React.useState([
    { label: "Choose Destination", done: false },
    { label: "Select Package", done: false },
    { label: "Book Vendors", done: false },
    { label: "Manage Guests", done: false },
    { label: "Complete Payment", done: false },
    { label: "Send Invitations", done: false }
  ]);


  // Handlers
  const toggleVendor = (id) => {
    setSelectedVendors(prev =>
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    );
  };

  const addGuest = () => {
    if (newGuest.name && newGuest.email) {
      setGuests(prev => [...prev, { ...newGuest, id: Date.now(), rsvp: "pending" }]);
      setNewGuest({ name: "", email: "", side: "Bride" });
    }
  };

  const removeGuest = (id) => {
    setGuests(prev => prev.filter(g => g.id !== id));
  };

  const handlePayment = () => {
    setPaymentDone(true);
    setBookingStatus("confirmed");
    setStatusSteps(prev => prev.map(step => ({ ...step, done: true })));
  };

  const navigate = (section) => {
    const routeMap = {
      'Home': '/',
      'Destinations': '/destinations',
      'Packages': '/packages',
      'Vendors': '/vendors',
      'Guest List': '/guests',
      'Payments': '/payments',
      'Invitations': '/invitations',
      'My Bookings': '/bookings',
      'Booking': '/booking',
      'Portfolio': '/portfolio',
      'Service': '/service',
      'Vendor Dashboard': '/vendor-dashboard'
    };
    const route = routeMap[section] || '/';
    routerNavigate(route);
  };

  // Update activeNav based on current route
  React.useEffect(() => {
    const routeToNavMap = {
      '/': 'Home',
      '/destinations': 'Destinations',
      '/packages': 'Packages',
      '/vendors': 'Vendors',
      '/guests': 'Guest List',
      '/payments': 'Payments',
      '/invitations': 'Invitations',
      '/bookings': 'My Bookings',
      '/booking': 'Booking',
      '/portfolio': 'Portfolio',
      '/service': 'Service',
      '/vendor-dashboard': 'Vendor Dashboard'
    };
    const currentNav = routeToNavMap[location.pathname] || 'Home';
    setActiveNav(currentNav);
  }, [location.pathname]);

  // Filter destinations based on active filter
  const [destFilter, setDestFilter] = React.useState("All");
  const filteredDests = React.useMemo(() => {
    if (destFilter === "All") return destinations;
    return destinations.filter(d => d.category === destFilter);
  }, [destinations, destFilter]);

  // Petals animation
  const [petals, setPetals] = React.useState([]);
  React.useEffect(() => {
    const newPetals = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 4
    }));
    setPetals(newPetals);
  }, []);

  // Hero slides
  const [currentSlide, setCurrentSlide] = React.useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [HERO_SLIDES.length]);

  // Login modal state
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
          setLoginMode("login");
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
            role: "user"
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

    navigate("/");
  };

  const openlogin = () => {
    const token = localStorage.getItem("user");
    if (!token) {
      setShowLogin(true);
      setLoginMode("login");
    }
    else {
      console.log("Already logged in");
      navigate("/Home");
    }
  }

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
  // Common props for all sections
  const commonProps = {
    activeNav,
    setActiveNav,
    selectedDestination,
    setSelectedDestination,
    selectedPackage,
    setSelectedPackage,
    selectedVendors,
    setSelectedVendors,
    guests,
    setGuests,
    newGuest,
    setNewGuest,
    paymentDone,
    setPaymentDone,
    inviteDownloaded,
    setInviteDownloaded,
    bookingStatus,
    setBookingStatus,
    statusSteps,
    setStatusSteps,
    packages,
    destinations,
    vendors,
    testimonials,
    HERO_SLIDES,
    resortShowcase,
    navItems,
    destFilter,
    setDestFilter,
    filteredDests,
    expandedDest,
    setExpandedDest,
    petals,
    currentSlide,
    setCurrentSlide,
    showLogin,
    setShowLogin,
    loginMode,
    openlogin,
    setLoginMode,
    formData,
    setFormData,
    toggleVendor,
    addGuest,
    removeGuest,
    handlePayment,
    navigate
  };

  const layoutProps = {
    activeNav,
    setActiveNav,
    showLogin,
    setShowLogin,
    loginMode,
    setLoginMode,
    formData,
    setFormData,
    handleLogin,
    handleLogout,
    navItems,
    openlogin
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
        <Route path="/admin/vendors" element={<VendorManagement />} />
        <Route path="/admin/venues" element={<VenueManagement />} />
        <Route path="/admin/bookings" element={<BookingManagement />} />
        <Route path="/admin/content" element={<ContentManagement />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/admin/add-user" element={<AddUser />} />
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
      <Route element={<Layout {...layoutProps} />}>
        <Route path="/" element={<HomeSection {...commonProps} />} />
        <Route path="/destinations" element={<DestinationsSection {...commonProps} />} />
        <Route path="/packages" element={<PackagesSection {...commonProps} />} />
        <Route path="/vendors" element={<VendorsSection {...commonProps} />} />
        <Route path="/guests" element={<GuestListSection {...commonProps} />} />
        <Route path="/payments" element={<PaymentsSection {...commonProps} />} />
        <Route path="/invitations" element={<InvitationsSection {...commonProps} />} />
        <Route path="/bookings" element={<MyBookingsSection {...commonProps} />} />
        <Route path="/add-user" element={<AddUser />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;