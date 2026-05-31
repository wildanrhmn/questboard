import { buildModule } from "@nomicfoundation/hardhat-ignition/modules"

export default buildModule("QuestTokenModule", (m) => {
  const deployer = m.getAccount(0)
  const token = m.contract("QuestToken", [deployer])
  return { token }
})