import { ethers } from "hardhat";

interface networkConfigItem {
  ethUsdPriceFeed?: string;
  blockConfirmations?: number;
}

interface networkConfigInfo {
  [key: string]: networkConfigItem;
}

export const networkConfig: networkConfigInfo = {
  localhost: {},
  hardhat: {},
  goerli: {
    ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    blockConfirmations: 5,
  },
};


export const INITIAL_SUPPLY = ethers.parseEther("100")

export const developmentChains = ["hardhat", "localhost"];
