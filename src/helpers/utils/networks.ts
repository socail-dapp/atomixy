import LocalToken from "@/eth-sdk/abis/localhost/Token.json";
import config from "@/eth-sdk/eth-sdk.config";

export const localAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
export const localAbi = LocalToken.abi;

export const maticAddress = "0x0646D535ee5EDb9FaFcceC2e42809Bf74A5A96b8";

//testnet
export const rinkebyAddress = "0xFEE4c702724D1Eb66E10cB2b85B5e4CEfB30FDb4";
export const getRopsten = "";
export const getGoerli = "";
export const getKovan = "";
export const getAvaxTest = "";
export const maticAbi = LocalToken.abi;

export const supportedChainIds = [
  1, 137,
  //tesnet
  3, 4, 5, 42, 80001,
  //local
  31337,
];
// related to each other
export const supportedNetwork = [
  `Mainnet`,
  `Polygon`,
  //testnet
  `Ropsten`,
  `Rinkeby`,
  `Goerli`,
  `Kovan`,
  `Mumbai`,
  //local
  `Local`,
];
export const colorNetworkName = [
  `text-gray-700`,
  `text-purple-600`,
  //testnet
  `Ropsten`,
  `text-orange-300`,
  `Goerli`,
  `Kovan`,
  `Mumbai`,
  //local
  `text-green-400`,
];

export const isSupported = (chainId: number) =>
  supportedChainIds.indexOf(chainId) === -1;
export const getNetworkName = (chainId: number | undefined) => {
  if (supportedChainIds.indexOf(chainId) === -1) {
    return `Not Supported`;
  } else {
    return supportedNetwork[supportedChainIds.indexOf(chainId)];
  }
};
export const getNetworkColorName = (chainId: number | undefined) => {
  if (supportedChainIds.indexOf(chainId) === -1) {
    return `text-red`;
  } else {
    return colorNetworkName[supportedChainIds.indexOf(chainId)];
  }
};

export const getProvider = (chainId) => {
  switch (chainId) {
    case 137:
      return "https://polygon-rpc.com/";
    case 4:
      return "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
    case 31337:
      return "http://127.0.0.1:8545/";

    default:
      return "http://127.0.0.1:8545/";
  }
};

// const getLocalData = useDynamicContract(localAddress, localAbi);
// const getMaticData = useDynamicContract(maticAddress, localAbi, false, "https://polygon-rpc.com/");
// //testnet
// const getRinkeby = useDynamicContract(rinkebyAddress, localAbi, false, "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
// // const getRopsten = useDynamicContract(ropstenAddress, localAbi, false,"https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
// // const getGoerli = useDynamicContract(goerliAddress, localAbi, false,"https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
// // const getKovan= useDynamicContract(kovanAddress, localAbi, false,"https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
// // const getAvaxTest = useDynamicContract(avaxTestAddress, localAbi, false,"https://api.avax-test.network/ext/bc/C/rpc");
