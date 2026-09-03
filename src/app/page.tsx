'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface MatchPrediction {
  match: string;
  league: string;
  market: string;
  confidence: string;
  status: string;
}

export default function HomePage() {
  const [predictions, setPredictions] = useState<MatchPrediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchLivePredictions() {
      try {
        // Fetch directly from your live Football-Data.org AI API engine route
        const response = await fetch('/api/predict');
        const data = await response.json();
        
        if (data.success && data.dailyPredictions) {
          // If the AI returns a string, try to parse it, otherwise adapt structured records
          let parsedData = [];
          try {
            parsedData = JSON.parse(data.dailyPredictions);
          } catch {
            // Backup handling if OpenAI returns formatted raw texts instead of strict JSON arrays
            parsedData = [
              { match: "Live Fixtures Processed", league: "Global", market: data.dailyPredictions, confidence: "90%", status: "AI Pick" }
            ];
          }
          setPredictions(parsedData);
        } else if (data.message) {
          setError(data.message); // Handles "No football matches scheduled for today"
        } else {
          setError('Failed to gather today\'s operational data matrix analytics feeds.');
        }
      } catch {
        setError('Sports prediction networks are currently offline.');
      } finally {
        setLoading(false);
      }
    }

    fetchLivePredictions();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* Navigation Header Section */}
      <header className="border-b border-slate-900 bg-slate-900/50 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">⚽</span>
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">AI.Predictor</span>
        </div>
        <nav className="flex items-center space-x-6">
          <Link href="/" className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition">Premium Picks</Link>
        </nav>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/20">
            <span>✨</span> <span>Algorithmic Betting Intelligence Active</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-none">Daily Premium Football Matches Analysis</h1>
          <p className="text-slate-400 text-base md:text-lg">Data-driven football predictions compiled automatically using historic scoring trends and deep team analytics models.</p>
        </div>

        <h2 className="text-xl font-extrabold mb-6 flex items-center space-x-2 text-slate-300">
          <span>🔥</span> <span>Today's Verified Predictions Feed</span>
        </h2>

        {/* Loading State UI */}
        {loading && (
          <div className="text-center py-20 text-slate-500 font-mono text-sm animate-pulse">
            🔄 Querying Football-Data networks & generating AI analytics models...
          </div>
        )}

        {/* Error / Empty Schedule State UI */}
        {error && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
            <span className="text-2xl block mb-2">📋</span>
            {error}
          </div>
        )}

        {/* Live Active Prediction Cards Grid Layout */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {predictions.map((pred, i) => (
              <div key={i} className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-emerald-500/30 transition-all duration-300 shadow-xl group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{pred.league || "Leagues"}</span>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 font-extrabold px-2.5 py-1 rounded-md border border-emerald-500/10">{pred.status || "Premium"}</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition mb-6">{pred.match}</h3>
                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800/50">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Target Market Selection</span>
                  <div className="text-sm font-mono text-slate-200 font-bold mb-3">{pred.market}</div>
                  <div className="flex items-center justify-between border-t border-slate-900 pt-2 text-xs">
                    <span className="text-slate-500 font-medium">Model Confidence Metric</span>
                    <span className="font-mono font-black text-emerald-400 text-sm">{pred.confidence || "90%"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
            <svg className="h-3.5 w-3.5 mr-2 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            @CC_Davez
          </a>
        </div>
      </footer>
    </div>
  );
}
