import React from "react";

export default function ({ onOk, onCancel, text = "" }) {
  return (
    <div className="border bg-stone-400 rounded-md p-6 w-full md:w-1/2 md:h-1/2">
      {text}
      <br />
      <button onClick={onOk}>OK</button>
      <br />
      <br />
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}
