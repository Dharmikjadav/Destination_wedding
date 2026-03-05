import React from 'react';
import { useNavigate } from 'react-router-dom';
import { packages, vendors } from '../../data';
import { useUserContext } from '../../context/UserContext';

const MyBookingsSection = () => {
  const navigate = useNavigate();
  const { bookingStatus, statusSteps, selectedDestination, selectedPackage, selectedVendors, guests, paymentDone } = useUserContext();
  return (
    <div className="section-enter py-16 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-xs tracking-widest uppercase mb-2" style={{color:"#c8956c"}}>Your Journey</p>
        <h2 className="text-5xl font-display mb-3" style={{color:"#5c3a2e"}}>Booking Dashboard</h2>
        <p className="text-sm" style={{color:"#b08070"}}>Track every detail of your destination wedding in one place.</p>
      </div>
      <div className="mb-8 rounded-2xl p-5 text-center" style={{background:bookingStatus==="confirmed"?"linear-gradient(135deg,#dcfce7,#bbf7d0)":"linear-gradient(135deg,#fef9c3,#fde68a)"}}>
        <span className="text-3xl">{bookingStatus==="confirmed"?"🎉":"⏳"}</span>
        <p className="font-display text-2xl mt-2" style={{color:bookingStatus==="confirmed"?"#166534":"#854d0e"}}>Status: {bookingStatus==="confirmed"?"WEDDING CONFIRMED!":"PLANNING IN PROGRESS"}</p>
      </div>
      <div className="glass rounded-3xl p-8 mb-8 shadow-xl">
        <h3 className="font-display text-2xl mb-8" style={{color:"#5c3a2e"}}>Planning Progress</h3>
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-0.5" style={{background:"#e8d5c8"}}/>
          <div className="space-y-7">
            {statusSteps.map((step,i)=>(
              <div key={step.label} className="flex items-center gap-5 relative fade-up" style={{animationDelay:`${i*.08}s`}}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 flex-shrink-0 shadow-md transition-all ${step.done?"shimmer-btn":"bg-white border-2 border-rose-200"}`}>
                  {step.done?<span className="text-white font-bold">✓</span>:<span className="text-xs" style={{color:"#c8956c"}}>{i+1}</span>}
                </div>
                <div className="flex-1"><p className="font-semibold text-sm" style={{color:step.done?"#5c3a2e":"#b08070"}}>{step.label}</p></div>
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${step.done?"bg-green-100 text-green-700":"bg-rose-100 text-rose-400"}`}>{step.done?"Completed":"Pending"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {[{icon:"📍",title:"Destination",content:selectedDestination?.name||"Not selected",action:"Destinations"},{icon:"📦",title:"Package",content:selectedPackage?packages.find(p=>p.id===selectedPackage)?.name:"Not selected",action:"Packages"}].map(card=>(
          <div key={card.title} className="glass rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-3"><span className="text-2xl">{card.icon}</span><h4 className="font-display text-xl" style={{color:"#5c3a2e"}}>{card.title}</h4></div>
            <p className="font-semibold text-sm" style={{color:"#8b5c3e"}}>{card.content}</p>
            {card.content==="Not selected"&&<button onClick={()=>navigate("/"+card.action.toLowerCase())} className="mt-3 text-xs shimmer-btn px-4 py-1.5 rounded-full">Select →</button>}
          </div>
        ))}
        <div className="glass rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-3"><span className="text-2xl">🤝</span><h4 className="font-display text-xl" style={{color:"#5c3a2e"}}>Vendors</h4></div>
          <p className="font-semibold text-sm mb-3" style={{color:"#8b5c3e"}}>{selectedVendors.length>0?`${selectedVendors.length} vendor(s) booked`:"None selected"}</p>
          <div className="flex flex-wrap gap-2">
            {selectedVendors.map(id=>{const v=vendors.find(vv=>vv.id===id);return v?<span key={id} className="text-xs px-2 py-1 bg-rose-100 rounded-full text-rose-700">{v.icon} {v.name}</span>:null;})}
          </div>
          {selectedVendors.length===0&&<button onClick={()=>navigate("/vendors")} className="mt-2 text-xs shimmer-btn px-4 py-1.5 rounded-full">Choose Vendors →</button>}
        </div>
        <div className="glass rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-3"><span className="text-2xl">👥</span><h4 className="font-display text-xl" style={{color:"#5c3a2e"}}>Guest List</h4></div>
          <p className="font-semibold text-sm mb-3" style={{color:"#8b5c3e"}}>{guests.length} guests · {guests.filter(g=>g.rsvp==="confirmed").length} confirmed</p>
          <div className="w-full bg-rose-100 rounded-full h-2.5"><div className="h-2.5 rounded-full shimmer-btn progress-fill" style={{width:`${guests.length>0?(guests.filter(g=>g.rsvp==="confirmed").length/guests.length)*100:0}%`}}/></div>
        </div>
      </div>
      {!paymentDone&&<div className="mt-8 text-center"><button onClick={()=>navigate("/payments")} className="shimmer-btn px-12 py-4 rounded-full font-bold shadow-xl">Complete Payment to Confirm →</button></div>}
    </div>
  );
};

export default MyBookingsSection;