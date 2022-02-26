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
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast'

export default function Control({
  data,
  elements,
  isCreate = true,
  editStatus = true,
  setEditStatus,
}) {
  const { setLock, setUnlock, lock: unlocked, currentFlow } = useStore();
  const nodes = useStoreState((store) => store.nodes);
  const router = useRouter();
  const { data: dataWallet } = useWallet();

  const [reason, setReason] = useState('')
  const [versionName, setVersionName] = useState('v')

  const onEdit = () => {
    // alert('are you sure want to edit?')
    // confirmation
    setUnlock();
    setEditStatus(true);
  };
  const onCancelEdit = () => {
    // alert('are you sure want to edit?')
    // confirmation
    setLock();
    setEditStatus(false);
    //reset flow ?
  };

  const onSave = async (reason?: string) => {
    if (!elements?.length) return alert(`Empty ?`)

    // confirmation -> what to update? description, title
    // check wallet

    // do transaction -> pop up wallet
    //show loading saving

    const ACCOUNT = dataWallet?.accountId;

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

    console.log(currentFlow, 'Number CURRENT FLOW')
    const commitFlow = {
      ...currentFlow?.currentVersion,
      // description: "",
      // title: '', //versionName
      // approvedAt: '',
      // approvedBy: '',
      createdBy: ACCOUNT,
      createdAt: moment().unix(),
      sequence: isCreate ? Number(0) : (Number(currentFlow?.currentVersion?.sequence) + 1), //automated versioning
      elements: submitElements,
      pools: [], //grant or bounty pools ??
      reason,
      uuid: uuidv4(),
      versionName: !isCreate ? versionName : `v0.0.0`,
      prevId: !isCreate ? currentFlow?.currentVersion?.uuid : `v0.0.0beta`,
      //uuid -> for selecting in between versions
    };
    // prevElement, prevIPFS}

    // list of main versions
    const prevVersions = !isCreate ? currentFlow?.versions : [];
    prevVersions.unshift(commitFlow);
    const versions = prevVersions;

    //
    const prevVersionsSuggestion = !isCreate ?
      !!currentFlow?.versionSuggested ? currentFlow?.versionSuggested : [] : [];

    prevVersionsSuggestion.unshift(commitFlow);
    const versionSuggested = prevVersionsSuggestion;

    //
    // console.log(
    //     currentFlow,
    //     currentFlow?.versionByUser, `currentFlow?.versionByUser`)

    //  construct  data in proper way
    const prevVersionByUser = !isCreate ? currentFlow?.versionByUser[ACCOUNT] : [];
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

    // only for first creating
    const forCreation = {
      createdAt: moment().unix(),
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
    };

    try {
      await store.set("flows", payloadFlow);
      toast.success(`Saved`)

    } catch (error) {
      console.log(error);
    }

    setEditStatus(false);
    setLock();
    if (!isCreate) toast.success(`You just add a new version`, {
      position: "top-right"
    });
    if (isCreate) router.push(`/`);
  };


  const { openModal, closeModal } = useDialog();

  const [isOpened, setOpen] = useState(false)

  function onOpen() {
    setOpen(false)
  }
  function onClose() {
    setOpen(true)
  }


  if (!isCreate) {
    return (
      <>
        <ModalDialog
          title={`Save confirmation`}
          desc={`Are you sure you want to save this Flow?`}
          // confirmText
          onConfirm={() => {
            onSave(reason)
            onClose()
          }}
          {...{
            onClose,
            onOpen,
            isOpened
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
            <ControlButton onClick={() => {
              onOpen()
            }}>
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
          onSave()
          onClose()
        }}
        {...{
          onClose,
          onOpen,
          isOpened
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
          <ControlButton onClick={() => {
            onOpen()
          }}>
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

const LOCKOPEN = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
  <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
</svg>

const LOCKCLOSED = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
</svg>

const SAVE = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="green">
  <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
</svg>

const CANCEL = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="red">
  <path fillRule="evenodd" d="M6.707 4.879A3 3 0 018.828 4H15a3 3 0 013 3v6a3 3 0 01-3 3H8.828a3 3 0 01-2.12-.879l-4.415-4.414a1 1 0 010-1.414l4.414-4.414zm4 2.414a1 1 0 00-1.414 1.414L10.586 10l-1.293 1.293a1 1 0 101.414 1.414L12 11.414l1.293 1.293a1 1 0 001.414-1.414L13.414 10l1.293-1.293a1 1 0 00-1.414-1.414L12 8.586l-1.293-1.293z" clipRule="evenodd" />
</svg>

const EDIT = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="orange">
  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
  <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
</svg>