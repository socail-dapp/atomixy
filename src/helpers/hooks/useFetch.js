import React, { useCallback, useEffect, useMemo, useState } from "react";
import store from "store";
import useStore from "@/helpers/store";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

/**
 * v1 load from localstorage,
 * todo: migrate it to blockchain
 */
export default function useFetch(slug) {
  // const [loading, setLoading] = useState(false);
  // const [data, setData] = useState(null);
  const [selectedVersion, setVersion] = useState(null);

  const { data, error } = useSWR(`https://ipfs.io/ipfs/${slug}`, fetcher);
  // const loading = !error && !data
  console.log(data, "data useFEETCH", slug);

  const { addFlow } = useStore();

  // onLoad or refresh should trigger useSWR hooks again, tolearn
  const onLoad = useCallback(async () => {
    // setLoading(true);
    if (!!data) {
      // const x = await store.get("flows");
      // // const x = await window.localStorage.getItem("flows");
      // setData(JSON.parse(x), "x");

      // const value = await store.get("flows");
      // setData(value);
      // todo: move to useFlow store, and keep this for payload section
      addFlow(data);
      setVersion(data?.currentVersion);

      // setLoading(false);
      // } catch (error) {
      //   console.log(error, "error");
      //   // setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    onLoad();
  }, [data]);

  return useMemo(
    () => ({
      data,
      error,
      loading: !error && !data,
      selectedVersion,
      setVersion,
      onRefresh: onLoad,
    }),
    [data, selectedVersion, error, slug]
  );
}
