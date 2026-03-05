import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

const BASE_URL = "http://127.0.0.1:8000";

const VendorsSection = () => {
  const navigate = useNavigate();
  const { selectedVendors, toggleVendor } = useUserContext();

  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await fetch(`${BASE_URL}/services`);
      const data = await res.json();

      console.log("Approved vendors:", data);

      setVendors(data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg font-semibold">
        Loading vendors...
      </div>
    );
  }

  return (
    <div className="section-enter bg-stone-50/50 min-h-screen pb-20">
      {/* HERO SECTION */}
      <div className="relative h-[40vh] min-h-[350px] overflow-hidden shadow-sm">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&q=80"
          alt="Wedding Vendors"
          className="w-full h-full object-cover hero-bg"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="text-sm tracking-[0.2em] uppercase text-white/80 mb-3 font-medium">
            Hand-Picked Professionals
          </p>

          <h2 className="text-5xl md:text-6xl font-display text-white mb-4 drop-shadow-lg">
            Choose Your Vendors
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto text-sm md:text-base font-light drop-shadow-md">
            Complement your destination wedding with our trusted professionals who specialize in bringing dreams to life.
          </p>
        </div>
      </div>

      {/* MAIN SECTION */}
      <div className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-display mb-4" style={{ color: "#5c3a2e" }}>Curated Specialists</h3>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Browse our hand-picked selection of premium vendors to perfectly execute your vision.
          </p>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {vendors.map((v) => {
            const sel = selectedVendors.includes(v._id);

            return (
              <div
                key={v._id}
                onClick={() => toggleVendor(v._id)}
                className={`group rounded-2xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer border transition-all duration-300 transform hover:-translate-y-1 bg-white ${sel ? "border-[#c8956c] ring-2 ring-[#c8956c] ring-offset-2 scale-[1.02]" : "border-gray-100"
                  }`}
              >
                {/* IMAGE */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={v.image}
                    alt={v.service_name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${sel ? "bg-[#c8956c]/20" : "bg-black/10 group-hover:bg-transparent"
                      }`}
                  />

                  {/* CHECK */}
                  <div className="absolute top-4 right-4 z-10">
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-md transition-colors ${sel
                        ? "bg-[#5c3a2e] border-[#5c3a2e]"
                        : "bg-white/90 border-transparent opacity-0 group-hover:opacity-100"
                        }`}
                    >
                      {sel && (
                        <span className="text-white font-bold text-sm">✓</span>
                      )}
                    </div>
                  </div>

                  {/* CATEGORY */}
                  <div className="absolute bottom-4 left-4 z-10">
                    <span className="text-xs px-3 py-1.5 rounded-full font-semibold bg-white/95 text-[#8b6058] shadow-sm tracking-wide uppercase">
                      {v.category}
                    </span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-xl text-[#5c3a2e] group-hover:text-[#c8956c] transition-colors">
                      {v.service_name}
                    </h3>
                  </div>

                  <p className="text-sm text-gray-500 mb-6 line-clamp-2 min-h-[40px] leading-relaxed">
                    {v.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <p className="text-xl font-display text-[#8b6058]">
                      ₹{v.price}
                    </p>
                    {sel ? (
                      <span className="text-xs font-bold text-[#c8956c] bg-rose-50 px-3 py-1.5 rounded-full border border-rose-100 uppercase tracking-wider">Selected</span>
                    ) : (
                      <span className="text-xs font-medium text-gray-400 group-hover:text-[#8b6058] transition-colors uppercase tracking-wider">Select Vendor +</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* SELECTED VENDORS */}
        {selectedVendors.length > 0 && (
          <div
            className="mt-16 rounded-2xl p-8 flex flex-wrap items-center gap-6 shadow-xl animate-fade-in relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg,#5c3a2e,#8b5c3e)",
            }}
          >
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20"></div>

            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/20">
              <span className="text-3xl">🥂</span>
            </div>

            <div className="flex-1 relative z-10">
              <p className="font-display text-2xl text-white mb-1">
                {selectedVendors.length} vendor{selectedVendors.length > 1 ? "s" : ""} selected
              </p>

              <p className="text-[#d4a890] font-light">
                Excellent choices! You're one step closer to your dream wedding.
              </p>
            </div>

            <button
              onClick={() => navigate("/guests")}
              className="relative z-10 md:ml-auto bg-white font-bold tracking-wide text-sm px-8 py-4 rounded-full text-[#5c3a2e] transition-all hover:bg-rose-50 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Continue to Guest List →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorsSection;