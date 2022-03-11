import LocalToken from "@/eth-sdk/abis/localhost/Token.json";
import config from "@/eth-sdk/eth-sdk.config";

export const localAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const localAbi = LocalToken.abi;

export const maticAddress = "0x0646D535ee5EDb9FaFcceC2e42809Bf74A5A96b8";
export const maticAbi = LocalToken.abi;


export const supportedChainIds = [
    1, 137,
    //tesnet
    3, 4, 5, 42, 80001,
    //local
    31337,
]
// related to each other
export const supportedNetwork = [
    `Mainnet`, `Polygon`,
    //testnet
    `Ropsten`, `Rinkeby`, `Goerli`, `Kovan`, `Mumbai`,
    //local
    `Local`,
]

export const isSupported = (chainId: number) => supportedChainIds.indexOf(chainId) === -1
export const getNetworkName = (chainId: number | undefined) => {
    if (supportedChainIds.indexOf(chainId) === -1) {
        return `Not Supported`
    } else {
        return supportedNetwork[supportedChainIds.indexOf(chainId)]
    }
}