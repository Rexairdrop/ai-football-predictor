'use client';

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  // Temporary premium mock dataset to showcase the visual cards layout cleanly
  const mockPredictions = [
    { match: "Arsenal vs Chelsea", league: "Premier League", market: "Premium Over 1.5 Goals", confidence: "96%", status: "Near Perfect" },
    { match: "Real Madrid vs Barcelona", league: "La Liga", market: "GG (Both Teams To Score)", confidence: "89%", status: "Premium Pick" },
    { match: "Bayern Munich vs Dortmund", league: "Bundesliga", market: "Home/Away Win (No Draw)", confidence: "84%", status: "Straight Win" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* Navigation Header bar section wrapper */}
      <header className="border-b border-slate-900 bg-slate-900/50 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">⚽</span>
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">AI.Predictor</span>
        </div>
        <nav className="flex items-center space-x-6">
          <Link href="/" className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition">Premium Picks</Link>
      
        </nav>
      </header>

      {/* Main hero dashboard marketing layout block section entry path */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/20">
            <span>✨</span> <span>Algorithmic Betting Intelligence Live</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-none">Daily Premium Football Matches Analysis</h1>
          <p className="text-slate-400 text-base md:text-lg">Data-driven football predictions compiled automatically using historic scoring trends and deep team analytics models.</p>
        </div>

        {/* Dynamic analytics card container distribution mapping modules loop grid row grid layout */}
        <h2 className="text-xl font-extrabold mb-6 flex items-center space-x-2 text-slate-300">
          <span>🔥</span> <span>Today's Verified Predictions Feed</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {mockPredictions.map((pred, i) => (
            <div key={i} className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-emerald-500/30 transition-all duration-300 shadow-xl group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{pred.league}</span>
                <span className="text-xs bg-emerald-500/10 text-emerald-400 font-extrabold px-2.5 py-1 rounded-md border border-emerald-500/10">{pred.status}</span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition mb-6">{pred.match}</h3>
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800/50">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Target Market Selection</span>
                <div className="text-sm font-mono text-slate-200 font-bold mb-3">{pred.market}</div>
                <div className="flex items-center justify-between border-t border-slate-900 pt-2 text-xs">
                  <span className="text-slate-500 font-medium">Model Confidence Metric</span>
                  <span className="font-mono font-black text-emerald-400 text-sm">{pred.confidence}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
            {/* Visual Platform Footer Section */}
      <footer className="mt-20 border-t border-slate-900 bg-slate-950/80 py-8 px-6 text-center text-sm text-slate-500">
        <p className="mb-2">
          © {new Date().getFullYear()} Built by <span className="text-slate-300 font-semibold">Davidrexng</span>. All Rights Reserved.
        </p>
        <div className="flex items-center justify-center space-x-2 text-slate-400">
          <span>Follow the journey on:</span>
          <a 
            href="https://x.com/CC_Davez" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center bg-slate-900 hover:bg-slate-800 text-white font-medium px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 transition"
          >
            {/* SVG Modern X Icon Logo */}
            <svg 
              className="h-3.5 w-3.5 mr-2 fill-current" 
              viewBox="0 0 24 24" 
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            @CC_Davez
          </a>
        </div>
      </footer>
    </div>
  );
}
