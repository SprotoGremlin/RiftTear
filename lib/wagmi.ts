import { createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

export const WagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http("https://mainnet.base.org"),
  },
  connectors: [
    coinbaseWallet({
      appName: "RiftTear",
      appLogoUrl: "https://riftttear.base/logo.png",
    }),
  ],
  ssr: true,
});

export const MATCH_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000" as `0x${string}`; // Placeholder - replace after deployment

export const MATCH_CONTRACT_ABI = [
  {
    inputs: [{ name: "betAmount", type: "uint256" }],
    name: "createMatch",
    outputs: [{ name: "matchId", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ name: "matchId", type: "uint256" }],
    name: "claimWinnings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "matchId", type: "uint256" }],
    name: "getMatch",
    outputs: [
      { name: "player1", type: "address" },
      { name: "player2", type: "address" },
      { name: "pot", type: "uint256" },
      { name: "winner", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
