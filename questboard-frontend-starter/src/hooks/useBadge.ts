/**
 * TODO (P5): Read badgeURI() from the contract, then fetch the metadata JSON
 * from IPFS. See slide "Bonus: Gambar NFT dari IPFS".
 *
 * Use useReadContract -> badgeURI(), then a useQuery (TanStack) that fetches
 * the JSON via an IPFS gateway and returns { name, description, image }.
 */
export interface BadgeMetadata {
  name: string
  description: string
  image: string
}

export function useBadgeMetadata() {
  // TODO: replace this stub with the real read + fetch.
  return { data: undefined as BadgeMetadata | undefined, isLoading: false }
}
