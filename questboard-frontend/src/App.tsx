import { useAccount, useChainId, useSwitchChain } from "wagmi"
import { CHAIN_ID, QUEST_BOARD_ADDRESS } from "./config/contracts"
import { Navbar } from "./components/Navbar"
import { StatsRow } from "./components/StatsRow"
import { QuestList } from "./components/QuestList"
import { BadgeShowcase } from "./components/BadgeShowcase"
import { OwnerPanel } from "./components/OwnerPanel"
import { ConnectButton } from "./components/ConnectButton"
import { SparkleIcon } from "./components/icons"

function Hero() {
  return (
    <section className="hero">
      <span className="hero-kicker">
        <SparkleIcon className="ic-sm" /> On-chain learn-to-earn
      </span>
      <h1>
        Complete quests.
        <br />
        <span className="accent-text">Earn tokens &amp; badges.</span>
      </h1>
      <p className="hero-sub">
        Connect your wallet on Sepolia to start completing quests. Every quest pays
        you QST, and hitting the milestone mints an NFT badge — all on-chain.
      </p>
      <div className="hero-cta">
        <ConnectButton />
      </div>
    </section>
  )
}

function WrongNetworkBanner() {
  const { switchChain } = useSwitchChain()
  return (
    <div className="banner">
      <span>You're on the wrong network. QuestBoard lives on Sepolia.</span>
      <button className="btn btn-warn btn-sm" onClick={() => switchChain({ chainId: CHAIN_ID })}>
        Switch network
      </button>
    </div>
  )
}

export default function App() {
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const wrongNetwork = isConnected && chainId !== CHAIN_ID

  return (
    <div className="app">
      <Navbar />

      <main className="container main">
        {!isConnected && <Hero />}
        {wrongNetwork && <WrongNetworkBanner />}

        {isConnected && !wrongNetwork && (
          <>
            <StatsRow />
            <BadgeShowcase />
          </>
        )}

        <QuestList />

        {isConnected && !wrongNetwork && <OwnerPanel />}
      </main>

      <footer className="footer container">
        <span>QuestBoard · Weekly Class Web 3.0</span>
        <a
          href={`https://sepolia.etherscan.io/address/${QUEST_BOARD_ADDRESS}`}
          target="_blank"
          rel="noreferrer"
        >
          View contract ↗
        </a>
      </footer>
    </div>
  )
}
