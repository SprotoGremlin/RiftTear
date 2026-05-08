"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Award, Shirt } from "lucide-react";
import { Transaction, TransactionButton } from "@coinbase/onchainkit/transaction";
import { parseEther } from "viem";

interface Skin {
  id: number;
  name: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  glitchLevel: number;
  price: string;
  equipped?: boolean;
}

const SKINS: Skin[] = [
  { id: 1, name: "Glitch Pepe #001", rarity: "Common", glitchLevel: 2, price: "0.01" },
  { id: 2, name: "Neon Tear Pepe", rarity: "Rare", glitchLevel: 5, price: "0.03" },
  { id: 3, name: "Void Rift Pepe", rarity: "Epic", glitchLevel: 8, price: "0.08" },
  { id: 4, name: "Reality Fracture Pepe", rarity: "Legendary", glitchLevel: 12, price: "0.25" },
  { id: 5, name: "Digital Decay Pepe", rarity: "Rare", glitchLevel: 6, price: "0.04" },
  { id: 6, name: "Chroma Break Pepe", rarity: "Epic", glitchLevel: 9, price: "0.09" },
];

export default function SkinGallery() {
  const [selectedSkin, setSelectedSkin] = useState<Skin | null>(null);
  const [equippedSkinId, setEquippedSkinId] = useState<number | null>(1);
  const [filter, setFilter] = useState<"All" | "Common" | "Rare" | "Epic" | "Legendary">("All");

  const filteredSkins = filter === "All" 
    ? SKINS 
    : SKINS.filter(s => s.rarity === filter);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common": return "text-white/70 border-white/30";
      case "Rare": return "text-[#3c8aff] border-[#3c8aff]/50";
      case "Epic": return "text-[#0052FF] border-[#0052FF]";
      case "Legendary": return "text-[#ffcc00] border-[#ffcc00]";
      default: return "text-white/70 border-white/30";
    }
  };

  const handleEquip = (skin: Skin) => {
    setEquippedSkinId(skin.id);
    // TODO: Later write to onchain player profile or game state
  };

  const handleMint = (skin: Skin) => {
    setSelectedSkin(skin);
  };

  return (
    <div className="glass border border-white/10 p-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-2xl bg-[#0052FF]/10">
              <Shirt className="w-7 h-7 text-[#0052FF]" />
            </div>
            <div className="text-4xl font-semibold tracking-tight">RIFT SKINS</div>
          </div>
          <div className="text-white/60">Equip glitch Pepe PFPs that appear in-game with unique tearing effects</div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {(["All", "Common", "Rare", "Epic", "Legendary"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 text-xs tracking-[1.5px] border rounded-2xl transition-all ${
                filter === f 
                  ? "border-[#0052FF] bg-[#0052FF]/10 text-[#0052FF]" 
                  : "border-white/20 hover:border-white/50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkins.map((skin) => {
          const isEquipped = equippedSkinId === skin.id;
          const rarityClass = getRarityColor(skin.rarity);

          return (
            <motion.div 
              key={skin.id}
              whileHover={{ y: -4 }}
              className={`group relative overflow-hidden rounded-3xl border p-6 transition-all ${isEquipped ? "border-[#0052FF] bg-[#0052FF]/5" : "border-white/10 hover:border-white/30"}`}
            >
              {/* Skin Visual (Glitch Pepe Representation) */}
              <div className="relative h-48 w-full mb-6 rounded-2xl bg-black flex items-center justify-center overflow-hidden border border-white/10">
                <div className="text-[120px] opacity-90 select-none">👾</div>
                
                {/* Glitch layers */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,#0052FF_0px,#0052FF_1px,transparent_1px,transparent_4px)] opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0052FF]/20 via-transparent to-transparent" />
                
                {/* Glitch level indicator */}
                <div className="absolute top-4 right-4 px-3 py-1 text-[10px] tracking-[2px] border border-white/30 rounded-full flex items-center gap-1.5">
                  <Zap className="w-3 h-3" /> GLITCH {skin.glitchLevel}
                </div>

                {isEquipped && (
                  <div className="absolute bottom-4 left-4 px-3 py-1 bg-[#0052FF] text-black text-xs tracking-[1.5px] rounded-full flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" /> EQUIPPED
                  </div>
                )}
              </div>

              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="font-semibold text-xl tracking-tight">{skin.name}</div>
                  <div className={`text-xs tracking-[2px] mt-1 inline-block px-3 py-px border rounded-full ${rarityClass}`}>
                    {skin.rarity}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-white/50">MINT PRICE</div>
                  <div className="font-mono text-[#0052FF] text-lg">{skin.price} ETH</div>
                </div>
              </div>

              <div className="flex gap-3">
                {isEquipped ? (
                  <div className="flex-1 py-3 text-center text-sm border border-[#0052FF] text-[#0052FF] rounded-2xl tracking-[1px]">
                    CURRENTLY EQUIPPED
                  </div>
                ) : (
                  <button 
                    onClick={() => handleEquip(skin)}
                    className="flex-1 py-3 text-sm border border-white/30 hover:border-[#0052FF] hover:text-[#0052FF] rounded-2xl tracking-[1px] transition-all"
                  >
                    EQUIP SKIN
                  </button>
                )}

                <button 
                  onClick={() => handleMint(skin)}
                  className="flex-1 py-3 text-sm bg-[#0052FF] hover:bg-[#0033aa] text-black font-semibold rounded-2xl tracking-[1px] transition-all"
                >
                  MINT
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mint Transaction Modal */}
      {selectedSkin && (
        <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-6">
          <div className="glass w-full max-w-md p-9 border border-[#0052FF]/40">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">👾</div>
              <div className="text-3xl font-semibold tracking-tight mb-1">Mint {selectedSkin.name}</div>
              <div className="text-[#0052FF] text-sm tracking-[2px]">{selectedSkin.rarity} • Glitch Level {selectedSkin.glitchLevel}</div>
            </div>

            <Transaction
              chainId={8453}
              calls={[
                {
                  to: "0x0000000000000000000000000000000000000000", // TODO: Replace with real ERC721 contract
                  data: "0x",
                  value: parseEther(selectedSkin.price),
                },
              ]}
            >
              <TransactionButton className="w-full py-4 bg-[#0052FF] hover:bg-[#0033aa] text-black font-semibold text-base tracking-[1px] active:scale-[0.985]">
                CONFIRM MINT • {selectedSkin.price} ETH
              </TransactionButton>
            </Transaction>

            <button 
              onClick={() => setSelectedSkin(null)}
              className="w-full mt-4 py-3 text-sm text-white/60 hover:text-white tracking-[1px]"
            >
              CANCEL
            </button>

            <div className="text-center text-[10px] text-white/40 mt-6 tracking-widest">
              Skin will be minted to your wallet and appear in your inventory
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
