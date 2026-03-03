import { useState, useEffect } from "react";
import { packages, destinations, resortShowcase, vendors, testimonials, initialGuests, navItems, HERO_SLIDES } from "../../data";
import HomeSection from "../../components/user/HomeSection";
import DestinationsSection from "../../components/user/DestinationsSection";
import PackagesSection from "../../components/user/PackagesSection";
import VendorsSection from "../../components/user/VendorsSection";
import GuestListSection from "../../components/user/GuestListSection";
import PaymentsSection from "../../components/user/PaymentsSection";
import InvitationsSection from "../../components/user/InvitationsSection";
import MyBookingsSection from "../../components/user/MyBookingsSection";

export default function WeddingPlannerApp() {
  const [activeNav, setActiveNav] = useState("Home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginMode, setLoginMode] = useState("login");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [guests, setGuests] = useState(initialGuests);
  const [newGuest, setNewGuest] = useState({ name:"", email:"", side:"Bride" });
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [bookingStatus, setBookingStatus] = useState("planning");
  const [paymentDone, setPaymentDone] = useState(false);
  const [inviteDownloaded, setInviteDownloaded] = useState(false);
  const [formData, setFormData] = useState({ email:"", password:"", name:"" });
  const [heroSlide, setHeroSlide] = useState(0);
  const [floatingPetals, setFloatingPetals] = useState([]);
  const [destFilter, setDestFilter] = useState("All");
  const [expandedDest, setExpandedDest] = useState(null);

  useEffect(() => {
    const petals = Array.from({length:18},(_,i)=>({ id:i, left:Math.random()*100, delay:Math.random()*10, duration:8+Math.random()*8, size:10+Math.random()*14, emoji:["🌸","🌺","🌹","✨","💮","🌷"][Math.floor(Math.random()*6)] }));
    setFloatingPetals(petals);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setHeroSlide(s=>(s+1)%HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const toggleVendor = id => setSelectedVendors(prev => prev.includes(id) ? prev.filter(v=>v!==id) : [...prev,id]);
  const addGuest = () => { if(!newGuest.name||!newGuest.email) return; setGuests(prev=>[...prev,{...newGuest,id:Date.now(),rsvp:"pending"}]); setNewGuest({name:"",email:"",side:"Bride"}); };
  const removeGuest = id => setGuests(prev=>prev.filter(g=>g.id!==id));
  const handlePayment = () => { setPaymentDone(true); setBookingStatus("confirmed"); setTimeout(()=>setActiveNav("My Bookings"),2000); };
  const handleLogin = () => { if(formData.email&&formData.password){setIsLoggedIn(true);setShowLogin(false);} };
  const navigate = page => { setActiveNav(page); if(!isLoggedIn&&page!=="Home") setShowLogin(true); };

  const statusSteps = [
    { label:"Planning Started", done:true },
    { label:"Destination Selected", done:!!selectedDestination },
    { label:"Package Chosen", done:!!selectedPackage },
    { label:"Vendors Booked", done:selectedVendors.length>0 },
    { label:"Payment Complete", done:paymentDone },
    { label:"Wedding Confirmed 🎉", done:bookingStatus==="confirmed" },
  ];

  const filteredDests = destFilter==="All" ? destinations : destinations.filter(d=>
    (destFilter==="Mexico"&&(d.name.includes("Mexico")||d.name.includes("Cancun"))) ||
    (destFilter==="Caribbean"&&(d.name.includes("Punta Cana")||d.name.includes("Aruba")||d.name.includes("Jamaica"))) ||
    (destFilter==="Europe"&&(d.name.includes("Greece")||d.name.includes("Italy")||d.name.includes("France")))
  );

  return (
    <div className="min-h-screen" style={{background:"#fdf8f4",fontFamily:"'Lato',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Lato:wght@300;400;700;900&display=swap');
        h1,h2,h3,h4,.font-display{font-family:'Cormorant Garamond',serif;}
        @keyframes floatPetal{0%{transform:translateY(-30px) rotate(0deg) translateX(0);opacity:0}10%{opacity:.9}50%{transform:translateY(50vh) rotate(360deg) translateX(30px)}90%{opacity:.5}100%{transform:translateY(110vh) rotate(720deg) translateX(-20px);opacity:0}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideRight{from{opacity:0;transform:translateX(-24px)}to{opacity:1;transform:translateX(0)}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}
        @keyframes heroKen{0%{transform:scale(1)}100%{transform:scale(1.06)}}
        .petal{position:fixed;pointer-events:none;animation:floatPetal linear infinite;z-index:0;}
        .fade-up{animation:fadeUp .65s ease both;}
        .slide-right{animation:slideRight .5s ease both;}
        .section-enter{animation:fadeUp .7s ease both;}
        .shimmer-btn{background:linear-gradient(90deg,#c8956c,#e8a87c,#d4845a,#c8956c);background-size:200% auto;animation:shimmer 2.5s linear infinite;color:white;}
        .card-hover{transition:transform .3s cubic-bezier(.34,1.56,.64,1),box-shadow .3s ease;}
        .card-hover:hover{transform:translateY(-7px) scale(1.015);box-shadow:0 28px 55px rgba(139,92,62,.18);}
        .glass{background:rgba(255,255,255,.72);backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.85);}
        .nav-pill{transition:all .22s ease;font-family:'Lato',sans-serif;}
        .nav-pill.active{background:linear-gradient(135deg,#c8956c,#e8a87c);color:white!important;}
        .nav-pill:not(.active):hover{background:rgba(200,149,108,.12);}
        .hero-bg{animation:heroKen 5s ease-in-out alternate infinite;}
        .dest-img-hover{transition:transform .5s ease;}
        .dest-card:hover .dest-img-hover{transform:scale(1.07);}
        .overlay-fade{transition:opacity .3s ease;opacity:0;}
        .dest-card:hover .overlay-fade{opacity:1;}
        .rsvp-confirmed{background:#dcfce7;color:#166534;}
        .rsvp-pending{background:#fef9c3;color:#854d0e;}
        .rsvp-declined{background:#fee2e2;color:#991b1b;}
        .heartbeat{animation:pulse 2s ease infinite;}
        .progress-fill{transition:width 1s ease;}
        input:focus,select:focus{outline:none;border-color:#c8956c;box-shadow:0 0 0 3px rgba(200,149,108,.12);}
        .slide-dot{transition:all .3s ease;}
      `}</style>

      {floatingPetals.map(p=>(
        <div key={p.id} className="petal" style={{left:`${p.left}%`,animationDelay:`${p.delay}s`,animationDuration:`${p.duration}s`,fontSize:`${p.size}px`}}>{p.emoji}</div>
      ))}

      {/* LOGIN MODAL
      {showLogin&&(
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{background:"rgba(20,5,0,.65)",backdropFilter:"blur(10px)"}}>
          <div className="glass rounded-3xl p-10 w-full max-w-md shadow-2xl section-enter relative">
            <button onClick={()=>setShowLogin(false)} className="absolute top-5 right-6 text-2xl text-rose-300 hover:text-rose-500">✕</button>
            <div className="text-center mb-8">
              <div className="text-4xl heartbeat mb-3">💍</div>
              <h2 className="text-4xl font-display" style={{color:"#5c3a2e"}}>{loginMode==="login"?"Welcome Back":"Begin Your Journey"}</h2>
              <p className="text-sm mt-1" style={{color:"#b08070"}}>{loginMode==="login"?"Sign in to continue planning":"Create your free account — Certified Specialist assigned at no cost"}</p>
            </div>
            {loginMode==="register"&&<input className="w-full mb-4 px-5 py-3 rounded-xl border border-rose-200 bg-white/80 text-sm" placeholder="Full Name" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})}/>}
            <input className="w-full mb-4 px-5 py-3 rounded-xl border border-rose-200 bg-white/80 text-sm" placeholder="Email Address" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})}/>
            <input type="password" className="w-full mb-5 px-5 py-3 rounded-xl border border-rose-200 bg-white/80 text-sm" placeholder="Password" value={formData.password} onChange={e=>setFormData({...formData,password:e.target.value})}/>
            <button onClick={handleLogin} className="w-full py-3 rounded-xl font-bold shadow-lg shimmer-btn mb-4 text-sm">{loginMode==="login"?"Sign In to My Account":"Create Free Account"}</button>
            <div className="text-center">
              <button className="text-sm underline" style={{color:"#c8956c"}} onClick={()=>setLoginMode(loginMode==="login"?"register":"login")}>{loginMode==="login"?"New here? Create a free account":"Already have an account? Sign In"}</button>
            </div>
          </div>
        </div>
      )} */}

      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 glass shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-3xl heartbeat">💍</span>
            <div>
              <h1 className="text-xl font-display leading-none" style={{color:"#5c3a2e"}}>Everlasting</h1>
              <p className="text-[10px] tracking-widest uppercase" style={{color:"#c8956c"}}>#1 Destination Wedding Specialist</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map(item=>(
              <button key={item} onClick={()=>navigate(item)} className={`nav-pill px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide ${activeNav===item?"active":""}`} style={{color:activeNav===item?"white":"#8b5c3e"}}>{item}</button>
            ))}
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="hidden md:block text-xs font-semibold" style={{color:"#c8956c"}}>📞 1-800-792-6898</span>
            <button onClick={()=>isLoggedIn?setIsLoggedIn(false):setShowLogin(true)} className="shimmer-btn text-xs px-5 py-2 rounded-full font-bold shadow-md">{isLoggedIn?"Sign Out":"Sign In"}</button>
          </div>
        </div>
        <div className="lg:hidden flex gap-1 px-4 pb-2 overflow-x-auto">
          {navItems.map(item=>(
            <button key={item} onClick={()=>navigate(item)} className={`nav-pill px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${activeNav===item?"active":""}`} style={{color:activeNav===item?"white":"#8b5c3e"}}>{item}</button>
          ))}
        </div>
      </nav>

      {/* ══ HOME ══════════════════════════════════════════ */}
      {activeNav==="Home"&&<HomeSection HERO_SLIDES={HERO_SLIDES} heroSlide={heroSlide} setHeroSlide={setHeroSlide} setShowLogin={setShowLogin} setLoginMode={setLoginMode} navigate={navigate} destinations={destinations} resortShowcase={resortShowcase} testimonials={testimonials} />}

      {/* ══ DESTINATIONS ══════════════════════════════════ */}
      {activeNav==="Destinations"&&<DestinationsSection destFilter={destFilter} setDestFilter={setDestFilter} filteredDests={filteredDests} expandedDest={expandedDest} setExpandedDest={setExpandedDest} selectedDestination={selectedDestination} setSelectedDestination={setSelectedDestination} setActiveNav={setActiveNav} />}

      {/* ══ PACKAGES ══════════════════════════════════════ */}
      {activeNav==="Packages"&&<PackagesSection packages={packages} selectedPackage={selectedPackage} setSelectedPackage={setSelectedPackage} setActiveNav={setActiveNav} />}

      {/* ══ VENDORS ═══════════════════════════════════════ */}
      {activeNav==="Vendors"&&<VendorsSection vendors={vendors} selectedVendors={selectedVendors} toggleVendor={toggleVendor} setActiveNav={setActiveNav} />}

      {/* ══ GUEST LIST ════════════════════════════════════ */}
      {activeNav==="Guest List"&&<GuestListSection guests={guests} newGuest={newGuest} setNewGuest={setNewGuest} addGuest={addGuest} removeGuest={removeGuest} setActiveNav={setActiveNav} />}

      {/* ══ PAYMENTS ══════════════════════════════════════ */}
      {activeNav==="Payments"&&<PaymentsSection paymentDone={paymentDone} selectedPackage={selectedPackage} packages={packages} selectedDestination={selectedDestination} selectedVendors={selectedVendors} guests={guests} handlePayment={handlePayment} />}

      {/* ══ INVITATIONS ═══════════════════════════════════ */}
      {activeNav==="Invitations"&&<InvitationsSection selectedDestination={selectedDestination} setInviteDownloaded={setInviteDownloaded} inviteDownloaded={inviteDownloaded} guests={guests} />}

      {/* ══ MY BOOKINGS ═══════════════════════════════════ */}
      {activeNav==="My Bookings"&&<MyBookingsSection bookingStatus={bookingStatus} statusSteps={statusSteps} selectedDestination={selectedDestination} selectedPackage={selectedPackage} packages={packages} selectedVendors={selectedVendors} vendors={vendors} guests={guests} paymentDone={paymentDone} setActiveNav={setActiveNav} />}

      {/* FOOTER */}
      <footer className="py-16 px-6" style={{background:"linear-gradient(135deg,#2d1510,#5c3a2e)"}}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4"><span className="text-3xl">💍</span><div><h2 className="text-2xl font-display text-white">Everlasting</h2><p className="text-xs" style={{color:"#c8956c"}}>Wedding Planners</p></div></div>
              <p className="text-xs leading-relaxed mb-3" style={{color:"#a08070"}}>The #1 provider of destination wedding travel services. Certified Specialists at no cost to you. Best of Weddings 2018–2025.</p>
              <p className="text-xs font-semibold" style={{color:"#c8956c"}}>📞 1-800-792-6898</p>
              <p className="text-xs mt-1" style={{color:"#7a5050"}}>TICO: 50019699</p>
            </div>
            {[
              {title:"Destinations",links:["Riviera Maya","Punta Cana","Cancun","Aruba","Jamaica","Santorini, Greece"]},
              {title:"Planning",links:["How It Works","Wedding Packages","Choose Vendors","Guest Management","Secure Payments","Download Invites"]},
              {title:"Company",links:["About Us","Our Specialists","Exclusive Offers","Blog & Guides","Awards","Contact Us"]},
            ].map(col=>(
              <div key={col.title}><h4 className="font-semibold text-white text-sm mb-4 tracking-wide">{col.title}</h4><ul className="space-y-2">{col.links.map(link=><li key={link}><span className="text-xs cursor-pointer hover:text-white transition-colors" style={{color:"#a08070"}}>{link}</span></li>)}</ul></div>
            ))}
          </div>
          <div className="border-t pt-8 flex flex-wrap justify-between items-center gap-4" style={{borderColor:"rgba(200,149,108,.2)"}}>
            <p className="text-xs" style={{color:"#6b4c3e"}}>© 2026 Everlasting Wedding Planners · Crafting love stories since 2018</p>
            <div className="flex gap-3 flex-wrap">
              {["🏆 Best of Weddings 2025","⭐ Couples' Choice 2026"].map(badge=><span key={badge} className="text-xs px-3 py-1 rounded-full border" style={{borderColor:"rgba(200,149,108,.3)",color:"#c8956c"}}>{badge}</span>)}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}