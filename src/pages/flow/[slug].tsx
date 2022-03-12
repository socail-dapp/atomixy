import type { NextPage } from "next";
import Head from "next/head";
import useFetch from "@/helpers/hooks/useFetch";
import Wrapper from "@/components/tools/Wrapper";
import { useCallback, useEffect, useState } from "react";
import { ICommit } from "@/helpers/types";
import useWallet from "@/helpers/hooks/useWallet";
import moment from "moment";
import store from "store";
import ButtonVersions from "@/components/versions/ButtonVersions";
import useSWR, { SWRConfig } from "swr";
import axios from "axios";
import useFlow from "@/helpers/store/useFlow";
import ReactSplit, { SplitDirection } from "@devbookhq/splitter";
import { HeaderWallet } from "@/components/Layout";
import ToolTip from "@/components/ToolTip";
import Search from "@/components/Search";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export async function getServerSideProps({ query: { slug, key, storage } }) {
  // chainid -> testing use ipfs, on mainnet -> use arweave
  // 1. load from ipfs
  // ??: also load directly to provider ? optional?


  const url = storage === 'IPFS' || storage === 'ipfs' ? `https://ipfs.io/ipfs/${slug}` : `https://arweave.net/${slug}`
  try {
    const dataFlow = await fetcher(url);
    // reconfirm the chainID, so use chainID from here.

    return {
      props: {
        slug,
        keyContract: key,
        storage,
        // chainId: 31337,
        fallback: {
          [slug]: dataFlow,
        },
      },
    };
  } catch (error) {
    return {
      props: {
        isError: true,
      },
    };
  }
}

export default ({ fallback, slug, storage, keyContract, isError = false }) => {
  //useFetch(network?)

  // 1. inform user to change network ? (check network from data must be same with network wallet)
  // 2.

  const { setVersion, selectedVersion, loading } = useFetch(slug, storage);

  /**
   * clarify if key is same ?
   */
  const { setKey, setStorageType } = useFlow();
  useEffect(() => {
    setKey(keyContract);
    setStorageType(storage)
  }, []);

  if (isError) {
    return <div>404 data is broken</div>;
  }

  return (
    <SWRConfig value={{ fallback }}>
      <div className="w-full h-full">
        {/* <div className="absolute">
        information to click (authority: current version)
      </div> */}
        <div className="absolute w-screen flex flex-col sm:flex-row justify-between z-10 ">
          {/* dont remove to balance the space-between of 3 items */}
          <Search />
          <HeaderWallet minimize />

          <ButtonVersions
            {...{
              selectedVersion,
              keyContract,
              // data,
              onChange: (v) => setVersion(v),
            }}
          />
        </div>

        {loading && (
          <div className="backdrop-blur-sm  text-3xl z-30 absolute w-full h-full cursor-wait grid place-items-center text-white">
            loading...
          </div>
        )}

        <div className="w-screen h-screen absolute">
          <HorizontalSplit>
            <Wrapper
              {...{
                data: selectedVersion,
                isEdit: false,
                isCreate: false,
                keyContract,
              }}
            />
          </HorizontalSplit>
        </div>
      </div>
    </SWRConfig>
  );
};

function HorizontalSplit({ children }: any) {
  const [currArr, setCurrArr] = useState([100]);

  return (
    <ReactSplit initialSizes={currArr}>
      {currArr?.map((item, i) => (
        <VerticalSplit
          parentArr={currArr.length}
          onParent={() => {
            if (currArr?.length === 1) {
              setCurrArr([50, 50]);
            } else if (currArr?.length === 2) {
              // setCurrArr([50, 25, 25])
              setCurrArr([100]);
              //and check current i
            }
          }}
          key={i}
        >
          {children}
        </VerticalSplit>
      ))}
    </ReactSplit>
  );
}

function VerticalSplit({ onParent, parentArr, children }: any) {
  const [currArr, setCurrArr] = useState([100]);

  return (
    <ReactSplit initialSizes={currArr} direction={SplitDirection.Vertical}>
      {currArr?.map((item, i) => (
        <div className="absolute h-full w-full ">
          <div
            className="invisible md:visible absolute m-2 flex row gap-2 right-3/4 z-10  cursor-pointer"
            key={i}
          >
            {parentArr === 2 && currArr?.length === 1 && (
              <div className="has-tooltip">
                <VertiIcon
                  onClick={() => {
                    if (currArr?.length === 1) {
                      setCurrArr([50, 50]);
                    } else if (currArr?.length === 2) {
                      setCurrArr([100]);
                      //and check current i
                    }
                  }}
                />
                <ToolTip>Open Vertical</ToolTip>
              </div>
            )}
            {currArr.length === 2 && (
              <div className="has-tooltip">
                <VertiIcon
                  color="red"
                  onClick={() => {
                    setCurrArr([100]);
                  }}
                />
                <ToolTip>Close Vertical</ToolTip>
              </div>
            )}

            {parentArr === 1 ? (
              <div className="has-tooltip">
                <HoriIcon
                  //icon copy horizontal
                  onClick={onParent}
                />
                <ToolTip>Open Horizontal</ToolTip>
              </div>
            ) : (
              <div className="has-tooltip">
                <HoriIcon onClick={onParent} color="red" />
                <ToolTip>Close Horizontal</ToolTip>
              </div>
            )}
            {(parentArr > 1 || currArr.length > 1) && (
              <div className="text-white text-sm">experimental</div>
            )}
          </div>
          {children}
        </div>
      ))}
    </ReactSplit>
  );
}

const HoriIcon = ({ onClick, color = "white" }) => (
  <svg
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7"
    viewBox="0 0 20 20"
    fill={color}
  >
    <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
    <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
  </svg>
);

const VertiIcon = ({ onClick, color = "white" }) => (
  <svg
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7"
    viewBox="0 0 20 20"
    fill={color}
  >
    <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
    <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
  </svg>
);
