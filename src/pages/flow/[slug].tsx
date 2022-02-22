import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useCallback, useMemo } from 'react';
import ReactFlow, {
    Background, Elements,

    addEdge, Connection, Edge, removeElements,
    Controls, ControlButton,
    ControlProps,
} from 'react-flow-renderer';
import useStore from '@/helpers/store'
import { useRouter } from 'next/router';
import store from "store"
import NodeWindow from '@/components/window/NodeWindow';
import NodeCapsule from '@/components/nodes/NodeCapsule';
import CreateTools from '@/components/nodes/CreateTools';
import Control from '@/components/tools/Control';

/**
 * I want the node as VIEW ONLY FIRST
 */


export default () => {

    const initialValue = store.get('flows')
    const { currentNodeWindow, resetNodeWindow, addFlow, currentFlows } = useStore();
    const lock = useStore(state => state.lock);

    const elems = initialValue?.elements?.map(item => {
        if (!!item.data?.label) {
            const { data, detail, ...restItem } = item
            // console.log(item?.id) // bug: DONT desctructure id 
            return { ...restItem, data: { label: <NodeCapsule {...{ detail, id: item?.id }} /> } }

        } else return item
    })


    const [elements, setElements] = useState<Elements>(elems || []) //initial from query
    const onConnect = (params: Connection | Edge) => setElements((els) => addEdge(params, els));
    const onElementsRemove = (elToRemove: Elements) => setElements((els) => removeElements(elToRemove, els));


    const currentSource = useMemo(() => {
        return elements.filter(i => i?.source === currentNodeWindow?.id || i?.target === currentNodeWindow?.id)
    }, [currentNodeWindow])

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            {/* header with title data:? from serversideprops */}
            {/* todo: float nodes */}
            <div className='absolute modal border z-10 right-0'>
                Version Update click here
            </div>

            <CreateTools {...{ viewOnly: lock, elements, setElements, addFlow, currentFlows }} />

            {currentNodeWindow &&
                <NodeWindow
                    {...{
                        setElements,
                        onClose: () => resetNodeWindow(),
                        currentDetail: currentNodeWindow,
                        currentSource: currentSource,
                        canEdit: true,
                        isOwner: true,
                        // openWindowNode
                    }}
                />
            }

            <div style={{ height: '100vh', border: `1px solid black`, background: '#232b2b' }}>
                <ReactFlow
                    nodesConnectable={lock}
                    nodesDraggable={lock}
                    onElementsRemove={onElementsRemove}
                    onConnect={onConnect}

                    elements={elements} >
                    <Background
                        variant="dots"
                        gap={22}
                        size={0.35}
                        color="#eee"
                    />
                    <Control />
                </ReactFlow>
            </div>
        </div>
    )
}



