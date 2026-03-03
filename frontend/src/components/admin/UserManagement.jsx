import React from 'react';

const UserManagement = () => {
    const users = [
        { name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active', joined: 'Mar 12, 2024', lastActive: '2 mins ago' },
        { name: 'Sarah Wilson', email: 'sarah@design.co', role: 'User', status: 'Active', joined: 'Mar 10, 2024', lastActive: '1 day ago' },
        { name: 'Robert Fox', email: 'robert@fox.it', role: 'User', status: 'Blocked', joined: 'Feb 28, 2024', lastActive: '2 weeks ago' },
        { name: 'Elena Vance', email: 'elena@gmail.com', role: 'Vendor', status: 'Active', joined: 'Jan 15, 2024', lastActive: '5 mins ago' },
        { name: 'Marcus Aurelius', email: 'stoic@empire.it', role: 'User', status: 'Active', joined: 'Jan 02, 2024', lastActive: '1 month ago' },
    ];

    return (
        <div className="flex flex-col gap-8 animate-fade-up">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Identity & Access</h1>
                    <p className="text-xs text-slate-500 font-medium">Manage all platform users, their roles and system permissions.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-sm hover:bg-slate-50 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">group_add</span>
                        Invite Bulk
                    </button>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-indigo-100 flex items-center gap-2 active:scale-95">
                        <span className="material-symbols-outlined text-sm font-bold">person_add</span>
                        Create Account
                    </button>
                </div>
            </div>

            {/* Control Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 w-full lg:w-96 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                    <span className="material-symbols-outlined text-slate-400 text-lg">search</span>
                    <input className="bg-transparent border-none text-xs w-full focus:ring-0 placeholder:text-slate-400 ml-2 font-medium" placeholder="Search by name, email, UID or last active..." />
                </div>
                <div className="flex gap-3 w-full lg:w-auto">
                    <select className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-600 focus:ring-2 focus:ring-indigo-100 outline-none w-full lg:w-auto cursor-pointer">
                        <option>All System Roles</option>
                        <option>Standard Users</option>
                        <option>Premium Vendors</option>
                        <option>Moderators</option>
                    </select>
                    <select className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-600 focus:ring-2 focus:ring-indigo-100 outline-none w-full lg:w-auto cursor-pointer">
                        <option>Current Status: All</option>
                        <option>Active Sessions</option>
                        <option>Pending Validation</option>
                        <option>Blocked/Suspended</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-200">
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">User Profile</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">System Role</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Account Integrity</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Last Activity</th>
                                <th className="px-6 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users.map((user, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-all group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 font-black group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all duration-300">
                                                {user.name[0]}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-900 leading-none mb-1">{user.name}</span>
                                                <span className="text-[10px] text-slate-400 font-medium tracking-tight">{user.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-1.5 h-1.5 rounded-full ${user.role === 'Vendor' ? 'bg-pink-500 shadow-[0_0_8px_pink]' : 'bg-indigo-500 shadow-[0_0_8px_indigo]'}`} />
                                            <span className="text-xs font-bold text-slate-600">{user.role}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest border border-transparent ${user.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100/50' : 'bg-red-50 text-red-600 border-red-100/50'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-xs font-bold text-slate-500">{user.lastActive}</span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2 px-1">
                                            <button className="w-9 h-9 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-white border border-transparent hover:border-slate-200 transition-all flex items-center justify-center shadow-sm" title="View Details">
                                                <span className="material-symbols-outlined text-lg">visibility</span>
                                            </button>
                                            <button className="w-9 h-9 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-white border border-transparent hover:border-slate-200 transition-all flex items-center justify-center shadow-sm" title="Modify Permissions">
                                                <span className="material-symbols-outlined text-lg">edit</span>
                                            </button>
                                            <button className="w-9 h-9 rounded-xl text-slate-400 hover:text-red-500 hover:bg-white border border-transparent hover:border-slate-200 transition-all flex items-center justify-center shadow-sm" title="Restrict Access">
                                                <span className="material-symbols-outlined text-lg">block</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest px-2">Showing entry 1-5 of 2.1k total</span>
                    <div className="flex gap-2 p-1">
                        <button className="p-2 border border-slate-200 rounded-xl text-slate-400 hover:bg-white transition-all shadow-sm disabled:opacity-30" disabled>
                            <span className="material-symbols-outlined text-lg">chevron_left</span>
                        </button>
                        <div className="flex bg-white border border-slate-200 rounded-xl p-1 gap-1">
                            <button className="w-8 h-8 rounded-lg bg-indigo-600 text-white text-[10px] font-bold shadow-sm">1</button>
                            <button className="w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-50 text-[10px] font-bold">2</button>
                            <button className="w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-50 text-[10px] font-bold">3</button>
                        </div>
                        <button className="p-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-white transition-all shadow-sm">
                            <span className="material-symbols-outlined text-lg">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
