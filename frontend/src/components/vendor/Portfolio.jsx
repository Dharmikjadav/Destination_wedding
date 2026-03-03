import React from 'react';

const Portfolio = () => {
  return (
    <div className="flex flex-col gap-5 md:gap-8 p-4 md:p-6 pt-5 md:pt-8 max-w-7xl mx-auto w-full animate-fade-up">
      {/* Title Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 md:gap-4 border-b border-slate-200 pb-5 md:pb-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Business Portfolio</h1>
          <p className="text-[8px] md:text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">Manage your media assets</p>
        </div>
        <div className="flex gap-2.5 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all text-[8px] md:text-[9px] font-bold uppercase tracking-widest shadow-sm">
            <span className="material-symbols-outlined text-base">settings</span> Settings
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all text-[8px] md:text-[9px] font-bold uppercase tracking-widest shadow-sm">
            <span className="material-symbols-outlined text-base">visibility</span> Live Preview
          </button>
        </div>
      </div>

      {/* Upload Area */}
      <div className="relative group overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-100/50 hover:border-indigo-300 transition-all duration-300">
        <div className="flex flex-col items-center justify-center py-8 md:py-12 px-4 text-center">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-500 border border-slate-100">
            <span className="material-symbols-outlined text-indigo-600 text-2xl md:text-3xl">cloud_upload</span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1">Upload Media Assets</h3>
          <p className="text-slate-500 text-[10px] md:text-xs mb-4 md:mb-6 max-w-sm leading-relaxed tracking-tight px-4">Add high-resolution images to showcase your business expertise.</p>
          <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-6 py-2.5 rounded-lg font-bold uppercase text-[8px] md:text-[9px] tracking-widest shadow-sm transition-all active:scale-95 w-fit">
            Select Files
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 md:gap-3 items-center">
        {[
          { label: "All Media", active: true },
          { label: "Beach Wedding" },
          { label: "Palace Wedding" },
          { label: "Reception" },
          { label: "Ceremony" }
        ].map((filter, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-widest transition-all
              ${filter.active
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-100"
              }`}
          >
            {filter.label}
          </button>
        ))}
        <button className="ml-auto w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 transition-all flex items-center justify-center shadow-sm">
          <span className="material-symbols-outlined text-xl">filter_list</span>
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {[
          { img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", title: "Amalfi Sunset Vows", tag: "Ceremony" },
          { img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80", title: "Ring Detail", tag: "Details" },
          { img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80", title: "Udaipur Night", tag: "Palace Wedding" }
        ].map((item, i) => (
          <div key={i} className="relative group overflow-hidden rounded-2xl bg-slate-100 border border-slate-200 shadow-sm">
            <img alt={item.title} className="w-full h-64 md:h-80 object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" src={item.img} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent lg:opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5 md:p-6">
              <div className="flex justify-between items-end">
                <div className="transform lg:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-2 py-0.5 bg-indigo-600/90 rounded text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-white mb-2">
                    {item.tag}
                  </span>
                  <h3 className="text-white font-bold text-lg md:text-xl leading-tight">{item.title}</h3>
                </div>
                <div className="flex gap-2 transform lg:translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  <button className="w-8 h-8 bg-white/90 hover:bg-white text-slate-600 hover:text-indigo-600 rounded-lg transition-all flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">edit</span>
                  </button>
                  <button className="w-8 h-8 bg-white/90 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-lg transition-all flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Discover More */}
      <div className="flex justify-center pb-8 border-t border-slate-100 mt-4 pt-8">
        <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all text-[8px] md:text-[9px] font-bold uppercase tracking-widest shadow-sm">
          Discover More <span className="material-symbols-outlined text-lg translate-y-px">expand_more</span>
        </button>
      </div>
    </div>

  );
};

export default Portfolio;