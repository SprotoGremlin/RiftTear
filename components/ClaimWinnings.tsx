"use client";

import { Transaction, TransactionButton, TransactionStatus, TransactionStatusLabel } from "@coinbase/onchainkit/transaction";
import { parseEther } from "viem";
import { Trophy, Zap, ExternalLink } from "lucide-react";
import { MATCH_CONTRACT_ADDRESS } from "@/lib/contracts";
import { useState } from "react";

interface ClaimWinningsProps {
  matchId: string;
  potAmount: string;
  onClaimSuccess?: () => void;
  onClose?: () => void;
}

export default function ClaimWinnings({ matchId, potAmount, onClaimSuccess, onClose }: ClaimWinningsProps) {
  const [claimed, setClaimed] = useState(false);

  const calls = [
    {
      to: MATCH_CONTRACT_ADDRESS,
      data: "0x" as `0x${string}`,
      value: BigInt(0),
    },
  ];

  const handleSuccess = () => {
    console.log("Winnings claimed for match:", matchId);
    setClaimed(true);
    onClaimSuccess?.();
  };

  const basescanUrl = `https://basescan.org/address/${MATCH_CONTRACT_ADDRESS}`;

  return (
    <div className="glass w-full max-w-sm mx-auto p-8 border border-[#0052FF]/40 text-center">
      <div className="mx-auto w-20 h-20 rounded-full bg-[#0052FF]/10 flex items-center justify-center mb-6">
        <Trophy className="w-10 h-10 text-[#0052FF]" />
      </div>

      <div className="text-4xl font-black tracking-tighter mb-2">YOU WON</div>
      <div className="text-6xl font-mono text-[#0052FF] tracking-[-2px] mb-1">{potAmount} ETH</div>
      <div className="text-sm text-white/50 mb-8 tracking-widest">MATCH {matchId}</div>

      {!claimed ? (
        <Transaction
          chainId={8453}
          calls={calls}
          onSuccess={handleSuccess}
        >
          <TransactionButton className="w-full py-4 bg-[#0052FF] hover:bg-[#0033aa] text-black font-semibold text-base tracking-[1px] active:scale-[0.985] flex items-center justify-center gap-3">
            <Zap className="w-5 h-5" />
            CLAIM POT ONCHAIN
          </TransactionButton>

          <div className="mt-4">
            <TransactionStatus>
              <TransactionStatusLabel className="text-xs text-white/60" />
            </TransactionStatus>
          </div>
        </Transaction>
      ) : (
        <div className="py-4">
          <div className="text-[#00ffcc] text-xl font-semibold mb-4">✓ CLAIMED SUCCESSFULLY</div>
          <a 
            href={basescanUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#0052FF] hover:underline"
          >
            VIEW ON BASESCAN <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      <button 
        onClick={onClose}
        className="mt-6 text-xs text-white/50 hover:text-white tracking-[1px]"
      >
        CLOSE
      </button>

      <div className="text-[10px] text-white/40 mt-8 tracking-widest">Funds will be sent to your connected wallet instantly</div>
    </div>
  );
}
