import React, { useState } from "react";
import { addUser } from "../../api/userApi";

export default function AddUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await addUser(form);
      alert("✅ User Added Successfully");
      console.log(result);
      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "user",
      });
    } catch (error) {
      alert("❌ Error adding user");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 w-full flex flex-col gap-8">
      <div className="border-b border-primary/10 pb-6">
        <h1 className="text-3xl font-semibold text-text-main tracking-tight">Add New User</h1>
        <p className="text-text-secondary mt-1">Create a new account manually for testing or administrative purposes.</p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 max-w-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-text-main ml-1">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border border-rose-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-text-main ml-1">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-xl border border-rose-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-text-main ml-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-3 rounded-xl border border-rose-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-text-main ml-1">Account Role</label>
              <select
                name="role"
                className="w-full px-4 py-3 rounded-xl border border-rose-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-white appearance-none cursor-pointer"
                value={form.role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="vendor">Vendor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-text-main ml-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-rose-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-primary/20 active:scale-95 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <span className="animate-spin material-symbols-outlined">progress_activity</span>
              ) : (
                <span className="material-symbols-outlined">person_add</span>
              )}
              {loading ? "Creating..." : "Create User Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}