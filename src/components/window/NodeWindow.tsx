import { useState, useCallback, useEffect } from "react";
import { Elements } from "react-flow-renderer";
import { IDetailNode } from "@/helpers/types";
import NodeCapsule from "../nodes/NodeCapsule";
import Input from "../forms/Input";
import { Tab } from "@headlessui/react";
import TabWrapper from "./TabWrapper";
import Comment from "./Comment";
import { DetailDisplay } from "./Detail";
import Reply from "./Reply";
import Button from "../Button";
import useWindow from "@/helpers/store/useWindow";
import FooterEdit from "./FooterEdit";
import toast from "react-hot-toast";

const getNodeId = () => `randomnode_${+new Date()}`;

// TODO random color
const defaultDetail = {
  title: null,
  description: null,
  colorBg: "#03dac6",
  colorText: "white",
  titleCapsule: null,

  // style: { backgrounColor: 'orange', background: `#ff0266`, color: 'white', border: 0 }
};

const NodeWindow = ({
  elements,
  setElements,
  onClose,
  currentDetail,
  canEdit = false,
  isOwner = false,
  currentSource = [],
  isCreate = false,
}: any) => {
  console.log(currentDetail, "currentDetailcurrentDetail");

  const { setEditWindow } = useWindow();
  useEffect(() => {
    setEditWindow(false);
  }, []);
  const [detailLogs, setDetailLogs] = useState([]);
  // target === id -> receiving
  // source === id -> giving
  const [sourceLink, setSourceLink] = useState(currentSource);

  const [detail, setDetail] = useState<IDetailNode>(
    currentDetail || defaultDetail
  );
  // console.log(currentDetail, "currentDetail", currentSource, 'currentState', detail);

  const _updateDetail = useCallback(
    (keyName: string, value: any, keyName2?: string, value2?: string) => {
      if (!keyName2) {
        setDetail({
          ...detail,
          [keyName]: value,
        });
      } else {
        setDetail({
          ...detail,
          [keyName]: value,
          [keyName2]: value2,
        });
      }
    },
    [detail]
  );

  // for editing inside windows, todo: prepare button  to edit (only when opening)
  // this will also record in the logs
  const [edit, setEdit] = useState(canEdit);

  const onAdd = useCallback(() => {
    // bug: if update
    //check window props requirement EXIST
    if (!detail?.title || !detail.description || !detail?.titleCapsule)
      return toast.error("Important field is missing");

    // console.log(currentDetail, 'CURRENT DETAIL UPDATE')
    const isUpdating = currentDetail?.id;
    const id = isUpdating ? currentDetail?.id : `rn-${getNodeId()}`;

    const position = !!currentDetail?.position
      ? currentDetail?.position
      : {
          x: (Math.random() * window.innerWidth) / 2,
          y: (Math.random() * window.innerHeight) / 2,
        };
    const newNode = {
      id,
      data: {
        label: <NodeCapsule {...{ detail, id, position }} />,
      },
      position,
      detail,
      style: {
        background: detail?.colorBg,
        color: detail?.colorText,
        border: `0px`,
        borderWidth: 0,
      },
    };

    if (isUpdating) {
      setElements((els: Elements = []) =>
        els.filter((n) => n.id !== currentDetail.id).concat(newNode)
      );
    } else {
      setElements((els: Elements = []) => els.concat(newNode));
    }

    onClose();
    toast.success(
      `You just ${isUpdating ? `update the` : `add a new `}node called ${
        detail?.titleCapsule
      }`
    );
  }, [setElements, detail]);

  const onRemove = useCallback(() => {
    //confirmation first
    // only works if currentDetail
    if (!currentDetail) return alert("detail not even exist");

    setElements((els: Elements) =>
      els.filter((n) => n.id !== currentDetail.id)
    );
    onClose();
    toast.success(`It's removed, don't forget to save`);
  }, [setElements, detail]);

  const onRemoveLink = useCallback(
    (_id) => {
      // todo: should only work if map is unlocked
      //confirmation first
      // only works if currentDetail
      if (!currentDetail) return alert("detail not even exist");

      setElements((els: Elements) => els.filter((n) => n.id !== _id));
      setSourceLink((els: Elements) => els.filter((n) => n.id !== _id));
      // TODO: events -> mapLogs
    },
    [setElements, detail]
  );
  const { tabs } = useWindow();
  return (
    <div
      className={`absolute p-3 w-full md:w-1/2 h-full z-30 right-0  ${
        edit && `border-green-400`
      }`}
    >
      <div
        className={`
      ${edit ? `bg-white` : `bg-gradient-to-r from-gray-300 to-zinc-200`}
      rounded-md h-full p-6 
      ${!edit && tabs === 0 ? `` : `overflow-scroll`}`}
      >
        {/* overflow visible if it's on detail-editing */}

        <div className="absolute right-5 top-5 float-right cursor-pointer">
          <div className="flex row">
            <Close onClick={onClose} />
          </div>
        </div>

        <br />
        {/* <div className="backdrop-blur-sm border rounded-md h-full p-5"> */}
        {!edit && (
          <TabWrapper
            {...{ _updateDetail, detail, sourceLink, onRemoveLink }}
          />
        )}
        {edit && (
          <DetailDisplay {...{ setEdit: () => setEdit(!edit), detail }} />
        )}
        {/* todo: update logic iscreate here, use real comments */}
        {edit && !isCreate && <Comment />}
        {edit && <Reply />}
        {!edit && <FooterEdit {...{ onRemove, onAdd }} />}
      </div>
    </div>
  );
};

export default NodeWindow;

{
  /* <div className="text-rose-400 mr-3 text-md has-tooltip">delete <span className='tooltip  bg-blue-200 p-3 -mt-1 lg:-mt-8 rounded'>Look at this!</span></div> */
}

const Close = ({ onClick }) => (
  <svg
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    viewBox="0 0 20 20"
    fill="#FF0266"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
      clipRule="evenodd"
    />
  </svg>
);
