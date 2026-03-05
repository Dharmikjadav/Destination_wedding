import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  CalendarCheck2,
  DollarSign,
  Star,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowRight,
  Briefcase
} from 'lucide-react';

const StatCard = ({ label, value, trend, icon: Icon, color, bg, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-white p-6 rounded-[2rem] border border-[#B76E79]/10 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden"
  >
    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${bg} opacity-[0.05] rounded-bl-[4rem] group-hover:scale-110 transition-transform duration-700`} />

    <div className="flex items-center justify-between mb-4 relative z-10">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-white shadow-sm border border-[#B76E79]/5 text-[#B76E79]`}>
        <Icon size={24} />
      </div>
      <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#B76E79]/5 text-[#B76E79] border border-[#B76E79]/10 flex items-center gap-1">
        <TrendingUp size={10} />
        {trend}
      </span>
    </div>

    <div className="relative z-10">
      <p className="text-[#5C3A2E]/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{label}</p>
      <h3 className="text-3xl font-serif text-[#5C3A2E] leading-none mb-1">{value}</h3>
      <div className="h-1 w-8 bg-[#B76E79]/20 rounded-full group-hover:w-16 transition-all duration-500" />
    </div>
  </motion.div>
);

const VendorDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto w-full flex flex-col gap-10">

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-48 md:h-64 rounded-[2.5rem] overflow-hidden shadow-2xl group"
      >
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000"
          alt="Luxury Wedding"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#5C3A2E]/80 to-transparent flex flex-col justify-center px-8 md:px-12">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[#F8C8DC] text-[10px] font-bold uppercase tracking-[0.4em] mb-2"
          >
            Welcome Back
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-5xl font-serif text-white mb-4"
          >
            Manage Your <span className="italic text-[#F8C8DC]">Legacy</span>
          </motion.h2>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          label="Total Bookings"
          value="24"
          trend="+12%"
          icon={CalendarCheck2}
          bg="from-[#B76E79] to-[#F8C8DC]"
          delay={0.1}
        />
        <StatCard
          label="Pending Requests"
          value="5"
          trend="Action Needed"
          icon={Clock}
          bg="from-[#5C3A2E] to-[#B76E79]"
          delay={0.2}
        />
        <StatCard
          label="Monthly Revenue"
          value="$42,500"
          trend="+8.5%"
          icon={DollarSign}
          bg="from-[#B76E79] to-[#FFF]"
          delay={0.3}
        />
        <StatCard
          label="Success Rate"
          value="98.4%"
          trend="High Performing"
          icon={Star}
          bg="from-[#F8C8DC] to-[#B76E79]"
          delay={0.4}
        />
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

        {/* Engagement Overview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="lg:col-span-2 bg-white rounded-[2rem] p-8 border border-[#B76E79]/10 shadow-sm overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F8C8DC]/5 blur-[100px] pointer-events-none" />
          <div className="flex items-center justify-between mb-10 relative z-10">
            <div>
              <h3 className="text-2xl font-serif text-[#5C3A2E]">Weekly Engagement</h3>
              <p className="text-[10px] text-[#B76E79] font-bold uppercase tracking-[0.2em] mt-1">Strategic Performance</p>
            </div>
            <div className="flex gap-2 bg-[#FDF5E6] p-1.5 rounded-2xl border border-[#B76E79]/10">
              <button className="px-4 py-2 rounded-xl bg-white text-[#B76E79] text-[9px] font-bold uppercase tracking-widest shadow-sm">Sales</button>
              <button className="px-4 py-2 rounded-xl text-[#5C3A2E]/50 text-[9px] font-bold uppercase tracking-widest hover:text-[#B76E79] transition-colors">Views</button>
            </div>
          </div>

          <div className="h-64 flex items-end justify-between gap-4 px-2">
            {[40, 65, 30, 80, 55, 95, 45].map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-4 w-full group/bar cursor-pointer">
                <div className="w-full bg-[#FDF5E6]/30 rounded-2xl h-48 relative overflow-hidden transition-all duration-500 border border-[#B76E79]/5 group-hover/bar:border-[#B76E79]/20 group-hover/bar:bg-white">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: 0.6 + (i * 0.1), ease: "circOut" }}
                    className="w-full absolute bottom-0 left-0 rounded-t-2xl bg-gradient-to-t from-[#B76E79] to-[#F8C8DC] shadow-lg"
                  />
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap text-[8px] font-bold text-[#B76E79]">{h}%</div>
                </div>
                <span className="text-[9px] font-bold text-[#5C3A2E]/40 uppercase tracking-widest">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Priority Requests */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-[2rem] p-8 border border-[#B76E79]/10 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-serif text-[#5C3A2E]">Priority</h3>
            <div className="w-10 h-10 rounded-xl bg-[#F8C8DC]/10 flex items-center justify-center text-[#B76E79]">
              <Clock size={20} />
            </div>
          </div>

          <div className="space-y-6">
            {[
              { name: "Eleanor Vance", time: "2h ago", color: "#B76E79" },
              { name: "Julian Thorne", time: "5h ago", color: "#F8C8DC" },
              { name: "Clara Oswald", time: "1d ago", color: "#5C3A2E" }
            ].map((req, idx) => (
              <div key={idx} className="flex items-center gap-4 group cursor-pointer p-3 rounded-2xl hover:bg-[#FDF5E6]/50 transition-colors">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-serif shadow-md transition-transform group-hover:scale-110" style={{ backgroundColor: req.color }}>
                  {req.name.charAt(0)}
                </div>
                <div className="flex-grow">
                  <p className="font-bold text-[#5C3A2E] text-sm">{req.name}</p>
                  <p className="text-[9px] text-[#B76E79] font-bold uppercase tracking-widest">{req.time}</p>
                </div>
                <div className="w-8 h-8 rounded-full border border-[#B76E79]/10 flex items-center justify-center text-[#B76E79] group-hover:bg-[#B76E79] group-hover:text-white transition-all">
                  <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-4 rounded-2xl bg-gradient-to-r from-[#B76E79] to-[#F8C8DC] text-white text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
            See All Inquiries
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default VendorDashboard;
