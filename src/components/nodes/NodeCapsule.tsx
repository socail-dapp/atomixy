import useStore from "@/helpers/store";

// id to remove the node

const NodeCapsule = ({ detail, id, position }) => {
  const { addNodeWindow } = useStore();

  return (
    <div
      onClick={() => {
        console.log("click node");
        addNodeWindow({ ...detail, id, position });
      }}
      //missing the position too?
      style={{
        background: detail?.colorBg,
        // width: 300,
        // height: 200,
        // color: detail?.colorText,
        padding: "2%",
        border: `0px`
      }}
    >
      {detail.titleCapsule}
      {/* {id} */}
    </div>
  );
};

export default NodeCapsule;
