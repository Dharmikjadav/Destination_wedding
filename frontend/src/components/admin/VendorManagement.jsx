import React from 'react';

const VendorManagement = () => {
    const vendors = [
        {
            name: 'Grand Hyatt Resort',
            type: 'Venue Specialist',
            location: 'Goa, India',
            status: 'Pending',
            rate: 'Luxury',
            img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80',
            appliedDate: 'Mar 10, 2024'
        },
        {
            name: 'Elite Catering Co.',
            type: 'Gourmet Culinary',
            location: 'Mumbai, India',
            status: 'Approved',
            rate: 'Premium',
            img: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=80',
            appliedDate: 'Feb 28, 2024'
        },
        {
            name: 'Crystal Moments',
            type: 'Cinematic Photo',
            location: 'Delhi, India',
            status: 'Approved',
            rate: 'Standard',
            img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80',
            appliedDate: 'Jan 15, 2024'
        },
        {
            name: 'Skyline Decor',
            type: 'Event Scenography',
            location: 'Bangalore, India',
            status: 'Pending',
            rate: 'Luxury',
            img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80',
            appliedDate: 'Mar 12, 2024'
        },
    ];

    return (
        <div className="flex flex-col gap-8 animate-fade-up">
            {/* Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Ecosystem Orchestration</h1>
                <p className="text-xs text-slate-500 font-medium">Evaluate and onboard elite service providers for the platform.</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-slate-200">
                {['Verification Queue', 'Verified Partners', 'Dormant Accounts', 'Flagged Entries'].map((tab, i) => (
                    <button key={i} className={`pb-4 text-[10px] font-black uppercase tracking-[0.15em] transition-all relative px-1
            ${i === 0 ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>
                        {tab}
                        {i === 0 && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-indigo-600 rounded-full shadow-[0_0_8px_rgba(79,70,229,0.4)]" />}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {vendors.map((vendor, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group hover:shadow-xl hover:border-indigo-100 transition-all duration-500">
                        <div className="h-44 relative overflow-hidden">
                            <img src={vendor.img} alt={vendor.name} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-4 right-4">
                                <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg border border-white/20 backdrop-blur-md 
                  ${vendor.status === 'Pending' ? 'bg-amber-500/90 text-white' : 'bg-emerald-500/90 text-white'}`}>
                                    {vendor.status}
                                </span>
                            </div>
                            <div className="absolute bottom-4 left-4 flex flex-col opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-500">
                                <span className="text-[8px] font-bold text-indigo-300 uppercase tracking-widest">Applied On</span>
                                <span className="text-[10px] font-bold text-white">{vendor.appliedDate}</span>
                            </div>
                        </div>

                        <div className="p-6 flex flex-col gap-5">
                            <div className="flex flex-col gap-1.5">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight line-clamp-1 uppercase">{vendor.name}</h3>
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-400">
                                    <span className="material-symbols-outlined text-xs">location_on</span>
                                    <span className="text-[10px] font-bold uppercase tracking-tighter">{vendor.location}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between py-4 border-y border-slate-100">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[8px] text-slate-400 font-bold uppercase tracking-tighter">Domain</span>
                                    <span className="text-[10px] font-black text-slate-700 uppercase tracking-tight">{vendor.type}</span>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className="text-[8px] text-slate-400 font-bold uppercase tracking-tighter">Market Tier</span>
                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${vendor.rate === 'Luxury' ? 'bg-pink-50 text-pink-600' : 'bg-slate-50 text-slate-600'}`}>{vendor.rate}</span>
                                </div>
                            </div>

                            <div className="flex gap-2.5 pt-1">
                                {vendor.status === 'Pending' ? (
                                    <>
                                        <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-100 active:scale-95">
                                            Validate
                                        </button>
                                        <button className="w-11 h-11 bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100 rounded-xl transition-all shadow-sm flex items-center justify-center">
                                            <span className="material-symbols-outlined text-xl">close</span>
                                        </button>
                                    </>
                                ) : (
                                    <button className="w-full bg-slate-50 border border-slate-200 text-slate-600 hover:bg-white hover:border-indigo-200 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-sm">
                                        View Verified Profile
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VendorManagement;
