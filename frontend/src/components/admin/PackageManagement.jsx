import React, { useEffect, useState } from "react";
import AdminTable from "./AdminTable";
import {
  Package,
  Tag,
  Clock,
  CheckCircle2,
  XCircle,
  Layers,
  Search,
  Plus,
  ArrowRight,
  TrendingUp,
  Box
} from "lucide-react";
import { motion } from "framer-motion";

const BASE_URL = "http://127.0.0.1:8000";

const PackageManagement = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPendingPackages();
  }, []);

  const fetchPendingPackages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/packages/status/pending`);
      const data = await res.json();

      let packagesArray = [];
      if (Array.isArray(data)) {
        packagesArray = data;
      } else if (data && typeof data === 'object') {
        if (data.data && Array.isArray(data.data)) packagesArray = data.data;
        else if (data.packages && Array.isArray(data.packages)) packagesArray = data.packages;
      }
      setPackages(packagesArray);
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setLoading(false);
    }
  };

  const approvePackage = async (id) => {
    try {
      setProcessingId(id);
      await fetch(`${BASE_URL}/packages/${id}/approve`, { method: "PATCH" });
      fetchPendingPackages();
    } catch (error) {
      console.error("Error approving package:", error);
    } finally {
      setProcessingId(null);
    }
  };

  const rejectPackage = async (id) => {
    try {
      setProcessingId(id);
      await fetch(`${BASE_URL}/packages/${id}/reject`, { method: "PATCH" });
      fetchPendingPackages();
    } catch (error) {
      console.error("Error rejecting package:", error);
    } finally {
      setProcessingId(null);
    }
  };

  const columns = [
    {
      header: "Registry",
      render: (pkg) => (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#FDF5E6] flex items-center justify-center text-[#B76E79]">
            <Box size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-[#5C3A2E] uppercase tracking-wide">{pkg.package_name}</span>
            <span className="text-[9px] text-[#B76E79] font-bold uppercase tracking-widest mt-0.5">Premium Tier</span>
          </div>
        </div>
      )
    },
    {
      header: "Valuation",
      render: (pkg) => (
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-[#5C3A2E]">₹{pkg.price || "N/A"}</span>
          <span className="text-[9px] text-[#5C3A2E]/40 font-bold flex items-center gap-1 uppercase tracking-widest">
            <TrendingUp size={10} /> Market Standard
          </span>
        </div>
      )
    },
    {
      header: "Composition",
      className: "w-1/4",
      render: (pkg) => (
        <div className="flex flex-wrap gap-1">
          {pkg.services_included?.slice(0, 2).map((s, i) => (
            <span key={i} className="px-2 py-0.5 rounded-lg bg-[#FDF5E6] text-[#B76E79] text-[8px] font-bold uppercase tracking-tighter border border-[#B76E79]/5">
              {s}
            </span>
          )) || <span className="text-[9px] text-gray-400">None</span>}
          {pkg.services_included?.length > 2 && (
            <span className="text-[8px] font-bold text-[#B76E79]/40 ml-1">+{pkg.services_included.length - 2} more</span>
          )}
        </div>
      )
    },
    {
      header: "Timeline",
      render: (pkg) => (
        <span className="flex items-center gap-2 text-[#5C3A2E]/40 font-bold uppercase tracking-widest text-[9px]">
          <Clock size={10} /> {pkg.duration_days || "N/A"} Cycles
        </span>
      )
    },
    {
      header: "Evaluation",
      className: "text-right",
      render: (pkg) => (
        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => approvePackage(pkg._id)}
            disabled={processingId === pkg._id}
            className="px-5 py-2 rounded-xl bg-emerald-500 text-white text-[9px] font-bold uppercase tracking-widest shadow-lg shadow-emerald-500/20 disabled:opacity-50"
          >
            {processingId === pkg._id ? "..." : "Approve"}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => rejectPackage(pkg._id)}
            disabled={processingId === pkg._id}
            className="px-5 py-2 rounded-xl bg-white border border-rose-500 text-rose-500 text-[9px] font-bold uppercase tracking-widest disabled:opacity-50"
          >
            {processingId === pkg._id ? "..." : "Reject"}
          </motion.button>
        </div>
      )
    }
  ];

  const filteredPackages = packages.filter(pkg =>
    pkg.package_name?.toLowerCase().includes(search.toLowerCase()) ||
    pkg.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminTable
      title="Package Curation"
      description="Reviewing elite wedding propositions"
      columns={columns}
      data={filteredPackages}
      onSearch={setSearch}
      searchValue={search}
      loading={loading}
      emptyMessage="No propositions awaiting review."
    />
  );
};

export default PackageManagement;
