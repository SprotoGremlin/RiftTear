"use client";

import { ConnectWallet } from "@coinbase/onchainkit/wallet";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";
import { Play, Users, Sword, Trophy, X } from "lucide-react";
import RiftGame from "@/components/RiftGame";
import MatchCreator from "@/components/MatchCreator";
import ClaimWinnings from "@/components/ClaimWinnings";
import { useState } from "react";

export default function RiftTear() {
  const { isConnected } = useAccount();
  const [showGame, setShowGame] = useState(false);
  const [showMatchCreator, setShowMatchCreator] = useState(false);
  const [showClaim, setShowClaim] = useState(false);
  const [activeMatch, setActiveMatch] = useState<any>(null);
  const [finalScore, setFinalScore] = useState(0);
  const [liveMatches, setLiveMatches] = useState([
    { id: "0x8f2a", bet: "0.05", opponent: "0x71C...4a2F", time: "2m ago" },
    { id: "0x3c9b", bet: "0.08", opponent: "0x9f1...2d4E", time: "7m ago" },
    { id: "0x1a7e", bet: "0.12", opponent: "0x4b2...8c9F", time: "14m ago" },
  ]);

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
            REALITY PROTOCOL v0.6 • BASE MAINNET
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

        <div className="mt-16 text-xs tracking-[2.5px] text-white/40 font-mono">SCROLL TO BEGIN THE FRACTURE ↓</div>
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
            <RiftGame />
          </div>

          <div className="text-center mt-8 text-xs tracking-[1px] text-white/50 font-mono">
            SPACE = JUMP &nbsp;•&nbsp; G = MASSIVE GLITCH &nbsp;•&nbsp; TAP SCREEN ON MOBILE
          </div>
        </div>
      </div>

      {/* ONCHAIN MATCHES */}
      <div id="matches" className="relative z-20 py-24 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-[#0052FF] text-xs tracking-[3px]">FULLY ONCHAIN • ESCROWED POTS</div>
            <h2 className="text-6xl font-black tracking-tight mt-2">LIVE MATCHES ON BASE</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Create Match Card */}
            <div 
              onClick={() => setShowMatchCreator(true)}
              className="glass p-10 border border-[#0052FF]/30 hover:border-[#0052FF] transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-[#0052FF]/10">
                  <Sword className="w-8 h-8 text-[#0052FF]" />
                </div>
                <div>
                  <div className="text-3xl font-semibold tracking-tight">CREATE NEW MATCH</div>
                  <div className="text-sm text-white/50">Set your bet • Real onchain escrow</div>
                </div>
              </div>

              <div className="text-center py-8 border border-dashed border-white/20 rounded-2xl group-hover:border-[#0052FF]/50 transition-all">
                <div className="text-6xl mb-4 opacity-60">⚔️</div>
                <div className="text-xl text-[#0052FF]">Open Match Creator</div>
                <div className="text-xs text-white/50 mt-2 tracking-widest">GASLESS • POWERED BY PAYMASTER</div>
              </div>
            </div>

            {/* Live Matches */}
            <div className="glass p-10 border border-white/20">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="text-3xl font-semibold tracking-tight">OPEN MATCHES</div>
                  <div className="text-sm text-white/50">3 active • join instantly</div>
                </div>
                <div className="text-xs px-3 py-1 border border-white/30 rounded-full">LIVE</div>
              </div>

              <div className="space-y-3">
                {liveMatches.map((match, index) => (
                  <div 
                    key={index}
                    onClick={() => joinMatch(match)}
                    className="flex items-center justify-between px-5 py-4 border border-white/10 hover:border-[#0052FF] cursor-pointer transition-all group-hover:border-white/30"
                  >
                    <div>
                      <div className="font-mono text-lg text-[#0052FF]">{match.bet} ETH</div>
                      <div className="text-xs text-white/50">vs {match.opponent} • {match.time}</div>
                    </div>
                    <div className="text-xs px-4 py-1.5 border border-[#0052FF] text-[#0052FF] rounded hover:bg-[#0052FF] hover:text-black transition-all">JOIN</div>
                  </div>
                ))}
              </div>

              <div className="text-center text-[10px] text-white/40 mt-6 tracking-widest">All pots secured in smart contract escrow</div>
            </div>
          </div>
        </div>
      </div>

      {/* SKINS TEASER */}
      <div id="skins" className="relative z-20 py-24 border-t border-white/10 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-[#0052FF] text-sm tracking-[3px] mb-4">EXCLUSIVE ONCHAIN PFPS</div>
          <h2 className="text-6xl font-black tracking-tight mb-6">RIFT PFP SKINS</h2>
          <p className="text-2xl text-white/70 max-w-lg mx-auto">Mint. Equip. Tear harder.<br />Every skin has unique glitch animations visible in-game.</p>

          <div className="mt-12 flex justify-center gap-6">
            {[1,2,3].map((i) => (
              <div key={i} className="w-36 h-36 rounded-3xl border border-[#0052FF]/40 bg-zinc-950 flex items-center justify-center text-6xl opacity-60 hover:opacity-100 hover:border-[#0052FF] transition-all cursor-pointer">
                👾
              </div>
            ))}
          </div>

          <button className="mt-12 px-14 py-4 border border-[#0052FF] text-sm tracking-[2px] hover:bg-[#0052FF] hover:text-black transition-all">
            MINT RIFT SKIN — COMING COMMIT 12
          </button>
        </div>
      </div>

      <footer className="border-t border-white/10 py-16 text-center text-xs tracking-[2px] text-white/40 font-mono">
        RIFTTEAR PROTOCOL • BUILT ON BASE • COMMIT 9/100<br />
        NOT SAFE FOR REALITY • PLAY AT YOUR OWN RISK
      </footer>

      {/* Fullscreen Game Modal (with Match Mode) */}
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
}        <div className="absolute inset-0 bg-[radial-gradient(#0052FF_0.5px,transparent_1.5px)] bg-[length:4px_4px] opacity-20" />
        
        <div className="relative text-center mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-1 rounded-full border border-[#0052FF]/60 text-xs tracking-[4px] text-[#0052FF] mb-6">
            REALITY PROTOCOL v0.5 • BASE MAINNET
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

        <div className="mt-16 text-xs tracking-[2.5px] text-white/40 font-mono">SCROLL TO BEGIN THE FRACTURE ↓</div>
      </div>

      {/* GAME SECTION */}
      <div id="game" className="relative z-20 py-20 border-t border-white/10 bg-zinc-950">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-[#0052FF] text-sm tracking-[3px] mb-3">LIVE ON BASE</div>
            <h2 className="text-6xl font-black tracking-[-1px]">THE RIFT IS OPEN</h2>
            <p className="text-xl text-white/60 mt-3 max-w-md mx-auto">Jump. Dodge. Tear. The most intense endless runner ever built onchain.</p>
          </div>

          <div className="flex justify-center">
            <RiftGame />
          </div>

          <div className="text-center mt-8 text-xs tracking-[1px] text-white/50 font-mono">
            SPACE = JUMP &nbsp;•&nbsp; G = MASSIVE GLITCH &nbsp;•&nbsp; TAP SCREEN ON MOBILE
          </div>
        </div>
      </div>

      {/* ONCHAIN MATCHES */}
      <div id="matches" className="relative z-20 py-24 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-[#0052FF] text-xs tracking-[3px]">FULLY ONCHAIN • ESCROWED POTS</div>
            <h2 className="text-6xl font-black tracking-tight mt-2">LIVE MATCHES ON BASE</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Create Match Card */}
            <div 
              onClick={() => setShowMatchCreator(true)}
              className="glass p-10 border border-[#0052FF]/30 hover:border-[#0052FF] transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-[#0052FF]/10">
                  <Sword className="w-8 h-8 text-[#0052FF]" />
                </div>
                <div>
                  <div className="text-3xl font-semibold tracking-tight">CREATE NEW MATCH</div>
                  <div className="text-sm text-white/50">Set your bet • Real onchain escrow</div>
                </div>
              </div>

              <div className="text-center py-8 border border-dashed border-white/20 rounded-2xl group-hover:border-[#0052FF]/50 transition-all">
                <div className="text-6xl mb-4 opacity-60">⚔️</div>
                <div className="text-xl text-[#0052FF]">Open Match Creator</div>
                <div className="text-xs text-white/50 mt-2 tracking-widest">GASLESS • POWERED BY PAYMASTER</div>
              </div>
            </div>

            {/* Live Matches */}
            <div className="glass p-10 border border-white/20">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="text-3xl font-semibold tracking-tight">OPEN MATCHES</div>
                  <div className="text-sm text-white/50">3 active • join instantly</div>
                </div>
                <div className="text-xs px-3 py-1 border border-white/30 rounded-full">LIVE</div>
              </div>

              <div className="space-y-3">
                {liveMatches.map((match, index) => (
                  <div 
                    key={index}
                    onClick={() => joinMatch(match)}
                    className="flex items-center justify-between px-5 py-4 border border-white/10 hover:border-[#0052FF] cursor-pointer transition-all group-hover:border-white/30"
                  >
                    <div>
                      <div className="font-mono text-lg text-[#0052FF]">{match.bet} ETH</div>
                      <div className="text-xs text-white/50">vs {match.opponent} • {match.time}</div>
                    </div>
                    <div className="text-xs px-4 py-1.5 border border-[#0052FF] text-[#0052FF] rounded hover:bg-[#0052FF] hover:text-black transition-all">JOIN</div>
                  </div>
                ))}
              </div>

              <div className="text-center text-[10px] text-white/40 mt-6 tracking-widest">All pots secured in smart contract escrow</div>
            </div>
          </div>
        </div>
      </div>

      {/* SKINS TEASER */}
      <div id="skins" className="relative z-20 py-24 border-t border-white/10 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-[#0052FF] text-sm tracking-[3px] mb-4">EXCLUSIVE ONCHAIN PFPS</div>
          <h2 className="text-6xl font-black tracking-tight mb-6">RIFT PFP SKINS</h2>
          <p className="text-2xl text-white/70 max-w-lg mx-auto">Mint. Equip. Tear harder.<br />Every skin has unique glitch animations visible in-game.</p>

          <div className="mt-12 flex justify-center gap-6">
            {[1,2,3].map((i) => (
              <div key={i} className="w-36 h-36 rounded-3xl border border-[#0052FF]/40 bg-zinc-950 flex items-center justify-center text-6xl opacity-60 hover:opacity-100 hover:border-[#0052FF] transition-all cursor-pointer">
                👾
              </div>
            ))}
          </div>

          <button className="mt-12 px-14 py-4 border border-[#0052FF] text-sm tracking-[2px] hover:bg-[#0052FF] hover:text-black transition-all">
            MINT RIFT SKIN — COMING COMMIT 12
          </button>
        </div>
      </div>

      <footer className="border-t border-white/10 py-16 text-center text-xs tracking-[2px] text-white/40 font-mono">
        RIFTTEAR PROTOCOL • BUILT ON BASE • COMMIT 6/100<br />
        NOT SAFE FOR REALITY • PLAY AT YOUR OWN RISK
      </footer>

      {/* Fullscreen Game Modal */}
      {showGame && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
          <div className="relative w-full max-w-[980px]">
            <button 
              onClick={() => setShowGame(false)}
              className="absolute -top-14 right-0 text-white/60 hover:text-white text-sm tracking-[2px] flex items-center gap-2"
            >
              CLOSE RIFT <X className="w-4 h-4" />
            </button>
            
            <RiftGame />
            
            {activeMatch && (
              <div className="mt-4 text-center text-xs text-[#0052FF] font-mono tracking-widest">
                MATCH {activeMatch.id} • POT {parseFloat(activeMatch.bet) * 2} ETH • {activeMatch.status.toUpperCase()}
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
