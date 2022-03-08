import React, { useMemo, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import useDynamicContract from "@/helpers/hooks/useDynamicContract";
import { useCallback, useEffect } from "react";
import { localAbi, localAddress } from "../utils/networks";
export default function useLoadList() {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { chainId } = useWeb3React();
  const getLocalData = useDynamicContract(localAddress, localAbi);
  // const getMainnetData = useDynamicContract(localContract, LocalToken.abi)
  const _loadAllData = useCallback(async () => {
    setLoading(true);

    // if not local then load all networks available

    // todo: change array length to tokensupply? or read from methods
    // how to get better approach?

    try {
      const list: any = [];

      //load local -> refactor
      for (let i = 0; i < 10; i++) {
        const o = await getLocalData?.getFlows(i);
        console.log(!!o, o);

        if (o) {
          list.push(JSON.parse(o));
        }
      }

      // //load mainnet -> refactor
      // for (let i = 0; i < 10; i++) {
      //     const o = await getLocalData?.getFlows(i);
      //     console.log(!!o, o)
      //     if (o) {
      //         list.push(JSON.parse(o))
      //     }
      // }

      setState(list);
      console.log(list, "list");
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }

    //combined all arrays?
  }, [getLocalData]);

  useEffect(() => {
    _loadAllData();
  }, []);

  return useMemo(
    () => ({
      data: state,
      loading,
    }),
    [state, loading]
  );
}
