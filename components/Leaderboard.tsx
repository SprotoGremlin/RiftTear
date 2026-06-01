"use client";

import { useState } from "react";
import { Trophy, Zap, Flame } from "lucide-react";

const mockLeaders = [
  { rank: 1, address: "0x8f3...a2b", score: 18420, skin: "Legendary Rift King", color: "#ffcc00" },
  { rank: 2, address: "0x4d7...f9c", score: 16280, skin: "Epic Void Runner", color: "#001a66" },
  { rank: 3, address: "0x2e9...b1d", score: 15440, skin: "Rare Glitch Phantom", color: "#3c8aff" },
  { rank: 4, address: "0x7a1...e8f", score: 14210, skin: "Common Base Blazer", color: "#0052FF" },
  { rank: 5, address: "0x9c3...d4e", score: 13890, skin: "Common Base Blazer", color: "#0052FF" },
];

export default function Leaderboard() {
  const [selectedRank, setSelectedRank] = useState<number | null>(null);

  return (
    <div className="glass w-full max-w-2xl mx-auto p-6 border border-[#0052FF]/30">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Trophy className="w-7 h-7 text-[#ffcc00]" />
          <div>
            <div className="text-3xl font-black tracking-[-1px]">GLOBAL LEADERBOARD</div>
            <div className="text-xs text-[#0052FF] tracking-[2px]">TOP RIFT TEARS • ONCHAIN</div>
          </div>
        </div>
        <div className="text-xs px-4 py-2 bg-black/60 border border-[#0052FF]/40 rounded-2xl font-mono flex items-center gap-2">
          <Flame className="w-3.5 h-3.5 text-[#ff3366]" />
          LIVE
        </div>
      </div>

      <div className="space-y-2">
        {mockLeaders.map((leader) => (
          <div
            key={leader.rank}
            onClick={() => setSelectedRank(leader.rank)}
            className={`group flex items-center justify-between px-6 py-4 rounded-3xl border transition-all cursor-pointer ${
              selectedRank === leader.rank
                ? "border-[#ffcc00] bg-[#ffcc00]/10"
                : "border-white/10 hover:border-[#0052FF]/60 hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-6">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-2xl font-black text-xl ${
                  leader.rank === 1
                    ? "bg-[#ffcc00] text-black"
                    : leader.rank === 2
                    ? "bg-[#c0c0c0] text-black"
                    : leader.rank === 3
                    ? "bg-[#cd7f32] text-white"
                    : "bg-white/10 text-white/70"
                }`}
              >
                {leader.rank}
              </div>
              
              <div className="font-mono text-sm text-white/80 group-hover:text-white">
                {leader.address}
              </div>
              
              <div className="text-xs px-3 py-1 rounded-2xl border border-white/20 text-white/50">
                {leader.skin}
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-3xl font-mono text-[#0052FF] tracking-[-1px]">
                  {leader.score.toLocaleString()}
                </div>
                <div className="text-[10px] text-white/40">TEARS</div>
              </div>

              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black"
                style={{ backgroundColor: leader.color }}
              >
                <Zap className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center text-xs text-white/40 font-mono tracking-widest flex items-center justify-center gap-4">
        <div className="h-px w-12 bg-white/20"></div>
        REALITY LEADERBOARD • UPDATED LIVE ON BASE
        <div className="h-px w-12 bg-white/20"></div>
      </div>
    </div>
  );
}
