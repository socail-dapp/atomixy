import React, { useState } from 'react'
import Input from '../forms/Input'
import { PanelWrapper } from './TabWrapper'
import { HexColorPicker } from "react-colorful";
import Button from '../Button';
import SelectConnector from './SelectConnector';
import Construction from '../Construction';
import useWindow from '@/helpers/store/useWindow';
import ToolTip from '../ToolTip';
import InfoBeta from '../InfoBeta';

export default function Settings({ detail, _updateDetail, sourceLink, onRemoveLink }) {

    return (
        <PanelWrapper >
            {/* <div className='absolute text-white ml-2 text-sm'>Preview</div> */}
            <div className='grid place-items-center p-4 py-10 border mb-4 ' style={{ background: '#232b2b' }}>
                <div
                    style={{
                        background: detail?.colorBg,
                        color: detail?.colorText
                    }}
                    className='rounded-md text-white p-3 px-5 my-10'>{detail?.titleCapsule}</div>
            </div>
            <div className='flex row w-full '>

                <div className='col-span-6 w-full'>
                    <Input
                        value={detail?.titleCapsule}
                        label={`Title displayed in capsule`}
                        onChange={(titleCapsule: string) => _updateDetail('titleCapsule', titleCapsule)}
                    />
                </div>
                <div className='col-span-6 w-full pl-4'>
                    <div className='flex row align-middle'>
                        <div className="block text-sm font-medium text-gray-700">Connector type</div> &nbsp;
                        <InfoBeta />
                    </div>
                    <SelectConnector />
                </div>
            </div>
            <br />
            <div className='flex row text-sm font-medium text-gray-700 overflow-scroll'>
                <div className='pr-6 w-full'>
                    <div className='mb-2'>Background color:</div>
                    <HexColorPicker color={detail?.colorBg} onChange={v => _updateDetail(`colorBg`, v)} />
                </div>
                <div className='w-full pl-4'>
                    <div className='mb-2'>Text color:</div>

                    <HexColorPicker color={detail?.colorText} onChange={v => _updateDetail(`colorText`, v)} />
                </div>
                <div className='w-full pl-4 '>
                    <div className='mb-2'>Default color choices:</div>
                    <div className='flex row'>

                        {["#03dac6", "#ff7597", "#bb86fc", "#cf6679"].map((item) => <div
                            onClick={() => _updateDetail(`colorBg`, item)}
                            className='rounded-full mr-3 cursor-pointer' style={{ height: 20, width: 20, background: item }} />)}
                    </div>
                </div>
            </div>
            <br />
            {!!sourceLink?.length && <div className=' text-sm mb-4 font-medium text-gray-700'>Connections: </div>}
            <div className='overflow-scroll'>
                {sourceLink?.map((item) => <LinkConnect
                    {...{ item, isFor: item?.source === detail?.id, onRemoveLink }}
                />)}
            </div>


            <br />
            <br />
            <br />
            {/* images */}

        </PanelWrapper>
    )
}

// source is from, target is destination
// 
const LinkConnect = ({ item, isFor, onRemoveLink }) => {

    return (
        <div
            style={{
                background: isFor ? item?.to?.detail?.colorBg : item?.from?.detail?.colorBg,
                color: isFor ? item?.to?.detail?.colorText : item?.from?.detail?.colorText,
            }}
            className={`mb-2 text-justify flex row justify-between align-middle rounded-md text-gray-50 p-2 `}>
            {isFor && `OUT -> to ${item?.to?.detail?.titleCapsule}`}
            {!isFor && `IN <- from ${item?.from?.detail?.titleCapsule}`}
            &nbsp;

            <Button
                onClick={() => onRemoveLink(item?.id)}
                className={`bg-gray-600`}>unlink</Button>
        </div>
    )
}