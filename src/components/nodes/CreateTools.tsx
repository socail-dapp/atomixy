import React, { useState } from "react";
// import store from "store"
import useStore from "@/helpers/store";
import NodeWindow from "../window/NodeWindow";
// import cookieCutter from 'cookie-cutter'

export default function ({ viewOnly, elements, setElements }) {
    const [showWindow, setShowWindow] = useState(null);
    if (!viewOnly) return null;

    return (
        <>
            <button
                className="absolute  z-10 p-5 rounded-md m-3  text-gray-50 bg-gradient-to-r from-gray-500 to-zinc-400"
                // if already shown, dont?
                onClick={() => setShowWindow(true)}
            >
                Add Node
            </button>


            {/* <div className="absolute modal border bottom-0 ">length changes</div> */}

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
