import React from 'react';

const VendorDashboard = () => {
  return (
    <div className="p-4 md:p-6 pt-5 md:pt-8 max-w-7xl mx-auto w-full flex flex-col gap-5 md:gap-8 animate-fade-up">

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
        {[
          { label: "Total Bookings", value: "24", trend: "+12%", color: "#4f46e5", bg: "bg-indigo-50" },
          { label: "Pending Requests", value: "5", trend: "Action Needed", color: "#6366f1", bg: "bg-slate-50" },
          { label: "Monthly Revenue", value: "$42,500", trend: "+8.5%", color: "#0f172a", bg: "bg-slate-100/50" },
          { label: "Guest Satisfaction", value: "4.9", trend: "189 Reviews", color: "#4f46e5", bg: "bg-indigo-50/30" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 md:p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3 relative overflow-hidden group hover:border-indigo-200 transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 md:p-5 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
              <span className="material-symbols-outlined text-5xl md:text-6xl" style={{ color: stat.color }}>{stat.icon}</span>
            </div>
            <div className="flex items-center justify-between relative z-10">
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg ${stat.bg} flex items-center justify-center`} style={{ color: stat.color }}>
                <span className="material-symbols-outlined text-xl md:text-2xl">{stat.icon}</span>
              </div>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-50 border border-slate-100 text-slate-600 shadow-sm">
                {stat.trend}
              </span>
            </div>
            <div className="relative z-10">
              <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-0.5">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8">
        {/* Earnings Chart */}
        <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-40 md:h-48 h-40 md:w-48 bg-indigo-500 opacity-[0.03] blur-[80px]" />
          <div className="flex items-center justify-between mb-5 md:mb-6 relative z-10">
            <div>
              <h3 className="text-base md:text-lg font-bold text-slate-900">Revenue Trajectory</h3>
              <p className="text-[9px] text-indigo-600 font-bold uppercase tracking-widest mt-0.5">Intelligence Hub</p>
            </div>
          </div>
          <div className="h-40 md:h-48 relative w-full mb-3">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 400 200">
              <path d="M0,150 C50,140 80,180 120,130 C160,80 200,100 240,60 C280,20 320,80 400,30" fill="none" stroke="#4f46e5" strokeLinecap="round" strokeWidth="3" className="drop-shadow-sm"></path>
              <circle cx="240" cy="60" fill="white" r="4" stroke="#4f46e5" strokeWidth="2"></circle>
            </svg>
          </div>
        </div>

        {/* Booking Trends Chart */}
        <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200 group">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 md:mb-6 gap-3">
            <div>
              <h3 className="text-base md:text-lg font-bold text-slate-900">Engagement Trends</h3>
              <p className="text-[9px] text-indigo-600 font-bold uppercase tracking-widest mt-0.5">Daily Activity</p>
            </div>
            <div className="flex gap-1.5 bg-slate-50 p-1 rounded-lg border border-slate-100">
              <button className="px-2.5 py-1 rounded-md bg-white text-slate-900 text-[8px] font-bold uppercase tracking-widest shadow-sm border border-slate-100">WK</button>
              <button className="px-2.5 py-1 rounded-md text-slate-400 text-[8px] font-bold uppercase tracking-widest hover:text-slate-900 transition-colors">MO</button>
            </div>
          </div>
          <div className="h-40 md:h-48 w-full flex items-end justify-between gap-2.5 md:gap-3.5 px-1">
            {[
              { day: 'M', height: '40%' },
              { day: 'T', height: '65%' },
              { day: 'W', height: '30%' },
              { day: 'T', height: '80%' },
              { day: 'F', height: '55%' },
              { day: 'S', height: '95%' },
              { day: 'S', height: '25%' }
            ].map((bar, index) => (
              <div key={index} className="flex flex-col items-center gap-2 w-full group/bar cursor-pointer">
                <div className="w-full bg-slate-50 rounded h-32 md:h-40 relative overflow-hidden group-hover/bar:bg-slate-100 transition-colors">
                  <div className="w-full absolute bottom-0 left-0 rounded-t transition-all duration-700 bg-gradient-to-t from-indigo-600 to-indigo-400" style={{ height: bar.height }}></div>
                </div>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Requests Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 md:p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white gap-3">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900">Priority Inquiries</h3>
            <p className="text-[9px] text-indigo-600 font-bold uppercase tracking-widest mt-0.5">Pipeline Status</p>
          </div>
          <button className="px-5 md:px-6 py-2 rounded-lg bg-indigo-600 text-white text-[8px] font-bold uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all duration-300 shadow-sm">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-4 md:p-5 text-[8px] font-bold text-slate-500 uppercase tracking-[0.15em]">Client</th>
                <th className="p-4 md:p-5 text-[8px] font-bold text-slate-500 uppercase tracking-[0.15em]">Date</th>
                <th className="p-4 md:p-5 text-[8px] font-bold text-slate-500 uppercase tracking-[0.15em]">Package</th>
                <th className="p-4 md:p-5 text-[8px] font-bold text-slate-500 uppercase tracking-[0.15em]">Status</th>
                <th className="p-4 md:p-5 text-[8px] font-bold text-slate-500 uppercase tracking-[0.15em] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: "Emily Parker", date: "Oct 24, 2024", package: "Luxe Gold", status: "Pending", color: "#4f46e5" },
                { name: "Michael Ross", date: "Nov 02, 2024", package: "Platinum", status: "Confirmed", color: "#10b981" },
                { name: "Sarah James", date: "Dec 15, 2024", package: "Bespoke", status: "Discussion", color: "#6366f1" }
              ].map((row, idx) => (
                <tr key={idx} className="group hover:bg-slate-50/50 transition-all duration-200">
                  <td className="p-4 md:p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-sm border border-slate-200">
                        {row.name.charAt(0)}
                      </div>
                      <p className="font-bold text-slate-900 text-xs md:text-sm">{row.name}</p>
                    </div>
                  </td>
                  <td className="p-4 md:p-5 text-[10px] md:text-xs font-medium text-slate-500">{row.date}</td>
                  <td className="p-4 md:p-5">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[8px] font-bold uppercase tracking-widest border border-slate-200">
                      {row.package}
                    </span>
                  </td>
                  <td className="p-4 md:p-5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: row.color }}></div>
                      <span className="text-[8px] font-bold uppercase tracking-widest" style={{ color: row.color }}>{row.status}</span>
                    </div>
                  </td>
                  <td className="p-4 md:p-5 text-right">
                    <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-indigo-600 transition-all">
                      <span className="material-symbols-outlined text-base">visibility</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
