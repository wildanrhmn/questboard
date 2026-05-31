/**
 * TODO (P5): Read the quest list from QuestBoard.
 * See slides "Membaca Data — useReadContract" & "Baca Banyak — useReadContracts".
 *
 * Plan: useReadContract -> questCount(); then useReadContracts to batch-read
 * quests(0..n-1) and completed(me, 0..n-1). Map results into Quest[].
 */
export interface Quest {
  id: number
  title: string
  reward: bigint
  active: boolean
  completed: boolean
}

export function useQuests() {
  // TODO: replace this stub with real reads.
  return { quests: [] as Quest[], questCount: 0, isLoading: false }
}
