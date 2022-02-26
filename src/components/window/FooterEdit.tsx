import useDialog from '@/helpers/store/useDialog'
import useWindow from '@/helpers/store/useWindow'
import React, { useState } from 'react'
import Button from '../Button'
import ModalDialog from '../ModalDialog'

export default function FooterEdit({ onRemove, onAdd }) {
    const { isEditWindow } = useWindow()
    const [isOpened, setOpen] = useState(false)

    function onOpen() {
        setOpen(false)
    }
    function onClose() {
        setOpen(true)
    }

    return (
        <div className='fixed z-30 rounded-md p-4 border backdrop-blur-sm w-full md:w-1/2 right-0 bottom-3'>
            <ModalDialog
                title={`Delete confirmation`}
                desc={`Are you  sure you want to delete this Node?`}
                onConfirm={() => {
                    onRemove()
                    onClose()
                }}
                // confirmText
                {...{
                    onClose,
                    onOpen,
                    isOpened
                }}
            />
            {isEditWindow &&
                <Button
                    onClick={onOpen}
                    className={`bg-rose-400 hover:bg-red-600 `}>Delete</Button>}
            <Button
                onClick={onAdd}
                className={`float-right px-6`}>{isEditWindow ? `Update` : `Add Node`}</Button>
            <Button
                onClick={() => {
                    alert('This feature will update the flow too, but under development')
                }}
                className={`float-right px-6 mr-3`}>{isEditWindow ? `Update & Save Version` : `Add Node & Save Version`}</Button>
        </div>
    )
}
