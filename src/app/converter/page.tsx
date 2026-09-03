'use client';

import React, { useState } from 'react';
import { marketDictionary, BettingMarket, Platform } from '../../utils/codeConverter';

export default function ConverterPage() {
  const [sourcePlatform, setSourcePlatform] = useState<Platform>('bet9ja');
  const [targetPlatform, setTargetPlatform] = useState<Platform>('sportyBet');
  const [selectedMarket, setSelectedMarket] = useState<BettingMarket>('OV15');
  const [inputNotes, setInputNotes] = useState('');

  const platforms: { id: Platform; name: string }[] = [
    { id: 'bet9ja', name: 'Bet9ja' },
    { id: 'betway', name: 'Betway' },
    { id: 'paripesa', name: 'Paripesa' },
    { id: 'oneXBet', name: '1xBet' },
    { id: 'sportyBet', name: 'SportyBet' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700">
        <h1 className="text-3xl font-extrabold mb-2 text-emerald-400 text-center">⚽ Slip Market Code Converter</h1>
        <p className="text-slate-400 text-sm text-center mb-6">Translate your slip selections across popular African Sportsbooks instantly.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Convert From</label>
            <select 
              value={sourcePlatform} 
              onChange={(e) => setSourcePlatform(e.target.value as Platform)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
            >
              {platforms.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Convert To</label>
            <select 
              value={targetPlatform} 
              onChange={(e) => setTargetPlatform(e.target.value as Platform)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
            >
              {platforms.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Select Betting Market Vector</label>
          <select 
            value={selectedMarket} 
            onChange={(e) => setSelectedMarket(e.target.value as BettingMarket)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
          >
            {Object.keys(marketDictionary).map((key) => (
              <option key={key} value={key}>{marketDictionary[key as BettingMarket].label}</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Paste Original Slip Content / Notes (Optional)</label>
          <textarea
            placeholder="Paste your selection summary info or game text codes here..."
            value={inputNotes}
            onChange={(e) => setInputNotes(e.target.value)}
            className="w-full h-24 bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 resize-none text-sm placeholder-slate-600"
          />
        </div>

        <div className="bg-slate-950 rounded-xl p-5 border border-emerald-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-bl-xl text-xs font-bold uppercase tracking-widest">Resulting Code Output</div>
          <div className="space-y-3">
            <div>
              <span className="text-xs text-slate-500 font-bold block uppercase">Source Value ({sourcePlatform.toUpperCase()})</span>
              <span className="text-lg font-mono text-slate-300">{marketDictionary[selectedMarket][sourcePlatform]}</span>
            </div>
            <div className="border-t border-slate-800 pt-3">
              <span className="text-xs text-emerald-500 font-bold block uppercase">Converted Value ({targetPlatform.toUpperCase()})</span>
              <span className="text-2xl font-mono font-extrabold text-emerald-400 tracking-wide">
                {marketDictionary[selectedMarket][targetPlatform]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
