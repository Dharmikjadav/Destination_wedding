import React from 'react';

const ContentManagement = () => {
    const sections = [
        { title: 'Home Banners', items: '4 active', status: 'Live', icon: 'view_carousel', color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { title: 'Wedding Packages', items: '12 tiers', status: 'Review', icon: 'featured_play_list', color: 'text-pink-600', bg: 'bg-pink-50' },
        { title: 'User Testimonials', items: '56 entries', status: 'Live', icon: 'chat', color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { title: 'Platform FAQs', items: '24 questions', status: 'Internal', icon: 'quiz', color: 'text-amber-600', bg: 'bg-amber-50' },
        { title: 'Destination Guides', items: '18 regions', status: 'Draft', icon: 'explore', color: 'text-blue-600', bg: 'bg-blue-50' },
        { title: 'Legal Policies', items: '4 docs', status: 'Live', icon: 'gavel', color: 'text-slate-600', bg: 'bg-slate-50' },
    ];

    return (
        <div className="flex flex-col gap-8 animate-fade-up">
            {/* Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Experience Orchestration</h1>
                <p className="text-xs text-slate-500 font-medium">Curate site-wide narratives, visual assets and information architecture.</p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sections.map((section, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 group hover:border-indigo-200 hover:shadow-xl transition-all duration-500 flex flex-col gap-6 cursor-pointer relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-110 transition-all">
                            <span className="material-symbols-outlined text-7xl">{section.icon}</span>
                        </div>

                        <div className="flex justify-between items-start relative z-10">
                            <div className={`w-12 h-12 rounded-xl ${section.bg} ${section.color} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                                <span className="material-symbols-outlined text-2xl">{section.icon}</span>
                            </div>
                            <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${section.status === 'Live' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                    section.status === 'Review' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-slate-50 text-slate-400 border-slate-200'
                                }`}>
                                {section.status}
                            </span>
                        </div>

                        <div className="flex flex-col gap-1 relative z-10">
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight group-hover:text-indigo-600 transition-colors">{section.title}</h3>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{section.items}</span>
                        </div>

                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.1em] text-slate-300 group-hover:text-indigo-400 transition-colors pt-4 border-t border-slate-50 relative z-10">
                            <span>Manage Sub-Modules</span>
                            <span className="material-symbols-outlined text-lg">arrow_forward_ios</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Deployment Banner */}
            <div className="bg-indigo-600 rounded-2xl p-8 flex items-center justify-between shadow-xl shadow-indigo-100 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                <div className="relative z-10 flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-white tracking-tight">Stage Environment Locked</h3>
                    <p className="text-indigo-100 text-xs font-medium max-w-sm">Changes made here will be queued for the next production deployment. Last sync was performed by admin at 14:20.</p>
                </div>
                <button className="relative z-10 bg-white text-indigo-600 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg active:scale-95">
                    Push To Live Site
                </button>
            </div>
        </div>
    );
};

export default ContentManagement;
