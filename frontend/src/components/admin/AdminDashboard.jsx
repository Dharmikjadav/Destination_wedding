import React, { useEffect, useState } from "react";
import { getUsers } from "../../api/userApi";

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch user count from API
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const users = await getUsers();
        setUserCount(users.length || 0);
      } catch (err) {
        console.error("Failed to fetch user count:", err);
        setUserCount(0);
      } finally {
        setLoading(false);
      }

    };

    fetchUserCount();
  }, []);

  // 🔥 Fetch service count from API
  useEffect(() => {
    const fetchServiceCount = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/services");
        const data = await res.json();
        setServiceCount(data.length || 0);
      } catch (err) {
        console.error("Failed to fetch service count:", err);
        setServiceCount(0);
      }
    };

    fetchServiceCount();
  }, []);

  const stats = [
    {
      label: "Total Revenue",
      value: "$312,840",
      trend: "+12.4%",
      icon: "payments",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Registered Users",
      value: String(userCount),
      trend: "+18%",
      icon: "Users",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Active Vendors",
      value: "124",
      trend: "+9 this week",
      icon: "Vendors",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      label: "Total Services",
      value: String(serviceCount),
      trend: "+24 added",
      icon: "Services",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "New Bookings",
      value: "76",
      trend: "+6%",
      icon: "Bookings",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Admin Dashboard
          </h1>
          <p className="text-sm text-slate-500">
            Platform analytics, vendors & service monitoring
          </p>
        </div>

        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-indigo-700 transition">
          Export Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-4">
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <span className={`material-symbols-outlined ${stat.color}`}>
                  {stat.icon}
                </span>
              </div>
              <span className="text-xs text-emerald-600 font-semibold">
                {stat.trend}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              {stat.value}
            </h2>
            <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Monthly Revenue
            </h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs bg-indigo-600 text-white rounded-md">
                Monthly
              </button>
              <button className="px-3 py-1 text-xs border rounded-md">
                Yearly
              </button>
            </div>
          </div>

          {/* Mock Chart */}
          <div className="h-64 flex items-end gap-3">
            {[45, 70, 55, 90, 65, 80, 60, 75, 85, 50, 95, 78].map((h, i) => (
              <div key={i} className="flex-1 bg-indigo-100 rounded-md relative group">
                <div
                  className="bg-indigo-600 rounded-md transition-all"
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Panels */}
        <div className="flex flex-col gap-6">

          {/* Pending Vendors */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold uppercase text-slate-800">
                Pending Vendors
              </h3>
              <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                12
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {["Royal Palace", "Elite Catering", "Dream Decor"].map(
                (name, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-3 bg-slate-50 rounded-lg"
                  >
                    <span className="text-sm text-slate-700">{name}</span>
                    <button className="text-xs text-indigo-600 font-semibold">
                      Review
                    </button>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Top Services */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold uppercase text-slate-800 mb-4">
              Top Services
            </h3>

            <div className="flex flex-col gap-4">
              {[
                { name: "Luxury Venue Setup", price: "$8,000" },
                { name: "Premium Catering", price: "$4,500" },
                { name: "Wedding Photography", price: "$2,200" },
              ].map((service, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-sm text-slate-700">
                    {service.name}
                  </span>
                  <span className="text-sm font-semibold text-indigo-600">
                    {service.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Health */}
          <div className="bg-indigo-600 p-6 rounded-xl text-white shadow-lg">
            <h3 className="text-sm font-bold uppercase mb-2">
              Platform Status
            </h3>
            <p className="text-xs text-indigo-100">
              System uptime is currently
              <span className="font-bold text-white"> 99.99%</span>.
            </p>
            <div className="w-full bg-indigo-400 h-2 rounded-full mt-4">
              <div className="bg-white h-2 rounded-full w-[96%]" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;