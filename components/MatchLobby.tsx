"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sword, Users, Clock, Search, Zap } from "lucide-react";

interface Match {
  id: string;
  bet: string;
  opponent: string;
  time: string;
  status?: string;
}

interface MatchLobbyProps {
  matches: Match[];
  onJoinMatch: (match: Match) => void;
  onCreateMatch: () => void;
}

export default function MatchLobby({ matches, onJoinMatch, onCreateMatch }: MatchLobbyProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "low" | "medium" | "high">("all");

  const filteredMatches = matches
    .filter((match) => {
      const matchesSearch =
        match.opponent.toLowerCase().includes(searchTerm.toLowerCase()) ||
        match.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const bet = parseFloat(match.bet);
      if (filter === "low") return bet <= 0.05;
      if (filter === "medium") return bet > 0.05 && bet <= 0.1;
      if (filter === "high") return bet > 0.1;
      return true;
    })
    .sort((a, b) => parseFloat(b.bet) - parseFloat(a.bet));

  return (
    <div className="glass border border-white/10 p-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#0052FF]/10">
              <Users className="w-7 h-7 text-[#0052FF]" />
            </div>
            <div>
              <div className="text-4xl font-semibold tracking-tight">MATCH LOBBY</div>
              <div className="text-sm text-white/50 tracking-[2px]">ONCHAIN • REAL-TIME • BASE</div>
            </div>
          </div>
        </div>

        <button
          onClick={onCreateMatch}
          className="rift-btn flex items-center justify-center gap-3 px-8 py-3.5 text-sm font-semibold border-2 border-[#0052FF] hover:bg-[#0052FF] hover:text-black active:scale-[0.985] transition-all"
        >
          <Sword className="w-4 h-4" /> CREATE NEW MATCH
        </button>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search by match ID or opponent..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black border border-white/20 pl-12 py-3.5 text-sm placeholder:text-white/40 focus:outline-none focus:border-[#0052FF] rounded-2xl"
          />
        </div>

        <div className="flex gap-2">
          {(["all", "low", "medium", "high"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-3 text-xs tracking-[1.5px] border transition-all rounded-2xl ${
                filter === f
                  ? "border-[#0052FF] bg-[#0052FF]/10 text-[#0052FF]"
                  : "border-white/20 hover:border-white/50"
              }`}
            >
              {f === "all" ? "ALL" : f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Matches List */}
      {filteredMatches.length > 0 ? (
        <div className="space-y-3">
          {filteredMatches.map((match, index) => {
            const pot = (parseFloat(match.bet) * 2).toFixed(2);
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.005 }}
                onClick={() => onJoinMatch(match)}
                className="group flex items-center justify-between px-7 py-5 border border-white/10 hover:border-[#0052FF] bg-black/40 rounded-3xl cursor-pointer transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#0052FF]/10 flex items-center justify-center">
                    <Zap className="w-7 h-7 text-[#0052FF]" />
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <div className="font-mono text-xl text-[#0052FF]">{match.bet} ETH</div>
                      <div className="text-xs px-3 py-px border border-white/30 rounded-full text-white/60">POT {pot} ETH</div>
                    </div>
                    <div className="text-sm text-white/50 mt-1">
                      vs {match.opponent} • {match.time}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right text-xs text-white/40 font-mono tracking-widest hidden md:block">
                    {match.id}
                  </div>
                  <div className="rift-btn px-8 py-3 text-sm border border-[#0052FF] group-hover:bg-[#0052FF] group-hover:text-black transition-all flex items-center gap-2">
                    JOIN <Sword className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-white/20 rounded-3xl">
          <div className="text-6xl mb-4 opacity-40">👾</div>
          <div className="text-xl text-white/60">No matches found</div>
          <div className="text-sm text-white/40 mt-2">Try a different filter or create a new match</div>
        </div>
      )}

      <div className="mt-8 text-center text-[10px] text-white/40 tracking-[2px]">
        All matches secured by smart contract escrow • Instant onchain settlement
      </div>
    </div>
  );
}
