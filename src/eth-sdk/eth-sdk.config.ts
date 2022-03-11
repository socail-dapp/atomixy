import type { EthSdkConfig } from "@dethcrypto/eth-sdk";

const config: EthSdkConfig = {
  contracts: {
    // mainnet: {
    //   dai: '0x6b175474e89094c44da98b954eedeac495271d0f',
    // },
    localhost: {
      atomixy: process.env.NEXT_LOCAL_ADDRESS,
    },
    matic: {
      tokenV1: "0x0646D535ee5EDb9FaFcceC2e42809Bf74A5A96b8",
    },
  },
};

export default config;
