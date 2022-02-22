import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useCallback } from 'react';
import ReactFlow, { ReactFlowProvider, Background, useStoreState, Elements, addEdge, Connection, Edge, removeElements } from 'react-flow-renderer';
import useStore from '@/helpers/store'
import { useRouter } from 'next/router';
import store from "store"
interface IDetailNode {
    title: string | null
    description: string | null
}

const Create = () => {
    // const saved = localStorage.getItem("flows");
    // const initialValue = JSON.parse(saved);
    const router = useRouter()
    const [elements, setElements] = useState<Elements>([]) //initial from query
    const onConnect = (params: Connection | Edge) => setElements((els) => addEdge(params, els));
    const onElementsRemove = (elementsToRemove: Elements) => setElements((els) => removeElements(elementsToRemove, els));

    const [showWindow, setShowWindow] = useState(null)

    console.log(elements, 'elemnts right now');

    const { currentNodeWindow, resetNodeWindow, addFlow, currentFlows } = useStore();

    const nodes = useStoreState((store) => store.nodes);
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            {/* header with title data:? from serversideprops */}
            {/* todo: float nodes */}
            <div className='absolute modal border z-10 p-10'>
                {/* float nodes edit tool */}
                <button
                    // if already shown, dont?
                    onClick={() => setShowWindow(true)}
                >Add node</button>
                {/* show window with clear state  */}
            </div>

            <div className='absolute modal border z-10 p-10 bottom-0 '>
                <button
                    onClick={() => {

                        // const updatePosition = 
                        const submitElements = elements.map(item =>
                        ({
                            ...item,
                            position: nodes.find(n => n.id === item?.id)?.__rf?.position
                        }))

                        const payloadFlow = {
                            title: 'coba flow: ' + currentFlows.length,
                            // mainDisplay: [submitElements],
                            versions: [
                                // {writer, timestamp, sequence, prevElement, prevIPFS, versionName}
                            ],
                            // totalPools,
                            elements: submitElements,
                            //  sequence -> 0 or  + 1
                        }
                        // do transactions here
                        addFlow(payloadFlow)
                        store.set('flows', payloadFlow)

                        // router.push(`/`)

                        //
                    }}
                >Create/Save The Flow</button>
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

            {currentNodeWindow &&
                <NodeWindow
                    {...{
                        setElements,
                        onClose: () => resetNodeWindow(),
                        currentDetail: currentNodeWindow,
                        canEdit: true,
                        isOwner: true,
                        // openWindowNode
                    }}
                />
            }

            <div style={{ height: '100vh', border: `1px solid black`, background: '#232b2b' }}>

                <ReactFlow
                    node
                    onElementsRemove={onElementsRemove}
                    onConnect={onConnect}
                    elements={elements} >
                    <Background
                        variant="dots"
                        gap={22}
                        size={0.35}
                        color="#eee"
                    />
                </ReactFlow>

            </div>
        </div>
    )
}

export default Create

const getNodeId = () => `randomnode_${+new Date()}`;


// id to remove the node
const NodeCapsule = ({ detail, id }) => {
    const { addNodeWindow } = useStore();

    return (
        <div
            onClick={() => {
                console.log('click node')
                addNodeWindow({ ...detail, id })
            }}
            //missing the position too?
            style={{
                background: '#03dac6',
                // width: 300,
                // height: 200,
                color: 'white',
                padding: '2%'
            }}>
            {detail.title}
        </div>
    )
}

const defaultDetail = {
    title: null,
    description: null,
    // style: { backgrounColor: 'orange', background: `#ff0266`, color: 'white', border: 0 }
}

const NodeWindow = ({
    setElements,
    onClose,
    currentDetail,
    canEdit = false,
    isOwner = false
}: any) => {
    const [detail, setDetail] = useState<IDetailNode>(currentDetail || defaultDetail)

    // for editing inside windows, todo: prepare button  to edit (only when opening)
    // this will also record in the logs
    const [edit, setEdit] = useState(canEdit)

    const onAdd = useCallback(() => {
        const id = `random_node-${getNodeId()}`
        const newNode = {
            id,
            data: {
                label: <NodeCapsule {...{ detail, id }} />
            },
            position: { x: Math.random() * window.innerWidth - 100, y: Math.random() * window.innerHeight },
            detail
        };

        setElements((els: Elements) => els.concat(newNode));
        onClose()
    }, [setElements, detail]);

    const onRemove = useCallback(() => {
        //confirmation first
        // only works if currentDetail
        if (!currentDetail) return alert("detail not even exist");

        setElements((els: Elements) => els.filter(n => n.id !== currentDetail.id));
        onClose()
    }, [setElements, detail]);

    return (
        <div className={`absolute modal w-1/2 border h-full z-10 right-0   ${edit && `border-green-400`}`}>
            window for EDITING
            {/* confirmation close */}
            <button className='absolute right-10' onClick={onClose}>close</button>
            {currentDetail && <button className='absolute ' onClick={onRemove}>delete node</button>}

            {/* NESTED EDITING: between owner and others */}

            <br />
            <div className='p-5'>
                <Input
                    key='title'
                    label='Title'
                    value={detail.title}
                    onChange={(title) => setDetail({ ...detail, title })}
                />
                <br />
                <br />

                <Input
                    key='description'
                    label='Description'
                    value={detail.description}
                    onChange={(description) => setDetail({ ...detail, description })}
                />
            </div>

            {/* directly submit to call contract? or add to store */}
            {!canEdit &&
                <button className='absolute right-10' onClick={() => {
                    //fetch to contract?
                    onAdd()
                }}>SUBMIT</button>
            }

            {/* ifOwner can EDIT -> create, view -> */}

            {isOwner && !edit &&
                <button className='absolute right-10' onClick={() => {
                    setEdit(true)
                }}>EDIT</button>
            }

            {/* delete elements */}
        </div>
    )
}

const Input = ({ label, id, value, onChange, Error, ...props }) => {
    return (
        <div>
            {label && (
                <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
                    {label}
                </label>
            )}
            <div className='mt-1'>
                <input
                    id={id}
                    name={id}
                    type='text'
                    className='block w-full border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md'
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    {...props}
                />
            </div>
            {Error && <Error />}
        </div>
    )
}

