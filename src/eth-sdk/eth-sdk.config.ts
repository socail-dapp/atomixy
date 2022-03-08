import type { EthSdkConfig } from "@dethcrypto/eth-sdk";

const config: EthSdkConfig = {
  contracts: {
    // mainnet: {
    //   dai: '0x6b175474e89094c44da98b954eedeac495271d0f',
    // },
    localhost: {
      atomixy: process.env.NEXT_LOCAL_ADDRESS,
    },
  },
};

export default config;
