"use client";

import { X, Wallet, Users, Shirt, Gamepad2, Award } from "lucide-react";
import { useEffect } from "react";

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HowItWorksModal({ isOpen, onClose }: HowItWorksModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.body.style.overflow = "visible";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const steps = [
    { 
      icon: Wallet, 
      title: "1. CONNECT WALLET", 
      desc: "OnchainKit + wagmi on Base • Zero gas for free-play • Full custody of your ETH" 
    },
    { 
      icon: Users, 
      title: "2. CREATE / JOIN MATCH", 
      desc: "Escrow crypto into smart contract • Friend accepts instantly • Pot grows in real time" 
    },
    { 
      icon: Shirt, 
      title: "3. EQUIP NFT SKIN", 
      desc: "Mint or equip your PFP • Changes player visuals + legendary glitch effects" 
    },
    { 
      icon: Gamepad2, 
      title: "4. TEAR REALITY", 
      desc: "High-speed endless runner • SPACE to jump • Avoid obstacles • First to 420 tears wins pot" 
    },
    { 
      icon: Award, 
      title: "5. CLAIM VICTORY", 
      desc: "Winner takes everything • View tx on Basescan • Instant claim • Repeat instantly" 
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/95 z-[10000] flex items-center justify-center">
      <div className="glass max-w-2xl w-full mx-4 rounded-3xl overflow-hidden border border-[#0052FF] shadow-2xl shadow-[#0052FF]/50">
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="text-4xl font-black text-[#0052FF]">RIFT</div>
            <div className="text-4xl font-black">TEAR</div>
            <div className="px-3 py-1 bg-white/10 text-xs font-mono tracking-widest rounded">HOW IT WORKS</div>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">BECOME A RIFT LEGEND</div>
            <p className="text-white/60">1v1 Endless Runner + Onchain Betting on Base • Production-ready dApp</p>
          </div>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-6 items-start group">
                <div className="w-12 h-12 bg-[#0052FF]/10 flex-shrink-0 rounded-2xl flex items-center justify-center border border-[#0052FF]/30 group-hover:border-[#ffcc00] transition-all duration-300">
                  <step.icon className="w-6 h-6 text-[#0052FF]" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-xl mb-1">{step.title}</div>
                  <div className="text-white/70 leading-relaxed">{step.desc}</div>
                </div>
                <div className="text-[#0052FF] font-mono text-xs self-center opacity-40 group-hover:opacity-100">STEP {index + 1}</div>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="w-full py-6 bg-gradient-to-r from-[#0052FF] via-[#3c8aff] to-[#00aaff] text-black text-xl font-bold rounded-3xl active:scale-[0.985] transition-all flex items-center justify-center gap-3 hover:brightness-110"
          >
            I UNDERSTAND THE RIFT • LET&apos;S TEAR REALITY
            <span className="text-xl">🚀</span>
          </button>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 px-8 py-4 text-center text-xs font-mono text-white/40 flex items-center justify-center gap-6">
          <div>✅ Secure escrow smart contract</div>
          <div>✅ NFT skin utility live</div>
          <div>✅ 100% on Base mainnet</div>
        </div>
      </div>
    </div>
  );
}
