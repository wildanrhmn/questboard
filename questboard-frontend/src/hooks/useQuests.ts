import { useAccount, useReadContract, useReadContracts } from "wagmi"
import { QUEST_BOARD_ADDRESS, questBoardAbi } from "../config/contracts"

const ZERO = "0x0000000000000000000000000000000000000000" as const

export interface Quest {
  id: number
  title: string
  reward: bigint
  active: boolean
  completed: boolean
}

/**
 * Reads the full quest list from QuestBoard, plus whether the connected
 * account has completed each one.
 *
 * Flow: read questCount() → batch-read quests(0..n-1) + completed(me, 0..n-1).
 */
export function useQuests() {
  const { address } = useAccount()

  const { data: count, isLoading: countLoading } = useReadContract({
    address: QUEST_BOARD_ADDRESS,
    abi: questBoardAbi,
    functionName: "questCount",
    query: { refetchInterval: 15_000 },
  })

  const questCount = count ? Number(count) : 0

  const detailReads = useReadContracts({
    contracts: Array.from({ length: questCount }, (_, i) => ({
      address: QUEST_BOARD_ADDRESS,
      abi: questBoardAbi,
      functionName: "quests",
      args: [BigInt(i)],
    })),
    query: { enabled: questCount > 0 },
  })

  const completedReads = useReadContracts({
    contracts: Array.from({ length: questCount }, (_, i) => ({
      address: QUEST_BOARD_ADDRESS,
      abi: questBoardAbi,
      functionName: "completed",
      args: [address ?? ZERO, BigInt(i)],
    })),
    query: { enabled: questCount > 0 && !!address },
  })

  const quests: Quest[] = []
  for (let i = 0; i < questCount; i++) {
    const detail = detailReads.data?.[i]
    if (detail?.status === "success") {
      const [title, reward, active] = detail.result as unknown as [
        string,
        bigint,
        boolean,
      ]
      const c = completedReads.data?.[i]
      const completed =
        c?.status === "success" ? (c.result as unknown as boolean) : false
      quests.push({ id: i, title, reward, active, completed })
    }
  }

  return {
    quests,
    questCount,
    isLoading: countLoading || detailReads.isLoading,
  }
}
