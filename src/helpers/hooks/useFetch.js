import React, { useEffect, useState } from "react";
import store from "store";
import useStore from "@/helpers/store";

export default function useFetch() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [selectedVersion, setVersion] = useState(null);

  const { addFlow } = useStore();

  const onLoad = async () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        // const x = await store.get("flows");
        // // const x = await window.localStorage.getItem("flows");
        // setData(JSON.parse(x), "x");

        const value = await store.get("flows");
        setData(value);
        addFlow(value);
        setVersion(value?.currentVersion);

        setLoading(false);
      } catch (error) {
        console.log(error, "error");
        setLoading(false);
      }
    }, 1000);
  };

  useEffect(() => {
    onLoad();
  }, []);

  return {
    data,
    loading,
    selectedVersion,
    setVersion,
    onRefresh: onLoad,
  };
}
