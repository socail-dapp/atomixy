import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment, useState } from "react";
import moment from "moment";
import ToolTip from "../ToolTip";
import ModalDialog from "../ModalDialog";
import toast from "react-hot-toast";
import useFetch from "@/helpers/hooks/useFetch";
import useStore from "@/helpers/store";
import { shortenHex } from "@/helpers/utils/evm";
import { useWeb3React } from "@web3-react/core";
import useDynamicContract from "@/helpers/hooks/useDynamicContract";
import { getNetworkName, localAbi, localAddress } from "@/helpers/utils/networks";
import ipfs from "@/helpers/utils/ipfs";
import useFlow from "@/helpers/store/useFlow";
import useFund from "@/helpers/hooks/useFund";
import StorageOption from "../tools/StorageOption";

export default function ButtonVersions({
  selectedVersion,
  // data,
  // setVersion
  onChange,
}) {
  const { account, library, chainId } = useWeb3React();
  // const { setLock, setUnlock, lock: unlocked

  // const { data: dataWallet } = useWallet();
  const { onRefresh } = useFetch();
  const { currentFlow: data, addFlow } = useStore();
  const { key, storageType } = useFlow();
  const { _upload } = useFund()

  // console.log(data, 'DATA FROM VERSIONS check');
  // function switch contract?
  // use from data parent which contracts
  // refactor  to accept other chain than evm
  const _contract = useDynamicContract(localAddress, localAbi, true);

  // item as currentFlow
  const onApprove = async (item) => {
    // todo:
    // check if network from dtb same with current wallet
    // if current is already matched-> cannot add

    const isConnected = typeof account === "string" && !!library;
    if (!isConnected) return alert("Connect wallet");

    const ACCOUNT = account;

    const approvedCommit = {
      ...item,
      approvedBy: ACCOUNT,
      approvedAt: moment().unix(),
      type: 'approved'
    };

    // add approved commit to main versions track
    const versions = data?.versions;
    versions.unshift(approvedCommit);

    const payloadFlow = {
      ...data,
      currentVersion: approvedCommit,
      updatedBy: ACCOUNT,
      updatedAt: moment().unix(),
      sequence: item?.sequence,
      versions,
    };

    try {
      let storageID;
      let storageURL;
      const storage_type = storageType

      const isArweave = storage_type === 'ARWEAVE'
      try {
        if (isArweave) {
          const arweaveId = await _upload(payloadFlow);
          storageID = arweaveId
          storageURL = `https://arweave.net/${arweaveId}`

        } else {
          const ipfsId = await ipfs.add(JSON.stringify(payloadFlow));
          storageID = ipfsId
          storageURL = `https://ipfs.io/ipfs/${ipfsId.path}`
        }
      } catch (error) {
        console.log(error, 'error arweave');

        alert('Storage error')
      }

      const storageInfo = {
        storageID,
        storageURL,
        chainId,
        storage_type, //storage_type
        networks: getNetworkName(chainId),  //isCreate
      }
      console.log(storageInfo, 'storageInfo')


      const payloadContract = {
        ...storageInfo,
        title: data?.title, //isCreate
        description: data?.description, //isCreate
        createdBy: data?.createdBy,
        createdAt: data?.createdAt,
        updatedAt: moment().unix(), //current time
        // poolsId: //ipfsPoolId
      };

      let resultTx;

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
        `/flow/${storageID}?key=${key}&storage=${storage_type}`
      );

      console.log(resultTx, "res");
      if (!resultTx) throw Error;

      onChange(approvedCommit);
      toast.success(`You just approved a version`);

      // change this window reload with onrefresh instead, for seamless
      window.location.reload();
      // onRefresh(); // todo: fix onRefresh
    } catch (error) {
      console.log(error, 'error contract');
    }
  };
  // dialogApprove

  const [isOpened, setOpen] = useState(false);
  const [itemModal, setItemModal] = useState(null);

  function onOpen() {
    setOpen(true);
  }

  function onClose() {
    setOpen(false);
    setItemModal(null);
  }

  const [tabs, setTab] = useState(1);
  const dataArray = tabs ? data?.versionSuggested : data?.versions;
  const [currentStorage, setStorage] = useState(null)
  return (
    <div className=" m-2 float-right ">
      <ModalDialog
        title={`Approve confirmation`}
        desc={`Are you sure you want to approve and change to this version?`}
        // confirmText
        onConfirm={() => {
          onApprove(itemModal);
          onClose();
        }}
        {...{
          onOpen,
          onClose,
          isOpened,
        }}
      >

        <StorageOption
          {...{ currentStorage, setStorage, isCreate: false }}
        />
      </ModalDialog>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                text-white group bg-orange-700 px-3 py-2 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span>Version: {selectedVersion?.versionName}</span>
              <ChevronDownIcon
                className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-50 w-screen max-w-sm mt-3 transform  right-0  ">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 ">
                  <div className="flex row">
                    <div
                      onClick={() => setTab(1)}
                      className={`w-full flex justify-center align-middle p-3 bg-orange-400 text-white font-medium cursor-pointer ${
                        !tabs && `opacity-25`
                      }`}
                    >
                      Request
                    </div>
                    <div
                      onClick={() => setTab(0)}
                      className={`w-full flex justify-center align-middle p-3 bg-orange-400 text-white font-medium cursor-pointer ${
                        tabs && `opacity-25`
                      }`}
                    >
                      History
                    </div>
                  </div>

                  {
                    <div className="relative  max-h-80 bg-white p-4 overflow-scroll ">
                      {dataArray?.map((item) => (
                        <a
                          key={item?.id}
                          // href={item.href}
                          className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        >
                          <div className="flex items-center justify-center flex-shrink-0 text-white h-12 w-12 ">
                            {/* <item.icon aria-hidden="true" /> */}
                            {item?.uuid === data?.currentVersion?.uuid ? (
                              <IconThree />
                            ) : (
                              <div
                                onClick={() => {
                                  onOpen();
                                  setItemModal(item);
                                }}
                                className="cursor-pointer has-tooltip"
                              >
                                <IconTwo />
                                <ToolTip>Approve this version?</ToolTip>
                              </div>
                            )}
                            {/* <IconTwo /> */}
                          </div>
                          <div
                            onClick={() => onChange(item)}
                            className="ml-4 cursor-pointer w-full"
                          >
                            <p
                              className={
                                "text-sm font-medium " +
                                `${
                                  item?.uuid !== selectedVersion?.uuid
                                    ? `text-gray-900`
                                    : `text-orange-700`
                                }`
                              }
                            >
                              {item?.versionName}
                            </p>
                            <div className="flex row justify-between align-bottom">
                              <p
                                className={
                                  "text-sm " +
                                  `${
                                    item?.uuid !== selectedVersion?.uuid
                                      ? `text-gray-500`
                                      : `text-orange-700`
                                  }`
                                }
                              >
                                By
                                {shortenHex(item?.createdBy, 4)}
                                {/* date */}
                              </p>
                              {/* bugs -> first version date */}
                              <p className="text-xs text-gray-500">
                                {!tabs && `Approved `}
                                {tabs
                                  ? moment.unix(item.createdAt).fromNow()
                                  : moment
                                      .unix(
                                        item.approvedAt ||
                                          item?.updatedAt ||
                                          item?.createdAt
                                      )
                                      .fromNow()}
                              </p>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  }
                  <div className="p-4 bg-gray-50">
                    <a
                      href="##"
                      className="flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <span className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">
                          Information
                        </span>
                      </span>
                      <span className="block text-sm text-gray-500">
                        {tabs
                          ? `List of requested version, must be approved to change the flow into main`
                          : `List of history approved version, can re-approved previous version`}
                      </span>
                    </a>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}

function IconTwo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
    </svg>
  );
}

function IconThree() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="lightgreen" />
      <path
        d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  );
}
