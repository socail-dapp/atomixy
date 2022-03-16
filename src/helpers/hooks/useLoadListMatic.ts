import React, { useMemo, useState } from "react";
// import { useWeb3React } from "@web3-react/core";
import useDynamicContract from "@/helpers/hooks/useDynamicContract";
import { useCallback, useEffect } from "react";
import {
  kovanAddress,
  localAbi,
  localAddress,
  maticAddress,
  mumbaiAddress,
  rinkebyAddress,
  getAddress,
  getProvider
  // ropstenAddress,
  // goerliAddress,
  // kovanAddress,
  // avaxTestAddress,
} from "../utils/networks";

export default function useLoadListMumbai() {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getMumbai = useDynamicContract(getAddress(80001), localAbi, false, getProvider(80001));



  const _loadAllData = useCallback(async () => {
    setLoading(true);

    // if not local then load all networks available

    // todo: change array length to tokensupply? or read from methods
    // how to get better approach?
    // V2: SPLIT into CHUNKS, and add by state
    try {
      const list: any = [];

      //load local -> refactor
      for (let i = 1; i < 16; i++) {

        const test_mumbai = await getMumbai?.getFlows(i);

        if (test_mumbai) {
          const m = JSON.parse(test_mumbai);
          list.unshift({ ...m, indexID: i });
          setState(list)
        }

      }

      //filter takes long
      setState(list);
      // console.log(filteredList, "filteredList");
      setLoading(false);
    } catch (error) {
      console.log(error, "error what");
      setLoading(false);
    }

    //combined all arrays?
  }, [getMumbai]);

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
