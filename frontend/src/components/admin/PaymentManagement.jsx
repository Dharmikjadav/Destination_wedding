import React, { useState, useMemo } from "react";
import AdminTable from "./AdminTable";
import {
  CreditCard,
  Banknote,
  Smartphone,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  User,
  Hash,
  DollarSign,
  Receipt
} from "lucide-react";
import { motion } from "framer-motion";

const PaymentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const payments = [
    { id: "PMT-1001", booking: "BK-9021", user: "Sophia & James", amount: "₹1,25,000", method: "Credit Card", status: "Completed", date: "Oct 12, 2024" },
    { id: "PMT-1002", booking: "BK-9025", user: "Liam & Olivia", amount: "₹45,000", method: "Bank Transfer", status: "Pending", date: "Nov 05, 2024" },
    { id: "PMT-1003", booking: "BK-9030", user: "Noah & Emma", amount: "₹28,000", method: "UPI", status: "Failed", date: "Dec 20, 2024" },
    { id: "PMT-1004", booking: "BK-9042", user: "Kabir & Myra", amount: "₹2,10,000", method: "Credit Card", status: "Completed", date: "Jan 15, 2025" },
    { id: "PMT-1005", booking: "BK-9050", user: "Arjun & Diya", amount: "₹95,000", method: "UPI", status: "Refunded", date: "Feb 02, 2025" },
  ];

  const getStatusBadge = (status) => {
    const styles = {
      Completed: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100", icon: CheckCircle2 },
      Pending: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100", icon: Clock },
      Failed: { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-100", icon: AlertCircle },
      Refunded: { bg: "bg-slate-50", text: "text-slate-500", border: "border-slate-100", icon: Receipt }
    };
    const style = styles[status] || styles.Pending;
    const Icon = style.icon;

    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border ${style.bg} ${style.text} ${style.border} text-[9px] font-bold uppercase tracking-wider shadow-sm`}>
        <Icon size={12} />
        {status}
      </span>
    );
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case "Credit Card": return <CreditCard size={12} />;
      case "Bank Transfer": return <Banknote size={12} />;
      case "UPI": return <Smartphone size={12} />;
      default: return <DollarSign size={12} />;
    }
  };

  const columns = [
    {
      header: "Transaction",
      render: (p) => (
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-[#B76E79] font-bold">
            <Hash size={12} />
            <span>{p.id}</span>
          </div>
          <span className="text-[9px] text-[#5C3A2E]/40 font-bold uppercase tracking-widest mt-0.5">
            Ref: {p.booking}
          </span>
        </div>
      )
    },
    {
      header: "Beneficiary",
      className: "w-1/4",
      render: (p) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#FDF5E6] flex items-center justify-center text-[#B76E79]">
            <User size={14} />
          </div>
          <span className="text-[11px] font-bold text-[#5C3A2E] uppercase tracking-wide">{p.user}</span>
        </div>
      )
    },
    {
      header: "Value",
      render: (p) => (
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-[#5C3A2E]">{p.amount}</span>
          <span className="text-[9px] text-[#5C3A2E]/40 font-bold flex items-center gap-1 uppercase tracking-widest mt-0.5">
            {getMethodIcon(p.method)} {p.method}
          </span>
        </div>
      )
    },
    {
      header: "Timestamp",
      render: (p) => (
        <span className="flex items-center gap-2 text-[#5C3A2E]/40 font-medium text-[9px]">
          <Calendar size={10} /> {p.date}
        </span>
      )
    },
    {
      header: "Fiscal Status",
      render: (p) => getStatusBadge(p.status)
    },
    {
      header: "Analysis",
      className: "text-right",
      render: (p) => (
        <motion.button
          whileHover={{ scale: 1.1, x: -5 }}
          className="w-10 h-10 rounded-2xl bg-white border border-[#B76E79]/10 flex items-center justify-center text-[#B76E79] hover:bg-[#5C3A2E] hover:text-white transition-all shadow-sm ml-auto opacity-0 group-hover:opacity-100"
        >
          <Receipt size={18} />
        </motion.button>
      )
    }
  ];

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
    <AdminTable
      title="Fiscal Intelligence"
      description="Transactional oversight and revenue auditing"
      columns={columns}
      data={filteredPayments}
      onSearch={setSearchTerm}
      searchValue={searchTerm}
      emptyMessage="No financial ledger entries found."
    />
  );
};

export default PaymentManagement;