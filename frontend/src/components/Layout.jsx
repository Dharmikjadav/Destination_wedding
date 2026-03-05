import React from 'react';
import "./navbar.css";
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

const Layout = ({
  showLogin,
  setShowLogin,
  loginMode,
  setLoginMode,
  formData,
  setFormData,
  handleLogin,
  handleLogout,
  navItems
}) => {

  const navigate = useNavigate();
  const location = useLocation();
  const isVendorRoute = location.pathname.startsWith('/vendor/') || location.pathname.startsWith('/vendor-dashboard');
  const [loggedUser, setLoggedUser] = React.useState(null);
  const [activeNav, setActiveNav] = React.useState("Home");

  // Load user from localStorage
  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setLoggedUser(JSON.parse(user));
    }
  }, []);

  // Route mappings
  const routeToNavMap = {
    '/': 'Home',
    '/destinations': 'Destinations',
    '/packages': 'Packages',
    '/vendors': 'Vendors',
    '/guests': 'Guest List',
    '/payments': 'Payments',
    '/invitations': 'Invitations',
    '/bookings': 'My Bookings'
  };

  const navToRouteMap = {
    'Home': '/',
    'Destinations': '/destinations',
    'Packages': '/packages',
    'Vendors': '/vendors',
    'Guest List': '/guests',
    'Payments': '/payments',
    'Invitations': '/invitations',
    'My Bookings': '/bookings'
  };

  // Update active nav
  React.useEffect(() => {
    const currentNav = routeToNavMap[location.pathname] || 'Home';
    setActiveNav(currentNav);
  }, [location.pathname]);

  // Role-based navbar filtering
  const filteredNavItems = React.useMemo(() => {

    if (!loggedUser) {
      return navItems.filter(item =>
        ["Home", "Destinations", "Packages"].includes(item)
      );
    }

    if (loggedUser.role === "admin") {
      return navItems;
    }

    if (loggedUser.role === "vendor") {
      return navItems.filter(item =>
        ["Home", "Vendors"].includes(item)
      );
    }

    if (loggedUser.role === "user") {
      return navItems.filter(item =>
        ["Home", "Destinations", "Packages", "Vendors", "Guest List", "Payments", "Invitations", "My Bookings"].includes(item)
      );
    }

    return navItems;

  }, [loggedUser, navItems]);

  // Navigation handler with protection
  const handleNavClick = (navItem) => {

    const route = navToRouteMap[navItem] || '/';

    // If not logged in & trying to access protected page
    if (!loggedUser &&
      !["Home", "Destinations", "Packages"].includes(navItem)
    ) {
      setShowLogin(true);
      return;
    }

    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 relative overflow-x-hidden">

      {/* LOGIN MODAL */}
      {showLogin && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl relative">

            <div className="text-center mb-6">
              <h2
                className="text-2xl font-semibold mb-2"
                style={{ color: "#5c3a2e" }}
              >
                {loginMode === "login" ? "Welcome Back" : "Create Account"}
              </h2>
            </div>

            {/* ROLE SELECTOR (LOGIN + SIGNUP) */}
            {loginMode === "login" && (
              <div className="flex justify-center gap-3 mb-6">
                {["user", "vendor", "admin"].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setFormData({ ...formData, role })}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200
              ${formData.role === role
                        ? "bg-rose-400 text-white border-rose-400 shadow-md"
                        : "bg-white text-gray-600 border-gray-300 hover:bg-rose-100"
                      }`}
                  >
                    {role.toUpperCase()}
                  </button>
                ))}
              </div>
            )}


            {loginMode === "signup" && (
              <div className="flex justify-center gap-3 mb-6">
                {["user", "vendor"].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setFormData({ ...formData, role })}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200
              ${formData.role === role
                        ? "bg-rose-400 text-white border-rose-400 shadow-md"
                        : "bg-white text-gray-600 border-gray-300 hover:bg-rose-100"
                      }`}
                  >
                    {role.toUpperCase()}
                  </button>
                ))}
              </div>
            )}


            <form className="space-y-4">

              {loginMode === "signup" && (
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-xl border border-rose-200"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              )}

              {loginMode === "signup" && formData.role === "vendor" && (
                <input
                  type="text"
                  placeholder="Business Name"
                  className="w-full px-4 py-3 rounded-xl border border-rose-200"
                  value={formData.businessName || ""}
                  onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                />
              )}

              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-xl border border-rose-200"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />



              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl border border-rose-200"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
              />

              {formData.role === "admin" && (
                <input
                  type="text"
                  placeholder="Admin Key"
                  className="w-full px-4 py-3 rounded-xl border border-rose-200"
                  value={formData.adminKey || ""}
                  onChange={e => setFormData({ ...formData, adminKey: e.target.value })}
                />)}

              {loginMode === "signup" && (
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-xl border border-rose-200"
                  value={formData.number}
                  onChange={e => setFormData({ ...formData, number: e.target.value })}
                />
              )}

              <button
                type="button"
                onClick={handleLogin}
                className="w-full py-3 rounded-xl font-bold shimmer-btn shadow-md"
              >
                {loginMode === "login" ? "Sign In" : "Create Account"}
              </button>

            </form>

            <div className="text-center mt-4">
              <button
                onClick={() =>
                  setLoginMode(loginMode === "login" ? "signup" : "login")
                }
                className="text-sm"
              >
                {loginMode === "login"
                  ? "Need an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>

            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

          </div>
        </div>
      )}

      {/* NAVBAR */}
      {!isVendorRoute && (
        <nav className="navbar">
          <div className="navbar-container">

            <div className="logo-section">
              <span className="logo-icon">💍</span>
              <div>
                <h1 className="logo-title">Everlasting</h1>
                <p className="logo-subtitle">Wedding Planners</p>
              </div>
            </div>

            <div className="nav-links">
              {filteredNavItems.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`nav-link ${activeNav === item ? "active" : ""}`}
                >
                  {item}
                </button>
              ))}
            </div>

            {loggedUser ? (
              <div className="user-section">
                <span className="user-name m-2">
                  👤 {loggedUser.name}
                </span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="signin-btn"
              >
                Sign In
              </button>
            )}

          </div>
        </nav>
      )}

      <main className="relative z-10">
        <Outlet />
      </main>
      {!isVendorRoute && (
        <footer className="py-16 px-6" style={{ background: "linear-gradient(135deg,#2d1510,#5c3a2e)" }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-10 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-4"><span className="text-3xl">💍</span><div><h2 className="text-2xl font-display text-white">Everlasting</h2><p className="text-xs" style={{ color: "#c8956c" }}>Wedding Planners</p></div></div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: "#a08070" }}>The #1 provider of destination wedding travel services. Certified Specialists at no cost to you. Best of Weddings 2018–2025.</p>
                <p className="text-xs font-semibold" style={{ color: "#c8956c" }}>📞 1-800-792-6898</p>
                <p className="text-xs mt-1" style={{ color: "#7a5050" }}>TICO: 50019699</p>
              </div>
              {[
                { title: "Destinations", links: ["Riviera Maya", "Punta Cana", "Cancun", "Aruba", "Jamaica", "Santorini, Greece"] },
                { title: "Planning", links: ["How It Works", "Wedding Packages", "Choose Vendors", "Guest Management", "Secure Payments", "Download Invites"] },
                { title: "Company", links: ["About Us", "Our Specialists", "Exclusive Offers", "Blog & Guides", "Awards", "Contact Us"] },
              ].map(col => (
                <div key={col.title}><h4 className="font-semibold text-white text-sm mb-4 tracking-wide">{col.title}</h4><ul className="space-y-2">{col.links.map(link => <li key={link}><span className="text-xs cursor-pointer hover:text-white transition-colors" style={{ color: "#a08070" }}>{link}</span></li>)}</ul></div>
              ))}
            </div>
            <div className="border-t pt-8 flex flex-wrap justify-between items-center gap-4" style={{ borderColor: "rgba(200,149,108,.2)" }}>
              <p className="text-xs" style={{ color: "#6b4c3e" }}>© 2026 Everlasting Wedding Planners · Crafting love stories since 2018</p>
              <div className="flex gap-3 flex-wrap">
                {["🏆 Best of Weddings 2025", "⭐ Couples' Choice 2026"].map(badge => <span key={badge} className="text-xs px-3 py-1 rounded-full border" style={{ borderColor: "rgba(200,149,108,.3)", color: "#c8956c" }}>{badge}</span>)}
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>

  )
}

export default Layout;