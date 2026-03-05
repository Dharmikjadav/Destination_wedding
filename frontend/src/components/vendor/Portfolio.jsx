import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Image as ImageIcon,
  UploadCloud,
  Settings,
  Eye,
  Filter,
  Plus,
  Trash2,
  Edit3,
  Maximize2,
  ChevronDown,
  Sparkles,
  Camera
} from 'lucide-react';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("All Media");

  const filters = [
    { label: "All Media" },
    { label: "Beach Wedding" },
    { label: "Palace Wedding" },
    { label: "Reception" },
    { label: "Ceremony" }
  ];

  const galleryItems = [
    { img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", title: "Amalfi Sunset Vows", tag: "Ceremony" },
    { img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80", title: "Ring Detail", tag: "Details" },
    { img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80", title: "Udaipur Night", tag: "Palace Wedding" },
    { img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80", title: "Floral Arch", tag: "Reception" },
    { img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80", title: "Bridal Gown", tag: "Details" },
    { img: "https://images.unsplash.com/photo-1510076857177-7470076d4098?w=800&q=80", title: "Lakeside Toast", tag: "Palace Wedding" }
  ];

  return (
    <div className="max-w-7xl mx-auto w-full pb-20">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h2 className="text-4xl font-serif text-[#5C3A2E] mb-2">Visual Legacy</h2>
          <p className="text-[10px] text-[#B76E79] font-bold uppercase tracking-[0.3em]">Capturing Timeless Moments of Perfection</p>
        </motion.div>

        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-3 bg-white text-[#5C3A2E] px-6 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest border border-[#B76E79]/10 shadow-sm hover:shadow-xl transition-all"
          >
            <Settings size={16} />
            Curation Settings
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-3 bg-[#B76E79] text-white px-8 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-xl hover:shadow-[#B76E79]/20 transition-all"
          >
            <Eye size={16} />
            Public Preview
          </motion.button>
        </div>
      </div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group overflow-hidden rounded-[3rem] border-2 border-dashed border-[#B76E79]/20 bg-[#FDF5E6]/30 hover:bg-white hover:border-[#B76E79] transition-all duration-500 mb-16"
      >
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-20 h-20 rounded-[2rem] bg-white shadow-xl flex items-center justify-center mb-6 text-[#B76E79] border border-[#B76E79]/5"
          >
            <UploadCloud size={32} />
          </motion.div>
          <h3 className="text-2xl font-serif text-[#5C3A2E] mb-2">Immortalize Your Craft</h3>
          <p className="text-[#5C3A2E]/60 text-sm mb-8 max-w-sm leading-relaxed italic">"A portrait is not made in the camera but on either side of it."</p>
          <button className="bg-white border border-[#B76E79]/20 text-[#5C3A2E] hover:bg-[#B76E79] hover:text-white px-10 py-4 rounded-2xl font-bold uppercase text-[10px] tracking-[0.2em] shadow-lg transition-all active:scale-95 group-hover:shadow-[#B76E79]/10">
            Select Masterpieces
          </button>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center mb-10 overflow-x-auto whitespace-nowrap scrollbar-hide pb-2">
        <div className="w-10 h-10 rounded-xl bg-[#5C3A2E] flex items-center justify-center text-white shrink-0 shadow-lg">
          <Filter size={18} />
        </div>
        {filters.map((filter, i) => (
          <button
            key={i}
            onClick={() => setActiveFilter(filter.label)}
            className={`px-8 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all
              ${activeFilter === filter.label
                ? "bg-[#B76E79] text-white shadow-xl shadow-[#B76E79]/20"
                : "bg-white border border-[#B76E79]/10 text-[#5C3A2E]/60 hover:text-[#B76E79] hover:border-[#B76E79]"
              }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryItems.map((item, i) => (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            key={i}
            className="relative group overflow-hidden rounded-[2.5rem] bg-[#FDF5E6] border border-[#B76E79]/10 shadow-sm aspect-[4/5]"
          >
            <img
              alt={item.title}
              className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000 ease-out"
              src={item.img}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#5C3A2E] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
              <div className="flex justify-between items-end">
                <div>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-xl text-[9px] font-bold uppercase tracking-widest text-white mb-3 border border-white/10">
                    <Sparkles size={10} />
                    {item.tag}
                  </span>
                  <h3 className="text-white font-serif text-2xl leading-tight">{item.title}</h3>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    className="w-12 h-12 bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-[#B76E79] rounded-2xl transition-all flex items-center justify-center border border-white/10"
                  >
                    <Edit3 size={18} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 bg-white/20 backdrop-blur-md hover:bg-rose-500 text-white hover:text-white rounded-2xl transition-all flex items-center justify-center border border-white/10"
                  >
                    <Trash2 size={18} />
                  </motion.button>
                </div>
              </div>
            </div>

            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/10">
                <Maximize2 size={16} />
              </div>
            </div>
          </motion.div>
        ))}

        {/* Add Item Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative group overflow-hidden rounded-[2.5rem] border-2 border-dashed border-[#B76E79]/20 flex flex-col items-center justify-center p-8 hover:bg-white hover:border-[#B76E79] transition-all duration-500 aspect-[4/5] cursor-pointer"
        >
          <div className="w-20 h-20 rounded-[2rem] bg-[#FDF5E6] flex items-center justify-center text-[#B76E79] mb-6 shadow-sm group-hover:bg-[#B76E79] group-hover:text-white transition-all duration-500">
            <Plus size={32} />
          </div>
          <p className="text-[#5C3A2E] font-serif text-xl">Add to Gallery</p>
          <p className="text-[#5C3A2E]/40 text-[10px] font-bold uppercase tracking-widest mt-2">New Masterpiece</p>
        </motion.div>
      </div>

      {/* Load More */}
      <div className="flex justify-center mt-16 pt-12 border-t border-[#B76E79]/10">
        <motion.button
          whileHover={{ y: 5 }}
          className="flex flex-col items-center gap-3 text-[#5C3A2E]/40 hover:text-[#B76E79] transition-colors"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Reveal More Treasures</span>
          <div className="w-12 h-12 rounded-full bg-white border border-[#B76E79]/10 flex items-center justify-center shadow-sm">
            <ChevronDown size={20} />
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default Portfolio;