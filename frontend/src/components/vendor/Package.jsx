import React from 'react';

const Package = () => {
  return (
    <div className="flex flex-col gap-5 md:gap-8 p-4 md:p-6 pt-5 md:pt-8 max-w-7xl mx-auto w-full animate-fade-up">
      {/* Title Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5 md:pb-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Curation Suites</h1>
          <p className="text-[8px] md:text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">Design your service tiers</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-bold text-[8px] md:text-[9px] uppercase tracking-widest transition-all shadow-sm active:scale-95 w-full md:w-fit justify-center">
          <span className="material-symbols-outlined text-lg">add</span>
          New Suite
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {[
          { label: "Portfolio Revenue", value: "$125k", trend: "+12%", icon: "attach_money", color: "#4f46e5", bg: "bg-indigo-50" },
          { label: "Monthly Projection", value: "$42.5k", trend: "+5%", icon: "calendar_month", color: "#6366f1", bg: "bg-slate-50" },
          { label: "Active Suites", value: "3", trend: "of 5 slots", icon: "inventory_2", color: "#4f46e5", bg: "bg-indigo-50/30" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 relative overflow-hidden group hover:border-indigo-200 transition-all duration-300">
            <div className="absolute top-0 right-0 p-3 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
              <span className="material-symbols-outlined text-4xl md:text-5xl" style={{ color: stat.color }}>{stat.icon}</span>
            </div>
            <div className="flex justify-between items-start mb-3">
              <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center`} style={{ color: stat.color }}>
                <span className="material-symbols-outlined text-lg md:text-xl">{stat.icon}</span>
              </div>
              <span className="bg-slate-50 border border-slate-100 text-slate-500 text-[8px] md:text-[9px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                {stat.trend}
              </span>
            </div>
            <p className="text-slate-400 text-[8px] md:text-[9px] font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-slate-900 text-xl md:text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7 pt-2">
        {[
          { name: "Silver Elegance", desc: "Perfect for intimate gatherings and small ceremonies.", price: "5,000", color: "#4f46e5", features: ["5 Hours Venue Access", "Standard Floral Decor", "Basic Catering Buffet"] },
          { name: "Gold Prestige", desc: "Our most popular choice for standard weddings.", price: "8,500", color: "#4f46e5", features: ["8 Hours Venue Access", "Premium Decor & Lighting", "3-Course Plated Dinner", "Professional DJ Services"], highlight: true },
          { name: "Royal Sovereign", desc: "The ultimate luxury experience for grand celebrations.", price: "15,000", color: "#4f46e5", features: ["Full Day Venue Access", "Luxury Floral Masterpiece", "Gourmet 5-Course Meal", "Live Band & Fireworks"] }
        ].map((pkg, i) => (
          <div key={i} className={`flex flex-col bg-white rounded-2xl border ${pkg.highlight ? 'border-indigo-600 ring-1 ring-indigo-50 shadow-md' : 'border-slate-200'} overflow-hidden hover:border-indigo-400 transition-all duration-300 relative group`}>
            {pkg.highlight && (
              <div className="absolute top-4 right-4 z-10">
                <span className="bg-indigo-600 text-white text-[7px] md:text-[8px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-sm">Most Popular</span>
              </div>
            )}
            <div className="p-6 md:p-8 flex flex-col h-full">
              <div className="mb-4 md:mb-6">
                <h3 className="text-slate-900 text-lg md:text-xl font-bold mb-1.5">{pkg.name}</h3>
                <p className="text-slate-500 text-[10px] md:text-xs leading-relaxed">{pkg.desc}</p>
              </div>
              <div className="flex items-baseline gap-1.5 mb-6 md:mb-8">
                <span className="text-[8px] md:text-[9px] font-bold text-indigo-600 uppercase tracking-widest">Starts at</span>
                <span className="text-2xl md:text-3xl font-bold text-slate-900">${pkg.price}</span>
                <span className="text-slate-400 text-[9px] md:text-[10px] font-medium">/ event</span>
              </div>
              <div className="space-y-3 mb-8 flex-grow">
                {pkg.features.map((feat, fi) => (
                  <div key={fi} className="flex items-center gap-3 text-[10px] md:text-xs text-slate-600">
                    <span className="material-symbols-outlined text-indigo-500 text-base md:text-lg">check_circle</span>
                    <span className="font-medium tracking-tight">{feat}</span>
                  </div>
                ))}
              </div>
              <div className="mt-auto">
                <button className={`w-full py-2.5 px-4 rounded-lg border ${pkg.highlight ? 'bg-indigo-600 text-white shadow-sm border-indigo-600 hover:bg-indigo-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'} font-bold text-[8px] md:text-[9px] uppercase tracking-widest transition-all flex items-center justify-center gap-2`}>
                  <span className="material-symbols-outlined text-base">edit_square</span>
                  Refine Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Action Bar */}
      <div className="mt-4 p-5 md:p-8 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-slate-50 to-transparent pointer-events-none" />
        <div className="flex items-center gap-4 relative z-10 w-full sm:w-auto">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 rounded-lg flex items-center justify-center text-indigo-600 shadow-inner shrink-0 border border-slate-100">
            <span className="material-symbols-outlined text-xl md:text-2xl">campaign</span>
          </div>
          <div>
            <h4 className="text-slate-900 font-bold text-base md:text-lg">Visibility Spotlight</h4>
            <p className="text-slate-500 text-[8px] md:text-[9px] font-bold uppercase tracking-widest mt-1">Feature this collection globally</p>
          </div>
        </div>
        <div className="flex items-center gap-3 relative z-10 bg-slate-50 p-1.5 rounded-lg border border-slate-200 shadow-sm">
          <span className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest px-2">Offline</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input defaultChecked className="sr-only peer" type="checkbox" value="" />
            <div className="w-10 md:w-11 h-5 md:h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3.5 md:after:h-4.5 after:w-3.5 md:after:w-4.5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
          <span className="text-[8px] md:text-[9px] font-bold text-indigo-600 uppercase tracking-widest px-2">Live Now</span>
        </div>
      </div>
    </div>
  );
};

export default Package;
