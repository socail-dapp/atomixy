import { useState, useCallback, useMemo, useEffect } from "react";
import ReactFlow, {
  Background,
  Elements,
  addEdge,
  Connection,
  Edge,
  removeElements,
  Controls,
  ControlButton,
  ControlProps,
} from "react-flow-renderer";
import useStore from "@/helpers/store";
import NodeWindow from "@/components/window/NodeWindow";
import NodeCapsule from "@/components/nodes/NodeCapsule";
import CreateTools from "@/components/nodes/CreateTools";
import Control from "@/components/tools/Control";

export default ({
  fullData,
  data,
  isEdit,
  isCreate = false,
}: {
  data: any;
  isEdit: boolean;
  isCreate: boolean;
}) => {
  const { currentNodeWindow, resetNodeWindow } = useStore();
  const lock = useStore((state) => state.lock);

  // reconstruct element (or map flow) to have a Component inside object
  const elems = useMemo(
    () =>
      data?.elements?.map((item) => {
        if (!!item.data?.label) {
          const { data, detail, ...restItem } = item;
          // console.log(item?.id) // bug: DONT desctructure id
          return {
            ...restItem,
            detail, // dont forget to  pass for future references/update
            data: {
              label: (
                <NodeCapsule
                  {...{ detail, id: item?.id, position: item?.position }}
                />
              ),
            },
          };
        } else return item;
      }),
    [data]
  ); // forr versioning

  useEffect(() => {
    setElements(elems);
  }, [elems]);

  const [elements, setElements] = useState<Elements>(elems); //initial from query

  const onConnect = (params: Connection | Edge) =>
    setElements((els) => addEdge(params, els));
  const onElementsRemove = (elToRemove: Elements) =>
    setElements((els) => removeElements(elToRemove, els));

  const currentSource = useMemo(() => {
    if (!elements) return;
    return elements
      ?.filter(
        (i) =>
          i?.source === currentNodeWindow?.id ||
          i?.target === currentNodeWindow?.id
      )
      .map((item) => {
        const newObj = {
          ...item,
          from: elements?.find((o) => o.id === item?.source),
          to: elements?.find((o) => o.id === item?.target),
        };
        return newObj;
      });
  }, [currentNodeWindow]);

  const [editStatus, setEditStatus] = useState<boolean>(isEdit);
  console.log(currentSource, elements, "elements WRAPPER", editStatus);

  return (
    <div className={lock ? `` : ``}>
      {/* header with title data:? from serversideprops */}
      {/* todo: float nodes */}
      {/* {!isCreate && (
                <div className="absolute modal border z-10 right-0">
                    Version Update click here
                </div>
            )} */}
      {lock && (
        <div className="absolute z-10 w-full">
          <div className="flex justify-center align-middle ">
            <div className=" bg-gray-300  px-4 text-xs text-white bg-opacity-20 text-opacity-50">
              FREEZE OFF, you can drag and connect the node
            </div>
          </div>
        </div>
      )}

      <CreateTools {...{ viewOnly: editStatus, elements, setElements }} />

      {currentNodeWindow && (
        <NodeWindow
          {...{
            elements,
            setElements,
            onClose: () => resetNodeWindow(),
            currentDetail: currentNodeWindow,
            currentSource: currentSource,
            canEdit: true,
            isOwner: true,
            isCreate,
            // openWindowNode
          }}
        />
      )}

      <div
        style={{
          height: "100vh",
          border: `1px solid black`,
          background: "#232b2b",
        }}
      >
        <ReactFlow
          nodesConnectable={lock}
          nodesDraggable={lock}
          onElementsRemove={onElementsRemove}
          onConnect={onConnect}
          elements={elements}
        >
          <Background variant="dots" gap={22} size={0.35} color="#eee" />
          <Control
            {...{
              isCreate,
              editStatus,
              setEditStatus: (v: boolean) => setEditStatus(v),
              elements,
              data,
            }}
          />
        </ReactFlow>
      </div>
    </div>
  );
};
