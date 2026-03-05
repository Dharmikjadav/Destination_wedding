import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Inbox,
  Hourglass,
  CheckCircle2,
  Diamond,
  Calendar,
  MapPin,
  Users,
  Verified,
  Check,
  X,
  Eye,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Clock
} from 'lucide-react';

const StatCard = ({ label, value, trend, icon: Icon, color, bg, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-white p-5 rounded-[2rem] border border-[#B76E79]/10 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden"
  >
    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${bg} opacity-[0.05] rounded-bl-[4rem] group-hover:scale-110 transition-transform duration-700`} />

    <div className="flex items-center justify-between mb-4 relative z-10">
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center bg-white shadow-sm border border-[#B76E79]/5 text-[#B76E79]`}>
        <Icon size={20} />
      </div>
      <span className="text-[9px] font-bold px-3 py-1 rounded-full bg-[#B76E79]/5 text-[#B76E79] border border-[#B76E79]/10 flex items-center gap-1">
        <TrendingUp size={10} />
        {trend}
      </span>
    </div>

    <div className="relative z-10">
      <p className="text-[#5C3A2E]/60 text-[9px] font-bold uppercase tracking-[0.2em] mb-1">{label}</p>
      <h3 className="text-2xl font-serif text-[#5C3A2E] leading-none mb-1">{value}</h3>
    </div>
  </motion.div>
);

const Booking = () => {
  const [activeTab, setActiveTab] = useState("Pending");

  return (
    <div className="max-w-7xl mx-auto w-full pb-20">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h2 className="text-4xl font-serif text-[#5C3A2E] mb-2">Grand Inquiries</h2>
          <p className="text-[10px] text-[#B76E79] font-bold uppercase tracking-[0.3em]">Curating the Next Chapter of Love Stories</p>
        </motion.div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard label="Total Inquiries" value="142" trend="+12%" icon={Inbox} bg="from-[#B76E79] to-[#F8C8DC]" delay={0.1} />
        <StatCard label="Pending" value="8" trend="Response Due" icon={Hourglass} bg="from-[#5C3A2E] to-[#B76E79]" delay={0.2} />
        <StatCard label="Confirmed" value="86" trend="+5%" icon={CheckCircle2} bg="from-[#B76E79] to-[#FFF]" delay={0.3} />
        <StatCard label="Portfolio Value" value="$1.2M" trend="+15%" icon={Diamond} bg="from-[#F8C8DC] to-[#B76E79]" delay={0.4} />
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-[#B76E79]/10 mb-10 overflow-x-auto whitespace-nowrap scrollbar-hide pb-px">
        {[
          { label: "Pending", count: 8 },
          { label: "Accepted", count: 86 },
          { label: "Rejected", count: 12 },
          { label: "Completed", count: 36 },
        ].map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`pb-4 px-1 text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative flex items-center gap-3
              ${activeTab === tab.label ? "text-[#B76E79]" : "text-[#5C3A2E]/40 hover:text-[#B76E79]/60"}`}
          >
            {tab.label}
            <span className={`px-2 py-0.5 rounded-full text-[9px] border transition-colors ${activeTab === tab.label ? "bg-[#B76E79] text-white border-[#B76E79]" : "bg-[#FDF5E6] text-[#B76E79] border-[#B76E79]/10"}`}>
              {tab.count}
            </span>
            {activeTab === tab.label && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B76E79] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Booking Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { id: "BK-2024-081", couple: "Sophia & James", location: "Amalfi Coast, Italy", date: "Oct 12, 2024", guests: "150 Guests", package: "Full Venue & Catering", status: "Pending Approval", color: "#B76E79", img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80" },
          { id: "BK-2024-092", couple: "Liam & Olivia", location: "Lake Como, Italy", date: "Nov 05, 2024", guests: "80 Guests", package: "Reception Only", status: "Pending Approval", color: "#B76E79", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&q=80" }
        ].map((card, idx) => (
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={idx}
            className="group bg-white rounded-[2.5rem] p-8 border border-[#B76E79]/10 hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F8C8DC]/5 rounded-bl-[4rem] group-hover:scale-110 transition-transform duration-700" />

            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#FDF5E6] overflow-hidden border border-[#B76E79]/10 shadow-sm relative group-hover:scale-105 transition-transform duration-1000">
                  <img src={card.img} alt={card.couple} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-serif text-[#5C3A2E] group-hover:text-[#B76E79] transition-colors">{card.couple}</h3>
                  <p className="text-[9px] text-[#B76E79]/60 font-bold uppercase tracking-[0.2em] mt-1">#{card.id}</p>
                </div>
              </div>
              <div className={`px-3 py-1.5 rounded-xl text-[8px] font-bold uppercase tracking-widest shadow-sm flex items-center gap-1.5 bg-[#FDF5E6] text-[#B76E79] border border-[#B76E79]/10`}>
                <Clock size={10} className="animate-pulse" />
                {card.status}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-10 relative z-10">
              <div className="flex items-center gap-3 text-[#5C3A2E]/70 group/item">
                <div className="w-8 h-8 rounded-xl bg-[#FDF5E6]/50 flex items-center justify-center text-[#B76E79] group-hover/item:bg-[#B76E79] group-hover/item:text-white transition-colors">
                  <Calendar size={14} />
                </div>
                <span className="text-xs font-bold">{card.date}</span>
              </div>
              <div className="flex items-center gap-3 text-[#5C3A2E]/70 group/item">
                <div className="w-8 h-8 rounded-xl bg-[#FDF5E6]/50 flex items-center justify-center text-[#B76E79] group-hover/item:bg-[#B76E79] group-hover/item:text-white transition-colors">
                  <MapPin size={14} />
                </div>
                <span className="text-xs font-bold truncate">{card.location}</span>
              </div>
              <div className="flex items-center gap-3 text-[#5C3A2E]/70 group/item">
                <div className="w-8 h-8 rounded-xl bg-[#FDF5E6]/50 flex items-center justify-center text-[#B76E79] group-hover/item:bg-[#B76E79] group-hover/item:text-white transition-colors">
                  <Users size={14} />
                </div>
                <span className="text-xs font-bold">{card.guests}</span>
              </div>
              <div className="flex items-center gap-3 text-[#5C3A2E]/70 group/item">
                <div className="w-8 h-8 rounded-xl bg-[#FDF5E6]/50 flex items-center justify-center text-[#B76E79] group-hover/item:bg-[#B76E79] group-hover/item:text-white transition-colors">
                  <Verified size={14} />
                </div>
                <span className="text-xs font-bold truncate">{card.package}</span>
              </div>
            </div>

            <div className="flex gap-4 pt-6 border-t border-[#B76E79]/5 relative z-10">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-grow bg-[#B76E79] hover:bg-[#a65d68] text-white px-6 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex justify-center items-center gap-2 shadow-xl hover:shadow-[#B76E79]/20"
              >
                <Check size={16} /> Accept Legacy
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-grow bg-white border border-[#B76E79]/10 text-[#5C3A2E]/60 hover:text-rose-600 hover:bg-rose-50 px-6 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex justify-center items-center gap-2"
              >
                <X size={16} /> Decline
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-14 h-14 bg-[#5C3A2E] text-white rounded-2xl transition-all flex items-center justify-center shadow-lg hover:bg-[#4a2e25]"
              >
                <Eye size={20} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-12 pt-10 border-t border-[#B76E79]/10 gap-6">
        <span className="text-[10px] font-bold text-[#5C3A2E]/40 uppercase tracking-[0.2em]">Revealing <span className="text-[#5C3A2E]">2</span> of <span className="text-[#5C3A2E]">8</span> Masterpieces</span>
        <div className="flex gap-4">
          <button className="px-8 py-3 text-[10px] font-bold uppercase tracking-widest text-[#5C3A2E]/60 bg-[#FDF5E6]/50 border border-[#B76E79]/10 rounded-2xl hover:bg-white disabled:opacity-30 transition-all shadow-sm flex items-center gap-2">
            <ChevronLeft size={16} /> Previous
          </button>
          <button className="px-8 py-3 text-[10px] font-bold uppercase tracking-widest text-white bg-[#B76E79] rounded-2xl hover:bg-[#a65d68] transition-all shadow-lg flex items-center gap-2">
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;