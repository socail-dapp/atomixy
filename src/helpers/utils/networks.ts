import LocalToken from "@/eth-sdk/abis/localhost/Token.json";
// import config from "@/eth-sdk/eth-sdk.config";

export const localAbi = LocalToken.abi;
export const localAddress = process.env.NEXT_PUBLIC_LOCAL_ADDRESS;

//mainnet
export const maticAddress = process.env.NEXT_PUBLIC_POLYGON_ADDRESS

//testnet
export const rinkebyAddress = process.env.NEXT_PUBLIC_RINKEBY_ADDRESS
// export const getRopsten = "";
// export const getGoerli = "";
export const kovanAddress = process.env.NEXT_PUBLIC_KOVAN_ADDRESS
export const mumbaiAddress = process.env.NEXT_PUBLIC_POLYGON_TESTNET_ADDRESS
// export const getAvaxTest = "";
export const maticAbi = LocalToken.abi;

console.log(mumbaiAddress, 'ADDRESS MUMBAI OWW')

export const getAddress = (reservedChainId: number | string | undefined) => {
  switch (reservedChainId) {
    case '137':
      return maticAddress;
    case 137:
      return maticAddress;
    case '4':
      return rinkebyAddress;
    case 4:
      return rinkebyAddress;
    case '42':
      return kovanAddress;
    case 42:
      return kovanAddress;
    case '80001':
      return mumbaiAddress;
    case 80001:
      return mumbaiAddress;
    case '31337':
      return localAddress;
    case 31337:
      return localAddress;

    default:
      return localAddress;
  }
}


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
  /**TESTNET */
  `Ropsten`,
  `Rinkeby`,
  `Goerli`,
  `Kovan`,
  `Mumbai`,
  /**LOCAL */
  `Local`,
];
export const colorNetworkName = [
  `text-gray-700`,
  `text-purple-600`,
  /**TESTNET */
  `Ropsten`,
  `text-orange-300`,
  `Goerli`,
  `Kovan`,
  `Mumbai`,
  /**LOCAL */
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
    case 42:
      return "https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
    case 80001:
      return "https://rpc-mumbai.maticvigil.com";
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
