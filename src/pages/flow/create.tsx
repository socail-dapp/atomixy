import type { NextPage } from "next";
import Head from "next/head";
import useStore from "@/helpers/store";
import Wrapper from "@/components/tools/Wrapper";
import { useEffect } from "react";
import { ICommit } from "@/helpers/types";
import ModalCreation from "@/components/modals/ModalCreation";
import { HeaderWallet } from "@/components/Layout";
import Search from "@/components/Search";

/**
 * I want the node as VIEW ONLY FIRST
 */

export default ({ cookies }) => {
  const { setUnlock, showModal, currentFlow } = useStore();
  useEffect(() => {
    showModal(<ModalCreation />);
    setUnlock();
  }, []);

  return (
    <>

      <div className="absolute w-screen flex row justify-between z-10 ">
        {/* dont remove to balance the space-between of 3 items */}
        <div />
        <HeaderWallet minimize />

        <div
        />
      </div>
      <Wrapper
        {...{
          fullData: currentFlow,
          data: currentFlow?.currentVersion,
          isEdit: true,
          isCreate: true,
        }}
      />
    </>
  );
};

interface IElement {}

const default_commit: ICommit = {
  type: "edit", // donation?  edit
  description: "",
  title: "",
  createdBy: "",
  createdAt: null,
  approvedAt: null,
  approvedBy: null,
  sequence: 0,
  elements: [],
  pools: [], //grant or bounty pools ??
  //prevSequenceArray ? so I can identify from which upgrade
};

// poolsstructured inside of element
interface IPool {
  txHash: string
  blockHash: any
  chainId: number | string
  value: any // value donated
  from: string
  to: string
  fee: any
  createdAt: any
  network: any
  nodeId: any
  nodeTitle: any
}


const default_flow = {
  title: "just created",
  status: "public",
  versions: [
    // default_commit
  ], //first one is current
  versionSuggested: [], //first one is last updated
  versionByUser: {
    // [user]: []
  },
  currentVersion: default_commit,
  createdAt: "",
  createdBy: "",
  updatedAt: "",
  updatedBy: "", //lastUpda
  sequence: 0, // --> verrsions.length
  // pools: [] //grant or bounty pools --> maybe split it not by []
  poolsId: null,
  versionGrants: [], //--> only for grants
};

// export async function getServerSideProps({ req, res }) {
//     // Create a cookies instance
//     const cookies = new Cookies(req, res)
//     // Get a cookie
//     const curr = cookies.get('flows')
//     // Set a cookie
//     // console.log(JSON.parse(curr), 'curr')
//     return {
//         props: {
//             cookies: curr
//         }
//     }
// }
