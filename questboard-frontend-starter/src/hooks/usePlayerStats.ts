/**
 * TODO (P5): Read the connected player's stats in one batched call.
 * See slide "Baca Banyak Sekaligus — useReadContracts".
 *
 * Read: QST balanceOf, token symbol, points, completedCount, badge balanceOf,
 * badgeAwarded, BADGE_MILESTONE. Use useAccount() to get the address.
 */
export function usePlayerStats() {
  // TODO: replace this stub with a real useReadContracts batch.
  return {
    qstBalance: undefined as bigint | undefined,
    symbol: "QST",
    points: undefined as bigint | undefined,
    completedCount: undefined as bigint | undefined,
    badgeCount: undefined as bigint | undefined,
    badgeAwarded: false,
    milestone: 5n,
    isLoading: false,
  }
}
