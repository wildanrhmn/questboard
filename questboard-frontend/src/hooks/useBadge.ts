import { useQuery } from "@tanstack/react-query"
import { useReadContract } from "wagmi"
import { QUEST_BOARD_ADDRESS, questBoardAbi } from "../config/contracts"
import { fetchIpfsJson } from "../lib/ipfs"

export interface BadgeMetadata {
  name: string
  description: string
  image: string // kept as the original ipfs:// URI — IpfsImage resolves it
}

/**
 * Reads the badge's metadata URI from QuestBoard, then fetches the JSON via a
 * multi-gateway fallback so it survives flaky public IPFS gateways.
 */
export function useBadgeMetadata() {
  const { data: uri } = useReadContract({
    address: QUEST_BOARD_ADDRESS,
    abi: questBoardAbi,
    functionName: "badgeURI",
  })

  return useQuery<BadgeMetadata>({
    queryKey: ["badge-metadata", uri],
    enabled: !!uri,
    staleTime: Infinity,
    retry: 1,
    queryFn: async () => {
      const json = await fetchIpfsJson<{
        name?: string
        description?: string
        image?: string
      }>(uri as string)
      return {
        name: json.name ?? "Quest Badge",
        description: json.description ?? "",
        image: json.image ?? "",
      }
    },
  })
}
