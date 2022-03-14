import { useWeb3React } from "@web3-react/core";
import React, { useCallback, useMemo } from "react";
import {
  localAbi,
  localAddress,
  maticAddress,
  rinkebyAddress,
} from "../utils/networks";
import useDynamicContract from "./useDynamicContract";

// todo: accept cuurrent chainId in data? to match with chainId in wallet
/**
 *
 * @param reservedChainId this chain id is from the data stored in arweave/ipfs
 * @returns
 */
// todo: block if reservedChainId is different from walletChainId
export default function useSelectContract() {
  const { chainId: walletChainId } = useWeb3React();

  const getAddress = useCallback(() => {
    switch (walletChainId) {
      case 137:
        return maticAddress;
      case 4:
        return rinkebyAddress;
      case 31337:
        return localAddress;

      default:
        return localAddress;
    }
  }, [walletChainId]);

  const _contract = useDynamicContract(getAddress(), localAbi, true);

  // maticAddress
  // rinkebyAddress
  // localStorage
  return useMemo(() => {
    if (!walletChainId) return null;

    return _contract;
  }, [walletChainId, _contract]);
}
