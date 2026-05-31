import { network } from "hardhat"

// Latest deployment (quest-system-v2). Update if you redeploy.
const BOARD = "0xc8587689E5197bDEDb39B55a915AA4FF5A3b2827" as `0x${string}`

// Quest title + reward (in whole QST).
const QUESTS: [string, bigint][] = [
  ["Connect your wallet to QuestBoard", 10n],
  ["Follow @ETHJakarta on X", 15n],
  ["Join the GDGoC UIN Telegram", 10n],
  ["Complete the Solidity 101 quiz", 25n],
  ["Deploy your first smart contract", 40n],
]

const { viem } = await network.create()
const pub = await viem.getPublicClient()
const board = await viem.getContractAt("QuestBoard", BOARD)

for (const [title, reward] of QUESTS) {
  const hash = await board.write.addQuest([title, reward])
  await pub.waitForTransactionReceipt({ hash })
  console.log(`Added: "${title}" (${reward} QST)`)
}

console.log(`\nDone — questCount = ${await board.read.questCount()}`)
