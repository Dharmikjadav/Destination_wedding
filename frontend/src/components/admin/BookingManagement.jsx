import React from 'react';

const BookingManagement = () => {
    const bookings = [
        { id: 'BK-9021', couple: 'Sophia & James', vendor: 'Grand Hyatt Resort', date: 'Oct 12, 2024', amount: '$15,400', status: 'Confirmed', type: 'Venue Only' },
        { id: 'BK-9025', couple: 'Liam & Olivia', vendor: 'Elite Catering Co.', date: 'Nov 05, 2024', amount: '$4,200', status: 'Pending', type: 'Full Service' },
        { id: 'BK-9030', couple: 'Noah & Emma', vendor: 'Crystal Moments', date: 'Dec 20, 2024', amount: '$2,800', status: 'Completed', type: 'Photography' },
        { id: 'BK-9032', couple: 'Ethan & Mia', vendor: 'Skyline Decor', date: 'Jan 15, 2025', amount: '$6,500', status: 'Cancelled', type: 'Scenography' },
    ];

    return (
        <div className="flex flex-col gap-8 animate-fade-up">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Global Transaction Ledger</h1>
                    <p className="text-xs text-slate-500 font-medium">Monitor and manage all platform booking workflows and settlements.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">print</span>
                        Export Ledger
                    </button>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-indigo-100 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">post_add</span>
                        Manual Reservation
                    </button>
                </div>
            </div>

            {/* Advanced Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative z-20">
                <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">Identity Search</label>
                    <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 transition-all focus-within:ring-2 focus-within:ring-indigo-100 focus-within:bg-white focus-within:border-slate-200 group">
                        <span className="material-symbols-outlined text-slate-400 text-lg group-focus-within:text-indigo-600">person_search</span>
                        <input className="bg-transparent border-none text-[11px] w-full focus:ring-0 placeholder:text-slate-400 ml-2 font-bold text-slate-700" placeholder="Client Name or Booking ID" />
                    </div>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">Event Horizon</label>
                    <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 transition-all focus-within:ring-2 focus-within:ring-indigo-100 focus-within:bg-white focus-within:border-slate-200 group">
                        <span className="material-symbols-outlined text-slate-400 text-lg group-focus-within:text-indigo-600">event</span>
                        <input className="bg-transparent border-none text-[11px] w-full focus:ring-0 text-slate-700 ml-2 font-bold outline-none cursor-pointer" type="date" />
                    </div>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">Supply Partner</label>
                    <select className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-[11px] font-black text-slate-700 outline-none focus:ring-2 focus:ring-indigo-100 h-[44px] cursor-pointer hover:bg-slate-100 transition-colors">
                        <option>Global Inventory</option>
                        <option>Grand Hyatt Partner</option>
                        <option>Crystal Moments</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">Transaction Status</label>
                    <select className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-[11px] font-black text-slate-700 outline-none focus:ring-2 focus:ring-indigo-100 h-[44px] cursor-pointer hover:bg-slate-100 transition-colors">
                        <option>Lifecycle: All Stages</option>
                        <option>Confirmed & Locked</option>
                        <option>Pending Verification</option>
                        <option>Archived/Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-200">
                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">ID</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Couple Information</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Partner Assignment</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Service Type</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Financials</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Status</th>
                                <th className="px-2 py-5"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {bookings.map((booking, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-all group">
                                    <td className="px-6 py-5 text-xs font-black text-slate-400">{booking.id}</td>
                                    <td className="px-6 py-5">
                                        <span className="text-sm font-black text-slate-900 leading-none block mb-1 group-hover:text-indigo-600 transition-colors">{booking.couple}</span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{booking.date}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-xs font-bold text-slate-700">{booking.vendor}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-md">{booking.type}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-sm font-black text-slate-900">{booking.amount}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all
                      ${booking.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100/50' :
                                                booking.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100/50' :
                                                    booking.status === 'Cancelled' ? 'bg-red-50 text-red-600 border-red-100/50' : 'bg-slate-100 text-slate-400 border-slate-200/50'}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-5 text-right">
                                        <button className="w-9 h-9 rounded-xl hover:bg-white hover:border-slate-200 border border-transparent text-slate-400 hover:text-indigo-600 transition-all flex items-center justify-center shadow-sm">
                                            <span className="material-symbols-outlined text-xl">more_vert</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                    <button className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] hover:text-indigo-600 transition-colors">Show Archived Bookings</button>
                </div>
            </div>
        </div>
    );
};

export default BookingManagement;
