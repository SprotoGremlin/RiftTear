"use client";

import { ConnectWallet } from "@coinbase/onchainkit/wallet";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";
import { Play, Sword, X, HelpCircle } from "lucide-react";
import RiftGame from "@/components/RiftGame";
import MatchCreator from "@/components/MatchCreator";
import ClaimWinnings from "@/components/ClaimWinnings";
import MatchLobby from "@/components/MatchLobby";
import SkinGallery from "@/components/SkinGallery";
import { useState, useEffect } from "react";

const SKINS = [
  { id: 1, name: "Glitch Pepe #001" },
  { id: 2, name: "Neon Tear Pepe" },
  { id: 3, name: "Void Rift Pepe" },
  { id: 4, name: "Reality Fracture Pepe" },
  { id: 5, name: "Digital Decay Pepe" },
  { id: 6, name: "Chroma Break Pepe" },
];

export default function RiftTear() {
  const { isConnected } = useAccount();
  const [showGame, setShowGame] = useState(false);
  const [showMatchCreator, setShowMatchCreator] = useState(false);
  const [showClaim, setShowClaim] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [activeMatch, setActiveMatch] = useState<any>(null);
  const [finalScore, setFinalScore] = useState(0);
  const [equippedSkinId, setEquippedSkinId] = useState(1);
  const [liveMatches, setLiveMatches] = useState([
    { id: "0x8f2a", bet: "0.05", opponent: "0x71C...4a2F", time: "2m ago" },
    { id: "0x3c9b", bet: "0.08", opponent: "0x9f1...2d4E", time: "7m ago" },
    { id: "0x1a7e", bet: "0.12", opponent: "0x4b2...8c9F", time: "14m ago" },
  ]);

  // Persist equipped skin
  useEffect(() => {
    const saved = localStorage.getItem("equippedSkinId");
    if (saved) setEquippedSkinId(parseInt(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("equippedSkinId", equippedSkinId.toString());
  }, [equippedSkinId]);

  const getEquippedSkinName = () => {
    const skin = SKINS.find(s => s.id === equippedSkinId);
    return skin ? skin.name : "Default";
  };

  const handleMatchCreated = (matchId: string) => {
    setActiveMatch({
      id: matchId,
      bet: "0.05",
      opponent: "Waiting for challenger...",
      status: "waiting",
    });
    setShowMatchCreator(false);
    setShowGame(true);
  };

  const joinMatch = (match: any) => {
    setActiveMatch({
      ...match,
      status: "live",
    });
    setShowGame(true);
  };

  const handleGameEnd = (score: number) => {
    setFinalScore(score);
    setShowGame(false);
    if (activeMatch) {
      setShowClaim(true);
    }
  };

  const closeClaim = () => {
    setShowClaim(false);
    setActiveMatch(null);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b border-white/10 bg-black/95 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#0052FF] flex items-center justify-center">
            <span className="text-black text-2xl font-black tracking-[-3px]">R</span>
          </div>
          <div>
            <div className="font-black text-3xl tracking-[-1.5px]">RIFTTEAR</div>
            <div className="text-[9px] text-[#0052FF] -mt-1.5 tracking-[4px]">BASE PROTOCOL</div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-xs text-[#0052FF] border border-white/10">
            SKIN: {getEquippedSkinName()}
          </div>
          <a href="#game" className="hover:text-[#0052FF] transition-colors px-4 py-2 tracking-[1px]">PLAY</a>
          <a href="#matches" className="hover:text-[#0052FF] transition-colors px-4 py-2 tracking-[1px]">MATCHES</a>
          <a href="#skins" className="hover:text-[#0052FF] transition-colors px-4 py-2 tracking-[1px]">SKINS</a>
          <ConnectWallet className="neon-connect px-7 py-2.5 text-sm font-semibold border border-[#0052FF] hover:bg-[#0052FF] hover:text-black transition-all" />
        </div>
      </nav>

      {/* HERO */}
      <div className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-16 px-6 z-20">
        <div className="absolute inset-0 bg-[radial-gradient(#0052FF_0.5px,transparent_1.5px)] bg-[length:4px_4px] opacity-20" />
        
        <div className="relative text-center mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-1 rounded-full border border-[#0052FF]/60 text-xs tracking-[4px] text-[#0052FF] mb-6">
            REALITY PROTOCOL v1.0 • BASE MAINNET
          </div>

          <h1 className="text-[110px] md:text-[148px] font-black tracking-[-8px] leading-[0.86] text-[#0052FF]">
            RIFT<br />TEAR
          </h1>
          <div className="text-[21px] text-white/90 tracking-tight -mt-4">1v1 ENDLESS RUNNER • BET • WIN • TEAR</div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 z-30 mt-4">
          <motion.button 
            onClick={() => setShowGame(true)}
            className="rift-btn flex items-center justify-center gap-3 px-16 py-6 text-xl font-semibold border-2 border-[#0052FF] hover:bg-[#0052FF] hover:text-black active:scale-[0.985] transition-all"
            whileHover={{ scale: 1.015 }}
          >
            <Play className="w-6 h-6" /> ENTER THE RIFT
          </motion.button>

          <motion.button 
            onClick={() => setShowMatchCreator(true)}
            className="rift-btn flex items-center justify-center gap-3 px-14 py-6 text-xl font-semibold border-2 border-white/60 hover:border-white hover:bg-white hover:text-black active:scale-[0.985] transition-all"
            whileHover={{ scale: 1.015 }}
          >
            <Sword className="w-6 h-6" /> CREATE MATCH
          </motion.button>
        </div>

        <button 
          onClick={() => setShowHowItWorks(true)}
          className="mt-8 flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors tracking-[1px]"
        >
          <HelpCircle className="w-4 h-4" /> HOW IT WORKS
        </button>

        <div className="mt-8 text-xs tracking-[2.5px] text-white/40 font-mono">SCROLL TO BEGIN THE FRACTURE ↓</div>
      </div>

      {/* GAME SECTION (Free Play) */}
      <div id="game" className="relative z-20 py-20 border-t border-white/10 bg-zinc-950">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-[#0052FF] text-sm tracking-[3px] mb-3">LIVE ON BASE</div>
            <h2 className="text-6xl font-black tracking-[-1px]">THE RIFT IS OPEN</h2>
            <p className="text-xl text-white/60 mt-3 max-w-md mx-auto">Jump. Dodge. Tear. The most intense endless runner ever built onchain.</p>
          </div>

          <div className="flex justify-center">
            <RiftGame 
              equippedSkinId={equippedSkinId}
            />
          </div>

          <div className="text-center mt-8 text-xs tracking-[1px] text-white/50 font-mono">
            SPACE = JUMP &nbsp;•&nbsp; G = MASSIVE GLITCH &nbsp;•&nbsp; TAP SCREEN ON MOBILE • YOUR SKIN AFFECTS THE RUNNER
          </div>
        </div>
      </div>

      {/* ONCHAIN MATCHES */}
      <div id="matches" className="relative z-20 py-24 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="text-[#0052FF] text-xs tracking-[3px]">FULLY ONCHAIN • ESCROWED POTS</div>
            <h2 className="text-6xl font-black tracking-tight mt-2">LIVE MATCHES ON BASE</h2>
          </div>

          <MatchLobby 
            matches={liveMatches} 
            onJoinMatch={joinMatch} 
            onCreateMatch={() => setShowMatchCreator(true)} 
          />
        </div>
      </div>

      {/* SKINS - Full NFT utility with wiring */}
      <div id="skins" className="relative z-20 py-20 border-t border-white/10 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="text-[#0052FF] text-xs tracking-[3px]">ONCHAIN NFT PFPS</div>
            <h2 className="text-6xl font-black tracking-tight mt-2">RIFT PFP SKINS</h2>
            <p className="text-xl text-white/60 mt-3 max-w-md mx-auto">Mint. Equip. Tear harder. Your skin changes how you look in-game.</p>
          </div>

          <SkinGallery onEquip={setEquippedSkinId} />
        </div>
      </div>

      <footer className="border-t border-white/10 py-16 text-center text-xs tracking-[2px] text-white/40 font-mono">
        RIFTTEAR PROTOCOL • BUILT ON BASE • COMMIT 25/100<br />
        NOT SAFE FOR REALITY • PLAY AT YOUR OWN RISK
      </footer>

      {/* Fullscreen Game Modal (with Match Mode + Skin) */}
      {showGame && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
          <div className="relative w-full max-w-[980px]">
            <button 
              onClick={() => setShowGame(false)}
              className="absolute -top-14 right-0 text-white/60 hover:text-white text-sm tracking-[2px] flex items-center gap-2"
            >
              CLOSE RIFT <X className="w-4 h-4" />
            </button>
            
            <RiftGame 
              isMatchMode={!!activeMatch}
              activeMatch={activeMatch}
              onGameEnd={handleGameEnd}
              equippedSkinId={equippedSkinId}
            />
            
            {activeMatch && (
              <div className="mt-4 text-center text-xs text-[#0052FF] font-mono tracking-widest">
                MATCH {activeMatch.id} • POT {(parseFloat(activeMatch.bet) * 2).toFixed(2)} ETH • {activeMatch.status.toUpperCase()}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Match Creator Modal */}
      {showMatchCreator && (
        <div className="fixed inset-0 z-[110] bg-black/90 flex items-center justify-center p-6">
          <div className="relative w-full max-w-md">
            <button 
              onClick={() => setShowMatchCreator(false)}
              className="absolute -top-12 right-4 text-white/60 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <MatchCreator 
              onMatchCreated={handleMatchCreated} 
              onClose={() => setShowMatchCreator(false)} 
            />
          </div>
        </div>
      )}

      {/* Claim Winnings Modal */}
      {showClaim && activeMatch && (
        <div className="fixed inset-0 z-[120] bg-black/90 flex items-center justify-center p-6">
          <div className="relative w-full max-w-sm">
            <ClaimWinnings 
              matchId={activeMatch.id}
              potAmount={(parseFloat(activeMatch.bet) * 2).toFixed(2)}
              onClaimSuccess={closeClaim}
              onClose={closeClaim}
            />
          </div>
        </div>
      )}

      {/* How it Works Modal */}
      {showHowItWorks && (
        <div className="fixed inset-0 z-[130] bg-black/90 flex items-center justify-center p-6">
          <div className="glass w-full max-w-2xl p-10 border border-[#0052FF]/40 relative">
            <button 
              onClick={() => setShowHowItWorks(false)}
              className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl"
            >
              ×
            </button>

            <div className="text-4xl font-black tracking-tight mb-8 text-center">HOW IT WORKS</div>

            <div className="space-y-8 text-lg">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-[#0052FF]/10 flex items-center justify-center flex-shrink-0 text-[#0052FF] font-mono text-xl">1</div>
                <div>
                  <div className="font-semibold mb-1">Connect Wallet</div>
                  <div className="text-white/70 text-base">Connect your Base wallet (Coinbase Wallet, MetaMask, etc.) to start playing and betting.</div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-[#0052FF]/10 flex items-center justify-center flex-shrink-0 text-[#0052FF] font-mono text-xl">2</div>
                <div>
                  <div className="font-semibold mb-1">Equip a Skin (Optional)</div>
                  <div className="text-white/70 text-base">Mint or equip one of the glitch Pepe PFPs. Your skin changes how your runner looks in-game with unique effects.</div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-[#0052FF]/10 flex items-center justify-center flex-shrink-0 text-[#0052FF] font-mono text-xl">3</div>
                <div>
                  <div className="font-semibold mb-1">Create or Join a Match</div>
                  <div className="text-white/70 text-base">Set your bet amount and create a match, or join an existing one. Both players' bets are escrowed onchain in a smart contract.</div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-[#0052FF]/10 flex items-center justify-center flex-shrink-0 text-[#0052FF] font-mono text-xl">4</div>
                <div>
                  <div className="font-semibold mb-1">Play the Game</div>
                  <div className="text-white/70 text-base">Jump, dodge, and tear reality. The player with the highest score wins the entire pot. Score 420+ in a match to claim winnings.</div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-[#0052FF]/10 flex items-center justify-center flex-shrink-0 text-[#0052FF] font-mono text-xl">5</div>
                <div>
                  <div className="font-semibold mb-1">Claim Your Winnings</div>
                  <div className="text-white/70 text-base">If you win, claim the pot directly to your wallet via the onchain transaction. Everything is fully verifiable on Base.</div>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center text-sm text-white/50 tracking-widest">
              POWERED BY ONCHAINKIT • BASE MAINNET • GASLESS TRANSACTIONS
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .rift-btn {
          position: relative;
          overflow: hidden;
          transition: all 0.2s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .rift-btn::after {
          content: '';
          position: absolute;
          top: -120%;
          left: -60%;
          width: 35%;
          height: 320%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.5), transparent);
          transition: left 0.65s;
        }
        .rift-btn:hover::after {
          left: 220%;
        }
        .glass {
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(28px);
        }
        .neon-connect {
          transition: all 0.2s cubic-bezier(0.23, 1, 0.32, 1);
        }
      `}</style>
    </div>
  );
}
