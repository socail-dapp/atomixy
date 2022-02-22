import React from 'react'
import {
    addEdge, Connection, Edge, removeElements,
    Controls, ControlButton,
    ControlProps,
} from 'react-flow-renderer';
import useStore from '@/helpers/store'

export default function Control() {
    const { setLock, setUnlock, lock: unlocked } = useStore();


    return (
        <Controls
            showInteractive={false} >
            <ControlButton onClick={unlocked ? setLock : setUnlock}>
                {unlocked ? `U` : `L`}
                {/* lock */}
            </ControlButton>
            <ControlButton onClick={() => alert('action')}>
                S
                {/* save */}
            </ControlButton>
        </Controls>
    )
}
