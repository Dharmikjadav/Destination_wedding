import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../api/userApi";
import AdminTable from "./AdminTable";
import {
  User as UserIcon,
  Trash2,
  Shield,
  ShoppingBag,
  UserCircle,
  Mail,
  Phone,
  MoreVertical
} from "lucide-react";
import { motion } from "framer-motion";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getUsers();
        setUsers(data || []);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
      try {
        const result = await deleteUser(userId);
        if (result.status === "success" || result.message) {
          setUsers(users.filter(u => u._id !== userId));
        }
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  const getRoleBadge = (role) => {
    const styles = {
      admin: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-100", icon: Shield },
      vendor: { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-100", icon: ShoppingBag },
      user: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100", icon: UserCircle }
    };
    const style = styles[role] || styles.user;
    const Icon = style.icon;

    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border ${style.bg} ${style.text} ${style.border} text-[9px] font-bold uppercase tracking-wider shadow-sm`}>
        <Icon size={12} />
        {role}
      </span>
    );
  };

  const columns = [
    {
      header: "Identity",
      className: "w-1/3",
      render: (user) => (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#FDF5E6] flex items-center justify-center text-[#B76E79] font-bold shadow-sm border border-[#B76E79]/5">
            {user.name ? user.name.substring(0, 1).toUpperCase() : "?"}
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-[#5C3A2E] uppercase tracking-wide">{user.name || "Anonymous"}</span>
            <span className="text-[9px] text-[#5C3A2E]/40 font-medium flex items-center gap-1 mt-0.5">
              <Mail size={10} /> {user.email}
            </span>
          </div>
        </div>
      )
    },
    {
      header: "Privilege",
      render: (user) => getRoleBadge(user.role)
    },
    {
      header: "Contact",
      render: (user) => (
        <span className="flex items-center gap-2 text-[#5C3A2E]/60">
          <Phone size={12} className="text-[#B76E79]" />
          {user.number || "Unspecified"}
        </span>
      )
    },
    {
      header: "Actions",
      className: "text-right",
      render: (user) => (
        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="w-9 h-9 rounded-xl bg-white border border-[#B76E79]/10 flex items-center justify-center text-[#B76E79] hover:bg-[#B76E79] hover:text-white transition-all shadow-sm"
          >
            <MoreVertical size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => handleDeleteUser(user._id, user.name)}
            className="w-9 h-9 rounded-xl bg-white border border-[#B76E79]/10 flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm"
          >
            <Trash2 size={16} />
          </motion.button>
        </div>
      )
    }
  ];

  const filteredUsers = users.filter((user) =>
  (user?.name?.toLowerCase().includes(search.toLowerCase()) ||
    user?.email?.toLowerCase().includes(search.toLowerCase()) ||
    user?.role?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <AdminTable
      title="User Management"
      description="Administrative control over platform citizens"
      columns={columns}
      data={filteredUsers}
      onSearch={setSearch}
      searchValue={search}
      loading={loading}
      error={error}
      emptyMessage="No citizens found in the registry."
    />
  );
};

export default UserManagement;