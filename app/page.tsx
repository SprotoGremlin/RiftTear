"use client";

import { ConnectWallet } from "@coinbase/onchainkit/wallet";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";
import { Play, Users, Zap, Sword } from "lucide-react";
import { useState, useEffect } from "react";

export default function RiftTearLanding() {
  const { isConnected } = useAccount();
  const [riftActive, setRiftActive] = useState(false);
  const [tearCount, setTearCount] = useState(0);

  // Reality-tearing glitch system
  useEffect(() => {
    const interval = setInterval(() => {
      setRiftActive(true);
      setTearCount((prev) => prev + 1);
      setTimeout(() => setRiftActive(false), 140);
    }, 1850);
    return () => clearInterval(interval);
  }, []);

  const triggerRift = () => {
    setRiftActive(true);
    setTearCount((prev) => prev + 1);
    setTimeout(() => setRiftActive(false), 220);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background Rift Layers */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#0000FF_0px,#0000FF_1px,transparent_1px,transparent_4px)] opacity-[0.035]" />
      
      {/* Dynamic Screen Tears */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-[#0052FF] to-transparent"
            style={{
              top: `${15 + i * 14}%`,
              animation: `rift-tear ${1.6 + i * 0.2}s linear infinite`,
              animationDelay: `-${i * 0.3}s`,
              opacity: 0.6 + (i % 3) * 0.15,
            }}
          />
        ))}
      </div>

      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b border-white/10 bg-black/90 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#0052FF] flex items-center justify-center">
            <span className="text-black text-xl font-black tracking-[-2px]">R</span>
          </div>
          <div>
            <div className="font-black text-2xl tracking-[-1.5px]">RIFTTEAR</div>
            <div className="text-[9px] text-[#0052FF] -mt-1 tracking-[3px]">BASE • ONCHAIN</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a href="#matches" className="text-sm tracking-[1px] hover:text-[#0052FF] transition-colors px-5 py-2">MATCHES</a>
          <a href="#skins" className="text-sm tracking-[1px] hover:text-[#0052FF] transition-colors px-5 py-2">SKINS</a>
          <ConnectWallet className="neon-connect px-6 py-2.5 text-sm font-semibold border border-[#0052FF] hover:bg-[#0052FF] hover:text-black transition-all" />
        </div>
      </nav>

      {/* HERO — REALITY TEARING */}
      <div className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-16 px-6 z-20">
        <div className="absolute inset-0 bg-[radial-gradient(#0052FF_0.6px,transparent_1.2px)] bg-[length:5px_5px] opacity-30" />

        <div className="relative text-center mb-8" onClick={triggerRift}>
          <div className="inline-flex items-center gap-2 px-5 py-1 rounded-full border border-[#0052FF]/60 text-xs tracking-[4px] text-[#0052FF] mb-6">
            REALITY IS FRACTURING
          </div>

          <h1 
            className={`text-[92px] md:text-[140px] font-black tracking-[-7px] leading-[0.88] text-[#0052FF] relative select-none ${riftActive ? 'rift-glitch' : ''}`}
          >
            RIFT<br />TEAR
          </h1>

          {/* Tear Duplicates */}
          <div className="absolute top-0 left-0 text-[92px] md:text-[140px] font-black tracking-[-7px] text-white/30 -translate-x-1 translate-y-1 pointer-events-none">RIFT<br />TEAR</div>
          <div className="absolute top-0 left-0 text-[92px] md:text-[140px] font-black tracking-[-7px] text-[#3c8aff]/40 translate-x-1 -translate-y-1 pointer-events-none">RIFT<br />TEAR</div>
        </div>

        <p className="max-w-2xl text-center text-2xl md:text-4xl tracking-tight text-white/90 mb-4 font-medium">
          1v1 ENDLESS RUNNER.<br />BET CRYPTO. <span className="text-[#0052FF]">TEAR REALITY.</span>
        </p>
        <p className="text-[#3c8aff] text-lg tracking-[3px] mb-12 font-mono">WINNER TAKES THE ENTIRE POT • ON BASE</p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 z-30">
          <motion.a
            href="#create-match"
            onClick={triggerRift}
            className="rift-btn group flex items-center justify-center gap-3 px-16 py-6 text-xl font-semibold border-2 border-[#0052FF] hover:bg-[#0052FF] hover:text-black active:scale-[0.985] transition-all"
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
          >
            <Play className="w-6 h-6" /> CREATE MATCH
          </motion.a>

          <motion.a
            href="#join-match"
            onClick={triggerRift}
            className="rift-btn group flex items-center justify-center gap-3 px-16 py-6 text-xl font-semibold border-2 border-white/70 hover:border-white hover:bg-white hover:text-black active:scale-[0.985] transition-all"
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
          >
            <Users className="w-6 h-6" /> JOIN MATCH
          </motion.a>
        </div>

        <div className="mt-16 flex flex-col items-center gap-3 text-xs tracking-[2px] text-white/50 font-mono">
          POWERED BY BASE • ONCHAINKIT • WAGMI
          <div className="flex items-center gap-1.5 text-[10px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-px h-3 bg-white/30" />
            ))}
            TEARING REALITY SINCE COMMIT 2
          </div>
        </div>
      </div>

      {/* REALITY FRACTURE FEATURES */}
      <div id="features" className="relative z-20 py-24 border-t border-white/10 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-[#0052FF] text-sm tracking-[4px] mb-3">DIMENSIONAL COLLAPSE ENABLED</div>
            <h2 className="text-7xl font-black tracking-[-2px]">THE RIFT IS OPEN</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "REALITY-TEARING ENGINE",
                desc: "Chromatic aberration, screen folds, digital static, particle rifts & live dimensional distortion that feels illegal in a browser.",
              },
              {
                icon: Sword,
                title: "FULLY ONCHAIN MATCHES",
                desc: "Create or join 1v1 bets in ETH or USDC. Smart contract escrow. Winner auto-claims the entire pot. No middleman. Pure onchain.",
              },
              {
                icon: Users,
                title: "RIFT PFP SKINS",
                desc: "Mint exclusive glitch-torn Pepe PFPs. Equip them in-game. Every skin has unique tearing animations and visual corruption effects.",
              },
            ].map((f, index) => (
              <motion.div
                key={index}
                onMouseEnter={triggerRift}
                className="glass group p-10 border border-white/10 hover:border-[#0052FF] transition-all duration-500"
                whileHover={{ y: -6 }}
              >
                <div className="mb-9 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0052FF]/10 group-hover:bg-[#0052FF]/20 transition-colors">
                  <f.icon className="h-8 w-8 text-[#0052FF]" />
                </div>
                <h3 className="text-4xl font-semibold tracking-tight mb-5">{f.title}</h3>
                <p className="text-lg text-white/70 leading-snug">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <footer className="border-t border-white/10 py-16 text-center text-xs tracking-[2px] text-white/40 font-mono">
        RIFTTEAR • BUILT ON BASE • NOT SAFE FOR REALITY<br />
        <span className="text-[#0052FF]">COMMIT 2/100 • v0.1</span>
      </footer>

      <style jsx global>{`
        .rift-btn {
          position: relative;
          overflow: hidden;
        }
        .rift-btn::after {
          content: '';
          position: absolute;
          top: -100%;
          left: -50%;
          width: 30%;
          height: 300%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.45), transparent);
          transition: left 0.6s;
        }
        .rift-btn:hover::after {
          left: 180%;
        }

        .rift-glitch {
          animation: rift-glitch-anim 0.18s steps(2, end) infinite;
        }

        @keyframes rift-glitch-anim {
          0% { transform: translate(0); filter: hue-rotate(0deg); }
          25% { transform: translate(-3px, 2px); filter: hue-rotate(15deg); }
          50% { transform: translate(2px, -3px); filter: hue-rotate(-12deg); }
          75% { transform: translate(-2px, 3px); filter: hue-rotate(8deg); }
          100% { transform: translate(0); filter: hue-rotate(0deg); }
        }

        @keyframes rift-tear {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }

        .glass {
          background: rgba(10, 10, 10, 0.92);
          backdrop-filter: blur(24px);
        }
      `}</style>
    </div>
  );
}
