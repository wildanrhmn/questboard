import { network } from "hardhat"

const BOARD = "0xB362A6b349940f1086FC4834fE1EdE42544A1758" as `0x${string}`   // addresses from deploy
const TOKEN = "0x370C6f14d8AF4e7e014Dc308DDFCE4322101Cffe" as `0x${string}`
const BADGE = "0xaB9D6c115876878Aa716745972B6Ec3434E9d35C" as `0x${string}`

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