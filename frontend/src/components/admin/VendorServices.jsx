import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Trash2,
  User,
  MapPin,
  Tag,
  DollarSign,
  ChevronRight,
  ShieldCheck,
  Zap,
  Star,
  Camera,
  Utensils,
  Palette,
  Home,
  Music,
  Heart
} from "lucide-react";

const BASE_URL = "http://127.0.0.1:8000";

const VendorServices = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/admin/services/pending`);
      const data = await res.json();
      setServices(data || []);
    } catch (error) {
      console.error("Failed to fetch services", error);
    } finally {
      setLoading(false);
    }
  };

  const approveService = async (id) => {
    try {
      await fetch(`${BASE_URL}/admin/services/approve/${id}`, { method: "PUT" });
      fetchServices();
    } catch (error) {
      console.error("Approval failed", error);
    }
  };

  const rejectService = async (id) => {
    try {
      await fetch(`${BASE_URL}/admin/services/reject/${id}`, { method: "PUT" });
      fetchServices();
    } catch (error) {
      console.error("Rejection failed", error);
    }
  };

  const deleteService = async (id) => {
    if (!window.confirm("Permanent removal of this service?")) return;
    try {
      await fetch(`${BASE_URL}/services/${id}`, { method: "DELETE" });
      fetchServices();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        service.service_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "All" || service.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [services, searchTerm, categoryFilter]);

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'photography': return <Camera size={14} />;
      case 'catering': return <Utensils size={14} />;
      case 'decoration': return <Palette size={14} />;
      case 'venue': return <Home size={14} />;
      case 'music': return <Music size={14} />;
      default: return <Tag size={14} />;
    }
  };

  return (
    <div className="flex flex-col gap-10 pb-20">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-4xl font-serif text-[#5C3A2E] mb-2">Curated Offerings</h1>
          <p className="text-[10px] text-[#B76E79] font-bold uppercase tracking-[0.4em]">Vetting & Quality Assurance Registry</p>
        </motion.div>

        <div className="flex bg-[#FDF5E6] p-2 rounded-[2rem] border border-[#B76E79]/5 shadow-sm">
          {['All', 'Photography', 'Decoration', 'Catering', 'Venue'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-6 py-3 rounded-2xl text-[9px] font-bold uppercase tracking-widest transition-all ${categoryFilter === cat
                  ? 'bg-[#5C3A2E] text-white shadow-xl shadow-[#5C3A2E]/20'
                  : 'text-[#5C3A2E]/60 hover:text-[#5C3A2E]'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Approval Cards */}
      <AnimatePresence mode="popLayout">
        {loading ? (
          <div className="col-span-full py-40 flex flex-col items-center justify-center gap-6">
            <div className="w-16 h-16 border-4 border-[#B76E79]/10 border-t-[#B76E79] rounded-full animate-spin" />
            <p className="text-[10px] font-bold text-[#B76E79] uppercase tracking-[0.5em]">Synchronizing Intelligence...</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full py-40 text-center glass rounded-[4rem] flex flex-col items-center gap-6"
          >
            <div className="w-20 h-20 bg-[#FDF5E6] rounded-[2.5rem] flex items-center justify-center text-[#B76E79]">
              <ShieldCheck size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-serif text-[#5C3A2E] mb-1">Queue Purified</h3>
              <p className="text-[10px] text-[#5C3A2E]/40 font-bold uppercase tracking-widest">All services have been meticulously vetted.</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredServices.map((service, i) => (
              <motion.div
                layout
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                className="group relative bg-white rounded-[3rem] border border-[#B76E79]/10 overflow-hidden shadow-sm hover:shadow-2xl transition-all"
              >
                {/* Image & Category Overlay */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80"}
                    alt={service.service_name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#5C3A2E]/80 via-transparent to-transparent opacity-60" />

                  <div className="absolute top-6 left-6">
                    <span className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-[9px] font-bold text-[#5C3A2E] uppercase tracking-widest shadow-xl shadow-black/5">
                      {getCategoryIcon(service.category)}
                      {service.category}
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-xl font-serif text-white mb-1 line-clamp-1">{service.service_name}</h3>
                    <p className="text-[10px] text-white/70 font-bold uppercase tracking-wider flex items-center gap-2">
                      <DollarSign size={10} className="text-[#B76E79]" /> Starting from ₹{service.price}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex flex-col gap-4 mb-8">
                    <p className="text-[11px] text-[#5C3A2E]/60 leading-relaxed line-clamp-2 italic font-medium">
                      "{service.description || "An exclusive offering awaiting your approval to join our destination elite."}"
                    </p>

                    <div className="flex items-center gap-4 py-4 border-y border-[#B76E79]/5">
                      <div className="w-10 h-10 rounded-xl bg-[#FDF5E6] flex items-center justify-center text-[#B76E79]">
                        <User size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-[#5C3A2E] uppercase tracking-wider">Boutique Vendor</span>
                        <span className="text-[9px] text-[#B76E79] font-bold uppercase tracking-tighter">Verified Partner</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => approveService(service._id)}
                      className="flex-grow py-4 rounded-2xl bg-[#5C3A2E] text-white text-[9px] font-bold uppercase tracking-[0.3em] shadow-xl shadow-[#5C3A2E]/20 hover:bg-[#B76E79] transition-all"
                    >
                      Authorize
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => rejectService(service._id)}
                      className="w-14 h-14 rounded-2xl bg-[#FDF5E6] text-[#B76E79] flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all border border-[#B76E79]/5 shadow-sm"
                    >
                      <XCircle size={20} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteService(service._id)}
                      className="w-14 h-14 rounded-2xl bg-white text-rose-500/30 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all border border-rose-100 shadow-sm"
                    >
                      <Trash2 size={20} />
                    </motion.button>
                  </div>
                </div>

                {/* Status Indicator */}
                {service.status === 'pending' && (
                  <div className="absolute top-6 right-6">
                    <div className="flex items-center gap-2 bg-[#FDF5E6]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#B76E79]/10">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      <span className="text-[8px] font-bold text-amber-600 uppercase tracking-tighter">Evaluation Underway</span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VendorServices;