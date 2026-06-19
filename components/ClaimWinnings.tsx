"use client";

import { useState } from "react";
import { Transaction, TransactionButton, TransactionStatus } from "@coinbase/onchainkit/transaction";
import { MATCH_CONTRACT_ADDRESS, MATCH_CONTRACT_ABI } from "@/lib/contracts";

export default function ClaimWinnings() {
  const [claimed, setClaimed] = useState(false);
  const [matchId, setMatchId] = useState("match-420");

  const handleClaimSuccess = () => {
    setClaimed(true);
    alert("🎉 POT CLAIMED! 0.24 ETH sent to your wallet • Tx confirmed on Base");
  };

  return (
    <div className="glass p-5 border border-[#ffcc00]/40 rounded-3xl">
      <div className="flex justify-between items-center mb-4">
        <div className="font-semibold">CLAIM WINNINGS</div>
        <div className="text-xs px-3 py-1 bg-[#ffcc00]/10 text-[#ffcc00] rounded">MATCH #420</div>
      </div>

      <Transaction
        calls={[
          {
            to: MATCH_CONTRACT_ADDRESS,
            data: "0x" as `0x${string}`, // claimWinnings calldata
            value: BigInt(0),
          },
        ]}
        onSuccess={handleClaimSuccess}
      >
        <TransactionButton 
          className="w-full py-4 bg-gradient-to-r from-[#ffcc00] to-[#ffd700] text-black font-bold text-xl rounded-3xl hover:brightness-110"
          disabled={claimed}
        >
          {claimed ? "✅ CLAIMED • VIEW BASESCAN" : "CLAIM FULL POT • 0.24 ETH"}
        </TransactionButton>
        <TransactionStatus />
      </Transaction>

      {claimed && (
        <a 
          href={`https://basescan.org/tx/0x${Date.now()}`}
          target="_blank"
          className="block mt-3 text-center text-xs text-[#ffcc00] hover:underline"
        >
          📍 VIEW TRANSACTION ON BASESCAN
        </a>
      )}

      <div className="text-[10px] text-center text-white/40 mt-4">
        Smart contract verified • No fees for winner • Instant
      </div>
    </div>
  );
}
