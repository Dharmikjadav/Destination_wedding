import React, { useState, useMemo } from "react";

const PaymentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const payments = [
    { id: "PMT-1001", booking: "BK-9021", user: "Sophia & James", amount: "$15,400", method: "Credit Card", status: "Completed", date: "Oct 12, 2024" },
    { id: "PMT-1002", booking: "BK-9025", user: "Liam & Olivia", amount: "$4,200", method: "Bank Transfer", status: "Pending", date: "Nov 05, 2024" },
    { id: "PMT-1003", booking: "BK-9030", user: "Noah & Emma", amount: "$2,800", method: "UPI", status: "Failed", date: "Dec 20, 2024" },
  ];

  // 🔎 Filter Logic
  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const matchesSearch =
        p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.booking.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.user.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || p.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Payment Management
        </h1>
        <p className="text-sm text-slate-500">
          Review and manage all payment records
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">

        {/* Search */}
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 w-full lg:w-96">
          <span className="material-symbols-outlined text-slate-400">
            search
          </span>
          <input
            type="text"
            placeholder="Search by ID, booking or user..."
            className="bg-transparent w-full text-sm ml-2 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <select
          className="border border-slate-200 rounded-lg px-4 py-2 text-sm w-full lg:w-52"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
          <option value="Refunded">Refunded</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Payment ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Booking</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Customer</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Amount</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Method</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredPayments.length > 0 ? (
                filteredPayments.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-slate-700">{p.id}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{p.booking}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{p.user}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900">{p.amount}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{p.method}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${
                          p.status === "Completed"
                            ? "bg-emerald-100 text-emerald-700"
                            : p.status === "Pending"
                            ? "bg-amber-100 text-amber-700"
                            : p.status === "Failed"
                            ? "bg-red-100 text-red-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{p.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-slate-400 text-sm">
                    No matching payments found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentManagement;