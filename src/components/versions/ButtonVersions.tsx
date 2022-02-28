import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment, useState } from "react";
import moment from "moment";
import store from "store";
import useWallet from "@/helpers/hooks/useWallet";
import ToolTip from "../ToolTip";
import ModalDialog from "../ModalDialog";
import toast from "react-hot-toast";
import useFetch from "@/helpers/hooks/useFetch";

export default function ButtonVersions({
  selectedVersion,
  // data,
  // setVersion
  onChange,
}) {
  const { data: dataWallet } = useWallet();
  const { data, onRefresh } = useFetch();
  // item as currentFlow
  const onApprove = async (item) => {
    //show modal -> approving this flow as a main?
    //transaction
    // if current is already matched-> cannot add

    const ACCOUNT = dataWallet?.accountId;

    const approvedCommit = {
      ...item,
      approvedBy: ACCOUNT,
      approvedAt: moment().unix(),
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
      await store.set("flows", payloadFlow);
      onChange(approvedCommit);
      toast.success(`You just approved a version`);
      onRefresh();
    } catch (error) {
      console.log(error);
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

  return (
    <div className="float-right m-2 ">
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
      />
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
              <Popover.Panel className="absolute z-10 w-screen max-w-sm mt-3 transform  right-0  ">
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
                                By {item.createdBy}
                                {/* date */}
                              </p>
                              <p className="text-xs text-gray-500">
                                {!tabs && `Approved `}
                                {tabs
                                  ? moment.unix(item.createdAt).fromNow()
                                  : moment.unix(item.approvedAt).fromNow()}
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
