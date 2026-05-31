import { useAccount, useReadContracts } from "wagmi"
import {
  QUEST_BADGE_ADDRESS,
  QUEST_BOARD_ADDRESS,
  QUEST_TOKEN_ADDRESS,
  erc20Abi,
  erc721Abi,
  questBoardAbi,
} from "../config/contracts"

const ZERO = "0x0000000000000000000000000000000000000000" as const

/**
 * Everything we show about the connected player, read in one batched call:
 * QST balance, points, quests completed, badges owned, and the milestone.
 */
export function usePlayerStats() {
  const { address } = useAccount()
  const me = address ?? ZERO

  const { data, isLoading } = useReadContracts({
    contracts: [
      { address: QUEST_TOKEN_ADDRESS, abi: erc20Abi, functionName: "balanceOf", args: [me] },
      { address: QUEST_TOKEN_ADDRESS, abi: erc20Abi, functionName: "symbol" },
      { address: QUEST_BOARD_ADDRESS, abi: questBoardAbi, functionName: "points", args: [me] },
      { address: QUEST_BOARD_ADDRESS, abi: questBoardAbi, functionName: "completedCount", args: [me] },
      { address: QUEST_BADGE_ADDRESS, abi: erc721Abi, functionName: "balanceOf", args: [me] },
      { address: QUEST_BOARD_ADDRESS, abi: questBoardAbi, functionName: "badgeAwarded", args: [me] },
      { address: QUEST_BOARD_ADDRESS, abi: questBoardAbi, functionName: "BADGE_MILESTONE" },
    ],
    query: { enabled: !!address, refetchInterval: 15_000 },
  })

  const [bal, sym, pts, done, badgeBal, awarded, milestone] = data ?? []

  return {
    qstBalance: bal?.result as bigint | undefined,
    symbol: (sym?.result as string | undefined) ?? "QST",
    points: pts?.result as bigint | undefined,
    completedCount: done?.result as bigint | undefined,
    badgeCount: badgeBal?.result as bigint | undefined,
    badgeAwarded: (awarded?.result as boolean | undefined) ?? false,
    milestone: (milestone?.result as bigint | undefined) ?? 5n,
    isLoading,
  }
}
