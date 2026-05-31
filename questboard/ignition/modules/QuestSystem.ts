// ignition/modules/QuestSystem.ts
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules"

export default buildModule("QuestSystemModule", (m) => {
  const deployer = m.getAccount(0)
  const badgeURI =
    "ipfs://bafkreih4b3ybvljgma2zci2uwwnqvx66z5bdjjgdood5mhebkjjmneuspe"

  const token = m.contract("QuestToken", [deployer])
  const badge = m.contract("QuestBadge", [deployer], { after: [token] })
  const board = m.contract("QuestBoard", [token, badge, badgeURI], {
    after: [badge],
  })

  const setMinter = m.call(badge, "setMinter", [board], { after: [board] })
  m.call(token, "mint", [board, 1_000_000n * 10n ** 18n], {
    after: [setMinter],
  })

  return { token, badge, board }
})
