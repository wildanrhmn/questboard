import { parseAbi } from "viem"

/**
 * On-chain configuration for the QuestBoard dApp.
 *
 * ⚠️ When you re-deploy the contracts, update these three addresses with the
 * values printed by `npx hardhat ignition deploy ... --deployment-id ...`
 * (or read them from ignition/deployments/<id>/deployed_addresses.json).
 */
export const CHAIN_ID = 11155111 // Sepolia

export const QUEST_BOARD_ADDRESS =
  "0xc8587689E5197bDEDb39B55a915AA4FF5A3b2827" as const
export const QUEST_TOKEN_ADDRESS =
  "0xe4cdc2b610CF13584b884383bfEA3237009CA501" as const
export const QUEST_BADGE_ADDRESS =
  "0xf0c422C7f159fACD5a0DC001F65Dd8152A8462f2" as const

/** QuestBoard — the core game contract. */
export const questBoardAbi = parseAbi([
  "function owner() view returns (address)",
  "function questCount() view returns (uint256)",
  "function quests(uint256) view returns (string title, uint256 reward, bool active)",
  "function points(address) view returns (uint256)",
  "function completedCount(address) view returns (uint256)",
  "function badgeAwarded(address) view returns (bool)",
  "function completed(address, uint256) view returns (bool)",
  "function badgeURI() view returns (string)",
  "function BADGE_MILESTONE() view returns (uint256)",
  "function addQuest(string title, uint256 reward)",
  "function completeQuest(uint256 questId)",
  "function deactivateQuest(uint256 questId)",
  "event QuestAdded(uint256 indexed questId, string title)",
  "event QuestCompleted(address indexed player, uint256 indexed questId, uint256 reward)",
  "event BadgeAwarded(address indexed player, uint256 tokenId)",
])

/** QuestToken — ERC-20 reward (only the bits we read). */
export const erc20Abi = parseAbi([
  "function balanceOf(address) view returns (uint256)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
])

/** QuestBadge — ERC-721 milestone NFT (only the bits we read). */
export const erc721Abi = parseAbi([
  "function balanceOf(address) view returns (uint256)",
  "function tokenURI(uint256) view returns (string)",
])
