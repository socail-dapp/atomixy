import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";

export default function useDynamicContract(
  address: string,
  ABI: any,
  isMatchedNetwork?: boolean,
  providerLink: string = "http://127.0.0.1:8545/"
) {
  const { account, chainId, library } = useWeb3React();

  const _provider = new ethers.providers.StaticJsonRpcProvider(providerLink);
  // const contractEP = new Contract(address, ABI, _provider)

  // console.log(_provider, '_provider', ABI);

  useEffect(() => {
    console.log(
      account,
      library?.getSigner(account),
      chainId,
      "account DCONS",
      account ? "exist account" : "null ",
      isMatchedNetwork ? "berhak call" : "cant call "
    );
  }, [address, isMatchedNetwork, account, ABI]);

  return useMemo(() => {
    if (!address || !ABI) {
      return null;
    }
    try {
      //

      return new Contract(
        address,
        ABI,
        isMatchedNetwork ? library?.getSigner(account) : _provider
      );
    } catch (error) {
      console.error("Failed To Get Contract", error);
      return null;
    }
  }, [address, isMatchedNetwork, account, ABI]);
}
