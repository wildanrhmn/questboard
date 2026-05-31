// ignition/modules/QuestSystem.ts
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules"

export default buildModule("QuestSystemModule", (m) => {
  const deployer = m.getAccount(0)
  const badgeURI = "ipfs://<badge-metadata-CID>"

  const token = m.contract("QuestToken", [deployer])
  const badge = m.contract("QuestBadge", [deployer])
  const board = m.contract("QuestBoard", [token, badge, badgeURI])

  // Run SEQUENTIALLY (after) so the two calls never race on the nonce
  const setMinter = m.call(badge, "setMinter", [board])
  m.call(token, "mint", [board, 1_000_000n * 10n ** 18n], {
    after: [setMinter],
  })

  return { token, badge, board }
})