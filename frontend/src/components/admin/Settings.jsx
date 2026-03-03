import React from 'react';

const Settings = () => {
    return (
        <div className="flex flex-col gap-8 animate-fade-up max-w-5xl">
            {/* Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Core Configuration</h1>
                <p className="text-xs text-slate-500 font-medium">Fine-tune platform economics, security and metadata overrides.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Navigation Sidebar */}
                <div className="flex flex-col gap-2">
                    {[
                        { label: 'General Access', icon: 'settings', active: true },
                        { label: 'Financial Rules', icon: 'account_balance' },
                        { label: 'E-mail Engine', icon: 'alternate_email' },
                        { label: 'Security & Auth', icon: 'security' },
                        { label: 'Integrations', icon: 'hub' },
                    ].map((item, i) => (
                        <button key={i} className={`flex items-center gap-3 px-5 py-3.5 rounded-xl transition-all font-bold text-xs uppercase tracking-widest
               ${item.active ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}>
                            <span className="material-symbols-outlined text-lg">{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="lg:col-span-2 flex flex-col gap-8">
                    {/* Section 1: Financials */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col gap-8">
                        <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                            <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center font-black text-sm">%</div>
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Commission Framework</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Standard Platform Fee</label>
                                <div className="flex items-center gap-3">
                                    <input className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-100 outline-none" defaultValue="15" />
                                    <span className="font-bold text-slate-400 text-sm">%</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Premium Tier Surcharge</label>
                                <div className="flex items-center gap-3">
                                    <input className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-100 outline-none" defaultValue="5" />
                                    <span className="font-bold text-slate-400 text-sm">%</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium italic">Note: Commission changes will apply to all new bookings from the next billing cycle onwards.</p>
                    </div>

                    {/* Section 2: General Controls */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col gap-6">
                        <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-sm">
                                <span className="material-symbols-outlined text-lg">tune</span>
                            </div>
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Platform Toggles</h3>
                        </div>

                        {[
                            { label: 'Public User Registration', desc: 'Allow new couples to create accounts autonomously.', active: true },
                            { label: 'Vendor Self-Onboarding', desc: 'Enable the public vendor registration landing page.', active: true },
                            { label: 'Manual Booking Override', desc: 'Require admin approval for every venue reservation.', active: false },
                            { label: 'System Maintenance Mode', desc: 'Restrict platform access to authenticated admins only.', active: false },
                        ].map((toggle, i) => (
                            <div key={i} className="flex items-center justify-between py-2">
                                <div className="flex flex-col gap-1 max-w-sm">
                                    <span className="text-xs font-bold text-slate-900">{toggle.label}</span>
                                    <span className="text-[10px] text-slate-400 font-medium leading-relaxed">{toggle.desc}</span>
                                </div>
                                <div className={`w-12 h-6 rounded-full p-1 transition-all cursor-pointer ${toggle.active ? 'bg-indigo-600 flex justify-end' : 'bg-slate-200 flex justify-start'}`}>
                                    <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-100 transition-all hover:-translate-y-1 active:scale-95">
                            Synchronize All Nodes
                        </button>
                        <button className="px-8 bg-white border border-slate-200 text-slate-400 font-black py-4 rounded-xl text-[10px] uppercase tracking-widest hover:text-red-500 hover:border-red-100 transition-all">
                            Reset Factory
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
