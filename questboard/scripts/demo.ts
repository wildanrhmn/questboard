import { network } from "hardhat"

const BOARD = "0xc8587689E5197bDEDb39B55a915AA4FF5A3b2827" as `0x${string}`   // quest-system-v2
const TOKEN = "0xe4cdc2b610CF13584b884383bfEA3237009CA501" as `0x${string}`
const BADGE = "0xf0c422C7f159fACD5a0DC001F65Dd8152A8462f2" as `0x${string}`

const { viem } = await network.create()
const pub = await viem.getPublicClient()
const [me] = await viem.getWalletClients()

const board = await viem.getContractAt("QuestBoard", BOARD)
const token = await viem.getContractAt("QuestToken", TOKEN)
const badge = await viem.getContractAt("QuestBadge", BADGE)

for (let i = 0; i < 5; i++) {
  await pub.waitForTransactionReceipt({
    hash: await board.write.addQuest([`Quest #${i}`, 10n]),
  })
}
for (let i = 0; i < 5; i++) {
  await pub.waitForTransactionReceipt({
    hash: await board.write.completeQuest([BigInt(i)]),
  })
}

console.log("QST :", await token.read.balanceOf([me.account.address]))
console.log("Badge:", await badge.read.balanceOf([me.account.address]))