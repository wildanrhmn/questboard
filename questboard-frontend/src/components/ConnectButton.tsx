import {
  useAccount,
  useChainId,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from "wagmi"
import { CHAIN_ID } from "../config/contracts"
import { shortenAddress } from "../lib/format"
import { WalletIcon } from "./icons"

/**
 * The wallet button. Handles every connection state:
 *  - disconnected      → "Connect Wallet"
 *  - connecting        → "Connecting…"
 *  - wrong network     → "Switch to Sepolia"
 *  - connected & ready → account pill (click to disconnect)
 */
export function ConnectButton() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()

  if (!isConnected) {
    const injected = connectors[0]
    return (
      <button
        className="btn btn-primary"
        disabled={isPending}
        onClick={() => connect({ connector: injected })}
      >
        <WalletIcon className="ic" />
        {isPending ? "Connecting…" : "Connect Wallet"}
      </button>
    )
  }

  if (chainId !== CHAIN_ID) {
    return (
      <button className="btn btn-warn" onClick={() => switchChain({ chainId: CHAIN_ID })}>
        Switch to Sepolia
      </button>
    )
  }

  return (
    <button className="account-pill" onClick={() => disconnect()} title="Click to disconnect">
      <span className="dot" />
      {shortenAddress(address)}
    </button>
  )
}
