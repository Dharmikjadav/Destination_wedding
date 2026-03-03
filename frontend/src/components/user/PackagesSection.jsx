import React from 'react';

const PackagesSection = ({ packages, selectedPackage, setSelectedPackage, setActiveNav , navigate }) => {
  return (
    <div className="section-enter">
      <div className="relative h-64 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1400&q=80" alt="" className="w-full h-full object-cover hero-bg"/>
        <div className="absolute inset-0" style={{background:"rgba(20,5,0,.6)"}}/>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-xs tracking-widest uppercase text-white/70 mb-2">Curated for Every Couple</p>
          <h2 className="text-6xl font-display text-white">Wedding Packages</h2>
        </div>
      </div>
      <div className="py-14 px-6 max-w-6xl mx-auto">
        <p className="text-center text-sm max-w-2xl mx-auto mb-12" style={{color:"#8b6058"}}>Many all-inclusive destination wedding packages can be <strong>completely free</strong> with a qualifying room block — making it extremely affordable. Or choose a luxury upgrade for a truly bespoke celebration. Upgraded packages may include a reception with food and drinks, more decorations, live music or a DJ, multiple venues, photography, and more.</p>
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map(pkg=>(
            <div key={pkg.id} className={`relative rounded-3xl overflow-hidden shadow-xl card-hover cursor-pointer border-2 transition-all bg-gradient-to-br ${pkg.color} ${selectedPackage===pkg.id?"ring-4 ring-offset-2 ring-rose-300 scale-[1.03]":""}`} style={{borderColor:selectedPackage===pkg.id?pkg.border:"transparent"}} onClick={()=>setSelectedPackage(pkg.id)}>
              {pkg.badge&&<div className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full font-bold shimmer-btn shadow-md">{pkg.badge}</div>}
              <div className="p-8">
                <h3 className="text-3xl font-display mb-1" style={{color:"#5c3a2e"}}>{pkg.name}</h3>
                <p className="text-xs mb-4" style={{color:"#b08070"}}>{pkg.sub}</p>
                <span className="text-5xl font-display font-bold" style={{color:pkg.accent}}>{pkg.price}</span>
                <p className="text-xs italic my-4 pb-4 border-b" style={{color:"#b08070",borderColor:"rgba(200,149,108,.2)"}}>{pkg.note}</p>
                <div className="space-y-2.5 mb-7">
                  {pkg.features.map(f=><div key={f} className="flex items-start gap-2.5"><span className="text-green-500 font-bold mt-0.5 flex-shrink-0">✓</span><span className="text-sm" style={{color:"#6b4c3e"}}>{f}</span></div>)}
                </div>
                <button className={`w-full py-3 rounded-xl font-bold text-sm shadow-md transition-all ${selectedPackage===pkg.id?"shimmer-btn":"bg-white/80 hover:bg-white"}`} style={{color:selectedPackage===pkg.id?"white":pkg.accent}}>
                  {selectedPackage===pkg.id?"✓ Package Selected":"Select This Package"}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 glass rounded-2xl p-7 shadow-md">
          <h4 className="font-display text-2xl mb-4" style={{color:"#5c3a2e"}}>💡 Package Cost Guide</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm" style={{color:"#6b4c3e"}}>
            <p>• Very simple packages at all-inclusive resorts can be <strong>free</strong> with qualifying bookings, or start as low as <strong>$500</strong>.</p>
            <p>• Basic packages include ceremony décor, wedding cake, bouquet/boutonnière & romantic honeymoon touches.</p>
            <p>• Semi-private reception dinners may be included with an option to upgrade to a completely private space.</p>
            <p>• Traveling guests typically pay their own accommodation — meaning serious savings for the couple.</p>
          </div>
        </div>
        {selectedPackage&&<div className="mt-10 text-center"><button onClick={()=>navigate("Vendors")} className="shimmer-btn px-12 py-4 rounded-full font-bold shadow-xl text-sm">Continue to Choose Vendors →</button></div>}
      </div>
    </div>
  );
};

export default PackagesSection;