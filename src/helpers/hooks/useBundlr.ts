import React, { useMemo } from 'react'
import { WebBundlr } from "@bundlr-network/client";
import BigNumber from "bignumber.js";
import { useWeb3React } from "@web3-react/core";

// const providers = ["MetaMask", "WalletConnect"];

// const matic = {
//     providers,
//     opts: {
//       chainId: 137,
//       chainName: "Polygon Mainnet",
//       rpcUrls: ["https://polygon-rpc.com"],
//     },
//   }
export default function useBundlr() {
    const { account, chainId, library } = useWeb3React();

    // const bundlr = new WebBundlr("https://node1.bundlr.network", `matic`, library);

    // console.log(bundlr,
    //     bundlr.utils.getBundlerAddress(`matic`)
    // )

    return useMemo(() => {
        if (!library) {
            return null;
        }

        try {
            return new WebBundlr("https://node1.bundlr.network", `matic`, library);
        } catch (error) {
            console.error("Failed To connect bundlr", error);
            return null;
        }
    }, [library])
}
