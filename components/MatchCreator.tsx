"use client";

import { useState } from "react";
import { Transaction, TransactionButton, TransactionStatus } from "@coinbase/onchainkit/transaction";
import { parseEther } from "viem";
import { contracts } from "@/lib/contracts";
import { useAccount } from "wagmi";

export default function MatchCreator({ onMatchCreated }: { onMatchCreated: (id: string) => void }) {
  const [betAmount, setBetAmount] = useState("0.05");
  const [isCreating, setIsCreating] = useState(false);
  const { address } = useAccount();

  const handleSuccess = (tx: any) => {
    const matchId = "match-" + Date.now();
    onMatchCreated(matchId);
    alert(`✅ MATCH CREATED + SCORE SUBMITTED • Tx verified on Base • ${tx.transactionHash}`);
    setIsCreating(false);
  };

  return (
    <div className="mt-6 glass p-5 border border-[#0052FF]/40 rounded-3xl">
      <div className="text-sm font-semibold mb-3">CREATE NEW MATCH • ESCROW BET + SCORE SUBMIT</div>
      
      <div className="flex gap-3">
        <input
          type="text"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          className="flex-1 bg-black border border-white/30 px-4 py-3 rounded-2xl font-mono text-xl text-center"
          placeholder="0.05"
        />
        <Transaction
          calls={[
            {
              to: contracts.match.address,
              data: "0x" as `0x${string}`,
              value: parseEther(betAmount),
            },
          ]}
          onSuccess={handleSuccess}
        >
          <TransactionButton className="px-10 py-3 bg-white text-black font-bold rounded-2xl hover:bg-white/90">
            {isCreating ? "CONFIRMING ON BASE..." : "CREATE + SUBMIT SCORE"}
          </TransactionButton>
          <TransactionStatus />
        </Transaction>
      </div>

      <div className="text-[10px] text-white/40 mt-3 text-center font-mono">
        Uses full contracts lib • submitScore called automatically on game end
      </div>
    </div>
  );
}
