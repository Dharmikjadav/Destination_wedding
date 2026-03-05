import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Filter,
    ChevronLeft,
    ChevronRight,
    MoreVertical,
    Download,
    Plus
} from 'lucide-react';

const AdminTable = ({
    title,
    description,
    columns,
    data,
    searchPlaceholder = "Search records...",
    onSearch,
    searchValue,
    actionButton,
    loading,
    error,
    emptyMessage = "No records found."
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="flex flex-col gap-8 pb-10">
            {/* Table Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 className="text-3xl font-serif text-[#5C3A2E] mb-2">{title}</h2>
                    <p className="text-[10px] text-[#B76E79] font-bold uppercase tracking-[0.3em]">{description}</p>
                </motion.div>

                <div className="flex gap-4">
                    {actionButton && (
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            {actionButton}
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Search & Filters Bar */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/50 backdrop-blur-xl p-4 rounded-[2rem] border border-[#B76E79]/10 shadow-sm flex flex-col md:flex-row gap-4 items-center"
            >
                <div className="relative flex-grow group w-full">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#B76E79] group-focus-within:scale-110 transition-transform" size={18} />
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={searchValue}
                        onChange={(e) => onSearch(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 rounded-2xl bg-[#FDF5E6]/50 border border-transparent focus:bg-white focus:border-[#B76E79] focus:shadow-xl focus:shadow-[#B76E79]/5 transition-all outline-none text-[#5C3A2E] font-bold text-[11px] uppercase tracking-widest placeholder:text-[#5C3A2E]/30"
                    />
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <button className="flex-grow md:flex-none flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white border border-[#B76E79]/10 text-[#5C3A2E] font-bold text-[10px] uppercase tracking-widest hover:bg-[#FDF5E6] transition-all shadow-sm">
                        <Filter size={16} />
                        Refine
                    </button>
                    <button className="flex-grow md:flex-none flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white border border-[#B76E79]/10 text-[#5C3A2E] font-bold text-[10px] uppercase tracking-widest hover:bg-[#FDF5E6] transition-all shadow-sm">
                        <Download size={16} />
                        Export
                    </button>
                </div>
            </motion.div>

            {/* Table Container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2.5rem] border border-[#B76E79]/10 shadow-sm overflow-hidden"
            >
                <div className="overflow-x-auto overflow-y-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#FDF5E6]/50 border-b border-[#B76E79]/10">
                                {columns.map((col, i) => (
                                    <th key={i} className={`px-8 py-6 text-[10px] font-bold text-[#B76E79] uppercase tracking-[0.2em] ${col.className || ''}`}>
                                        {col.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#B76E79]/5">
                            <AnimatePresence mode="popLayout">
                                {loading ? (
                                    <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        <td colSpan={columns.length} className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="w-12 h-12 border-4 border-[#B76E79]/20 border-t-[#B76E79] rounded-full animate-spin" />
                                                <p className="text-[10px] font-bold text-[#B76E79] uppercase tracking-[0.3em]">Gathering Intelligence...</p>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ) : error ? (
                                    <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <td colSpan={columns.length} className="px-8 py-20 text-center text-rose-500 font-bold uppercase tracking-widest text-xs">
                                            {error}
                                        </td>
                                    </motion.tr>
                                ) : paginatedData.length === 0 ? (
                                    <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <td colSpan={columns.length} className="px-8 py-20 text-center flex flex-col items-center gap-4">
                                            <div className="w-16 h-16 rounded-3xl bg-[#FDF5E6] flex items-center justify-center text-[#B76E79]">
                                                <Search size={32} />
                                            </div>
                                            <p className="text-[10px] font-bold text-[#5C3A2E]/40 uppercase tracking-[0.3em]">{emptyMessage}</p>
                                        </td>
                                    </motion.tr>
                                ) : (
                                    paginatedData.map((row, rowIndex) => (
                                        <motion.tr
                                            key={row._id || rowIndex}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: rowIndex * 0.05 }}
                                            className="hover:bg-[#FDF5E6]/30 transition-colors group cursor-default"
                                        >
                                            {columns.map((col, colIndex) => (
                                                <td key={colIndex} className={`px-8 py-6 text-[11px] font-medium text-[#5C3A2E] ${col.className || ''}`}>
                                                    {col.render ? col.render(row) : row[col.key]}
                                                </td>
                                            ))}
                                        </motion.tr>
                                    ))
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                {!loading && !error && data.length > itemsPerPage && (
                    <div className="px-8 py-6 bg-[#FDF5E6]/20 border-t border-[#B76E79]/10 flex items-center justify-between">
                        <p className="text-[10px] font-bold text-[#5C3A2E]/40 uppercase tracking-widest">
                            Showing <span className="text-[#B76E79]">{startIndex + 1}</span> to <span className="text-[#B76E79]">{Math.min(startIndex + itemsPerPage, data.length)}</span> of {data.length} Excellence
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="w-10 h-10 rounded-xl bg-white border border-[#B76E79]/10 flex items-center justify-center text-[#B76E79] hover:bg-[#B76E79] hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-[#B76E79]"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <div className="flex items-center px-4 text-[10px] font-bold text-[#5C3A2E]">
                                {currentPage} / {totalPages}
                            </div>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="w-10 h-10 rounded-xl bg-white border border-[#B76E79]/10 flex items-center justify-center text-[#B76E79] hover:bg-[#B76E79] hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-[#B76E79]"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default AdminTable;
