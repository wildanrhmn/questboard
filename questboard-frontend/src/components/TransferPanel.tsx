import { useState } from "react"
import { isAddress } from "viem"
import { useAccount } from "wagmi"
import { usePlayerStats } from "../hooks/usePlayerStats"
import { useTransfer } from "../hooks/useTransfer"
import { formatToken } from "../lib/format"
import { SendIcon, SpinnerIcon } from "./icons"

export function TransferPanel() {
  const { isConnected } = useAccount()
  const { qstBalance, symbol } = usePlayerStats()
  const { transfer, isPending, isConfirming, isSuccess, error } = useTransfer()

  const [to, setTo] = useState("")
  const [amount, setAmount] = useState("")

  const busy = isPending || isConfirming
  const validTo = isAddress(to)
  const amountNum = Number(amount)
  const balanceNum = qstBalance !== undefined ? Number(formatToken(qstBalance, 18, 18)) : 0
  const overBalance = amountNum > balanceNum
  const canSend = isConnected && validTo && amountNum > 0 && !overBalance && !busy

  let label = "Send QST"
  if (isPending) label = "Confirm in wallet…"
  else if (isConfirming) label = "Sending…"
  else if (isSuccess) label = "Sent ✓"

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (canSend) transfer(to as `0x${string}`, amount)
  }

  return (
    <section className="transfer-panel">
      <div className="section-head">
        <h2>Send {symbol}</h2>
        <span className="section-sub">
          Transfer your earned tokens to any address. Balance: {formatToken(qstBalance)} {symbol}
        </span>
      </div>

      <form className="transfer-form" onSubmit={submit}>
        <input
          className="input grow"
          placeholder="Recipient address (0x…)"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <input
          className="input amount-input"
          type="number"
          min="0"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button className="btn btn-primary" disabled={!canSend}>
          {busy ? <SpinnerIcon className="ic-sm" /> : <SendIcon className="ic-sm" />}
          {label}
        </button>
      </form>

      {to && !validTo && <p className="transfer-hint">Enter a valid 0x address.</p>}
      {validTo && overBalance && <p className="transfer-hint">Amount exceeds your balance.</p>}
      {error && <p className="transfer-hint err">{shortError(error.message)}</p>}
      {isSuccess && <p className="transfer-ok">Transfer complete — balance updated.</p>}
    </section>
  )
}

function shortError(msg: string): string {
  if (msg.toLowerCase().includes("user rejected")) return "Transaction rejected."
  const m = msg.match(/reason:\s*(.+)/i)
  return (m ? m[1] : msg).split("\n")[0].slice(0, 120)
}