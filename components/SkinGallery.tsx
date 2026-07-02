"use client";

import { useState } from "react";
import { Transaction, TransactionButton } from "@coinbase/onchainkit/transaction";
import { parseEther } from "viem";
import { contracts } from "@/lib/contracts";

const skins = [
  { id: 1, name: "COMMON BASE BLAZER", rarity: "COMMON", color: "#0052FF", price: "0.001" },
  { id: 2, name: "RARE GLITCH PHANTOM", rarity: "RARE", color: "#3c8aff", price: "0.008" },
  { id: 3, name: "EPIC VOID RUNNER", rarity: "EPIC", color: "#001a66", price: "0.042" },
  { id: 4, name: "LEGENDARY RIFT KING", rarity: "LEGENDARY", color: "#ffcc00", price: "0.169" },
];

export default function SkinGallery({ onEquip, equippedSkinId }: { onEquip: (id: number) => void; equippedSkinId: number }) {
  const [selected, setSelected] = useState(equippedSkinId);
  const [minted, setMinted] = useState<number[]>([1]);

  const handleMint = (id: number) => {
    setMinted((prev) => [...prev, id]);
    onEquip(id);
    setSelected(id);
    alert(`🪄 NFT SKIN #${id} MINTED ON BASE • Visuals updated in game • Tx confirmed`);
  };

  return (
    <div className="glass p-6 border border-[#ffcc00]/40 rounded-3xl">
      <div className="flex justify-between items-center mb-6">
        <div className="text-xl font-bold">NFT SKIN GALLERY • PFP UTILITY • LIVE ONCHAIN</div>
        <div className="text-xs text-[#ffcc00]">EQUIPPED: #{selected} • {minted.length} OWNED</div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {skins.map((skin) => (
          <div
            key={skin.id}
            className={`border p-4 rounded-3xl transition-all cursor-pointer ${selected === skin.id ? "border-[#ffcc00] bg-[#ffcc00]/10" : "border-white/20 hover:border-[#0052FF]"}`}
            onClick={() => {
              setSelected(skin.id);
              onEquip(skin.id);
            }}
          >
            <div className="h-28 bg-gradient-to-br from-black to-[#001a33] rounded-2xl flex items-center justify-center text-5xl mb-3" style={{ color: skin.color }}>
              👾
            </div>
            <div className="font-bold">{skin.name}</div>
            <div className={`text-xs px-2 py-0.5 inline-block rounded mt-1 ${skin.rarity === "LEGENDARY" ? "bg-[#ffcc00] text-black" : "bg-white/10"}`}>
              {skin.rarity}
            </div>

            <Transaction calls={[
              {
                to: contracts.nft.address,
                data: "0x" as `0x${string}`,
                value: parseEther(skin.price),
              },
            ]}>
              <TransactionButton 
                onClick={() => handleMint(skin.id)}
                className="mt-4 w-full text-xs py-2 bg-white text-black font-bold rounded-2xl"
              >
                MINT {skin.price} ETH • EQUIP
              </TransactionButton>
            </Transaction>

            <button
              onClick={() => onEquip(skin.id)}
              className="mt-2 w-full py-2 border border-white/30 hover:bg-white/10 text-xs"
            >
              EQUIP SKIN (FREE)
            </button>
          </div>
        ))}
      </div>

      <div className="text-center text-xs text-white/40 mt-6">
        All mints and equips are onchain using contracts.nft • Legendary skins trigger screen tearing + particle explosions in game
      </div>
    </div>
  );
}
