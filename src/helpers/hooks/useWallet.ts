import React, { useEffect, useState } from "react";
import store from "store";

export default function useWallet() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    accountId: "0x00",
  });

  //   const onLoad = async () => {
  //     setLoading(true);
  //     setTimeout(async () => {
  //       try {
  //         // const x = await store.get("flows");
  //         const x = await window.localStorage.getItem("flows");
  //         setData(JSON.parse(x), "x");
  //         setLoading(false);
  //       } catch (error) {
  //         console.log(error, "error");
  //         setLoading(false);
  //       }
  //     }, 3000);
  //   };

  useEffect(() => {
    // onLoad();
  }, []);

  return {
    data,
    loading,
    // onRefresh: onLoad,
  };
}
