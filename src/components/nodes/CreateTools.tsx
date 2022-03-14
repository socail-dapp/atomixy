import React, { useState } from "react";
// import store from "store"
import useStore from "@/helpers/store";
import NodeWindow from "../window/NodeWindow";
import VerticalSelect from "../forms/RadioGroup";
// import cookieCutter from 'cookie-cutter'
import { Switch } from "@headlessui/react";

export default function ({ viewOnly, elements, setElements }) {
  const [showWindow, setShowWindow] = useState(null);
  if (!viewOnly) return null;

  return (
    <>
      <div className="absolute mx-2 z-20    md:1/6 h-2/3 mt-32 sm:mt-16 backdrop-blur-md p-3 px-5 text-white border rounded-md overflow-y-scroll">
        <div className="pb-4 font-medium text-lg font-mono">Tools</div>
        <button
          className="p-5 rounded-md w-full  text-gray-50 bg-gradient-to-r from-gray-500 to-zinc-400"
          // if already shown, dont?
          onClick={() => setShowWindow(true)}
        >
          Add Node
        </button>
        <br />

        <br />

        <VerticalSelect
          value={connector[0]}
          // label="Connector*"
          onChange={() => {}}
          options={connector}
        />
        <div className="my-4 font-medium text-xs  text-rose-400 font-mono">
          *Currently only normal available
        </div>

        {/* <div className="flex row justify-between">
          <div className="font-medium text-sm font-mono">Undirectional: </div>
          <Switch
            checked={false}
            onChange={() => { }}
            className={`${true ? 'bg-teal-900' : 'bg-teal-700'}
          relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          />
        </div> */}
      </div>

      {/* todo: dialog or modal for  */}
      {showWindow && (
        <NodeWindow
          {...{
            setElements,
            onClose: () => setShowWindow(null),
            // openWindowNode
          }}
        />
      )}
    </>
  );
}
const connector = [
  {
    name: "---------",
    description: "Normal",
    value: 1,
  },
  {
    name: "- - - - -",
    value: 2,
    description: "Dots animated",
  },
  {
    name: "---TEXT---",
    value: 2,
    description: "With text",
  },
];
