const Booking = () => {
  return (
    <div className="flex flex-col gap-5 md:gap-8 p-4 md:p-6 pt-5 md:pt-8 max-w-7xl mx-auto w-full animate-fade-up">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {[
          { label: "Total Inquiries", value: "142", trend: "+12%", icon: "inbox", color: "#4f46e5", bg: "bg-indigo-50" },
          { label: "Pending", value: "8", trend: "Action Required", icon: "hourglass_empty", color: "#6366f1", bg: "bg-slate-50" },
          { label: "Confirmed", value: "86", trend: "+5%", icon: "check_circle", color: "#10b981", bg: "bg-emerald-50" },
          { label: "Portfolio Value", value: "$1.2M", trend: "+15%", icon: "diamond", color: "#4f46e5", bg: "bg-indigo-50/30" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-indigo-200 transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
              <span className="material-symbols-outlined text-5xl md:text-6xl" style={{ color: stat.color }}>{stat.icon}</span>
            </div>
            <div className="flex justify-between items-start mb-2">
              <p className="text-[8px] md:text-[9px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
              <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`} style={{ color: stat.color }}>
                <span className="material-symbols-outlined text-base">{stat.icon}</span>
              </div>
            </div>
            <p className="text-xl md:text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-[8px] md:text-[9px] font-bold mt-1" style={{ color: stat.color }}>
              {stat.trend} <span className="text-slate-400 font-medium lowercase">performance</span>
            </p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 mb-5 md:mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <nav className="flex gap-5 md:gap-8">
          {[
            { label: "Pending", count: 8, active: true },
            { label: "Accepted", count: 86 },
            { label: "Rejected", count: 12 },
            { label: "Completed", count: 36 },
          ].map((tab) => (
            <button
              key={tab.label}
              className={`py-3 md:py-4 px-1 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] transition-all relative
                  ${tab.active
                  ? "text-indigo-600"
                  : "text-slate-400 hover:text-slate-600"
                }`}
            >
              <span className="flex items-center gap-2">
                {tab.label}
                <span className={`px-1.5 py-0.5 rounded-full text-[8px] md:text-[9px] shadow-sm border ${tab.active ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-400 border-slate-200"}`}>
                  {tab.count}
                </span>
              </span>
              {tab.active && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full" />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Booking Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {[
          { id: "BK-2024-081", couple: "Sophia & James", location: "Amalfi Coast, Italy", date: "Oct 12, 2024", guests: "150 Guests", package: "Full Venue & Catering", status: "Pending Approval", color: "#6366f1", bg: "bg-indigo-50", img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80" },
          { id: "BK-2024-092", couple: "Liam & Olivia", location: "Lake Como, Italy", date: "Nov 05, 2024", guests: "80 Guests", package: "Reception Only", status: "Pending Approval", color: "#6366f1", bg: "bg-indigo-50", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&q=80" }
        ].map((card, idx) => (
          <div key={idx} className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-slate-200 hover:border-indigo-200 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4 md:mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded bg-slate-100 overflow-hidden border border-slate-200 shadow-sm relative group-hover:scale-105 transition-transform duration-500">
                  <img src={card.img} alt={card.couple} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{card.couple}</h3>
                  <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">#{card.id}</p>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[8px] md:text-[9px] font-bold uppercase tracking-widest border border-slate-200 bg-slate-50 shadow-sm`} style={{ color: card.color }}>
                <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: card.color }}></span>
                {card.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6 text-[10px] md:text-xs">
              <div className="flex items-center gap-2 text-slate-500">
                <span className="material-symbols-outlined text-indigo-500 text-base">calendar_today</span>
                <span className="font-semibold">{card.date}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <span className="material-symbols-outlined text-indigo-500 text-base">location_on</span>
                <span className="font-semibold truncate">{card.location}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <span className="material-symbols-outlined text-indigo-500 text-base">group</span>
                <span className="font-semibold">{card.guests}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <span className="material-symbols-outlined text-indigo-500 text-base">verified</span>
                <span className="font-semibold truncate">{card.package}</span>
              </div>
            </div>

            <div className="flex gap-2.5 pt-4 border-t border-slate-100">
              <button className="flex-grow bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-[8px] font-bold uppercase tracking-[0.1em] transition-all flex justify-center items-center gap-1.5 shadow-sm">
                <span className="material-symbols-outlined text-sm">check</span> Accept
              </button>
              <button className="flex-grow bg-white border border-slate-200 text-slate-500 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-[8px] font-bold uppercase tracking-[0.1em] transition-all flex justify-center items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">close</span> Reject
              </button>
              <button className="w-8 h-8 md:w-10 md:h-10 bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 rounded-lg transition-all flex items-center justify-center shadow-sm" title="View Details">
                <span className="material-symbols-outlined text-lg">visibility</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 md:mt-10 pt-6 border-t border-slate-200 gap-4">
        <span className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest">Showing <span className="text-slate-900">2</span> of <span className="text-slate-900">8</span> requests</span>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-[8px] font-bold uppercase tracking-widest text-slate-500 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-30 transition-all shadow-sm">Previous</button>
          <button className="px-5 py-2 text-[8px] font-bold uppercase tracking-widest text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all shadow-sm">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Booking;