interface Fixture {
  match: string;
  league: string;
  over15: string;
  gg: string;
  over25: string;
}

interface MatchGroup {
  dateHeading: string;
  fixtures: Fixture[];
}

export default function DailyPredictionsList({ matchGroups }: { matchGroups: MatchGroup[] }) {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-8 bg-[#0a0f1d]">
      {matchGroups.map((group, groupIdx) => (
        <div key={groupIdx} className="space-y-3">
          
          {/* Visual Column Heading Anchor with the Dynamic Date */}
          <div className="grid grid-cols-12 text-xs font-bold text-gray-400 uppercase tracking-wider bg-[#111827] p-4 rounded-xl border border-gray-800 shadow-sm">
            <div className="col-span-6 flex items-center space-x-2">
              <span className="text-orange-500">📅</span>
              <span className="text-white text-sm font-extrabold">{group.dateHeading} Fixtures</span>
            </div>
            <div className="col-span-2 text-center text-blue-400 font-mono text-[11px]">
              Over 1.5 ({group.dateHeading.split(',')[0]})
            </div>
            <div className="col-span-2 text-center text-purple-400 font-mono text-[11px]">
              GG (Center)
            </div>
            <div className="col-span-2 text-center text-emerald-400 font-mono text-[11px]">
              Over 2.5 ({group.dateHeading.split(',')[0]})
            </div>
          </div>

          {/* Individual Matches List */}
          <div className="space-y-2">
            {group.fixtures.map((item, idx) => (
              <div 
                key={idx} 
                className="grid grid-cols-12 items-center bg-[#161e2e] hover:bg-[#1f293d] transition-all p-3 rounded-lg border border-gray-800/60 shadow-inner"
              >
                {/* Left Side: Match info */}
                <div className="col-span-6">
                  <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tight block">
                    {item.league}
                  </span>
                  <span className="text-sm font-medium text-white block mt-0.5">
                    {item.match}
                  </span>
                </div>

                {/* Left Market Column */}
                <div className="col-span-2 text-center text-sm font-bold text-blue-400 font-mono">
                  {item.over15}
                </div>

                {/* Center Market Column */}
                <div className="col-span-2 text-center text-sm font-bold text-purple-400 font-mono">
                  {item.gg}
                </div>

                {/* Right Market Column */}
                <div className="col-span-2 text-center text-sm font-bold text-emerald-400 font-mono">
                  {item.over25}
                </div>
              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
}
