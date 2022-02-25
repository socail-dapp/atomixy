import { useState } from 'react'
import { Tab } from '@headlessui/react'
import Detail from './Detail'
import Settings from './Settings'
import useWindow from '@/helpers/store/useWindow'

export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default ({ _updateDetail, detail, sourceLink = [], onRemoveLink }) => {
    const { tabs, setTab } = useWindow()
    return (
        <Tab.Group
            selectedIndex={tabs}
            onChange={setTab} >
            <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
                {[`Detail`, `Settings`].map((item) =>
                    <Tab
                        key={item}
                        className={({ selected }) =>
                            classNames(
                                'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                                selected
                                    ? 'bg-white shadow'
                                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                            )}>
                        {item}
                    </Tab>
                )}
            </Tab.List>
            <Detail {...{ _updateDetail, detail }} />
            <Settings  {...{ _updateDetail, detail, sourceLink, onRemoveLink }} />
        </Tab.Group>
    )
}

export const PanelWrapper = ({ children, }) => {
    return (
        <Tab.Panels className="mt-2  ">
            <Tab.Panel
                className={classNames(
                    'bg-white rounded-xl p-4 ',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
                )}
            >
                {children}
            </Tab.Panel>
        </Tab.Panels>
    )
}
