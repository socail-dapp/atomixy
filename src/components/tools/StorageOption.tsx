import useFund from '@/helpers/hooks/useFund';
import useStore from '@/helpers/store';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Input from '../forms/Input';
import VerticalSelect from '../forms/RadioGroup'

const storage = [
    {
        name: "IPFS",
        description: "Data won't be permanent, All testnet will use this",
        value: 1,
    },
    {
        name: "ARWEAVE",
        value: 2,
        description: "Permanent data storage, Not available in testnet",
    },
];

export default function ({
    setStorage,
    currentStorage,
    isCreate
}) {
    const { currentFund, getPrice, priceEst, addFund } = useFund()
    const { currentFlow } = useStore()

    useEffect(() => {
        getPrice(JSON.stringify(currentFlow))
    }, [currentFlow])

    const CheckFund = useCallback(() => {
        return (
            <div className="text-sm text-green-700 my-2 font-medium">
                Current Fund: {currentFund}
            </div>
        )
    }, [currentFund])

    // todo: incomplete data, refactor onSAVE
    const EstimationPrice = useCallback(() => {
        return (
            <div className="text-sm text-purple-500  my-2 font-medium">
                Estimation Price: {priceEst}
            </div>
        )
    }, [priceEst])

    const [numberFund, setNumberFund] = useState<number>(0)

    return (
        <div>
            {/* todo: ARWEAVE only for limited networks -> validate current networks */}
            {isCreate &&
                <VerticalSelect
                    value={currentStorage}
                    label="Storage options"
                    onChange={(v) => {
                        console.log(v, 'v')
                        setStorage(v)
                    }}
                    options={storage}
                />}
            {/* ONLY SHOW to arweave */}
            <EstimationPrice />
            <CheckFund />

            <div className='flex row gap-2 '>
                <input
                    key='name'
                    // label='Input Price: Ⓝ'
                    value={numberFund}
                    onKeyPress={(event) => {
                        if (!/\d+((\.|,)\d+)?/.test(event.key)) {
                            event.preventDefault()
                        }
                    }}
                    type='tel'
                    pattern="\d+((\.|,)\d+)?"
                    className="block w-full p-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    onChange={(e) => {
                        e.preventDefault()
                        setNumberFund(e.target.value)
                    }}
                />
                <button
                    onClick={() => {
                        if (numberFund < 0) return alert('Number must greater than 0')

                        addFund(numberFund)

                    }}
                    className='w-full text-white bg-green-700 rounded-md font-medium '>FUND</button>
            </div>
            <p className='text-xs my-2 text-red-900'>*confirm will fail if fund lower than est price, fund transaction will take around 5-10secs, and check your metamask after button pressed</p>
            <br />
            <br />
            {/* check network? */}
        </div>
    )
}


//todo, change network -> sync with 

//Data wont be permanent, good for testnet

//wheen arweave, shows fund
//input fund

//and calulcation of current data