import { buildModule } from "@nomicfoundation/hardhat-ignition/modules"

export default buildModule("QuestBadgeModule", (m) => {
  const deployer = m.getAccount(0)
  const badge = m.contract("QuestBadge", [deployer])
  return { badge }
})