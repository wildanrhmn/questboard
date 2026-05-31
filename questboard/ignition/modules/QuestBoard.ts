import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("QuestBoardModule", (m) => {
    const board = m.contract("QuestBoard")
    return { board }
  })