"use client";

import { Transaction, TransactionButton, TransactionStatus, TransactionStatusLabel } from "@coinbase/onchainkit/transaction";
import { parseEther } from "viem";
import { Trophy, Zap } from "lucide-react";
import { MATCH_CONTRACT_ADDRESS, MATCH_CONTRACT_ABI } from "@/lib/contracts";

interface ClaimWinningsProps {
  matchId: string;
  potAmount: string;
  onClaimSuccess?: () => void;
  onClose?: () => void;
}

export default function ClaimWinnings({ matchId, potAmount, onClaimSuccess, onClose }: ClaimWinningsProps) {
  const calls = [
    {
      to: MATCH_CONTRACT_ADDRESS,
      data: "0x" as `0x${string}`,
      value: BigInt(0),
    },
  ];

  const handleSuccess = () => {
    console.log("Winnings claimed for match:", matchId);
    onClaimSuccess?.();
  };

  return (
    <div className="glass w-full max-w-sm mx-auto p-8 border border-[#0052FF]/40 text-center">
      <div className="mx-auto w-20 h-20 rounded-full bg-[#0052FF]/10 flex items-center justify-center mb-6">
        <Trophy className="w-10 h-10 text-[#0052FF]" />
      </div>

      <div className="text-4xl font-black tracking-tighter mb-2">YOU WON</div>
      <div className="text-6xl font-mono text-[#0052FF] tracking-[-2px] mb-1">{potAmount} ETH</div>
      <div className="text-sm text-white/50 mb-8 tracking-widest">MATCH {matchId}</div>

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
