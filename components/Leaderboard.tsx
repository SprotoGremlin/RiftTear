"use client";

import { useState, useEffect } from "react";
import { Trophy, Zap, Flame, CheckCircle } from "lucide-react";

interface LeaderboardProps {
  data: {
    rank: number;
    address: string;
    score: number;
    skin: string;
    color: string;
    verified: boolean;
  }[];
}

export default function Leaderboard({ data }: LeaderboardProps) {
  const [leaders, setLeaders] = useState(data);
  const [selectedRank, setSelectedRank] = useState<number | null>(null);
  const [glitchTrigger, setGlitchTrigger] = useState(0);

  // Sync live data from parent + glitch pulse
  useEffect(() => {
    setLeaders(data);
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchTrigger((prev) => prev + 1);
      // Shuffle one entry for live feel
      setLeaders((prev) => {
        const copy = [...prev];
        const idx = Math.floor(Math.random() * copy.length);
        const temp = copy[idx];
        copy[idx] = copy[(idx + 1) % copy.length];
        copy[(idx + 1) % copy.length] = temp;
        return copy;
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass w-full max-w-2xl mx-auto p-6 border border-[#0052FF]/30 relative overflow-hidden">
      {/* Glitch overlay */}
      <div
        key={glitchTrigger}
        className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#0052FF_0,#0052FF_2px,transparent_2px,transparent_6px)] opacity-10 pointer-events-none animate-[glitch_0.3s_linear_infinite]"
        style={{
          animation: glitchTrigger % 2 === 0 ? "glitch 120ms linear infinite" : "none",
        }}
      />

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Trophy className="w-7 h-7 text-[#ffcc00]" />
          <div>
            <div className="text-3xl font-black tracking-[-1px]">GLOBAL LEADERBOARD</div>
            <div className="text-xs text-[#0052FF] tracking-[2px]">TOP RIFT TEARS • LIVE ON BASE</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs px-4 py-2 bg-black/60 border border-[#0052FF]/40 rounded-2xl font-mono">
          <Flame className="w-3.5 h-3.5 text-[#ff3366]" />
          <span className="text-[#00ffcc]">4,821</span>
          <span className="text-white/60">TEARS THIS HOUR</span>
        </div>
      </div>

      <div className="space-y-2">
        {leaders.map((leader) => (
          <div
            key={leader.rank}
            onClick={() => setSelectedRank(leader.rank)}
            className={`group flex items-center justify-between px-6 py-4 rounded-3xl border transition-all cursor-pointer relative ${
              selectedRank === leader.rank
                ? "border-[#ffcc00] bg-[#ffcc00]/10"
                : "border-white/10 hover:border-[#0052FF]/60 hover:bg-white/5"
            }`}
          >
            {/* Verified badge */}
            {leader.verified && (
              <div className="absolute -top-1 -right-1 bg-[#00ffcc] text-black text-[10px] font-bold px-2 py-0.5 rounded-bl-3xl flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                ONCHAIN
              </div>
            )}

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
        REALITY LEADERBOARD • VERIFIED ON BASESCAN
        <div className="h-px w-12 bg-white/20"></div>
      </div>

      {/* CSS for glitch animation */}
      <style jsx>{`
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
      `}</style>
    </div>
  );
}
