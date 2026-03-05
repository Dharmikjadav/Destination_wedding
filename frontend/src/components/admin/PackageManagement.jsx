import React, { useEffect, useState } from "react";

const BASE_URL = "http://127.0.0.1:8000";

const PackageManagement = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchPendingPackages();
  }, []);

  const fetchPendingPackages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/packages/status/pending`);
      
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      
      const data = await res.json();
      console.log("API Response:", data);
      
      // Handle different response formats
      let packagesArray = [];
      if (Array.isArray(data)) {
        packagesArray = data;
      } else if (data && typeof data === 'object') {
        // If response is an object, try to find the array
        if (data.data && Array.isArray(data.data)) {
          packagesArray = data.data;
        } else if (data.packages && Array.isArray(data.packages)) {
          packagesArray = data.packages;
        }
      }
      
      setPackages(packagesArray);
    } catch (error) {
      console.error("Error fetching packages:", error);
      setPackages([]);
      alert("❌ Error loading packages");
    } finally {
      setLoading(false);
    }
  };

  const approvePackage = async (id) => {
    try {
      setProcessingId(id);
      const res = await fetch(`${BASE_URL}/packages/${id}/approve`, {
        method: "PATCH",
      });
      if (!res.ok) {
        throw new Error("Failed to approve package");
      }
      alert("✅ Package approved successfully");
      fetchPendingPackages();
    } catch (error) {
      console.error("Error approving package:", error);
      alert("❌ Error approving package");
    } finally {
      setProcessingId(null);
    }
  };

  const rejectPackage = async (id) => {
    try {
      setProcessingId(id);
      const res = await fetch(`${BASE_URL}/packages/${id}/reject`, {
        method: "PATCH",
      });
      if (!res.ok) {
        throw new Error("Failed to reject package");
      }
      alert("✅ Package rejected successfully");
      fetchPendingPackages();
    } catch (error) {
      console.error("Error rejecting package:", error);
      alert("❌ Error rejecting package");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="w-full p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2" style={{ color: "#5c3a2e" }}>
          📦 Package Management
        </h1>
        <p className="text-sm" style={{ color: "#8b6058" }}>
          Review and manage pending vendor packages
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading packages...</p>
        </div>
      ) : packages.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <p className="text-gray-500">✅ No pending packages to review</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className="glass rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow border border-rose-100/20"
            >
              <h2 className="text-lg font-bold mb-2" style={{ color: "#5c3a2e" }}>
                {pkg.package_name}
              </h2>

              <p className="text-2xl font-bold mb-2" style={{ color: "#c8956c" }}>
                ₹{pkg.price || "N/A"}
              </p>

              <p className="text-xs mb-4" style={{ color: "#8b6058" }}>
                ⏱️ {pkg.duration_days || "N/A"} Days
              </p>

              {pkg.services_included && pkg.services_included.length > 0 && (
                <div className="mb-4 pb-4 border-b border-rose-100/30">
                  <p className="text-xs font-semibold mb-2" style={{ color: "#5c3a2e" }}>
                    Services Included:
                  </p>
                  <div className="space-y-1">
                    {pkg.services_included.map((service, index) => (
                      <div key={index} className="text-xs text-gray-600">
                        ✓ {service}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {pkg.description && (
                <p className="mb-4 text-xs text-gray-600 line-clamp-2">
                  {pkg.description}
                </p>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => approvePackage(pkg._id)}
                  disabled={processingId === pkg._id}
                  className="flex-1 bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold text-sm"
                >
                  {processingId === pkg._id ? "⏳ Processing..." : "✓ Approve"}
                </button>

                <button
                  onClick={() => rejectPackage(pkg._id)}
                  disabled={processingId === pkg._id}
                  className="flex-1 bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold text-sm"
                >
                  {processingId === pkg._id ? "⏳ Processing..." : "✕ Reject"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PackageManagement;
