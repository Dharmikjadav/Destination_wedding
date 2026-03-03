import React from 'react';

const Reports = () => {
    const summary = [
        { label: 'Gross Revenue', value: '$342,800', change: '+12.4%', detail: 'Previous Month: $305k' },
        { label: 'Net Commission', value: '$51,420', change: '+8.1%', detail: '15% platform rate' },
        { label: 'Avg. Order Value', value: '$8,200', change: '-2.4%', detail: 'More small venues booked' },
        { label: 'Retention Rate', value: '94%', change: '+0.5%', detail: 'High vendor satisfaction' },
    ];

    return (
        <div className="flex flex-col gap-8 animate-fade-up">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Financial Intelligence</h1>
                    <p className="text-xs text-slate-500 font-medium">Extract actionable insights from platform transactions.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">filter_list</span>
                        Configure Filter
                    </button>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-indigo-100 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">cloud_download</span>
                        Generate Report
                    </button>
                </div>
            </div>

            {/* Summary Chips */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {summary.map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group hover:border-indigo-100 transition-all">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.change.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                {item.change}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-slate-900 leading-tight">{item.value}</span>
                            <span className="text-[10px] text-slate-400 font-medium mt-1">{item.detail}</span>
                        </div>
                        <div className="mt-4 h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all duration-1000 ${item.change.includes('+') ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ width: '70%', opacity: 0.6 }} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Settlement Report */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Commission Settlement</h3>
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100">Q1 2024</span>
                    </div>
                    <div className="p-6 flex flex-col gap-5">
                        {[
                            { id: 'SET-901', vendor: 'Grand Hyatt', amount: '$1,875', date: 'Mar 12', status: 'Pending' },
                            { id: 'SET-902', vendor: 'Crystal Moments', amount: '$420', date: 'Mar 10', status: 'Paid' },
                            { id: 'SET-903', vendor: 'Elite Catering', amount: '$630', date: 'Mar 08', status: 'Paid' },
                            { id: 'SET-904', vendor: 'Skyline Decor', amount: '$975', date: 'Mar 05', status: 'Pending' },
                        ].map((row, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                                <div className="flex items-center gap-4">
                                    <div className={`w-2 h-2 rounded-full ${row.status === 'Paid' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-slate-900">{row.vendor}</span>
                                        <span className="text-[10px] font-medium text-slate-400">{row.id} • {row.date}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-xs font-black text-slate-900">{row.amount}</span>
                                    <span className={`text-[9px] font-bold uppercase ${row.status === 'Paid' ? 'text-emerald-600' : 'text-amber-600'}`}>{row.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                        <button className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest hover:underline">View Settlement Ledger</button>
                    </div>
                </div>

                {/* Download Portal */}
                <div className="bg-indigo-900 rounded-2xl shadow-xl shadow-indigo-100 p-8 flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-9xl text-white">analytics</span>
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold text-white mb-2 leading-tight">Comprehensive<br />Operational Audit</h3>
                        <p className="text-indigo-200 text-xs font-medium max-w-xs leading-relaxed">Download a full breakdown of platform performance, including vendor growth, user retention, and tax-ready financial statements.</p>
                    </div>
                    <div className="flex flex-col gap-3 relative z-10 pt-8">
                        <button className="w-full bg-white text-indigo-900 font-bold py-3 rounded-xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:translate-x-2 transition-transform active:scale-95">
                            <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                            Download PDF Report
                        </button>
                        <button className="w-full bg-indigo-800 text-indigo-100 border border-indigo-700 font-bold py-3 rounded-xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-indigo-700 transition-colors">
                            <span className="material-symbols-outlined text-sm">table_view</span>
                            JSON Data Export
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
