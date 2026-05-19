// lib/contracts.ts
// RiftTear Match Contract (placeholder for production deployment)
// Replace with actual deployed contract address and ABI after deployment

export const MATCH_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000" as `0x${string}`;

export const MATCH_CONTRACT_ABI = [
  {
    inputs: [
      { internalType: "uint256", name: "betAmount", type: "uint256" }
    ],
    name: "createMatch",
    outputs: [{ internalType: "bytes32", name: "matchId", type: "bytes32" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes32", name: "matchId", type: "bytes32" }
    ],
    name: "claimWinnings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes32", name: "matchId", type: "bytes32" }
    ],
    name: "getMatch",
    outputs: [
      { internalType: "address", name: "creator", type: "address" },
      { internalType: "address", name: "opponent", type: "address" },
      { internalType: "uint256", name: "betAmount", type: "uint256" },
      { internalType: "uint256", name: "pot", type: "uint256" },
      { internalType: "bool", name: "active", type: "bool" },
      { internalType: "bool", name: "claimed", type: "bool" }
    ],
    stateMutability: "view",
    type: "function"
  }
] as const;
