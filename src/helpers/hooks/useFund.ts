import React, { useEffect, useState } from 'react'
import useBundlr from './useBundlr'
import { useWeb3React } from "@web3-react/core";

export default function useFund() {
    const [currentFund, setCurrentFund] = useState<number | string>(`loading...`)
    const bundlr = useBundlr()
    const { account, library, chainId } = useWeb3React();

    // const [price, setPrice] = useState<number | string>(`loading...`)

    const getFund = async () => {
        if (!!account && !!bundlr) {
            try {
                const res = await bundlr!.getBalance(account)
                setCurrentFund(`${Number(bundlr?.utils.unitConverter(res.toString()).toString()).toFixed(5)
                    } Matic`)
            } catch (error) {
                setCurrentFund(`error...`)
            }
        }
    }

    const getPrice = async (value: string) => {
        if (!!account && !!bundlr) {
            try {
                const res = await bundlr?.utils.getPrice(
                    `matic` as string,
                    Buffer.from(value, "utf8").length
                );

                console.log(Number(bundlr?.utils.unitConverter(res.toString()).toString()).toFixed(5), 'price is')
                return Number(bundlr?.utils.unitConverter(res.toString()).toString()).toFixed(5)
            } catch (error) {
                console.log(error, 'eerorr')
                return `Error...`

            }
        } else return `Account error`
    }

    const _upload = async (value: any) => {
        if (!!account && !!bundlr) {
            try {
                const res = await bundlr?.uploader
                    .upload(
                        Buffer.from(JSON.stringify(value), "utf8"),
                        [
                            { name: "Content-Type", value: "application/elixir" },
                        ]
                    )

                console.log(res?.data)
                return res?.data?.id
            } catch (error) {
                console.log(error, 'eerorr')
                return `Error...`

            }
        } else return `Account error`
    }

    useEffect(() => {
        getFund()
    }, [bundlr, account])

    return {
        currentFund,
        getPrice,
        _upload
    }
}
