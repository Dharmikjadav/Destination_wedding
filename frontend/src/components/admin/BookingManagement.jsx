import React, { useEffect, useState } from "react";
import AdminTable from "./AdminTable";
import {
  Calendar,
  MapPin,
  Users,
  Hash,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowUpRight,
  Plus
} from "lucide-react";
import { motion } from "framer-motion";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const data = [
      {
        _id: "BK-9021",
        user_name: "Rahul & Priya",
        package_name: "Royal Palace Package",
        destination_name: "Udaipur",
        event_date: "2026-01-10",
        guest_count: 200,
        total_price: 500000,
        status: "confirmed",
      },
      {
        _id: "BK-9025",
        user_name: "Aman & Sneha",
        package_name: "Beach Premium",
        destination_name: "Goa",
        event_date: "2026-02-15",
        guest_count: 150,
        total_price: 350000,
        status: "pending",
      },
      {
        _id: "BK-9028",
        user_name: "Vikram & Anjali",
        package_name: "Heritage Grand",
        destination_name: "Jaipur",
        event_date: "2026-03-20",
        guest_count: 300,
        total_price: 850000,
        status: "confirmed",
      },
    ];
    setBookings(data);
  }, []);

  const getStatusBadge = (status) => {
    const styles = {
      confirmed: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100", icon: CheckCircle2 },
      pending: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100", icon: Clock },
      cancelled: { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-100", icon: XCircle }
    };
    const style = styles[status] || styles.pending;
    const Icon = style.icon;

    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border ${style.bg} ${style.text} ${style.border} text-[9px] font-bold uppercase tracking-wider shadow-sm`}>
        <Icon size={12} />
        {status}
      </span>
    );
  };

  const columns = [
    {
      header: "Registry ID",
      render: (booking) => (
        <div className="flex items-center gap-2 text-[#B76E79] font-bold">
          <Hash size={12} />
          <span>{booking._id}</span>
        </div>
      )
    },
    {
      header: "Couple",
      className: "w-1/4",
      render: (booking) => (
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-[#5C3A2E] uppercase tracking-wide">{booking.user_name}</span>
          <span className="text-[9px] text-[#B76E79] font-bold flex items-center gap-1 mt-0.5 uppercase tracking-widest">
            {booking.package_name}
          </span>
        </div>
      )
    },
    {
      header: "Location & Schedule",
      render: (booking) => (
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-2 text-[#5C3A2E]/60 font-bold uppercase tracking-widest text-[9px]">
            <MapPin size={10} className="text-[#B76E79]" /> {booking.destination_name}
          </span>
          <span className="flex items-center gap-2 text-[#5C3A2E]/40 font-medium text-[9px]">
            <Calendar size={10} /> {booking.event_date}
          </span>
        </div>
      )
    },
    {
      header: "Valuation",
      render: (booking) => (
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-[#5C3A2E]">₹{booking.total_price.toLocaleString()}</span>
          <span className="text-[9px] text-[#5C3A2E]/40 font-bold flex items-center gap-1 uppercase tracking-widest">
            <Users size={10} /> {booking.guest_count} Guests
          </span>
        </div>
      )
    },
    {
      header: "Condition",
      render: (booking) => getStatusBadge(booking.status)
    },
    {
      header: "Actions",
      className: "text-right",
      render: (booking) => (
        <motion.button
          whileHover={{ scale: 1.1, x: -5 }}
          className="w-10 h-10 rounded-2xl bg-white border border-[#B76E79]/10 flex items-center justify-center text-[#B76E79] hover:bg-[#5C3A2E] hover:text-white transition-all shadow-sm ml-auto opacity-0 group-hover:opacity-100"
        >
          <ArrowUpRight size={18} />
        </motion.button>
      )
    }
  ];

  const filteredBookings = bookings.filter((booking) =>
    booking._id.toLowerCase().includes(search.toLowerCase()) ||
    booking.user_name.toLowerCase().includes(search.toLowerCase()) ||
    booking.package_name.toLowerCase().includes(search.toLowerCase()) ||
    booking.destination_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminTable
      title="Booking Intelligence"
      description="Orchestrating the perfect union across destinations"
      columns={columns}
      data={filteredBookings}
      onSearch={setSearch}
      searchValue={search}
      actionButton={
        <button className="flex items-center gap-2 bg-[#5C3A2E] text-white px-8 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-2xl shadow-[#5C3A2E]/20">
          <Plus size={16} />
          Establish Manual Booking
        </button>
      }
      emptyMessage="No ceremonial records found."
    />
  );
};

export default BookingManagement;