import React from 'react';

const Service = () => {
  return (
    <div className="p-4 md:p-6 pt-5 md:pt-8 max-w-7xl mx-auto w-full animate-fade-up">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Experience Curation</h1>
          <p className="text-[9px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Refining your business offerings</p>
        </div>
        <button className="bg-white border border-slate-200 text-slate-600 rounded-lg px-4 py-2 text-[9px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm w-fit">
          <span className="material-symbols-outlined text-base">tune</span> Preferences
        </button>
      </div>

      {/* Add New Service Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 md:p-8 mb-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-indigo-50/50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        <h3 className="text-slate-900 text-base md:text-lg font-bold mb-5 flex items-center gap-2.5 relative z-10">
          <span className="material-symbols-outlined text-indigo-600 text-xl">add_circle</span> Catalog New Experience
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-8 relative z-10">
          {/* Left Column: Inputs */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <label className="flex flex-col gap-1.5 md:gap-2">
              <span className="text-slate-500 text-[8px] md:text-[9px] font-bold uppercase tracking-widest ml-1">Experience Title</span>
              <input
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all text-[11px] md:text-xs"
                placeholder="e.g., Sunset Beach Ceremony"
                type="text"
              />
            </label>
            <label className="flex flex-col gap-1.5 md:gap-2">
              <span className="text-slate-500 text-[8px] md:text-[9px] font-bold uppercase tracking-widest ml-1">Category</span>
              <div className="relative">
                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none appearance-none transition-all cursor-pointer text-[11px] md:text-xs">
                  <option>Select Category</option>
                  <option>Venue</option>
                  <option>Photography</option>
                  <option>Catering</option>
                  <option>Decoration</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl pointer-events-none">expand_more</span>
              </div>
            </label>
            <label className="flex flex-col gap-1.5 md:gap-2">
              <span className="text-slate-500 text-[8px] md:text-[9px] font-bold uppercase tracking-widest ml-1">Investment (Starting at)</span>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">$</span>
                <input
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all text-[11px] md:text-xs"
                  placeholder="5,000"
                  type="number"
                />
              </div>
            </label>
            <label className="flex flex-col gap-1.5 md:gap-2">
              <span className="text-slate-500 text-[8px] md:text-[9px] font-bold uppercase tracking-widest ml-1">Locale</span>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">location_on</span>
                <input
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all text-[11px] md:text-xs"
                  placeholder="e.g., Amalfi Coast, Italy"
                  type="text"
                />
              </div>
            </label>
          </div>

          {/* Right Column: Image Upload */}
          <div className="lg:col-span-4 flex flex-col gap-1.5 md:gap-2">
            <span className="text-slate-500 text-[8px] md:text-[9px] font-bold uppercase tracking-widest ml-1">Signature Imagery</span>
            <label className="flex-1 min-h-[120px] flex flex-col items-center justify-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl hover:bg-slate-100 transition-all cursor-pointer group p-4">
              <div className="w-9 h-9 md:w-11 md:h-11 rounded-lg bg-white shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-500 border border-slate-100">
                <span className="material-symbols-outlined text-indigo-600 text-xl">cloud_upload</span>
              </div>
              <span className="text-[8px] md:text-[9px] text-slate-500 font-bold uppercase tracking-widest text-center px-2">Upload Content</span>
              <input className="hidden" type="file" />
            </label>
          </div>

          {/* Bottom Row: Action */}
          <div className="lg:col-span-12 flex justify-end pt-2">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 md:px-8 rounded-lg shadow-sm transition-all active:scale-95 flex items-center gap-2 text-[9px] uppercase tracking-widest w-full md:w-fit justify-center">
              <span className="material-symbols-outlined text-base">save</span> Save Experience
            </button>
          </div>
        </div>
      </div>

      {/* Current Services Grid */}
      <h3 className="text-slate-900 text-lg md:text-xl font-bold mb-4 md:mb-6">Active Collection</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {[
          { title: "Grand Ballroom Gala", location: "Paris, France", price: "12,500", category: "Venue", img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80", color: "#4f46e5" },
          { title: "Cinematic Love Story", location: "Global Availability", price: "4,200", category: "Photography", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80", color: "#6366f1" }
        ].map((service, i) => (
          <div key={i} className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-indigo-400 hover:shadow-lg transition-all duration-300 flex flex-col">
            <div className="relative h-40 md:h-48 w-full overflow-hidden">
              <img alt={service.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" src={service.img} />
              <div className="absolute top-3 left-3 md:top-4 md:left-4">
                <span className="bg-white/90 backdrop-blur-md text-slate-700 text-[8px] md:text-[9px] font-bold border border-slate-200 px-2.5 py-1 rounded-full uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                  <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full" style={{ backgroundColor: service.color }}></span> {service.category}
                </span>
              </div>
              <div className="absolute top-3 right-3 md:top-4 md:right-4 flex gap-2 lg:opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button className="bg-white w-8 h-8 rounded-lg text-slate-500 hover:text-indigo-600 shadow-sm border border-slate-200 transition-all flex items-center justify-center" title="Edit">
                  <span className="material-symbols-outlined text-lg">edit</span>
                </button>
                <button className="bg-white w-8 h-8 rounded-lg text-slate-500 hover:text-red-600 shadow-sm border border-slate-200 transition-all flex items-center justify-center" title="Delete">
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </div>
            <div className="p-5 md:p-6 flex flex-col flex-1">
              <div className="mb-4">
                <h4 className="text-slate-900 text-base md:text-lg font-bold leading-tight group-hover:text-indigo-600 transition-colors">{service.title}</h4>
                <p className="text-slate-500 text-[8px] md:text-[9px] font-bold uppercase tracking-widest mt-1.5 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-indigo-500">location_on</span> {service.location}
                </p>
              </div>
              <div className="mt-auto pt-3 md:pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-slate-400 text-[8px] md:text-[9px] font-bold uppercase tracking-widest">Investment</span>
                <span className="text-slate-900 font-bold text-lg md:text-xl">${service.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;

