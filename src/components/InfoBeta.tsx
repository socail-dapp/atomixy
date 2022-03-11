import React from "react";
import Construction from "./Construction";
import ToolTip from "./ToolTip";

export default function InfoBeta() {
  return (
    <>
      <div className="has-tooltip">
        <Construction />
        <ToolTip>*On Construction</ToolTip>
      </div>
    </>
  );
}
