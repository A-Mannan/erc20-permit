import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import 'hardhat-deploy-ethers';
import "dotenv/config";
import "@nomicfoundation/hardhat-ethers";


const {
  GOERLI_RPC_URL,
  PRIVATE_KEY,
  PRIVATE_KEY_2,
  ETHERSCAN_API_KEY,
  // COINMARKETCAP_API_KEY,
} = process.env;

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY!, PRIVATE_KEY_2!],
      chainId: 5,
      gas: 5000000,
      gasPrice:  50000000000,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.8",
      },
      {
        version: "0.8.20",
      },
      {
        version: "0.6.6",
      },
    ],
  },

  namedAccounts: {
    deployer: {
      default: 0
    },
  },

  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    // coinmarketcap: COINMARKETCAP_API_KEY,
  },
};

export default config;
