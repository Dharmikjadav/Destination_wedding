import React from 'react';

const PaymentsSection = ({ paymentDone, selectedPackage, packages, selectedDestination, selectedVendors, guests, handlePayment }) => {
  return (
    <div className="section-enter py-16 px-6 max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-xs tracking-widest uppercase mb-2" style={{color:"#c8956c"}}>Secure & Transparent</p>
        <h2 className="text-5xl font-display mb-3" style={{color:"#5c3a2e"}}>Payment</h2>
        <p className="text-sm" style={{color:"#b08070"}}>Transparency is our love language — no hidden fees, ever.</p>
      </div>
      {!paymentDone?(
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8" style={{background:"linear-gradient(135deg,#5c3a2e,#8b5c3e)"}}>
            <p className="text-xs uppercase tracking-widest text-white/60 mb-1">Order Summary</p>
            <p className="font-display text-3xl text-white mb-5">{selectedPackage?packages.find(p=>p.id===selectedPackage)?.name:"Custom Package"}</p>
            <div className="space-y-2 text-sm text-white/80">
              <div className="flex justify-between"><span>Package</span><span className="font-semibold">{selectedPackage?packages.find(p=>p.id===selectedPackage)?.price:"$5,999"}</span></div>
              <div className="flex justify-between"><span>Destination — {selectedDestination?.name||"Not selected"}</span><span>Included</span></div>
              <div className="flex justify-between"><span>Vendors ({selectedVendors.length})</span><span>Included</span></div>
              <div className="flex justify-between"><span>Guests ({guests.length})</span><span>Included</span></div>
              <div className="border-t border-white/20 pt-3 flex justify-between font-bold text-white text-xl"><span>Total Due</span><span>{selectedPackage?packages.find(p=>p.id===selectedPackage)?.price:"$5,999"}</span></div>
            </div>
          </div>
          <div className="p-8 space-y-4">
            <div><label className="text-xs uppercase tracking-wide mb-2 block font-semibold" style={{color:"#8b5c3e"}}>Card Number</label><input className="w-full px-4 py-3 rounded-xl border border-rose-200 text-sm" placeholder="4242 4242 4242 4242"/></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-xs uppercase tracking-wide mb-2 block font-semibold" style={{color:"#8b5c3e"}}>Expiry</label><input className="w-full px-4 py-3 rounded-xl border border-rose-200 text-sm" placeholder="MM / YY"/></div>
              <div><label className="text-xs uppercase tracking-wide mb-2 block font-semibold" style={{color:"#8b5c3e"}}>CVV</label><input className="w-full px-4 py-3 rounded-xl border border-rose-200 text-sm" placeholder="•••"/></div>
            </div>
            <div><label className="text-xs uppercase tracking-wide mb-2 block font-semibold" style={{color:"#8b5c3e"}}>Cardholder Name</label><input className="w-full px-4 py-3 rounded-xl border border-rose-200 text-sm" placeholder="Name on card"/></div>
            <div className="flex gap-3 pt-1">
              {[["💳","Card"],["🏦","Bank Transfer"],["📱","UPI / Digital"]].map(([icon,label])=>(
                <div key={label} className="flex-1 border border-rose-100 rounded-xl py-3 flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer hover:bg-rose-50 transition-colors" style={{color:"#8b5c3e"}}>{icon} {label}</div>
              ))}
            </div>
            <button onClick={handlePayment} className="w-full py-4 rounded-xl font-bold text-base shimmer-btn shadow-xl">🔒 Pay Securely Now</button>
            <p className="text-center text-xs" style={{color:"#b08070"}}>256-bit SSL encrypted · Money-back guarantee · No hidden fees</p>
          </div>
        </div>
      ):(
        <div className="glass rounded-3xl p-14 text-center shadow-2xl slide-right">
          <div className="text-7xl mb-6 heartbeat inline-block">🎊</div>
          <h3 className="text-5xl font-display mb-3" style={{color:"#5c3a2e"}}>Payment Successful!</h3>
          <p className="text-sm mb-8" style={{color:"#b08070"}}>Your destination wedding is officially booked. Your Certified Specialist will be in touch within 24 hours.</p>
          <div className="w-20 h-20 rounded-full border-4 border-green-400 flex items-center justify-center text-4xl mx-auto mb-6">✓</div>
        </div>
      )}
    </div>
  );
};

export default PaymentsSection;