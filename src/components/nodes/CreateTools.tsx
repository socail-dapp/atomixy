import React, { useState } from 'react'
import store from "store"
import useStore from '@/helpers/store'
import NodeWindow from '../window/NodeWindow'

export default function ({ viewOnly, elements, setElements, addFlow, currentFlows = [] }) {
    const [showWindow, setShowWindow] = useState(null)
    if (!viewOnly) return null

    return (
        <>
            <div className='absolute modal border z-10 p-10'>
                {/* float nodes edit tool */}
                <button
                    // if already shown, dont?
                    onClick={() => setShowWindow(true)}
                >Add node</button>
                {/* show window with clear state  */}
            </div>

            {/* todo: move to locked control */}
            <div className='absolute modal border z-10 p-10 bottom-0 right-1/2'>
                <button
                    onClick={() => {
                        const payloadFlow = {
                            title: 'coba flow: ' + currentFlows.length,
                            elements,
                        }
                        // do transactions here
                        addFlow(payloadFlow)
                        store.set('flows', payloadFlow)
                        alert("Success add ? or Save?")
                        // router.push(`/`)
                        //
                    }}
                >Create/Save The Flow</button>
            </div>
            <div className='absolute modal border bottom-0 '>
                length changes
            </div>

            {/* todo: dialog or modal for  */}
            {showWindow &&
                <NodeWindow
                    {...{
                        setElements,
                        onClose: () => setShowWindow(null),
                        // openWindowNode
                    }}
                />
            }
        </>
    )
}
