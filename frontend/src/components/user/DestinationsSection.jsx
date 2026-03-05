import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';

const DestinationsSection = () => {
  const navigate = useNavigate();
  const { destFilter, setDestFilter, filteredDests, expandedDest, setExpandedDest, selectedDestination, setSelectedDestination } = useUserContext();
  return (
    <div className="section-enter bg-stone-50/50 min-h-screen pb-20">
      {/* HERO SECTION */}
      <div className="relative h-[40vh] min-h-[350px] overflow-hidden shadow-sm">
        <img
          src="https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=2670&q=80&auto=format&fit=crop"
          alt="Wedding Destinations"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="text-sm tracking-[0.2em] uppercase text-white/80 mb-3 font-medium">Where Love Unfolds</p>
          <h2 className="text-5xl md:text-6xl font-display text-white mb-4 drop-shadow-lg">Wedding Destinations</h2>
          <p className="text-white/90 text-sm md:text-base font-light max-w-2xl drop-shadow-md">
            The best destination wedding locations offer stunning scenery, favorable climates, and excellent amenities to ensure a memorable experience.
          </p>
        </div>
      </div>

      <div className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-display mb-4" style={{ color: "#5c3a2e" }}>Explore the World</h3>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Filter perfectly picturesque locations designed to host your most memorable day.
          </p>
        </div>

        <div className="flex gap-4 mb-16 justify-center flex-wrap">
          {["All", "Mexico", "Caribbean", "Europe"].map(r => (
            <button
              key={r}
              onClick={() => setDestFilter(r)}
              className={`px-8 py-2.5 rounded-full text-sm tracking-wide transition-all duration-300 border ${destFilter === r
                ? "bg-[#8b6058] text-white border-[#8b6058] shadow-md"
                : "bg-white text-[#5c3a2e] border-gray-200 hover:border-[#c8956c] hover:text-[#c8956c]"
                }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredDests.map(d => (
            <div
              key={d.id}
              className={`group rounded-2xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer border transition-all duration-300 transform hover:-translate-y-1 bg-white flex flex-col ${selectedDestination?.id === d.id ? "border-[#c8956c] ring-2 ring-[#c8956c] ring-offset-2 scale-[1.02]" : "border-gray-100"
                }`}
              onClick={() => setExpandedDest(expandedDest?.id === d.id ? null : d)}
            >
              <div className="relative h-60 overflow-hidden">
                <img src={d.img} alt={d.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                <div className={`absolute inset-0 transition-opacity duration-300 ${selectedDestination?.id === d.id ? "bg-[#c8956c]/10" : "bg-black/10 group-hover:bg-transparent"
                  }`} />

                <div className="absolute top-4 left-4 z-10">
                  <span className="text-xs px-3 py-1.5 rounded-full font-semibold shadow-sm tracking-wide bg-white/95 text-[#8b6058] uppercase">
                    {d.tag}
                  </span>
                </div>

                {d.lgbtFriendly && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="text-xs px-2.5 py-1.5 rounded-full font-bold bg-white/95 text-purple-600 shadow-sm border border-purple-100">🏳️‍🌈 LGBT+</span>
                  </div>
                )}

                {selectedDestination?.id === d.id && (
                  <div className="absolute top-14 right-4 z-10">
                    <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-md bg-[#5c3a2e] border-[#5c3a2e]">
                      <span className="text-white font-bold text-sm">✓</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-grow relative">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-display text-[#5c3a2e] group-hover:text-[#c8956c] transition-colors">{d.name}</h3>
                </div>
                <p className="text-sm font-semibold text-[#8b6058] mb-4 pb-4 border-b border-gray-100">{d.startingPrice}</p>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs font-medium uppercase tracking-widest text-gray-400 group-hover:text-[#c8956c] transition-colors">
                    {expandedDest?.id === d.id ? "Hide Details -" : "View Details +"}
                  </span>
                </div>
              </div>

              {expandedDest?.id === d.id && (
                <div className="p-6 pt-0 border-t border-gray-50 bg-[#fbf9f8] animate-fade-in flex flex-col flex-grow">
                  <p className="text-sm italic mb-5 leading-relaxed text-[#6b4c3e]">"{d.tagline}"</p>

                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="p-3 rounded-xl text-xs border border-amber-100 bg-amber-50 text-amber-800 flex flex-col items-center justify-center text-center">
                      <span className="text-lg mb-1">🌤</span> {d.climate}
                    </div>
                    <div className="p-3 rounded-xl text-xs border border-rose-100 bg-rose-50 text-rose-800 flex flex-col items-center justify-center text-center">
                      <span className="text-lg mb-1">💑</span> {d.bestFor}
                    </div>
                  </div>

                  <div className="mb-6 space-y-2 flex-grow">
                    <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-2">Highlights</p>
                    {d.highlights.map(h => (
                      <div key={h} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-[#c8956c] mt-0.5">✓</span>{h}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={e => { e.stopPropagation(); setSelectedDestination(d); }}
                    className={`mt-auto w-full py-3 rounded-lg font-medium transition-all duration-300 shadow-sm ${selectedDestination?.id === d.id ? "bg-[#8b6058] text-white" : "bg-white border border-[#c8956c] text-[#c8956c] hover:bg-[#c8956c] hover:text-white"
                      }`}
                  >
                    {selectedDestination?.id === d.id ? "✓ Selected" : "Select This Destination"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mb-16 bg-white border border-rose-100/50 rounded-3xl p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="relative z-10 w-full mb-8 flex items-center gap-4 border-b border-gray-100 pb-6">
            <span className="text-3xl">🌍</span>
            <h4 className="font-display text-3xl" style={{ color: "#5c3a2e" }}>Destination Guide</h4>
          </div>

          <div className="grid md:grid-cols-3 gap-10 relative z-10">
            {[
              { icon: "🇲🇽", title: "Mexico", desc: "Very affordable packages. Full ceremony with basic décor, semi-private reception. LGBT Friendly. Snorkeling, Mayan ruins, and shopping. Many options for Catholic ceremonies." },
              { icon: "🏝", title: "Caribbean Islands", desc: "Jamaica offers great value. Dominican Republic sees best prices after Mexico. Aruba has no hurricane season. All-inclusive options throughout. Packages often include reception." },
              { icon: "🗺️", title: "Europe & Beyond", desc: "Higher cost but unmatched beauty. Santorini, Tuscany & England offer extraordinary backdrops. More customization options. Packages typically not all-inclusive." },
            ].map(info => (
              <div key={info.title} className="flex flex-col">
                <div className="text-4xl mb-4 p-4 bg-[#fbf9f8] rounded-2xl w-16 h-16 flex items-center justify-center border border-gray-100 shadow-sm">{info.icon}</div>
                <h4 className="font-display text-xl mb-3" style={{ color: "#5c3a2e" }}>{info.title}</h4>
                <p className="text-sm leading-relaxed text-gray-600 font-light">{info.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {selectedDestination && (
          <div
            className="rounded-3xl p-8 flex flex-wrap items-center gap-6 shadow-xl animate-fade-in relative overflow-hidden"
            style={{ background: "linear-gradient(135deg,#5c3a2e,#8b5c3e)" }}
          >
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20"></div>

            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/20">
              <span className="text-3xl">✈️</span>
            </div>

            <div className="flex-1 relative z-10">
              <p className="font-display text-2xl text-white mb-1">
                Selected: <strong>{selectedDestination.name}</strong>
              </p>
              <p className="text-[#d4a890] font-light">
                Perfect choice! Now choose your wedding package.
              </p>
            </div>

            <button
              onClick={() => navigate("/packages")}
              className="relative z-10 md:ml-auto bg-white font-bold tracking-wide text-sm px-8 py-4 rounded-full text-[#5c3a2e] transition-all hover:bg-rose-50 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Choose Package →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationsSection;