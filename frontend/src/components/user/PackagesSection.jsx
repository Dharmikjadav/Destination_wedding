import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

const BASE_URL = "http://127.0.0.1:8000";

const PackagesSection = () => {

  const navigate = useNavigate();
  const { selectedPackage, setSelectedPackage } = useUserContext();

  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {

      const res = await fetch(`${BASE_URL}/packages`);
      const data = await res.json();

      setPackages(data || []);

    } catch (error) {
      console.error("Failed to fetch packages", error);
    }
  };

  return (

    <div className="section-enter bg-rose-50/30 min-h-screen pb-20">
      {/* HERO SECTION */}
      <div className="relative h-[40vh] min-h-[350px] overflow-hidden shadow-sm">
        <img
          src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2670&auto=format&fit=crop"
          alt="Wedding Packages"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="text-sm tracking-[0.2em] uppercase text-white/80 mb-3 font-medium">
            Curated Experiences
          </p>
          <h2 className="text-5xl md:text-6xl font-display text-white mb-4 drop-shadow-lg">
            Our Wedding Packages
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto text-sm md:text-base font-light drop-shadow-md">
            Discover thoughtfully designed packages that blend romance, luxury, and seamless planning for your unforgettable celebration.
          </p>
        </div>
      </div>

      <div className="py-16 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-display mb-4" style={{ color: "#5c3a2e" }}>Select Your Perfect Match</h3>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">Choose a package that aligns with your vision and let us handle all the intricate details of your special day.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className={`relative rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl cursor-pointer border transition-all duration-300 transform hover:-translate-y-1 ${selectedPackage === pkg._id
                ? "ring-2 ring-offset-4 ring-[#c8956c] border-[#c8956c] scale-[1.02]"
                : "border-gray-100"
                }`}
              onClick={() => setSelectedPackage(pkg._id)}
            >
              {/* Top decorative bar */}
              <div className="h-2 w-full" style={{ background: "linear-gradient(90deg, #c8956c, #e8c5a8)" }}></div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-display" style={{ color: "#5c3a2e" }}>
                    {pkg.package_name}
                  </h3>
                </div>

                <p className="text-sm text-gray-500 mb-6 min-h-[40px]">
                  {pkg.description}
                </p>

                <div className="mb-6 flex items-baseline gap-2">
                  <span className="text-3xl font-display" style={{ color: "#8b6058" }}>
                    ₹{pkg.price}
                  </span>
                  <span className="text-xs text-gray-400 uppercase tracking-wider">/ package</span>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <span className="text-xs bg-rose-50 text-[#8b6058] px-3 py-1 rounded-full font-medium border border-rose-100">
                    ⏱ {pkg.duration_days} Days Duration
                  </span>
                </div>

                {/* Services */}
                <div className="space-y-3 mt-4 mb-8">
                  <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3 border-b pb-2">Includes</p>
                  {pkg.services_included?.map((service, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="text-[#c8956c] mt-0.5text-sm">✓</span>
                      <p className="text-sm text-gray-600 leading-snug">
                        {service}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  className={`mt-auto w-full py-3 rounded-lg font-medium transition-all duration-300 shadow-sm ${selectedPackage === pkg._id
                    ? "bg-[#8b6058] text-white"
                    : "bg-[#f8f5f3] text-[#5c3a2e] hover:bg-[#e8dad5]"
                    }`}
                >
                  {selectedPackage === pkg._id
                    ? "✓ Package Selected"
                    : "Select Package"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedPackage && (
          <div className="mt-16 text-center animate-fade-in">
            <button
              onClick={() => navigate("/vendors")}
              className="px-10 py-4 font-bold tracking-wide text-white rounded-full transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl"
              style={{ background: "linear-gradient(135deg, #8b6058, #5c3a2e)" }}
            >
              Continue to Choose Vendors →
            </button>
          </div>
        )}
      </div>
    </div>

  );

};

export default PackagesSection;