import React, { useEffect, useState } from "react";

const BASE_URL = "http://127.0.0.1:8000";

const Package = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [modalData, setModalData] = useState(null);

  const [formData, setFormData] = useState({
    package_name: "",
    price: "",
    duration_days: "",
    services_included: "",
    description: "",
  });

  useEffect(() => {
    fetchPackages();
  }, []);

 const fetchPackages = async () => {
  try {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "vendor") {
      console.error("User not logged in or not a vendor");
      return;
    }

    const res = await fetch(`${BASE_URL}/packages/vendor/${user.id}`);
    const data = await res.json();

    console.log("API response:", data);

    if (Array.isArray(data)) {
      setPackages(data);
    } else if (Array.isArray(data.data)) {
      setPackages(data.data);
    } else {
      setPackages([]);
    }

  } catch (error) {
    console.error("Error fetching packages:", error);
  } finally {
    setLoading(false);
  }
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "vendor") {
      alert("You must be logged in as a vendor");
      return;
    }

    const payload = {
      package_name: formData.package_name,
      price: Number(formData.price),
      duration_days: Number(formData.duration_days),
      services_included: formData.services_included
        .split(",")
        .map((s) => s.trim()),
      description: formData.description,
      vendor_id: user.id,
    };

    try {
      setLoading(true);

      if (editingId) {
        await fetch(`${BASE_URL}/packages/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(`${BASE_URL}/packages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      setFormData({
        package_name: "",
        price: "",
        duration_days: "",
        services_included: "",
        description: "",
      });

      setEditingId(null);
      fetchPackages();
    } catch (error) {
      console.error(error);
      alert("Error saving package");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (pkg) => {
    if (pkg.status === "approved") {
      alert("Approved packages cannot be edited");
      return;
    }

    setEditingId(pkg._id);

    setFormData({
      package_name: pkg.package_name,
      price: pkg.price,
      duration_days: pkg.duration_days,
      services_included: pkg.services_included.join(", "),
      description: pkg.description || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?"))
      return;

    await fetch(`${BASE_URL}/packages/${id}`, {
      method: "DELETE",
    });

    fetchPackages();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">

      {/* Add / Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4"
      >
        <h2 className="text-xl font-bold text-slate-900">
          {editingId ? "Edit Package" : "Add New Package"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            required
            name="package_name"
            value={formData.package_name}
            onChange={handleChange}
            placeholder="Package Name"
            className="border p-2 rounded-md"
          />

          <input
            required
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="border p-2 rounded-md"
          />

          <input
            required
            name="duration_days"
            type="number"
            value={formData.duration_days}
            onChange={handleChange}
            placeholder="Duration (Days)"
            className="border p-2 rounded-md"
          />

          <input
            required
            name="services_included"
            value={formData.services_included}
            onChange={handleChange}
            placeholder="Services (comma separated)"
            className="border p-2 rounded-md"
          />
        </div>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded-md w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
        >
          {loading ? "Saving..." : editingId ? "Update Package" : "Save Package"}
        </button>
      </form>

      {/* Packages */}
      {loading && <p className="text-center">Loading packages...</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-indigo-400 transition"
          >
            <h3 className="text-lg font-bold">{pkg.package_name}</h3>

            <p className="text-indigo-600 font-bold text-xl mt-2">
              ₹{pkg.price}
            </p>

            <p className="text-sm text-slate-500">
              {pkg.duration_days} Days
            </p>

            {/* Status Badge */}
            <p className="mt-2 text-sm">
              Status:
              <span
                className={`ml-2 px-2 py-1 rounded text-xs ${pkg.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : pkg.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
              >
                {pkg.status}
              </span>
            </p>

            <div className="mt-4 space-y-1">
              {pkg.services_included.map((service, i) => (
                <div key={i} className="text-sm">
                  • {service}
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => handleEdit(pkg)}
                className="flex-1 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(pkg._id)}
                className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>

              <button
                onClick={() => setModalData(pkg)}
                className="flex-1 bg-slate-200 py-2 rounded-md"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalData && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center"
          onClick={() => setModalData(null)}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold">{modalData.package_name}</h3>

            <p className="text-indigo-600 font-bold">
              ₹{modalData.price}
            </p>

            <p className="text-sm text-slate-500">
              {modalData.duration_days} Days
            </p>

            <div className="mt-4">
              {modalData.services_included.map((s, i) => (
                <div key={i}>• {s}</div>
              ))}
            </div>

            {modalData.description && (
              <p className="mt-4 text-slate-600">
                {modalData.description}
              </p>
            )}

            <button
              onClick={() => setModalData(null)}
              className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Package;