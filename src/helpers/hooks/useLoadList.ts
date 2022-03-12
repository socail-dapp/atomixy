import React, { useMemo, useState } from "react";
// import { useWeb3React } from "@web3-react/core";
import useDynamicContract from "@/helpers/hooks/useDynamicContract";
import { useCallback, useEffect } from "react";
import { localAbi, localAddress, maticAddress, rinkebyAddress } from "../utils/networks";


export default function useLoadList() {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  // const getLocalData = useDynamicContract(localAddress, localAbi);
  const getMaticData = useDynamicContract(maticAddress, localAbi, false, "https://polygon-rpc.com/");
  // const getRinkeby = useDynamicContract(rinkebyAddress, localAbi, false);




  const _loadAllData = useCallback(async () => {
    setLoading(true);

    // if not local then load all networks available

    // todo: change array length to tokensupply? or read from methods
    // how to get better approach?
    try {
      const list: any = [];

      //load local -> refactor
      for (let i = 1; i < 6; i++) {
        // const local = await getLocalData?.getFlows(i);
        const matic_data = await getMaticData?.getFlows(i);

        console.log(matic_data, 'MATIC',)

        // const r = await getRinkeby?.getFlows(i);


        // if (local) {
        //   list.push(JSON.parse(local));
        // }

        if (matic_data) {
          const m = JSON.parse(matic_data)
          list.push({ ...m, indexID: i });
        }

        // if (r) {
        //   list.push(JSON.parse(r));
        // }
      }


      //filter takes long
      const filteredList = list.sort((a, b) => b?.createdAt - a?.createdAt)
      setState(filteredList);
      console.log(filteredList, "filteredList");
      setLoading(false);

    } catch (error) {
      console.log(error, 'error')
      setLoading(false);
    }

    //combined all arrays?
  }, [getMaticData]);

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
