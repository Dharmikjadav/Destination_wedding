import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HERO_SLIDES, destinations, packages, resortShowcase, testimonials } from "../../data";
import { useUserContext } from '../../context/UserContext';

const HomeSection = () => {
  const navigate = useNavigate();
  const { currentSlide, setCurrentSlide } = useUserContext();
  return (
    <div>
      {/* HERO */}
      <div className="relative h-screen overflow-hidden">
        {HERO_SLIDES.map((slide, i) => (
          <div key={i} className="absolute inset-0" style={{ opacity: currentSlide === i ? 1 : 0, transition: "opacity 1.2s ease", zIndex: currentSlide === i ? 10 : 0 }}>
            <img src={slide.img} alt="" className="w-full h-full object-cover hero-bg" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(0,0,0,.15) 0%,rgba(20,5,0,.72) 100%)" }} />
          </div>
        ))}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">

          <h1 className="text-6xl md:text-8xl font-display text-white leading-tight mb-2">
            {HERO_SLIDES[currentSlide].title}
            <span className="block italic" style={{ color: "#fde68a" }}>{HERO_SLIDES[currentSlide].sub}</span>
          </h1>
          <p className="text-lg text-white/80 max-w-xl mb-10 leading-relaxed">{HERO_SLIDES[currentSlide].caption}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            {/* <button onClick={() => openlogin()} className="shimmer-btn px-10 py-4 rounded-full font-bold text-sm tracking-wide shadow-xl">Get a Free Consultation</button> */}
            <button onClick={() => navigate("/destinations")} className="px-10 py-4 rounded-full font-bold text-sm border-2 border-white text-white hover:bg-white/10 transition-all">Explore Destinations</button>
          </div>
          <div className="flex gap-2 mt-12">
            {HERO_SLIDES.map((_, i) => (
              <button key={i} onClick={() => setCurrentSlide(i)} className="slide-dot rounded-full" style={{ width: currentSlide === i ? 28 : 10, height: 10, background: currentSlide === i ? "#fde68a" : "rgba(255,255,255,.4)" }} />
            ))}
          </div>
        </div>
        {/* <div className="absolute bottom-6 left-6 z-20 text-white/50 text-xs tracking-wider hidden md:block">TICO Registration: 50019699 · Best of Weddings 2018–2025</div> */}
      </div>



      {/* HOW IT WORKS */}
      <div className="py-24 px-6" style={{ background: "linear-gradient(135deg,#fdf6ee,#fef3f3)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#c8956c" }}>Simple Process</p>
            <h2 className="text-5xl font-display mb-4" style={{ color: "#5c3a2e" }}>How It Works</h2>
            <p className="text-sm max-w-2xl mx-auto leading-relaxed" style={{ color: "#8b6058" }}>As the #1 provider of destination wedding travel services, we offer the expertise, personalized assistance and peace of mind needed to plan your perfect celebration abroad — all at no cost to you.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", icon: "📝", title: "Tell Us Your Vision", desc: "Fill out a brief form to help us understand what you're looking for in your celebration." },
              { step: "02", icon: "🤝", title: "Meet Your Specialist", desc: "We pair you with a Certified Destination Wedding Specialist whose expertise matches your preferences." },
              { step: "03", icon: "🏨", title: "Choose Your Resort", desc: "Your Specialist selects the best destination, secures your room block and books all reservations." },
              { step: "04", icon: "💍", title: "Celebrate in Paradise", desc: "Your onsite Wedding Coordinator handles setup, décor, and timeline. You just show up and say 'I do'." },
            ].map((s, i) => (
              <div key={s.step} className="glass rounded-2xl p-7 card-hover shadow-md">
                <div className="text-4xl mb-3">{s.icon}</div>
                <p className="text-5xl font-display font-bold mb-2" style={{ color: "rgba(200,149,108,.18)" }}>{s.step}</p>
                <h3 className="font-display text-xl mb-2" style={{ color: "#5c3a2e" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#8b6058" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DESTINATIONS PREVIEW */}
      <div className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#c8956c" }}>Most Popular</p>
          <h2 className="text-5xl font-display mb-4" style={{ color: "#5c3a2e" }}>Top Wedding Destinations</h2>
          <p className="text-sm max-w-xl mx-auto" style={{ color: "#8b6058" }}>Popular choices include Mexico and the Caribbean, where numerous all-inclusive resorts provide affordable packages covering everything from ceremony to reception.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {destinations.slice(0, 3).map((d, i) => (
            <div
              key={d.id}
              className="dest-card card-hover rounded-2xl overflow-hidden shadow-lg cursor-pointer relative h-80"
              onClick={() => navigate("Destinations")}
            >
              <div className="overflow-hidden h-full"><img src={d.img} alt={d.name} className="w-full h-full object-cover dest-img-hover" /></div>
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,transparent 40%,rgba(0,0,0,.75) 100%)" }} />
              <div className="overlay-fade absolute inset-0 flex items-center justify-center" style={{ background: "rgba(92,58,46,.5)" }}>
                <span className="text-white font-bold text-sm border border-white/60 px-6 py-2 rounded-full backdrop-blur-sm">Explore Venue</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="inline-block text-xs px-3 py-1 rounded-full mb-2 font-semibold" style={{ background: "rgba(200,149,108,.9)", color: "white" }}>{d.tag}</span>
                <h3 className="text-xl font-display text-white">{d.name}</h3>
                <p className="text-xs text-white/70 mt-1">{d.startingPrice}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center"><button onClick={() => navigate("Destinations")} className="shimmer-btn px-10 py-3.5 rounded-full font-bold text-sm shadow-lg">View All 6 Destinations →</button></div>
      </div>

      {/* RESORT SHOWCASE */}
      <div className="py-24 px-6" style={{ background: "linear-gradient(135deg,#fce8ec,#fdf6ee,#fef3f3)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#c8956c" }}>Exclusive Partner Deals</p>
            <h2 className="text-5xl font-display mb-4" style={{ color: "#5c3a2e" }}>Featured Resort Offers</h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: "#8b6058" }}>Discover amazing destination wedding savings you won't find anywhere else — from our wide variety of preferred partner hotels & resorts.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {resortShowcase.map(r => (
              <div key={r.name} className="card-hover rounded-2xl overflow-hidden shadow-lg bg-white">
                <div className="relative h-48 overflow-hidden">
                  <img src={r.img} alt={r.name} className="w-full h-full object-cover dest-img-hover" />
                  <div className="absolute top-3 left-3"><span className="text-xs px-3 py-1 rounded-full font-bold shimmer-btn">{r.badge}</span></div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl mb-1" style={{ color: "#5c3a2e" }}>{r.name}</h3>
                  <p className="text-xs mb-3" style={{ color: "#b08070" }}>📍 {r.location}</p>
                  <div className="p-3 rounded-xl text-sm font-semibold mb-4" style={{ background: "#fef9c3", color: "#854d0e" }}>🎁 {r.offer}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-500">{"★".repeat(Math.floor(r.rating))}<span className="text-xs text-gray-400 ml-1">{r.rating}</span></span>
                    <button onClick={() => navigate("/packages")} className="shimmer-btn text-xs px-4 py-2 rounded-full font-bold">View Deal</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ALL-INCLUSIVE BANNER */}
      <div className="py-20 px-6" style={{ background: "linear-gradient(135deg,#5c3a2e 0%,#8b5c3e 50%,#5c3a2e 100%)" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#e8a87c" }}>Why All-Inclusive?</p>
            <h2 className="text-4xl font-display text-white mb-5">Everything Bundled Into One Low Rate</h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#d4a890" }}>An all-inclusive destination wedding bundles all your needs — décor, flowers, DJ, photography — into one affordable rate. Many packages can be <strong className="text-white">completely free</strong> when you book a qualifying room block, or start as low as $500.</p>
            <div className="space-y-2.5">
              {["Ceremony décor & setup included", "Reception dinner for all guests", "Photography & video coverage", "Open bar throughout your celebration", "Dedicated onsite wedding coordinator", "Marriage document preparation assistance"].map(f => (
                <div key={f} className="flex items-center gap-3"><span className="text-green-400">✓</span><span className="text-sm" style={{ color: "#e8d5c8" }}>{f}</span></div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=700&q=80" alt="All inclusive wedding" className="w-full h-80 object-cover" />
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="py-24 px-6" style={{ background: "#fdf6ee" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#c8956c" }}>Real Couples</p>
            <h2 className="text-5xl font-display mb-4" style={{ color: "#5c3a2e" }}>Love Stories Told</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.couple} className="glass rounded-2xl p-7 shadow-md card-hover">
                <div className="flex mb-4">{Array.from({ length: t.stars }).map((_, i) => <span key={i} className="text-yellow-500">★</span>)}</div>
                <p className="text-sm italic leading-relaxed mb-6" style={{ color: "#6b4c3e" }}>"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.img} alt={t.couple} className="w-12 h-12 rounded-full object-cover border-2 border-rose-200" />
                  <div><p className="font-display font-bold" style={{ color: "#5c3a2e" }}>{t.couple}</p><p className="text-xs" style={{ color: "#b08070" }}>📍 {t.location}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 px-6 text-center" style={{ background: "linear-gradient(135deg,#fce8ec,#fdf6ee)" }}>
        <h2 className="text-5xl font-display mb-4" style={{ color: "#5c3a2e" }}>Ready to Start Planning?</h2>
        <p className="text-sm max-w-lg mx-auto mb-8" style={{ color: "#8b6058" }}>Get a FREE consultation with a Certified Destination Wedding Specialist — and be automatically entered to win a $500 Amazon Gift Card!</p>
        <button onClick={() => navigate("/")} className="shimmer-btn px-14 py-5 rounded-full font-bold text-lg shadow-2xl">Get My Free Consultation 🎁</button>
      </div>
    </div>
  );
};

export default HomeSection;