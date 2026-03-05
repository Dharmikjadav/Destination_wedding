import React, { useState, useEffect, useMemo } from "react";

const BASE_URL = "http://127.0.0.1:8000";

const VendorServices = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch(`${BASE_URL}/admin/services/pending`);
      const data = await res.json();
      setServices(data || []);
    } catch (error) {
      console.error("Failed to fetch services", error);
    }
  };

  // 🔎 Filtering
  const filteredServices = useMemo(() => {
    return services.filter((service) => {

      const matchesSearch =
        service.service_name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        service.category
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" || service.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [services, searchTerm, categoryFilter]);

  const approveService = async (id) => {
    await fetch(`${BASE_URL}/admin/services/approve/${id}`, {
      method: "PUT",
    });
    fetchServices();
  };

  const rejectService = async (id) => {
    await fetch(`${BASE_URL}/admin/services/reject/${id}`, {
      method: "PUT",
    });
    fetchServices();
  };

  // ❌ Delete Service
  const deleteService = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    try {
      await fetch(`${BASE_URL}/services/${id}`, {
        method: "DELETE",
      });

      fetchServices();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Vendor Services
        </h1>
        <p className="text-sm text-slate-500">
          Manage services added by vendors
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">

        {/* Search */}
        <input
          type="text"
          placeholder="Search service or category..."
          className="border border-slate-200 rounded-lg px-4 py-2 w-full md:w-96"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Category Filter */}
        <select
          className="border border-slate-200 rounded-lg px-4 py-2 w-full md:w-52"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Photography">Photography</option>
          <option value="Decoration">Decoration</option>
          <option value="Catering">Catering</option>
          <option value="Venue">Venue</option>
        </select>

      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">

          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-left text-slate-600">
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Service Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <tr
                  key={service._id}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >

                  {/* Image */}
                  <td className="px-6 py-4">
                    {service.image && (
                      <img
                        src={service.image}
                        alt={service.service_name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                  </td>

                  {/* Name */}
                  <td className="px-6 py-4 font-semibold">
                    {service.service_name}
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4 text-slate-600">
                    {service.category}
                  </td>

                  {/* Description */}
                  <td className="px-6 py-4 text-slate-500 text-sm">
                    {service.description || "No description"}
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 font-semibold text-indigo-600">
                    ₹{service.price}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-end">

                      {service.status === "pending" && (
                        <>
                          <button
                            onClick={() => approveService(service._id)}
                            className="px-3 py-1 bg-green-600 text-white rounded-md text-xs"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() => rejectService(service._id)}
                            className="px-3 py-1 bg-yellow-500 text-white rounded-md text-xs"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => deleteService(service._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-10 text-slate-400"
                >
                  No services found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default VendorServices;