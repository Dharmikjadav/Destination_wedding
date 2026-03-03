import React from 'react';

const DestinationsSection = ({ navigate , destFilter, setDestFilter, filteredDests, expandedDest, setExpandedDest, selectedDestination, setSelectedDestination, setActiveNav }) => {
  return (
    <div className="section-enter">
      <div className="relative h-72 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=1400&q=80" alt="" className="w-full h-full object-cover hero-bg"/>
        <div className="absolute inset-0" style={{background:"linear-gradient(180deg,rgba(0,0,0,.2),rgba(20,5,0,.7))"}}/>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-xs tracking-widest uppercase text-white/70 mb-2">Where Love Unfolds</p>
          <h2 className="text-6xl font-display text-white">Wedding Destinations</h2>
          <p className="text-white/75 text-sm mt-3 max-w-xl">The best destination wedding locations offer stunning scenery, favorable climates, and excellent amenities to ensure a memorable experience.</p>
        </div>
      </div>


      <div className="py-12 px-6 max-w-7xl mx-auto">
        <div className="flex gap-3 mb-10 justify-center flex-wrap">
          {["All","Mexico","Caribbean","Europe"].map(r=>(
            <button key={r} onClick={()=>setDestFilter(r)} className={`px-6 py-2.5 rounded-full text-sm font-bold border-2 transition-all ${destFilter===r?"shimmer-btn border-transparent":"border-rose-200 hover:border-rose-300"}`} style={{color:destFilter===r?"white":"#c8956c"}}>{r}</button>
          ))}
        </div>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDests.map(d=>(
            <div key={d.id} className="dest-card card-hover rounded-2xl overflow-hidden shadow-lg bg-white cursor-pointer" onClick={()=>setExpandedDest(expandedDest?.id===d.id?null:d)}>
              <div className="relative h-52 overflow-hidden">
                <img src={d.img} alt={d.name} className="w-full h-full object-cover dest-img-hover"/>
                <div className="absolute inset-0" style={{background:"linear-gradient(180deg,transparent 50%,rgba(0,0,0,.65))"}}/>
                <div className="overlay-fade absolute inset-0 flex items-center justify-center" style={{background:"rgba(92,58,46,.45)"}}>
                  <span className="text-white text-sm font-bold border border-white/70 px-5 py-2 rounded-full">View Details</span>
                </div>

                <div className="absolute top-3 left-3"><span className="text-xs px-3 py-1 rounded-full font-bold" style={{background:"rgba(200,149,108,.9)",color:"white"}}>{d.tag}</span></div>
                {d.lgbtFriendly&&<div className="absolute top-3 right-3"><span className="text-xs px-2 py-1 rounded-full font-bold bg-purple-500 text-white">🏳️‍🌈 LGBT+</span></div>}
                {selectedDestination?.id===d.id&&<div className="absolute top-12 right-3 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shadow-lg"><span className="text-white font-bold text-sm">✓</span></div>}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-xl font-display text-white">{d.name}</h3>
                  <p className="text-xs text-white/75">{d.startingPrice}</p>
                </div>
              </div>

              {expandedDest?.id===d.id&&(
                <div className="p-5 fade-up">
                  <p className="text-sm italic mb-4 leading-relaxed" style={{color:"#6b4c3e"}}>"{d.tagline}"</p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-xl text-xs" style={{background:"#fef9c3",color:"#854d0e"}}>🌤 {d.climate}</div>
                    <div className="p-3 rounded-xl text-xs" style={{background:"#fce8ec",color:"#9f1239"}}>💑 {d.bestFor}</div>
                  </div>

                  <div className="mb-4">{d.highlights.map(h=><div key={h} className="flex items-center gap-2 text-xs py-1" style={{color:"#6b4c3e"}}><span className="text-rose-400">→</span>{h}</div>)}</div>
                  <button onClick={e=>{e.stopPropagation();setSelectedDestination(d);}} className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all ${selectedDestination?.id===d.id?"bg-green-100 text-green-700":"shimmer-btn text-white"}`}>
                    {selectedDestination?.id===d.id?"✓ Selected":"Select This Destination"}
                  </button>
                </div>
              )}

            </div>

          ))}
          
        </div>
        <div className="mt-12 glass rounded-2xl p-8 shadow-md">
          <h4 className="font-display text-2xl mb-5" style={{color:"#5c3a2e"}}>🌍 Destination Guide</h4>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {icon:"🇲🇽",title:"Mexico",desc:"Very affordable packages. Full ceremony with basic décor, semi-private reception. LGBT Friendly. Snorkeling, Mayan ruins, and shopping. Many options for Catholic ceremonies."},
              {icon:"🏝",title:"Caribbean Islands",desc:"Jamaica offers great value. Dominican Republic sees best prices after Mexico. Aruba has no hurricane season. All-inclusive options throughout. Packages often include reception."},
              {icon:"🌍",title:"Europe & Beyond",desc:"Higher cost but unmatched beauty. Santorini, Tuscany & England offer extraordinary backdrops. More customization options. Packages typically not all-inclusive."},
            ].map(info=>(
              <div key={info.title}><div className="text-3xl mb-2">{info.icon}</div><h4 className="font-display text-lg mb-2" style={{color:"#5c3a2e"}}>{info.title}</h4><p className="text-xs leading-relaxed" style={{color:"#8b6058"}}>{info.desc}</p></div>
            ))}
          </div>
        </div>
        {selectedDestination&&(
          <div className="mt-8 rounded-2xl p-6 flex flex-wrap items-center gap-5 shadow-lg slide-right" style={{background:"linear-gradient(135deg,#5c3a2e,#8b5c3e)"}}>
            <span className="text-4xl">✅</span>
            <div><p className="font-display text-xl text-white">Selected: <strong>{selectedDestination.name}</strong></p><p className="text-sm" style={{color:"#d4a890"}}>Perfect choice! Now choose your wedding package.</p></div>
            <button onClick={()=>navigate("Packages")} className="ml-auto bg-white font-bold text-sm px-8 py-3 rounded-full shadow-md" style={{color:"#5c3a2e"}}>Choose Package →</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationsSection;