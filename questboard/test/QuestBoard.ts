import { describe, it } from "node:test"
import assert from "node:assert/strict"
import hre from "hardhat"

const { viem } = await hre.network.create()

describe("QuestBoard", () => {
  it("owner can add a quest", async () => {
    const board = await viem.deployContract("QuestBoard")
    await board.write.addQuest(["Connect a wallet", 10n])
    assert.equal(await board.read.questCount(), 1n)
  })

  it("owner can deactivate a quest", async () => {
    const board = await viem.deployContract("QuestBoard")
    await board.write.addQuest(["Connect a wallet", 10n])
    await board.write.deactivateQuest([0n])
    const [, , active] = await board.read.quests([0n])
    assert.equal(active, false)
  })
})