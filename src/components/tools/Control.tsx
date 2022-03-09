import React, { useState } from "react";
import {
  addEdge,
  Connection,
  Edge,
  removeElements,
  Controls,
  ControlButton,
  useStoreState,
} from "react-flow-renderer";
import useStore from "@/helpers/store";
import store from "store";
import { useRouter } from "next/router";
import moment from "moment";
import useWallet from "@/helpers/hooks/useWallet";
import ToolTip from "../ToolTip";
import ModalDialog from "../ModalDialog";
import useDialog from "@/helpers/store/useDialog";
import Input from "../forms/Input";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useWeb3React } from "@web3-react/core";
import useDynamicContract from "@/helpers/hooks/useDynamicContract";
import { localAbi, localAddress } from "@/helpers/utils/networks";
import useFlow from "@/helpers/store/useFlow";
import useFetch from "@/helpers/hooks/useFetch";
import ipfs from "@/helpers/utils/ipfs";

export default function Control({
  data,
  elements,
  isCreate = true,
  editStatus = true,
  setEditStatus,
  keyContract,
}) {
  const {
    setLock,
    setUnlock,
    lock: unlocked,
    currentFlow,
    addFlow,
  } = useStore();
  const nodes = useStoreState((store) => store.nodes);
  const router = useRouter();

  // const { data: dataWallet } = useWallet();
  //move wallet to hooks -> by props ipfs -> trigger network choices
  const { account, library, chainId } = useWeb3React();

  // or use keyContract
  const { key } = useFlow();
  // console.log(key, 'key', keyContract)

  const [reason, setReason] = useState("");
  const [versionName, setVersionName] = useState("v");

  const onEdit = () => {
    // alert('are you sure want to edit?')
    // confirmation
    setUnlock();
    setEditStatus(true);

    // on create will have option to select the network choices

    //have options to store in localstorage first?
  };
  const onCancelEdit = () => {
    // alert('are you sure want to edit?')
    // confirmation
    setLock();
    setEditStatus(false);
    //reset flow ?
  };

  // function switch contract?
  // use from data parent which contracts
  // refactor  to accept other chain than evm
  const _contract = useDynamicContract(localAddress, localAbi, true);

  // const [loadingTx, setLoadingTx] = useState(false)
  //bug on versions
  //bug on refresh?
  const onSave = async (reason?: string) => {
    // onCreate ->

    //alert wallet to have same network first
    //check contract network === current network === saved network in data

    if (!elements?.length) return alert(`Empty ?`);

    // confirmation -> what to update? description, title
    // check wallet

    // do transaction -> pop up wallet
    //show loading saving
    const isConnected = typeof account === "string" && !!library;
    if (!isConnected) return alert("Connect wallet");

    const ACCOUNT = account;

    const submitElements = elements.map((item) => {
      const { data, ...restItem } = item;
      // console.log(item, 'ITEM SUBMIT')
      return {
        ...restItem,
        data: { label: item?.detail?.title },
        position: nodes.find((n) => n.id === item?.id)?.__rf?.position,
      };
    });

    // versions array shouldn't be updated here
    // if isCreate -> versions[] else versionsSuggested[]
    // if isCreate -> update currentVersion

    // const isUpdated = isCreate?

    const commitFlow = {
      ...currentFlow?.currentVersion,
      // description: "",
      // title: '', //versionName
      // approvedAt: '',
      // approvedBy: '',
      createdBy: ACCOUNT,
      createdAt: moment().unix(),
      sequence: isCreate
        ? Number(0)
        : Number(currentFlow?.currentVersion?.sequence) + 1, //automated versioning
      elements: submitElements,
      pools: [], //grant or bounty pools ??
      reason,
      uuid: uuidv4(),
      versionName: !isCreate ? versionName : `v0.0.0`,
      prevId: !isCreate ? currentFlow?.currentVersion?.uuid : `v0.0.0beta`,
      type: !isCreate ? "update-request" : "create",
      //uuid -> for selecting in between versions
    };
    // prevElement, prevIPFS}

    // A.
    // list of main versions
    const prevVersions = !isCreate ? currentFlow?.versions : [];
    // update: because update version array only from approval,
    // instead use array of suggestions/request (B)
    if (isCreate) {
      prevVersions.unshift(commitFlow);
    }
    const versions = prevVersions;

    // B. when update requested will place it here
    const prevVersionsSuggestion = !isCreate
      ? !!currentFlow?.versionSuggested
        ? currentFlow?.versionSuggested
        : []
      : [];

    prevVersionsSuggestion.unshift(commitFlow);
    const versionSuggested = prevVersionsSuggestion;

    // console.log(currentFlow?.versionByUser[ACCOUNT], 'currentFlow?.versionByUser[ACCOUNT]')
    // C. each users also recorded
    const prevVersionByUser = !isCreate
      ? !!currentFlow?.versionByUser[ACCOUNT] ? currentFlow?.versionByUser[ACCOUNT] : []
      : [];
    prevVersionByUser.unshift(commitFlow);

    // save version in user format
    const versionByUser = {
      ...currentFlow.versionByUser,
      [ACCOUNT]: prevVersionByUser,
    };

    // console.log(
    //     `prevVersions`, prevVersions,
    //     `versions->`, versions,
    //     `versionByUser->`, versionByUser,
    //     currentFlow?.versionByUser[ACCOUNT], `currentFlow?.versionByUser[dataWallet?.accountId]`
    // )

    const createdAt = moment().unix();
    // only for first creating
    const forCreation = {
      createdAt,
      createdBy: ACCOUNT,
      currentVersion: commitFlow,
      versions,
    };
    // only for updating -> all version must be approved first
    const forUpdating = {
      versionSuggested,
    };

    const payloadFlow = {
      ...currentFlow,
      versionByUser,
      updatedBy: ACCOUNT,
      updatedAt: moment().unix(),
      ...(isCreate ? forCreation : forUpdating),
      chainId,
      networks: "local", //isCreate
      // networks:
      // contract_address
    };

    // check to not accidentaly update main versions when only updating,
    // update main versions only from approval
    if (!isCreate) {
      if (payloadFlow?.versions?.length !== currentFlow?.versions?.length) {
        alert("Versions is breached");
      }
    }

    console.log(payloadFlow, "FINAL CHECK", isCreate);

    try {
      // await store.set("flows", payloadFlow);
      const ipfsId = await ipfs.add(JSON.stringify(payloadFlow));
      console.log(ipfsId, "ipfsId");
      let resultTx;

      if (isCreate) {
        const payloadContract = {
          ipfsPath: ipfsId.path,
          ipfsUrl: `https://ipfs.io/ipfs/${ipfsId.path}`,
          chainId,
          networks: "local", //isCreate
          title: currentFlow?.title, //isCreate
          description: currentFlow?.description, //isCreate
          tags: [],
          createdAt, //isCreate
          // poolsId: //ipfsPoolId
        };
        console.log(_contract, "_contract");

        //use typechain to avoid issue
        resultTx = await _contract.addFlow(JSON.stringify(payloadContract));
        //??: possibly also update the ipfs with current key from smart contract

        toast.success(
          `Project Saved in blockchain, Tx hash: ${resultTx?.hash}`
        );
      } else {
        console.log("UPDATING TX", key);
        const payloadContract = {
          ipfsPath: ipfsId.path,
          ipfsUrl: `https://ipfs.io/ipfs/${ipfsId.path}`,
          chainId,
          networks: "local", //isCreate
          title: currentFlow?.title, //isCreate
          description: currentFlow?.description, //isCreate
          tags: [],
          createdAt: currentFlow?.createdAt,
          updatedAt: createdAt, //current time
          // poolsId: //ipfsPoolId
        };
        console.log(_contract, "_contract");

        //use typechain to avoid issue, todo
        resultTx = await _contract.updateFlow(
          key,
          JSON.stringify(payloadContract)
        );
        //??: update storeFlow -> not required since it will be refreshed
        addFlow(payloadContract);
        //??: change the url slug
        window.history.replaceState(
          null,
          "",
          `/flow/${ipfsId.path}?key=${key}`
        );
        // todo: refresh from useFetch
        // window.location.reload()
        toast.success(
          `Project Updated in blockchain, Tx hash: ${resultTx?.hash}`
        );

        router.push(`/`);
      }

      console.log(resultTx, "res");
      if (!resultTx) throw Error;
      //alert with transaction
    } catch (error) {
      console.log(error, "rrro");
      toast.error(`Something Error`);
    }

    setEditStatus(false);
    setLock();
    if (!isCreate)
      toast.success(`You just add a new version`, {
        position: "top-right",
      });
    // if (isCreate) router.push(`/`);
  };

  const [isOpened, setOpen] = useState(false);

  function onOpen() {
    setOpen(true);
  }
  function onClose() {
    setOpen(false);
  }

  if (!isCreate) {
    return (
      <>
        <ModalDialog
          title={`Save confirmation`}
          desc={`Are you sure you want to save this Flow?`}
          // confirmText
          onConfirm={() => {
            onSave(reason);
            onClose();
          }}
          {...{
            onClose,
            onOpen,
            isOpened,
          }}
          hasChildren
        >
          <div className="my-2">
            <Input
              label={`Version Tag:`}
              onChange={(v: string) => setVersionName(v)}
              value={versionName}
            />
            <br />
            <Input
              label={`Explain the update, what's changed?`}
              onChange={(v: string) => setReason(v)}
              value={reason}
            />
          </div>
        </ModalDialog>
        <Controls showInteractive={false}>
          {editStatus && (
            <ControlButton onClick={unlocked ? setLock : setUnlock}>
              <div className="has-tooltip">
                {unlocked ? <LOCKCLOSED /> : <LOCKOPEN />}
                <ToolTip>{unlocked ? `Freeze ON` : `Freeze OFF`}</ToolTip>
              </div>
            </ControlButton>
          )}
          {!editStatus ? ( // if false
            <ControlButton onClick={onEdit}>
              <div className="has-tooltip">
                <EDIT />
                <ToolTip>{`Edit position flow`}</ToolTip>
              </div>
            </ControlButton>
          ) : (
            <ControlButton onClick={onCancelEdit}>
              <div className="has-tooltip">
                <CANCEL />
                <ToolTip>{`Cancel edit`}</ToolTip>
              </div>
            </ControlButton>
          )}
          {editStatus && (
            <ControlButton
              onClick={() => {
                onOpen();
              }}
            >
              <div className="has-tooltip">
                <SAVE />
                <ToolTip>{`Save flow`}</ToolTip>
              </div>
            </ControlButton>
          )}
        </Controls>
      </>
    );
  }

  return (
    <>
      <ModalDialog
        title={`Save confirmation`}
        desc={`Are you sure you want to save this Flow?`}
        // confirmText
        onConfirm={() => {
          onSave();
          onClose();
        }}
        {...{
          onClose,
          onOpen,
          isOpened,
        }}
      />
      <Controls showInteractive={false}>
        {editStatus && (
          <ControlButton onClick={unlocked ? setLock : setUnlock}>
            <div className="has-tooltip">
              {unlocked ? <LOCKCLOSED /> : <LOCKOPEN />}
              <ToolTip>{unlocked ? `Freeze ON` : `Freeze OFF`}</ToolTip>
            </div>
          </ControlButton>
        )}
        {editStatus && (
          <ControlButton
            onClick={() => {
              onOpen();
            }}
          >
            <div className="has-tooltip">
              <SAVE />
              <ToolTip>{`Save flow`}</ToolTip>
            </div>
          </ControlButton>
        )}
      </Controls>
    </>
  );
}

const FreezeON = `ON`;
const FreezeOFF = `OFF`;

const LOCKOPEN = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
  </svg>
);

const LOCKCLOSED = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
      clipRule="evenodd"
    />
  </svg>
);

const SAVE = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7"
    viewBox="0 0 20 20"
    fill="green"
  >
    <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
  </svg>
);

const CANCEL = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7"
    viewBox="0 0 20 20"
    fill="red"
  >
    <path
      fillRule="evenodd"
      d="M6.707 4.879A3 3 0 018.828 4H15a3 3 0 013 3v6a3 3 0 01-3 3H8.828a3 3 0 01-2.12-.879l-4.415-4.414a1 1 0 010-1.414l4.414-4.414zm4 2.414a1 1 0 00-1.414 1.414L10.586 10l-1.293 1.293a1 1 0 101.414 1.414L12 11.414l1.293 1.293a1 1 0 001.414-1.414L13.414 10l1.293-1.293a1 1 0 00-1.414-1.414L12 8.586l-1.293-1.293z"
      clipRule="evenodd"
    />
  </svg>
);

const EDIT = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7"
    viewBox="0 0 20 20"
    fill="orange"
  >
    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
    <path
      fillRule="evenodd"
      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
      clipRule="evenodd"
    />
  </svg>
);

// accessList: null
// blockHash: null
// blockNumber: null
// chainId: 0
// confirmations: 0
// creates: null
// data: "0x911c91a9000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000001ca7b22697066734964223a7b2270617468223a22516d616d6634425758514d6e335a4c437157726f777a7173633765764e7563586a65384a75434b6e6a5062504644222c22636964223a7b22636f646563223a226461672d7062222c2276657273696f6e223a302c2268617368223a7b2274797065223a22427566666572222c2264617461223a5b31382c33322c3138342c3138302c33392c3135352c32312c3139332c32372c3131392c3138312c37302c3131382c3230302c3135332c3130332c3233372c39312c382c33302c3135322c3232302c3137382c3137372c34302c39302c37322c35342c3131322c38312c3134382c34342c3235342c3132385d7d7d2c2273697a65223a323134347d2c226970667355726c223a2268747470733a2f2f697066732e696f2f697066732f516d616d6634425758514d6e335a4c437157726f777a7173633765764e7563586a65384a75434b6e6a5062504644222c22636861696e4964223a33313333372c226e6574776f726b73223a226c6f63616c222c227469746c65223a226173646173222c226465736372697074696f6e73223a226173646173222c2274616773223a5b5d2c22637265617465644174223a313634363632353331377d00000000000000000000000000000000000000000000"
// from: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
// gasLimit: BigNumber {_hex: '0x05f1c1', _isBigNumber: true}
// gasPrice: BigNumber {_hex: '0x5326dd74', _isBigNumber: true}
// hash: "0xb32d4fca54ed6d7286420e397c4759483e04363c5afceba7721c2e4bf7e987e0"
// maxFeePerGas: BigNumber {_hex: '0x5326dd74', _isBigNumber: true}
// maxPriorityFeePerGas: BigNumber {_hex: '0x5326dd74', _isBigNumber: true}
// nonce: 3
// r: "0x622dc77d6a448484f4ec2a1b2784c65241b93a193716753c200681885ceea23c"
// s: "0x116dad7446728962b28eb97251d0341ef8293bb735565ee73214e8e19c8a5d6f"
// to: "0x5FbDB2315678afecb367f032d93F642f64180aa3"
// transactionIndex: null
// type: 2
// v: 1
// value: BigNumber {_hex: '0x00', _isBigNumber: true}
