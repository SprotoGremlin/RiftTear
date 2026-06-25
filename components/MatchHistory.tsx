"use client";

import { useState } from "react";

export default function MatchHistory({ onJoinMatch }: { onJoinMatch: (match: any) => void }) {
  const [matches] = useState([
    { id: "m420", bet: "0.08", pot: "0.16", status: "WAITING", players: "1/2" },
    { id: "m421", bet: "0.22", pot: "0.44", status: "LIVE", players: "2/2" },
    { id: "m422", bet: "0.01", pot: "0.02", status: "ENDED", players: "2/2" },
  ]);

  return (
    <div className="glass p-6 border border-white/20">
      <div className="font-semibold mb-4 flex justify-between">
        RECENT MATCHES <span className="text-xs text-[#00ffcc]">3 LIVE • TAP TO JOIN</span>
      </div>
      <div className="space-y-3">
        {matches.map((m) => (
          <div key={m.id} className="flex justify-between items-center p-4 border border-white/10 rounded-3xl hover:border-[#0052FF]">
            <div>
              <div className="font-mono text-sm text-[#0052FF]">{m.id}</div>
              <div>{m.players} • {m.bet} ETH BET</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-white">{m.pot} ETH POT</div>
              <button 
                onClick={() => onJoinMatch(m)}
                className="mt-2 px-5 py-1 bg-white text-black text-xs font-bold rounded-2xl hover:bg-white/90"
              >
                {m.status === "WAITING" ? "JOIN" : m.status === "LIVE" ? "WATCH" : "VIEW"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center text-xs mt-4 text-white/40">Full history coming in commit 60 • All onchain</div>
    </div>
  );
}
