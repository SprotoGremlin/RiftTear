import { ConnectWallet, Wallet, WalletDropdown, WalletDropdownLink, WalletDropdownDisconnect } from "@coinbase/onchainkit/wallet";
import { Address, Identity, Name, Avatar } from "@coinbase/onchainkit/identity";
import { useAccount } from "wagmi";
import RiftGame from "@/components/RiftGame";
import SkinGallery from "@/components/SkinGallery";
import MatchCreator from "@/components/MatchCreator";
import ClaimWinnings from "@/components/ClaimWinnings";
import Leaderboard from "@/components/Leaderboard";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const { address, isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<"lobby" | "skins" | "leaderboard">("lobby");
  const [equippedSkinId, setEquippedSkinId] = useState(1);
  const [liveMatches, setLiveMatches] = useState([
    { id: "match-1", bet: "0.05", players: 2, pot: "0.10" },
    { id: "match-2", bet: "0.12", players: 2, pot: "0.24" },
  ]);
  const [activeMatch, setActiveMatch] = useState<any>(null);

  // Live leaderboard state (mock onchain data)
  const [leaderboardData, setLeaderboardData] = useState([
    { rank: 1, address: "0x8f3...a2b", score: 18420, skin: "Legendary Rift King", color: "#ffcc00", verified: true },
    { rank: 2, address: "0x4d7...f9c", score: 16280, skin: "Epic Void Runner", color: "#001a66", verified: true },
    { rank: 3, address: "0x2e9...b1d", score: 15440, skin: "Rare Glitch Phantom", color: "#3c8aff", verified: true },
    { rank: 4, address: "0x7a1...e8f", score: 14210, skin: "Common Base Blazer", color: "#0052FF", verified: false },
    { rank: 5, address: "0x9c3...d4e", score: 13890, skin: "Common Base Blazer", color: "#0052FF", verified: false },
  ]);

  const handleEquipSkin = (id: number) => {
    setEquippedSkinId(id);
    localStorage.setItem("equippedSkinId", id.toString());
  };

  const handleMatchCreated = (matchId: string) => {
    console.log("Match created:", matchId);
  };

  const handleGameEnd = (score: number) => {
    console.log("Game ended with score:", score);
    if (score >= 420) {
      // Future: auto-open claim
    }
    // Live sync to leaderboard
    setLeaderboardData((prev) => {
      const newEntry = {
        rank: prev.length + 1,
        address: address ? address.slice(0, 6) + "..." + address.slice(-4) : "0xYOU...",
        score: score,
        skin: `Skin #${equippedSkinId}`,
        color: "#0052FF",
        verified: true,
      };
      const updated = [newEntry, ...prev].slice(0, 5);
      // Re-rank
      return updated.map((entry, i) => ({ ...entry, rank: i + 1 }));
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden">
      {/* NAV */}
      <nav className="glass border-b border-[#0052FF]/30 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-4xl font-black tracking-[-3px] text-[#0052FF]">RIFT</div>
          <div className="text-4xl font-black tracking-[-3px] text-white">TEAR</div>
        </div>

        <div className="flex items-center gap-8 text-sm font-medium">
          <button
            onClick={() => setActiveTab("lobby")}
            className={`px-6 py-2 rounded-3xl transition-all ${activeTab === "lobby" ? "bg-[#0052FF] text-black" : "hover:bg-white/10"}`}
          >
            LOBBY
          </button>
          <button
            onClick={() => setActiveTab("skins")}
            className={`px-6 py-2 rounded-3xl transition-all ${activeTab === "skins" ? "bg-[#0052FF] text-black" : "hover:bg-white/10"}`}
          >
            SKINS
          </button>
          <button
            onClick={() => setActiveTab("leaderboard")}
            className={`px-6 py-2 rounded-3xl transition-all ${activeTab === "leaderboard" ? "bg-[#0052FF] text-black" : "hover:bg-white/10"}`}
          >
            LEADERBOARD
          </button>
        </div>

        <div className="flex items-center gap-4">
          {isConnected && address ? (
            <Wallet>
              <WalletDropdown>
                <Identity className="px-4 py-3">
                  <Avatar />
                  <Name />
                  <Address />
                </Identity>
                <WalletDropdownLink icon="wallet" href="https://keys.coinbase.com">
                  Wallet
                </WalletDropdownLink>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          ) : (
            <ConnectWallet>
              <button className="px-8 py-3 bg-[#0052FF] hover:bg-[#0033aa] text-black font-semibold rounded-3xl transition-all active:scale-95">
                CONNECT WALLET
              </button>
            </ConnectWallet>
          )}

          <Link href="https://base.org" target="_blank" className="text-xs px-4 py-2 border border-[#0052FF]/40 rounded-3xl flex items-center gap-2 hover:border-[#0052FF]">
            <span className="text-[#0052FF]">⛓️</span>
            BASE
          </Link>
        </div>
      </nav>

      <div className="max-w-screen-2xl mx-auto px-8 py-8 flex gap-8">
        {/* LEFT: GAME */}
        <div className="flex-1">
          <RiftGame
            isMatchMode={!!activeMatch}
            activeMatch={activeMatch}
            onGameEnd={handleGameEnd}
            equippedSkinId={equippedSkinId}
            onLeaderboardClick={() => setActiveTab("leaderboard")}
          />
        </div>

        {/* RIGHT PANEL */}
        <div className="w-[420px] flex flex-col gap-6">
          {/* TABS CONTENT */}
          {activeTab === "lobby" && (
            <>
              {/* LIVE MATCHES */}
              <div className="glass p-6 border border-[#0052FF]/30">
                <div className="flex justify-between items-baseline mb-6">
                  <div className="text-xl font-semibold tracking-tight">LIVE MATCHES</div>
                  <div className="text-xs text-[#00ffcc] font-mono">2 ESCROWED • 0.34 ETH POT</div>
                </div>

                <div className="space-y-3">
                  {liveMatches.map((match) => (
                    <div
                      key={match.id}
                      onClick={() => setActiveMatch(match)}
                      className="glass p-5 flex justify-between items-center border border-white/10 hover:border-[#0052FF]/60 cursor-pointer rounded-3xl transition-all group"
                    >
                      <div>
                        <div className="font-mono text-[#0052FF] text-sm">{match.id}</div>
                        <div className="text-xs text-white/60">2 PLAYERS • {match.bet} ETH EACH</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-mono text-white">{match.pot} ETH</div>
                        <div className="text-xs px-3 py-1 bg-[#0052FF]/10 text-[#0052FF] rounded-2xl inline-block">JOIN</div>
                      </div>
                    </div>
                  ))}
                </div>

                <MatchCreator onMatchCreated={handleMatchCreated} />
              </div>

              {/* CLAIM */}
              <ClaimWinnings />
            </>
          )}

          {activeTab === "skins" && (
            <SkinGallery onEquip={handleEquipSkin} equippedSkinId={equippedSkinId} />
          )}

          {activeTab === "leaderboard" && (
            <Leaderboard data={leaderboardData} />
          )}

          {/* HOW IT WORKS MODAL TRIGGER */}
          <div className="text-center text-xs text-white/40">
            <button
              onClick={() => {
                const modal = document.createElement("div");
                modal.innerHTML = `
                  <div class="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999]">
                    <div class="glass max-w-lg mx-auto p-10 text-center">
                      <div class="text-4xl mb-6">HOW RIFTTEAR WORKS</div>
                      <div class="space-y-6 text-left text-sm">
                        <div>1. Escrow ETH in a match</div>
                        <div>2. Play endless runner • first to 420 tears wins</div>
                        <div>3. Claim pot onchain via Basescan</div>
                      </div>
                      <button onclick="this.closest('.fixed').remove()" class="mt-10 px-8 py-3 bg-white text-black rounded-3xl">CLOSE REALITY</button>
                    </div>
                  </div>
                `;
                document.body.appendChild(modal);
              }}
              className="underline hover:text-[#0052FF]"
            >
              how it works →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
