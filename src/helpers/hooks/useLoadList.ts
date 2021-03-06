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

export default function useLoadList() {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);




  const getLocalData = useDynamicContract(localAddress, localAbi);
  const getMaticData = useDynamicContract(
    maticAddress,
    localAbi,
    false,
    "https://polygon-rpc.com/"
  );
  //testnet
  const getRinkeby = useDynamicContract(
    rinkebyAddress,
    localAbi,
    false,
    "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
  );
  // const getRopsten = useDynamicContract(ropstenAddress, localAbi, false,"https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
  // const getGoerli = useDynamicContract(goerliAddress, localAbi, false,"https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
  const getKovan = useDynamicContract(kovanAddress, localAbi, false, "https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
  const getMumbai = useDynamicContract(getAddress(80001), localAbi, false, getProvider(80001));
  // const getAvaxTest = useDynamicContract(avaxTestAddress, localAbi, false,"https://api.avax-test.network/ext/bc/C/rpc");





  const _loadAllData = useCallback(async () => {
    setLoading(true);

    // if not local then load all networks available

    // todo: change array length to tokensupply? or read from methods
    // how to get better approach?
    // V2: SPLIT into CHUNKS, and add by state
    try {
      const list: any = [];

      //load local -> refactor
      for (let i = 1; i < 6; i++) {
        // const local = await getLocalData?.getFlows(i);

        //mainnet
        const matic_data = await getMaticData?.getFlows(i);

        // testnet
        const test_rink = await getRinkeby?.getFlows(i);
        const test_kovan = await getKovan?.getFlows(i);
        const test_mumbai = await getMumbai?.getFlows(i);
        // const test_goerli = await getGoerli?.getFlows(i);
        // const test_ropsten = await getRopsten?.getFlows(i);


        // if (local) {
        //   const m = JSON.parse(local);
        //   list.unshift({ ...m, indexID: i });
        //   setState(list)
        // }

        if (matic_data) {
          const m = JSON.parse(matic_data);
          list.unshift({ ...m, indexID: i });
          setState(list)
        }

        if (test_rink) {
          const m = JSON.parse(test_rink);
          list.unshift({ ...m, indexID: i });
          setState(list)
        }
        if (test_kovan) {
          const m = JSON.parse(test_kovan);
          list.unshift({ ...m, indexID: i });
          setState(list)
        }
        if (test_mumbai) {
          const m = JSON.parse(test_mumbai);
          list.unshift({ ...m, indexID: i });
          setState(list)
        }

      }

      //filter takes long
      const filteredList = list.sort((a, b) => b?.createdAt - a?.createdAt);
      setState(filteredList);
      // console.log(filteredList, "filteredList");
      setLoading(false);
    } catch (error) {
      console.log(error, "error what");
      setLoading(false);
    }

    //combined all arrays?
  }, [getMaticData, getLocalData, getRinkeby, getMumbai, getKovan]);

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
