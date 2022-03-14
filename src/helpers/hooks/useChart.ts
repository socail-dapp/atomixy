import React, { useEffect, useState } from "react";
import useStore from "../store";
import useFetch from "./useFetch";
import useNodePool from "./useNodePool";

export default function useChart() {
  const { currentFlow } = useStore();
  const { _loadPoolData } = useNodePool();
  const [poolProject, setPoolProject] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    _loadAllPool();
    //loadPool
  }, []);

  const _loadAllPool = async () => {
    const arrChart = [];
    // console.log('loadpool running', currentFlow?.currentVersion)
    // todo: data should be from selectedVersion (bug);

    currentFlow?.currentVersion?.elements?.map(async (item, i) => {
      // const { poolData, totalAmount } = useNodePool(item?.id);
      // console.log(totalAmount, 'totalAmount IN LOADPOOL')
      if (item?.detail) {
        const sum = await _loadPoolData(item?.id);
        arrChart.push({
          country: item?.detail?.titleCapsule,
          value: sum * 2539, //change get price from oracle,
          color: item?.detail?.colorBg,
        });
      }
    });

    setPoolProject(arrChart);
  };

  return {
    poolProject,
  };
}

// {
//     "country": "node2", //titleName //titleCapsule
//     "value": 2000, //pool?.value || 0
//     "color": "#03dac6", //colorBg
// },
