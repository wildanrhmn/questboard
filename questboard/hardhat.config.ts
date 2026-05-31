import type { HardhatUserConfig } from "hardhat/config"
import hardhatToolboxViem from "@nomicfoundation/hardhat-toolbox-viem"
import "dotenv/config"

const config: HardhatUserConfig = {
  plugins: [hardhatToolboxViem],
  solidity: "0.8.28",
  networks: {
    sepolia: {
      type: "http",
      // Drop a dedicated RPC (Alchemy/Infura) in .env as SEPOLIA_RPC_URL for
      // rock-solid nonce handling; falls back to the public node otherwise.
      url:
        process.env.SEPOLIA_RPC_URL ??
        "https://ethereum-sepolia-rpc.publicnode.com",
      accounts: [process.env.SEPOLIA_PRIVATE_KEY!],
    },
  },
  verify: {
    etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY!,
    },
  }
}

export default config