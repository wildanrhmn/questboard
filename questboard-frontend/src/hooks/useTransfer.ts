import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { parseEther } from "viem"
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi"
import { QUEST_TOKEN_ADDRESS, erc20Abi } from "../config/contracts"

export function useTransfer() {
  const queryClient = useQueryClient()
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  useEffect(() => {
    if (isSuccess) queryClient.invalidateQueries()
  }, [isSuccess, queryClient])

  // "10" → parseEther → 10 * 1e18 (QST has 18 decimals)
  function transfer(to: `0x${string}`, amount: string) {
    writeContract({
      address: QUEST_TOKEN_ADDRESS,
      abi: erc20Abi,
      functionName: "transfer",
      args: [to, parseEther(amount)],
    })
  }

  return { transfer, hash, isPending, isConfirming, isSuccess, error, reset }
}