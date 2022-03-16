import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import useFlow from "../store/useFlow";
import {
  getProvider,
  localAbi,
  getAddress
} from "../utils/networks";
import useDynamicContract from "./useDynamicContract";

// todo: accept cuurrent chainId in data? to match with chainId in wallet
/**
 *
 * @param reservedChainId this chain id is from the data stored in arweave/ipfs
 * @returns
 */
export default function useNodePool(nodeId?: string) {
  const [poolData, setPoolData] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const { chainId: reservedChainId, key } = useFlow();



  const _contract = useDynamicContract(
    getAddress(reservedChainId),
    localAbi,
    false,
    getProvider(reservedChainId)
  );

  useEffect(() => {
    _loadPoolData(nodeId);
    console.log('effect usenodepool')
  }, []);

  // function getPoolTransactions(uint256 _projectId, string memory _nodeId)
  const _loadPoolData = useCallback(async (valueId: any) => {
    if (!_contract) return null;
    setLoading(true);
    console.log(_contract, getAddress(reservedChainId), typeof reservedChainId, 'reservedChainId',

      Number(key), valueId,

      typeof Number(key), typeof valueId

    )

    try {
      const res = await _contract?.getPoolTransactions(Number(key), valueId);

      console.log(res, "res? loadpooldata");
      setPoolData(res);

      let sum = 0;
      res?.map((a) => {
        sum += Number(ethers.utils.formatEther(a?.amount));
      });
      // res?.reduce((a, b) => {
      //     return ethers.utils.formatEther(a?.amount) +
      //         ethers.utils.formatEther(b?.amount)
      // } )

      setTotalAmount(sum);
      setLoading(false);
      console.log(sum, "sum before passed usenodepool");

      return sum;
    } catch (error) {
      console.log(error, "error pooldata");
      setLoading(false);
      return 0;
    }
  }, [_contract])

  return {
    poolData,
    loading,
    totalAmount,
    _loadPoolData,
  }
}
