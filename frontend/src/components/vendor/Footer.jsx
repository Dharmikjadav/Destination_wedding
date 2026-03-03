import React from 'react'

export const Footer = () => {
  return (
    <footer className="mt-auto py-6 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          © 2024 Everlasting <span className="text-pink-600">Authority</span> Portal
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-[10px] text-slate-400 font-bold hover:text-pink-600 uppercase tracking-widest transition-colors">Privacy Policy</a>
          <a href="#" className="text-[10px] text-slate-400 font-bold hover:text-pink-600 uppercase tracking-widest transition-colors">Support Center</a>
          <a href="#" className="text-[10px] text-slate-400 font-bold hover:text-pink-600 uppercase tracking-widest transition-colors">API Docs</a>
        </div>
      </div>
    </footer>
  );
}
