import React, { useState, Fragment } from 'react'
import { Resizable } from "re-resizable";
import BarCharts from './BarCharts';
import { Transition } from "@headlessui/react";
import ChartTabs from './ChartTabs';

//button + 
export default function ButtonCharts({ elements }) {
    const [showChart, setShowChart] = useState(false)
    const [height, setHeight] = React.useState('50vh');

    if (showChart) {
        return (
            <Transition
                show={showChart}
                enter="transition ease-out duration-250"
                enterFrom="opacity-0 "
                enterTo="opacity-100 "
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100 "
                leaveTo="opacity-0"
            >
                <Resizable
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        zIndex: 30,
                        background: `#121212`,
                    }}
                    size={{ height, width: '100vw' }}
                    maxHeight={`90vh`}
                    minHeight={`50vh`}
                    minWidth={`100vw`}
                    maxWidth={`100vw`}
                    onResizeStop={(e, direction, ref, d) => {
                        setHeight(height + d.height);
                    }}
                >
                    <BarResize />

                    <div className='flex row float-right m-2 mx-8 gap-8 text-gray-300'>
                        {/* <div>full</div> */}
                        <button
                            className=''
                            onClick={() => {

                                setShowChart(false)
                            }}
                        >close</button>
                    </div>


                    {/* mobile -> no need flex */}

                    <ChartTabs {...{ elements }} />
                </Resizable>
            </Transition>
        )
    } else {
        return (
            <div
                onClick={() => {
                    setHeight('50vh')
                    setShowChart(true)
                }}
                className='absolute z-20 
                hover:bg-slate-200
                rounded-md bg-gray-400 float-right bottom-0 right-0 m-6 p-4 cursor-pointer place-items-center text-sm flex align-middle'>
                <PieIcon /> &nbsp;
                Chart
            </div>
        )
    }
}

const BarResize = () => <div className='relative cursor-row-resize w-full bg-black flex  row justify-center  align-middle bottom-1 '>
    <div className='h-1 bg-slate-500 w-10  rounded-md' />
</div>

const PieIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
</svg>