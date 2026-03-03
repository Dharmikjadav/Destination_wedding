import React from 'react';

const VendorsSection = ({ vendors, selectedVendors, toggleVendor, setActiveNav , navigate }) => {
  return (
    <div className="section-enter">
      <div className="relative h-64 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1400&q=80" alt="" className="w-full h-full object-cover hero-bg"/>
        <div className="absolute inset-0" style={{background:"rgba(20,5,0,.6)"}}/>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-xs tracking-widest uppercase text-white/70 mb-2">Hand-Picked Professionals</p>
          <h2 className="text-6xl font-display text-white">Choose Your Vendors</h2>
        </div>
      </div>
      <div className="py-14 px-6 max-w-7xl mx-auto">
        <p className="text-center text-sm max-w-xl mx-auto mb-10" style={{color:"#8b6058"}}>Your Resort Wedding Coordinator handles the day-of setup and décor timeline. Complement with our verified independent vendors to build your perfect dream team.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map(v=>{
            const sel=selectedVendors.includes(v.id);
            return(
              <div key={v.id} onClick={()=>toggleVendor(v.id)} className={`card-hover rounded-2xl overflow-hidden shadow-lg cursor-pointer border-2 transition-all bg-white ${sel?"border-rose-400":"border-transparent"}`}>
                <div className="relative h-44 overflow-hidden">
                  <img src={v.img} alt={v.name} className="w-full h-full object-cover dest-img-hover"/>
                  <div className="absolute inset-0" style={{background:sel?"rgba(200,149,108,.35)":"rgba(0,0,0,.15)",transition:"background .3s"}}/>
                  <div className="absolute top-3 right-3"><div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-md transition-all ${sel?"bg-rose-500 border-rose-500":"bg-white border-gray-200"}`}>{sel&&<span className="text-white font-bold text-sm">✓</span>}</div></div>
                  <div className="absolute bottom-3 left-3"><span className="text-xs px-2 py-1 rounded-full font-semibold bg-white/90" style={{color:"#c8956c"}}>{v.icon} {v.category}</span></div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl mb-1" style={{color:"#5c3a2e"}}>{v.name}</h3>
                  <div className="flex items-center gap-2 mb-2"><span className="text-yellow-400">{"★".repeat(Math.floor(v.rating))}</span><span className="text-xs" style={{color:"#b08070"}}>{v.rating}</span></div>
                  <p className="text-sm font-bold mb-3" style={{color:"#c8956c"}}>{v.price}</p>
                  <div className="flex flex-wrap gap-1.5">{v.tags.map(t=><span key={t} className="text-xs px-2 py-1 rounded-full bg-rose-50" style={{color:"#8b5c3e"}}>{t}</span>)}</div>
                </div>
              </div>
            );
          })}
        </div>
        {selectedVendors.length>0&&(
          <div className="mt-10 rounded-2xl p-6 flex flex-wrap items-center gap-5 shadow-lg slide-right" style={{background:"linear-gradient(135deg,#5c3a2e,#8b5c3e)"}}>
            <span className="text-4xl">🎉</span>
            <div><p className="font-display text-xl text-white">{selectedVendors.length} vendor{selectedVendors.length>1?"s":""} selected</p><p className="text-sm" style={{color:"#d4a890"}}>Great team! Now let's manage your guest list.</p></div>
            <button onClick={()=>navigate("Guest List")} className="ml-auto bg-white font-bold text-sm px-8 py-3 rounded-full" style={{color:"#5c3a2e"}}>Manage Guests →</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorsSection;