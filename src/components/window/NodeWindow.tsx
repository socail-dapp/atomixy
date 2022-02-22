import { useState, useCallback } from 'react';
import { Elements } from 'react-flow-renderer';
import { IDetailNode } from '@/helpers/types';
import NodeCapsule from '../nodes/NodeCapsule';
import Input from '../forms/Input';

const getNodeId = () => `randomnode_${+new Date()}`;

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
    isOwner = false,
    currentSource = []
}: any) => {

    const [detailLogs, setDetailLogs] = useState([])
    // target === id -> receiving
    // source === id -> giving
    console.log(currentDetail, 'currentDetail', currentSource)
    const [sourceLink, setSourceLink] = useState(currentSource)
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

    const onRemoveLink = useCallback((_id) => {
        // todo: should only work if map is unlocked
        //confirmation first
        // only works if currentDetail
        if (!currentDetail) return alert("detail not even exist");

        setElements((els: Elements) => els.filter(n => n.id !== _id));
        setSourceLink((els: Elements) => els.filter(n => n.id !== _id));
        // TODO: events -> mapLogs
    }, [setElements, detail]);

    return (
        <div className={`absolute modal w-1/2 border h-full z-10 right-0 bg-zinc-400  ${edit && `border-green-400`}`}>
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

            <div>
                ROW for Links:
                <br />
                {sourceLink.map((item, i) => {
                    if (item?.source === currentDetail?.id) {
                        return (
                            <>
                                <button
                                    onClick={() => onRemoveLink(item?.id)}
                                    className='my-2'>unlink for {item?.target} </button>
                                <br />
                            </>
                        )
                    } else {
                        return (
                            <>
                                <button
                                    onClick={() => onRemoveLink(item?.id)}
                                    className='my-2 bg-green-400'>unlink from {item?.target} </button>
                                <br />
                            </>
                        )
                    }
                }
                )}
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

export default NodeWindow