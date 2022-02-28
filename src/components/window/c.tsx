<div>
  {/* confirmation close */}
  {/* <button className="absolute right-10" onClick={onClose}>
        close
    </button>
    {currentDetail && (
        <button className="absolute " onClick={onRemove}>
            delete node
        </button>
    )} */}
  {/* NESTED EDITING: between owner and others */}
  <br />
  {/* <div className="p-5">
        <Input
            key="title"
            label="Title"
            value={detail.title}
            onChange={(title) => setDetail({ ...detail, title })}
        />
        <br />
        <br />

        <Input
            key="description"
            label="Description"
            value={detail.description}
            onChange={(description) => setDetail({ ...detail, description })}
        />
    </div> */}
  <div>
    ROW for Links:
    <br />
    {sourceLink.map((item, i) => {
      if (item?.source === currentDetail?.id) {
        return (
          <>
            <button onClick={() => onRemoveLink(item?.id)} className="my-2">
              unlink for {item?.target}{" "}
            </button>
            <br />
          </>
        );
      } else {
        return (
          <>
            <button
              onClick={() => onRemoveLink(item?.id)}
              className="my-2 bg-green-400"
            >
              unlink from {item?.target}{" "}
            </button>
            <br />
          </>
        );
      }
    })}
  </div>
  {/* directly submit to call contract? or add to store */}
  {!canEdit && (
    <button
      className="absolute right-10"
      onClick={() => {
        //fetch to contract?
        onAdd();
      }}
    >
      SUBMIT
    </button>
  )}
  {/* ifOwner can EDIT -> create, view -> */}
  {isOwner && !edit && (
    <button
      className="absolute right-10"
      onClick={() => {
        setEdit(true);
      }}
    >
      EDIT
    </button>
  )}
  {/* delete elements */}
</div>;
