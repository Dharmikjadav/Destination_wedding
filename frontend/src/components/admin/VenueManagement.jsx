import React from 'react';

const VenueManagement = () => {
    const venues = [
        {
            name: 'Grand Hyatt Resort',
            location: 'Goa, India',
            capacity: '800 Guests',
            price: '$12,500',
            featured: true,
            img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80',
            status: 'Available'
        },
        {
            name: 'Umaid Bhawan Palace',
            location: 'Jodhpur, Rajasthan',
            capacity: '1,200 Guests',
            price: '$45,000',
            featured: true,
            img: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=600&q=80',
            status: 'Maintenance'
        },
        {
            name: 'The Leela Palace',
            location: 'Udaipur, Rajasthan',
            capacity: '600 Guests',
            price: '$32,000',
            featured: false,
            img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
            status: 'Available'
        },
        {
            name: 'JW Marriott',
            location: 'Jaipur, Rajasthan',
            capacity: '1,000 Guests',
            price: '$18,500',
            featured: false,
            img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80',
            status: 'Booked'
        },
    ];

    return (
        <div className="flex flex-col gap-8 animate-fade-up">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight text-shadow-sm">Global Venue Portfolio</h1>
                    <p className="text-xs text-slate-500 font-medium">Manage destinations, logistics and venue statuses.</p>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-indigo-100 flex items-center gap-2 active:scale-95">
                    <span className="material-symbols-outlined text-sm">add_location_alt</span>
                    Register Venue
                </button>
            </div>

            {/* Stats Mini Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Inventory', value: '124', color: 'text-indigo-600' },
                    { label: 'Premium Featured', value: '38', color: 'text-pink-600' },
                    { label: 'Avg. Occupancy', value: '72%', color: 'text-emerald-600' },
                    { label: 'Pending Reviews', value: '12', color: 'text-amber-600' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-1">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                        <span className={`text-xl font-bold ${stat.color}`}>{stat.value}</span>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 w-full md:w-96 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                    <span className="material-symbols-outlined text-slate-400 text-lg">search</span>
                    <input className="bg-transparent border-none text-xs w-full focus:ring-0 placeholder:text-slate-400 ml-2 font-medium" placeholder="Search by name, city or region..." />
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-600 outline-none w-full md:w-auto">
                        <option>All Locations</option>
                        <option>Rajasthan</option>
                        <option>Goa</option>
                    </select>
                    <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-600 outline-none w-full md:w-auto">
                        <option>All Statuses</option>
                        <option>Available</option>
                        <option>Maintenance</option>
                    </select>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {venues.map((venue, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group hover:border-indigo-100 hover:shadow-md transition-all duration-500">
                        <div className="relative h-48 overflow-hidden">
                            <img src={venue.img} alt={venue.name} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                            <div className="absolute top-4 left-4 flex gap-2">
                                <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest shadow-lg backdrop-blur-md 
                  ${venue.status === 'Available' ? 'bg-emerald-500 text-white' :
                                        venue.status === 'Maintenance' ? 'bg-amber-500 text-white' : 'bg-slate-600 text-white'}`}>
                                    {venue.status}
                                </span>
                                {venue.featured && (
                                    <span className="bg-pink-600 text-white px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-lg">
                                        <span className="material-symbols-outlined text-[10px]">grade</span> Featured
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="p-5 flex flex-col gap-4">
                            <div className="flex flex-col">
                                <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight truncate">{venue.name}</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.05em]">{venue.location}</p>
                            </div>

                            <div className="flex items-center justify-between py-3 border-y border-slate-50">
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Capacity</span>
                                    <span className="text-xs font-bold text-slate-700">{venue.capacity}</span>
                                </div>
                                <div className="flex flex-col items-end gap-0.5">
                                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Starting Base</span>
                                    <span className="text-xs font-bold text-indigo-600">{venue.price}</span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button className="flex-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all">
                                    Edit Profile
                                </button>
                                <div className={`p-2 rounded-lg border flex items-center justify-center cursor-pointer transition-all
                  ${venue.featured ? 'bg-pink-50 border-pink-100 text-pink-600' : 'bg-slate-50 border-slate-100 text-slate-400 hover:text-indigo-600'}`}>
                                    <span className="material-symbols-outlined text-lg">grade</span>
                                </div>
                                <button className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-red-600 transition-all flex items-center justify-center">
                                    <span className="material-symbols-outlined text-lg text-shadow-sm">delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VenueManagement;
