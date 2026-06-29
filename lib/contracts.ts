export const MATCH_CONTRACT_ADDRESS = "0x4200000000000000000000000000000000000001" as `0x${string}`;

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
  {
    inputs: [{ name: "score", type: "uint256" }, { name: "skinId", type: "uint8" }],
    name: "submitScore",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export const NFT_SKIN_CONTRACT_ADDRESS = "0x4200000000000000000000000000000000000002" as `0x${string}`;

export const NFT_ABI = [
  {
    inputs: [{ name: "skinId", type: "uint8" }],
    name: "mintSkin",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ name: "skinId", type: "uint8" }],
    name: "equipSkin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export const contracts = {
  match: { address: MATCH_CONTRACT_ADDRESS, abi: MATCH_CONTRACT_ABI },
  nft: { address: NFT_SKIN_CONTRACT_ADDRESS, abi: NFT_ABI },
};
