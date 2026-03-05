import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';

const GuestListSection = () => {
  const navigate = useNavigate();
  const { guests, newGuest, setNewGuest, addGuest, removeGuest } = useUserContext();
  return (
    <div className="section-enter py-16 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-xs tracking-widest uppercase mb-2" style={{color:"#c8956c"}}>Your Loved Ones</p>
        <h2 className="text-5xl font-display mb-3" style={{color:"#5c3a2e"}}>Guest List Manager</h2>
        <p className="text-sm max-w-md mx-auto" style={{color:"#8b6058"}}>Every couple gets a shareable wedding hub — guests can get answers, book rooms, and stay in the loop.</p>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[{label:"Total",count:guests.length,color:"#c8956c",icon:"👥"},{label:"Confirmed",count:guests.filter(g=>g.rsvp==="confirmed").length,color:"#16a34a",icon:"✅"},{label:"Pending",count:guests.filter(g=>g.rsvp==="pending").length,color:"#ca8a04",icon:"⏳"},{label:"Declined",count:guests.filter(g=>g.rsvp==="declined").length,color:"#dc2626",icon:"❌"}].map(s=>(
          <div key={s.label} className="glass rounded-2xl p-4 text-center shadow-md"><div className="text-2xl mb-1">{s.icon}</div><p className="text-3xl font-display font-bold" style={{color:s.color}}>{s.count}</p><p className="text-xs uppercase tracking-wide mt-1" style={{color:"#b08070"}}>{s.label}</p></div>
        ))}
      </div>
      <div className="glass rounded-2xl p-5 mb-6 shadow-md">
        <div className="flex justify-between items-center mb-2"><span className="text-sm font-semibold" style={{color:"#5c3a2e"}}>RSVP Progress</span><span className="text-xs" style={{color:"#b08070"}}>{guests.filter(g=>g.rsvp==="confirmed").length}/{guests.length} confirmed</span></div>
        <div className="w-full bg-rose-100 rounded-full h-3"><div className="h-3 rounded-full shimmer-btn progress-fill" style={{width:`${guests.length>0?(guests.filter(g=>g.rsvp==="confirmed").length/guests.length)*100:0}%`}}/></div>
      </div>
      <div className="glass rounded-2xl p-6 mb-6 shadow-md">
        <h3 className="font-display text-xl mb-4" style={{color:"#5c3a2e"}}>+ Add New Guest</h3>
        <div className="flex flex-wrap gap-3">
          <input className="flex-1 min-w-36 px-4 py-2.5 rounded-xl border border-rose-200 bg-white/80 text-sm" placeholder="Full Name" value={newGuest.name} onChange={e=>setNewGuest({...newGuest,name:e.target.value})} onKeyDown={e=>e.key==="Enter"&&addGuest()}/>
          <input className="flex-1 min-w-48 px-4 py-2.5 rounded-xl border border-rose-200 bg-white/80 text-sm" placeholder="Email Address" value={newGuest.email} onChange={e=>setNewGuest({...newGuest,email:e.target.value})} onKeyDown={e=>e.key==="Enter"&&addGuest()}/>
          <select className="px-4 py-2.5 rounded-xl border border-rose-200 bg-white/80 text-sm" value={newGuest.side} onChange={e=>setNewGuest({...newGuest,side:e.target.value})}>
            <option>Bride</option><option>Groom</option><option>Family</option><option>Friend</option>
          </select>
          <button onClick={addGuest} className="shimmer-btn px-6 py-2.5 rounded-xl text-sm font-bold">+ Add</button>
        </div>
      </div>
      <div className="glass rounded-2xl shadow-md overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr style={{background:"linear-gradient(90deg,#5c3a2e,#8b5c3e)"}}>
            {["Guest Name","Email","Side","RSVP",""].map(h=><th key={h} className="px-5 py-4 text-left text-xs uppercase tracking-widest text-white/80">{h}</th>)}
          </tr></thead>
          <tbody>
            {guests.map(g=>(
              <tr key={g.id} className="border-t border-rose-100/50 hover:bg-rose-50/50 transition-colors">
                <td className="px-5 py-4 font-semibold" style={{color:"#5c3a2e"}}>{g.name}</td>
                <td className="px-5 py-4 text-xs" style={{color:"#8b5c3e"}}>{g.email}</td>
                <td className="px-5 py-4"><span className="text-xs px-2 py-1 rounded-full bg-rose-100 text-rose-700 font-semibold">{g.side}</span></td>
                <td className="px-5 py-4"><span className={`text-xs px-3 py-1 rounded-full font-semibold rsvp-${g.rsvp}`}>{g.rsvp}</span></td>
                <td className="px-5 py-4"><button onClick={()=>removeGuest(g.id)} className="text-rose-300 hover:text-rose-500 text-lg">✕</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 text-center"><button onClick={()=>navigate("/payments")} className="shimmer-btn px-12 py-4 rounded-full font-bold shadow-xl">Proceed to Payment →</button></div>
    </div>
  );
};

export default GuestListSection;