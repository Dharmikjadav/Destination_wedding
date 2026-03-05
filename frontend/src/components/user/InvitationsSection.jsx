import React from 'react';
import { useUserContext } from '../../context/UserContext';

const InvitationsSection = () => {
  const { selectedDestination, inviteDownloaded, setInviteDownloaded, guests } = useUserContext();
  return (
    <div className="section-enter py-16 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-xs tracking-widest uppercase mb-2" style={{color:"#c8956c"}}>Announce Your Love</p>
        <h2 className="text-5xl font-display mb-3" style={{color:"#5c3a2e"}}>Wedding Invitations</h2>
        <p className="text-sm max-w-md mx-auto" style={{color:"#8b6058"}}>Beautiful digital invitations for all your guests. Choose a template, download, and share in seconds.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {[
          {name:"Garden Romance",bgFrom:"#fce8ec",bgTo:"#fdf0fb",emoji:"🌸",caption:"Floral & Romantic",img:"https://images.unsplash.com/photo-1487530811015-780780aae6e3?w=600&q=80"},
          {name:"Golden Dusk",bgFrom:"#fef9c3",bgTo:"#fde68a",emoji:"✨",caption:"Luxury & Elegant",img:"https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80"},
          {name:"Midnight Sky",bgFrom:"#ede9fe",bgTo:"#ddd6fe",emoji:"🌙",caption:"Mystical & Modern",img:"https://images.unsplash.com/photo-1470506926202-05d3fca84c9a?w=600&q=80"},
          {name:"Ocean Breeze",bgFrom:"#e0f2fe",bgTo:"#bae6fd",emoji:"🌊",caption:"Fresh & Coastal",img:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80"},
        ].map(tmpl=>(
          <div key={tmpl.name} className="card-hover rounded-2xl overflow-hidden shadow-lg bg-white">
            <div className="relative h-44 overflow-hidden"><img src={tmpl.img} alt={tmpl.name} className="w-full h-full object-cover dest-img-hover"/><div className="absolute inset-0" style={{background:`linear-gradient(180deg,transparent 30%,${tmpl.bgFrom} 100%)`}}/></div>
            <div className="p-6" style={{background:`linear-gradient(135deg,${tmpl.bgFrom},${tmpl.bgTo})`}}>
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">{tmpl.emoji}</div>
                <p className="font-display text-3xl mb-1" style={{color:"#5c3a2e"}}>Sarah & Michael</p>
                <p className="text-xs tracking-widest uppercase mb-2" style={{color:"#8b6058"}}>Request the pleasure of your company</p>
                <p className="text-xs font-bold" style={{color:"#c8956c"}}>June 14, 2026 · {selectedDestination?.name||"Riviera Maya, Mexico"}</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div><p className="font-semibold text-sm" style={{color:"#5c3a2e"}}>{tmpl.name}</p><p className="text-xs" style={{color:"#b08070"}}>{tmpl.caption}</p></div>
                <button onClick={()=>setInviteDownloaded(true)} className="shimmer-btn px-5 py-2.5 rounded-full text-xs font-bold shadow-md">↓ Download</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {inviteDownloaded&&(
        <div className="glass rounded-2xl p-8 text-center shadow-lg slide-right border border-green-200">
          <span className="text-5xl block mb-4">💌</span>
          <h3 className="font-display text-3xl mb-2" style={{color:"#5c3a2e"}}>Invitation Ready!</h3>
          <p className="text-sm" style={{color:"#b08070"}}>Share it with all {guests.length} of your guests. They can also book rooms through your shared wedding hub.</p>
          <button onClick={()=>setInviteDownloaded(false)} className="mt-5 text-xs underline" style={{color:"#c8956c"}}>Download another template</button>
        </div>
      )}
    </div>
  );
};

export default InvitationsSection;