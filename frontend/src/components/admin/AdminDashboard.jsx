import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  ShoppingBag,
  CreditCard,
  TrendingUp,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Star,
  Activity,
  Calendar,
  DollarSign
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { getUsers } from "../../api/userApi";

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const revenueData = [
    { name: 'Jan', value: 45000 },
    { name: 'Feb', value: 52000 },
    { name: 'Mar', value: 48000 },
    { name: 'Apr', value: 61000 },
    { name: 'May', value: 55000 },
    { name: 'Jun', value: 67000 },
    { name: 'Jul', value: 72000 }
  ];

  const categoryData = [
    { name: 'Venues', value: 40, color: '#5C3A2E' },
    { name: 'Catering', value: 25, color: '#B76E79' },
    { name: 'Decor', value: 20, color: '#E5D3B3' },
    { name: 'Other', value: 15, color: '#F8C8DC' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUsers();
        setUserCount(users.length || 0);

        const res = await fetch("http://127.0.0.1:8000/services");
        const data = await res.json();
        setServiceCount(data.length || 0);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { label: "Total Revenue", value: "$312,840", trend: "+12.4%", icon: DollarSign, color: "from-[#5C3A2E] to-[#B76E79]" },
    { label: "Registered Users", value: String(userCount), trend: "+18.2%", icon: Users, color: "from-[#B76E79] to-[#F8C8DC]" },
    { label: "Active Vendors", value: "124", trend: "+9 new", icon: ShoppingBag, color: "from-[#5C3A2E] to-[#8B5E3C]" },
    { label: "Elite Services", value: String(serviceCount), trend: "+24 total", icon: Star, color: "from-[#D4AF37] to-[#B76E79]" },
    { label: "Total Bookings", value: "76", trend: "+6.5%", icon: Calendar, color: "from-[#B76E79] to-[#E5D3B3]" },
  ];

  return (
    <div className="flex flex-col gap-10 pb-20">

      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-4xl font-serif text-[#5C3A2E] mb-2">Executive Intelligence</h1>
          <p className="text-[10px] text-[#B76E79] font-bold uppercase tracking-[0.4em]">Operational Oversight & Analytics Hub</p>
        </motion.div>

        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="px-8 py-3.5 rounded-2xl bg-white text-[#B76E79] border border-[#B76E79]/10 font-bold text-[10px] uppercase tracking-widest shadow-sm hover:shadow-xl transition-all"
          >
            Intelligence Report
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="px-8 py-3.5 rounded-2xl bg-[#5C3A2E] text-white font-bold text-[10px] uppercase tracking-widest shadow-2xl shadow-[#5C3A2E]/20"
          >
            System Settings
          </motion.button>
        </div>
      </div>

      {/* Luxury Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i}
            whileHover={{ y: -5 }}
            className="relative group overflow-hidden bg-white p-6 rounded-[2rem] border border-[#B76E79]/5 shadow-sm hover:shadow-2xl transition-all"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-5 rounded-bl-[4rem] group-hover:scale-110 transition-transform`} />

            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                <stat.icon size={20} />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-bold text-emerald-500 flex items-center gap-1">
                  <TrendingUp size={10} /> {stat.trend}
                </span>
                <span className="text-[10px] text-[#5C3A2E]/30 font-bold uppercase tracking-[0.1em] mt-1">Growth</span>
              </div>
            </div>

            <h2 className="text-3xl font-serif text-[#5C3A2E] mb-1">{stat.value}</h2>
            <p className="text-[10px] text-[#5C3A2E]/30 font-bold uppercase tracking-widest">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Intelligent Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Revenue Performance Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 bg-white/50 backdrop-blur-xl p-8 rounded-[3rem] border border-[#B76E79]/5 shadow-sm"
        >
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-serif text-[#5C3A2E] mb-1">Financial Trajectory</h3>
              <p className="text-[10px] text-[#B76E79] font-bold uppercase tracking-widest">Revenue Streams Fiscal Year '26</p>
            </div>
            <div className="flex bg-[#FDF5E6] p-1.5 rounded-xl">
              <button className="px-5 py-2 text-[9px] font-bold uppercase bg-white text-[#5C3A2E] rounded-lg shadow-sm">Monthly</button>
              <button className="px-5 py-2 text-[9px] font-bold uppercase text-[#5C3A2E]/40 hover:text-[#5C3A2E]">Yearly</button>
            </div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B76E79" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#B76E79" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#5C3A2E" strokeOpacity={0.05} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#5C3A2E', fontSize: 10, fontWeight: 'bold' }}
                  dy={15}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#5C3A2E', fontSize: 10, fontWeight: 'bold' }}
                />
                <Tooltip
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px rgba(183,110,121,0.1)', background: '#fff', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#B76E79"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorRev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Right Panel: Performance Breakdown */}
        <div className="flex flex-col gap-8">

          {/* Service Distribution (Pie Chart) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-[3rem] border border-[#B76E79]/5 shadow-sm overflow-hidden relative"
          >
            <h3 className="text-lg font-serif text-[#5C3A2E] mb-6">Service Portfolio</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {categoryData.map((cat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-[10px] font-bold text-[#5C3A2E]/60 uppercase tracking-widest">{cat.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pending Verification */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#5C3A2E] p-8 rounded-[3rem] text-white shadow-2xl shadow-[#5C3A2E]/20"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-serif">Curated Queue</h3>
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                <ShieldCheck size={18} />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {["Royal Palace", "Elite Catering", "Dream Decor"].map((name, i) => (
                <div key={i} className="flex justify-between items-center group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xs font-bold uppercase tracking-widest text-[#B76E79] group-hover:bg-[#B76E79] group-hover:text-white transition-all">
                      {name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{name}</p>
                      <p className="text-[8px] text-white/40 uppercase tracking-[0.2em] font-bold">Awaiting Curation</p>
                    </div>
                  </div>
                  <motion.button whileHover={{ scale: 1.1 }} className="text-[#B76E79] group-hover:text-white">
                    <ArrowUpRight size={18} />
                  </motion.button>
                </div>
              ))}
            </div>

            <button className="w-full mt-8 py-4 rounded-2xl border border-white/10 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white/5 transition-all">
              View All Tasks
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;