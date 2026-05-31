import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi"
import { QUEST_BOARD_ADDRESS, questBoardAbi } from "../config/contracts"

/**
 * Wraps the two state-changing calls (completeQuest / addQuest) and exposes a
 * clean transaction lifecycle: idle → pending (wallet) → confirming (mining)
 * → success / error. On success it refreshes all on-chain reads.
 *
 * Each component that calls this gets its OWN tx state, so a per-quest button
 * can show its own spinner without affecting others.
 */
export function useQuestActions() {
  const queryClient = useQueryClient()
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  // Once the tx is mined, invalidate every read so the UI reflects new state.
  useEffect(() => {
    if (isSuccess) queryClient.invalidateQueries()
  }, [isSuccess, queryClient])

  function completeQuest(questId: number) {
    writeContract({
      address: QUEST_BOARD_ADDRESS,
      abi: questBoardAbi,
      functionName: "completeQuest",
      args: [BigInt(questId)],
    })
  }

  function addQuest(title: string, reward: bigint) {
    writeContract({
      address: QUEST_BOARD_ADDRESS,
      abi: questBoardAbi,
      functionName: "addQuest",
      args: [title, reward],
    })
  }

  return {
    completeQuest,
    addQuest,
    hash,
    isPending, // waiting for the user to confirm in their wallet
    isConfirming, // tx broadcast, waiting to be mined
    isSuccess,
    error,
    reset,
  }
}
