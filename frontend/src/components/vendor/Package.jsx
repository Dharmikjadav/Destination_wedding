import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Clock,
  X,
  ChevronRight,
  Package as PackageIcon,
  DollarSign,
  Calendar,
  Layers,
  Eye,
  AlertCircle
} from "lucide-react";

const BASE_URL = "http://127.0.0.1:8000";

const Package = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    package_name: "",
    price: "",
    duration_days: "",
    services_included: "",
    description: "",
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || user.role !== "vendor") return;

      const res = await fetch(`${BASE_URL}/packages/vendor/${user.id}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setPackages(data);
      } else if (Array.isArray(data.data)) {
        setPackages(data.data);
      } else {
        setPackages([]);
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "vendor") {
      alert("You must be logged in as a vendor");
      return;
    }

    const payload = {
      package_name: formData.package_name,
      price: Number(formData.price),
      duration_days: Number(formData.duration_days),
      services_included: formData.services_included
        .split(",")
        .map((s) => s.trim()),
      description: formData.description,
      vendor_id: user.id,
    };

    try {
      setLoading(true);
      if (editingId) {
        await fetch(`${BASE_URL}/packages/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(`${BASE_URL}/packages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      setFormData({
        package_name: "",
        price: "",
        duration_days: "",
        services_included: "",
        description: "",
      });

      setEditingId(null);
      setShowForm(false);
      fetchPackages();
    } catch (error) {
      console.error(error);
      alert("Error saving package");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (pkg) => {
    if (pkg.status === "approved") {
      alert("Approved packages cannot be edited");
      return;
    }

    setEditingId(pkg._id);
    setFormData({
      package_name: pkg.package_name,
      price: pkg.price,
      duration_days: pkg.duration_days,
      services_included: pkg.services_included.join(", "),
      description: pkg.description || "",
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;
    await fetch(`${BASE_URL}/packages/${id}`, { method: "DELETE" });
    fetchPackages();
  };

  return (
    <div className="max-w-7xl mx-auto w-full pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h2 className="text-4xl font-serif text-[#5C3A2E] mb-2">Signature Packages</h2>
          <p className="text-[10px] text-[#B76E79] font-bold uppercase tracking-[0.3em]">Curated Experiences for Grand Occasions</p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) {
              setEditingId(null);
              setFormData({ package_name: "", price: "", duration_days: "", services_included: "", description: "" });
            }
          }}
          className="flex items-center justify-center gap-3 bg-[#B76E79] text-white px-8 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-xl hover:shadow-[#B76E79]/20 transition-all"
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? "Cancel Design" : "Create New Package"}
        </motion.button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-16 overflow-hidden"
          >
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-[#B76E79]/10 shadow-2xl relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#F8C8DC]/5 blur-[80px] pointer-events-none" />

              <h3 className="text-2xl font-serif text-[#5C3A2E] mb-8 relative z-10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FDF5E6] flex items-center justify-center text-[#B76E79]">
                  <Layers size={20} />
                </div>
                {editingId ? "Refine Package Essence" : "Define New Package Collection"}
              </h3>

              <form onSubmit={handleSubmit} className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-[#B76E79] uppercase tracking-widest px-2">Identity & Value</p>
                    <input
                      required
                      name="package_name"
                      placeholder="Package Masterpiece Title"
                      value={formData.package_name}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-2xl bg-[#FDF5E6]/50 border border-[#B76E79]/10 focus:bg-white focus:border-[#B76E79] transition-all outline-none text-[#5C3A2E] placeholder:text-[#5C3A2E]/30"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-[#B76E79]" size={16} />
                      <input
                        required
                        name="price"
                        type="number"
                        placeholder="Investment"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full pl-14 pr-6 py-4 rounded-2xl bg-[#FDF5E6]/50 border border-[#B76E79]/10 focus:bg-white focus:border-[#B76E79] transition-all outline-none text-[#5C3A2E] placeholder:text-[#5C3A2E]/30"
                      />
                    </div>
                    <div className="relative">
                      <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-[#B76E79]" size={16} />
                      <input
                        required
                        name="duration_days"
                        type="number"
                        placeholder="Days"
                        value={formData.duration_days}
                        onChange={handleChange}
                        className="w-full pl-14 pr-6 py-4 rounded-2xl bg-[#FDF5E6]/50 border border-[#B76E79]/10 focus:bg-white focus:border-[#B76E79] transition-all outline-none text-[#5C3A2E] placeholder:text-[#5C3A2E]/30"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-[#B76E79] uppercase tracking-widest px-2">Services & Description</p>
                    <input
                      required
                      name="services_included"
                      placeholder="Included Services (e.g. Catering, Decor, Photo)"
                      value={formData.services_included}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-2xl bg-[#FDF5E6]/50 border border-[#B76E79]/10 focus:bg-white focus:border-[#B76E79] transition-all outline-none text-[#5C3A2E] placeholder:text-[#5C3A2E]/30"
                    />
                  </div>

                  <textarea
                    name="description"
                    placeholder="Describe the magical experience included in this package..."
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-[#FDF5E6]/50 border border-[#B76E79]/10 focus:bg-white focus:border-[#B76E79] transition-all outline-none text-[#5C3A2E] placeholder:text-[#5C3A2E]/30 resize-none"
                  ></textarea>
                </div>

                <div className="lg:col-span-2 mt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 rounded-2xl bg-gradient-to-r from-[#5C3A2E] to-[#B76E79] text-white font-bold uppercase tracking-[0.2em] text-[10px] shadow-2xl hover:shadow-[#B76E79]/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {loading ? <Layers className="animate-pulse" size={18} /> : editingId ? <Edit3 size={18} /> : <CheckCircle2 size={18} />}
                    {loading ? "Finalizing Essence..." : editingId ? "Save Refinements" : "Launch Collection Package"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {packages.map((pkg, index) => (
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={pkg._id}
            className="group bg-white rounded-[2.5rem] p-8 border border-[#B76E79]/10 hover:shadow-2xl transition-all duration-500 relative overflow-hidden flex flex-col"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F8C8DC]/5 rounded-bl-[4rem] group-hover:scale-110 transition-transform duration-700" />

            <div className="flex items-start justify-between mb-6 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#FDF5E6] flex items-center justify-center text-[#B76E79] shadow-sm">
                <PackageIcon size={24} />
              </div>
              <div className={`px-3 py-1.5 rounded-xl text-[8px] font-bold uppercase tracking-widest shadow-sm flex items-center gap-1.5 ${pkg.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : pkg.status === 'rejected' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-[#FDF5E6] text-[#B76E79] border border-[#B76E79]/10'}`}>
                {pkg.status === 'approved' ? <CheckCircle2 size={10} /> : pkg.status === 'rejected' ? <AlertCircle size={10} /> : <Clock size={10} />}
                {pkg.status || 'Pending'}
              </div>
            </div>

            <div className="mb-6 relative z-10">
              <h3 className="text-2xl font-serif text-[#5C3A2E] mb-1 group-hover:text-[#B76E79] transition-colors">{pkg.package_name}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#5C3A2E]">₹{pkg.price.toLocaleString()}</span>
                <span className="text-[10px] text-[#B76E79] font-bold uppercase tracking-widest">/ {pkg.duration_days} Days</span>
              </div>
            </div>

            <div className="space-y-3 mb-8 flex-grow relative z-10">
              <p className="text-[10px] font-bold text-[#B76E79] uppercase tracking-widest border-b border-[#B76E79]/10 pb-2 mb-4">Manifested Services</p>
              {pkg.services_included.map((service, i) => (
                <div key={i} className="flex items-center gap-3 text-xs text-[#5C3A2E]/70 group/item">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#B76E79]/40 group-hover/item:scale-150 group-hover/item:bg-[#B76E79] transition-all" />
                  {service}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-6 border-t border-[#B76E79]/5 relative z-10">
              <button
                onClick={() => handleEdit(pkg)}
                className="flex-1 py-3 rounded-xl bg-[#FDF5E6] text-[#B76E79] text-[9px] font-bold uppercase tracking-widest hover:bg-[#B76E79] hover:text-white transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Edit3 size={14} /> Edit
              </button>
              <button
                onClick={() => handleDelete(pkg._id)}
                className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm"
              >
                <Trash2 size={18} />
              </button>
              <button
                onClick={() => setModalData(pkg)}
                className="w-12 h-12 rounded-xl bg-[#5C3A2E] text-white flex items-center justify-center hover:bg-[#4a2e25] transition-all shadow-lg"
              >
                <Eye size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {modalData && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] p-4"
            onClick={() => setModalData(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[3rem] p-10 max-w-lg w-full shadow-2xl border border-white/20 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setModalData(null)} className="absolute top-8 right-8 text-[#5C3A2E]/30 hover:text-[#5C3A2E] transition-colors">
                <X size={24} />
              </button>

              <div className="text-center mb-10">
                <div className="w-20 h-20 rounded-3xl bg-[#FDF5E6] flex items-center justify-center text-[#B76E79] mx-auto mb-6 shadow-sm">
                  <PackageIcon size={40} />
                </div>
                <h3 className="text-3xl font-serif text-[#5C3A2E] mb-2">{modalData.package_name}</h3>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-3xl font-bold text-[#B76E79]">₹{modalData.price.toLocaleString()}</span>
                  <div className="w-1 h-1 rounded-full bg-[#B76E79]/20" />
                  <span className="text-sm font-bold text-[#5C3A2E]/40 uppercase tracking-widest">{modalData.duration_days} Days</span>
                </div>
              </div>

              <div className="bg-[#FDF5E6]/30 rounded-3xl p-8 mb-8 border border-[#B76E79]/5">
                <p className="text-[10px] font-bold text-[#B76E79] uppercase tracking-widest mb-4">Collection Highlights</p>
                <div className="grid grid-cols-2 gap-4">
                  {modalData.services_included.map((s, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-[#5C3A2E]/80">
                      <CheckCircle2 size={14} className="text-[#B76E79]" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              {modalData.description && (
                <div className="mb-10 px-4">
                  <p className="text-[10px] font-bold text-[#B76E79] uppercase tracking-widest mb-3">Narrative</p>
                  <p className="text-sm text-[#5C3A2E]/70 leading-relaxed italic font-serif">
                    “{modalData.description}”
                  </p>
                </div>
              )}

              <button
                onClick={() => setModalData(null)}
                className="w-full py-5 rounded-2xl bg-[#5C3A2E] text-white text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl hover:shadow-[#5C3A2E]/20 transition-all"
              >
                Acknowledge Essence
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Package;