import React, { useEffect, useState } from "react";
import { getServices, addService, deleteService } from "../../api/serviceApi";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Edit3,
  Image as ImageIcon,
  Camera,
  Utensils,
  Palette,
  Music,
  Sparkles,
  MapPin,
  CheckCircle2,
  Clock,
  X,
  UploadCloud,
  ChevronRight,
  Briefcase
} from "lucide-react";

const CategoryIcon = ({ category, size = 20 }) => {
  switch (category?.toLowerCase()) {
    case 'photography': return <Camera size={size} />;
    case 'catering': return <Utensils size={size} />;
    case 'decoration': return <Palette size={size} />;
    case 'music': return <Music size={size} />;
    case 'makeup': return <Sparkles size={size} />;
    case 'venue': return <MapPin size={size} />;
    default: return <ImageIcon size={size} />;
  }
};

const Service = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    service_name: "",
    category: "",
    description: "",
    price: "",
    image: "",
  });

  const [base64Image, setBase64Image] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const data = await getServices(user.id);
      setServices(data || []);
    } catch (error) {
      console.error("Failed to fetch services", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        setBase64Image(base64);
        setPreviewImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.service_name || !formData.category || !formData.price) {
      alert("Please fill required fields");
      return;
    }

    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const payload = {
        vendor_id: user.id,
        service_name: formData.service_name,
        category: formData.category,
        description: formData.description,
        price: Number(formData.price),
        image: base64Image,
      };

      await addService(payload);
      fetchServices();
      setShowForm(false);
      resetForm();
    } catch (error) {
      console.error("Error adding service", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      service_name: "",
      category: "",
      description: "",
      price: "",
      image: "",
    });
    setPreviewImage(null);
    setBase64Image(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await deleteService(id);
      fetchServices();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h2 className="text-4xl font-serif text-[#5C3A2E] mb-2">Service Portfolio</h2>
          <p className="text-[10px] text-[#B76E79] font-bold uppercase tracking-[0.3em]">Exquisite Offerings for Timeless Celebrations</p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowForm(!showForm)}
          className="flex items-center justify-center gap-3 bg-[#B76E79] text-white px-8 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-xl hover:shadow-[#B76E79]/20 transition-all"
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? "Cancel Creation" : "Design New Service"}
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

              <form onSubmit={handleSubmit} className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Image Upload Area */}
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-[#B76E79] uppercase tracking-widest px-2">Visual Heritage</p>
                  <label className="relative group cursor-pointer block">
                    <div className={`aspect-video rounded-[2rem] border-2 border-dashed transition-all flex flex-col items-center justify-center gap-4 ${previewImage ? 'border-transparent' : 'border-[#B76E79]/20 bg-[#FDF5E6]/30 hover:bg-white hover:border-[#B76E79]/40'}`}>
                      {previewImage ? (
                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover rounded-[2rem] shadow-lg" />
                      ) : (
                        <>
                          <div className="w-16 h-16 rounded-2xl bg-[#B76E79]/10 flex items-center justify-center text-[#B76E79] group-hover:scale-110 transition-transform">
                            <UploadCloud size={32} />
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-bold text-[#5C3A2E]">Upoad Presentation Image</p>
                            <p className="text-[10px] text-[#B76E79] uppercase tracking-tighter mt-1">PNG, JPG up to 10MB</p>
                          </div>
                        </>
                      )}
                    </div>
                    <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
                    {previewImage && (
                      <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); resetForm(); }}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-rose-500 shadow-sm hover:bg-white transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </label>
                </div>

                {/* Form Inputs */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-[#B76E79] uppercase tracking-widest px-2">Essential Details</p>
                    <input
                      type="text"
                      name="service_name"
                      placeholder="Service Masterpiece Name"
                      value={formData.service_name}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-2xl bg-[#FDF5E6]/50 border border-[#B76E79]/10 focus:bg-white focus:border-[#B76E79] transition-all outline-none text-[#5C3A2E] placeholder:text-[#5C3A2E]/30"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="px-6 py-4 rounded-2xl bg-[#FDF5E6]/50 border border-[#B76E79]/10 focus:bg-white focus:border-[#B76E79] transition-all outline-none text-[#5C3A2E] appearance-none cursor-pointer"
                      required
                    >
                      <option value="">Collection Type</option>
                      <option value="Photography">Photography</option>
                      <option value="Catering">Catering</option>
                      <option value="Decoration">Decoration</option>
                      <option value="Music">Music</option>
                      <option value="Makeup">Makeup</option>
                      <option value="Venue">Venue</option>
                    </select>

                    <input
                      type="number"
                      name="price"
                      placeholder="Investment (USD)"
                      value={formData.price}
                      onChange={handleChange}
                      className="px-6 py-4 rounded-2xl bg-[#FDF5E6]/50 border border-[#B76E79]/10 focus:bg-white focus:border-[#B76E79] transition-all outline-none text-[#5C3A2E] placeholder:text-[#5C3A2E]/30"
                      required
                    />
                  </div>

                  <textarea
                    name="description"
                    placeholder="Describe the enchanting experience..."
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-[#FDF5E6]/50 border border-[#B76E79]/10 focus:bg-white focus:border-[#B76E79] transition-all outline-none text-[#5C3A2E] placeholder:text-[#5C3A2E]/30 resize-none"
                    required
                  ></textarea>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 rounded-2xl bg-gradient-to-r from-[#5C3A2E] to-[#B76E79] text-white font-bold uppercase tracking-[0.2em] text-[10px] shadow-2xl hover:shadow-[#B76E79]/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {loading ? <Sparkles className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
                    {loading ? "Perfecting Your Entry..." : "Publish Service Masterpiece"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {services.length > 0 ? (
          services.map((service, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={service._id}
              className="bg-white rounded-[2.5rem] overflow-hidden border border-[#B76E79]/10 hover:shadow-2xl transition-all duration-500 group flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.service_name}
                  onClick={() => setModalImage(service.image)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 cursor-pointer"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#5C3A2E]/80 via-[#5C3A2E]/40 to-transparent">
                  <div className="flex items-center gap-2 text-[#F8C8DC] mb-1">
                    <CategoryIcon category={service.category} size={14} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">{service.category}</span>
                  </div>
                  <h3 className="text-xl font-serif text-white">{service.service_name}</h3>
                </div>
                <div className="absolute top-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl text-[#B76E79] font-bold text-sm shadow-lg border border-white/50">
                    ₹{parseFloat(service.price).toLocaleString()}
                  </div>
                </div>
                <div className="absolute top-6 left-6">
                  <div className={`px-3 py-1.5 rounded-lg text-[8px] font-bold uppercase tracking-widest shadow-sm flex items-center gap-1.5 ${service.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : service.status === 'rejected' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-[#FDF5E6] text-[#B76E79] border border-[#B76E79]/10'}`}>
                    {service.status === 'approved' ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                    {service.status || 'Pending'}
                  </div>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <p className="text-[#5C3A2E]/60 text-xs leading-relaxed mb-8 line-clamp-3">
                  {service.description}
                </p>
                <div className="mt-auto flex items-center justify-between border-t border-[#B76E79]/5 pt-6">
                  <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-xl bg-[#FDF5E6] text-[#B76E79] flex items-center justify-center hover:bg-[#B76E79] hover:text-white transition-all shadow-sm">
                      <Edit3 size={18} />
                    </button>
                    {service.status !== "approved" && (
                      <button
                        onClick={() => handleDelete(service._id)}
                        className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                  <button className="flex items-center gap-2 text-[10px] font-bold text-[#5C3A2E] uppercase tracking-widest hover:text-[#B76E79] transition-colors group/btn">
                    Details
                    <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-[#FDF5E6]/20 rounded-[3rem] border-2 border-dashed border-[#B76E79]/10">
            <div className="w-20 h-20 rounded-[2rem] bg-white shadow-sm border border-[#B76E79]/5 flex items-center justify-center text-[#B76E79]/30 mx-auto mb-6">
              <Sparkles size={40} />
            </div>
            <h3 className="text-2xl font-serif text-[#5C3A2E]/40">No Collections Defined</h3>
            <p className="text-sm text-[#B76E79]/60 mt-2">Begin your legacy by designing your first service offering.</p>
          </div>
        )}
      </div>

      {modalImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-[100]"
          onClick={() => setModalImage(null)}
        >
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={modalImage}
            alt="Full View"
            className="max-h-[85vh] max-w-[90vw] rounded-3xl shadow-2xl border-4 border-white/20"
          />
          <button className="absolute top-8 right-8 text-white/60 hover:text-white"><X size={40} /></button>
        </div>
      )}
    </div>
  );
};

export default Service;