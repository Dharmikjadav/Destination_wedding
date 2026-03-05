import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../api/userApi";
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔥 Fetch users from API
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

  // 🔍 Search Logic
  const filteredUsers = users.filter((user) =>
    user?.name?.toLowerCase().includes(search.toLowerCase()) ||
    user?.email?.toLowerCase().includes(search.toLowerCase()) ||
    user?.role?.toLowerCase().includes(search.toLowerCase())
  );

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-50 text-purple-600 border-purple-200";
      case "vendor":
        return "bg-pink-50 text-pink-600 border-pink-200";
      default:
        return "bg-indigo-50 text-indigo-600 border-indigo-200";
    }
  };

  // 🗑️ Delete User Handler
  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
      try {
        const result = await deleteUser(userId);
        if (result.status === "success" || result.message) {
          // Remove from local state
          setUsers(users.filter(u => u._id !== userId));
          alert(`${userName} has been deleted successfully.`);
        } else {
          alert("Failed to delete user. Please try again.");
        }
      } catch (err) {
        console.error("Delete error:", err);
        alert("Error deleting user. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          User Management
        </h1>
        <p className="text-sm text-slate-500">
          Search and manage users, vendors and admins.
        </p>
      </div>

      {/* 🔍 Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <input
          type="text"
          placeholder="Search by name, email or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
          className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-500">Name</th>
                <th className="px-6 py-4 font-semibold text-slate-500">Email</th>
                <th className="px-6 py-4 font-semibold text-slate-500">Role</th>
                <th className="px-6 py-4 font-semibold text-slate-500">Phone</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>

            <tbody className="divide-y">

              {/* 🔄 Loading */}
              {loading && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-slate-400">
                    Loading users...
                  </td>
                </tr>
              )}

              {/* ❌ Error */}
              {error && !loading && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-red-500">
                    {error}
                  </td>
                </tr>
              )}

              {/* ✅ Data */}
              {!loading && !error && filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {user.name || "N/A"}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {user.email}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-md text-xs font-semibold border ${getRoleColor(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {user.number || "-"}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDeleteUser(user._id, user.name)}
                      type="button"
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {/* 🔍 No Results */}
              {!loading && !error && filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-slate-400">
                    No users found.
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

export default UserManagement;