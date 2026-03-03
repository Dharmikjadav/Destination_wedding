import React from 'react';

const AdminDashboard = () => {
    const stats = [
        { label: 'Total Revenue', value: '$248,650', trend: '+15.2%', icon: 'payments', color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Platform Users', value: '2,480', trend: '+22%', icon: 'group', color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Active Vendors', value: '86', trend: '+5 this week', icon: 'storefront', color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Total Venues', value: '124', trend: 'Premium Tier', icon: 'location_on', color: 'text-pink-600', bg: 'bg-pink-50' },
        { label: 'New Bookings', value: '42', trend: 'High Priority', icon: 'calendar_month', color: 'text-amber-600', bg: 'bg-amber-50' },
    ];

    return (
        <div className="flex flex-col gap-8 animate-fade-up">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">System Oversight</h1>
                    <p className="text-sm text-slate-500 font-medium">Global analytics and operational performance metrics.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">download</span>
                        Export Analytics
                    </button>
                    <div className="bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-100 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Live Engine Active</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                            <span className="material-symbols-outlined text-6xl">{stat.icon}</span>
                        </div>
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className={`p-2 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform shadow-sm`}>
                                <span className="material-symbols-outlined text-xl">{stat.icon}</span>
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.trend.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'}`}>
                                {stat.trend}
                            </span>
                        </div>
                        <div className="flex flex-col relative z-10">
                            <span className="text-2xl font-black text-slate-900 leading-none">{stat.value}</span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em] mt-2">{stat.label}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Analytics */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col gap-8 relative overflow-hidden group">
                    <div className="flex justify-between items-center relative z-10">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Revenue Momentum</h3>
                            <p className="text-[10px] text-slate-400 font-bold">Projection: <span className="text-emerald-500">+$24k</span> this month</p>
                        </div>
                        <div className="flex gap-1 p-1 bg-slate-50 border border-slate-100 rounded-xl">
                            <button className="px-4 py-1.5 rounded-lg text-[10px] font-bold bg-white text-indigo-600 shadow-sm border border-slate-100 transition-all">Daily</button>
                            <button className="px-4 py-1.5 rounded-lg text-[10px] font-bold text-slate-400 hover:text-slate-600 transition-all">Monthly</button>
                        </div>
                    </div>

                    {/* Mock Chart Area */}
                    <div className="h-72 flex items-end justify-between px-2 relative">
                        <div className="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none">
                            {[4, 3, 2, 1].map(i => <div key={i} className="border-t border-slate-50 w-full" />)}
                        </div>
                        {[35, 65, 45, 95, 75, 85, 60, 40, 90, 55, 80, 70].map((h, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 group/bar flex-1 px-1 relative z-10">
                                <div
                                    className="w-full bg-indigo-100 rounded-t-lg transition-all duration-700 hover:bg-indigo-600 relative cursor-pointer"
                                    style={{ height: `${h}%` }}
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold py-1 px-2 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">
                                        ${h}k
                                    </div>
                                </div>
                                <span className="text-[9px] font-bold text-slate-300 uppercase">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pending Approvals & Performance */}
                <div className="flex flex-col gap-8">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col gap-6 group hover:border-indigo-100 transition-all">
                        <div className="flex justify-between items-center">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Pending Partners</h3>
                            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center shadow-lg shadow-indigo-100">8</span>
                        </div>
                        <div className="flex flex-col gap-4">
                            {[
                                { name: 'Riviera Palace', type: 'Venue', time: '12m ago', score: '94' },
                                { name: 'Lens & Love', type: 'Photo', time: '1h ago', score: '88' },
                                { name: 'Gourmet Art', type: 'Catering', time: '5h ago', score: '91' },
                            ].map((vendor, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-xs font-bold text-indigo-600">
                                            {vendor.name[0]}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-slate-900">{vendor.name}</span>
                                            <span className="text-[9px] text-slate-400 font-medium uppercase">{vendor.type} • {vendor.time}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] font-bold text-indigo-600">{vendor.score}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-widest text-center py-2 border-t border-dashed border-slate-100">Review Applications</button>
                    </div>

                    <div className="bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-100 p-6 flex flex-col gap-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <span className="material-symbols-outlined text-6xl text-white">bolt</span>
                        </div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest">Platform Pulse</h3>
                        <p className="text-xs text-indigo-100 leading-relaxed font-medium">Uptime is currently <span className="text-white font-bold">99.98%</span>. Database sync completed successfully at 16:30.</p>
                        <div className="flex gap-2">
                            <div className="w-full bg-indigo-500/50 h-1 rounded-full overflow-hidden">
                                <div className="bg-white h-full w-[92%] rounded-full shadow-[0_0_8px_white]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
