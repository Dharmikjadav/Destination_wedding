import React from 'react';

export const Header = () => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-sm backdrop-blur-md bg-white/90">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Authority Suite</h2>
        <p className="text-[9px] text-pink-600 font-bold uppercase tracking-widest mt-0.5">Business Management · Excellence in Service</p>
      </div>

      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 rounded-lg px-4 py-1.5 w-64 focus-within:ring-2 focus-within:ring-pink-100 transition-all">
          <span className="material-symbols-outlined text-slate-400 text-lg">search</span>
          <input
            className="bg-transparent border-none text-xs w-full focus:ring-0 placeholder:text-slate-400 ml-2 font-medium"
            placeholder="Search bookings..."
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-pink-600 hover:bg-pink-50 transition-all relative">
            <span className="material-symbols-outlined text-lg">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-pink-500 rounded-full border border-white"></span>
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3 border-l border-slate-200 pl-4 cursor-pointer group">
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-slate-900">Elena Vance</span>
              <span className="text-[10px] text-pink-600 font-bold uppercase tracking-tighter">Vendor Partner</span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-pink-100 border border-pink-200 flex items-center justify-center text-pink-600 text-xs font-bold transition-transform group-hover:scale-105">
              EV
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
