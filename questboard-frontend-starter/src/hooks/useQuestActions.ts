/**
 * TODO (P5): Write to the contract (completeQuest / addQuest) + tx lifecycle.
 * See slides "Menulis ke Kontrak", "Tombol dengan Transaction State",
 * and "Auto-Refresh Setelah Transaksi".
 *
 * Use: useWriteContract() for writeContract + isPending,
 *      useWaitForTransactionReceipt({ hash }) for isConfirming/isSuccess,
 *      and queryClient.invalidateQueries() on success to refresh reads.
 */
export function useQuestActions() {
  // TODO: replace these stubs with real wagmi writes.
  function completeQuest(questId: number) {
    console.warn("TODO: implement completeQuest", questId)
  }
  function addQuest(title: string, reward: bigint) {
    console.warn("TODO: implement addQuest", title, reward)
  }

  return {
    completeQuest,
    addQuest,
    hash: undefined as `0x${string}` | undefined,
    isPending: false,
    isConfirming: false,
    isSuccess: false,
    error: null as Error | null,
    reset: () => {},
  }
}
