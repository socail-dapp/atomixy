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

export default function useLoadListRinkeby() {
    const [state, setState] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);

    //testnet
    const getRinkeby = useDynamicContract(
        rinkebyAddress,
        localAbi,
        false,
        "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
    );




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
                // const local = await getLocalData?.getFlows(i);

                // testnet
                const test_rink = await getRinkeby?.getFlows(i);


                if (test_rink) {
                    const m = JSON.parse(test_rink);
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
    }, [getRinkeby]);

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
