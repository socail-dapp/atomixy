import React, { useEffect, useState } from 'react'
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { clusterApiUrl, PublicKey, Connection } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
import idl from '@/solana-sdk/Fund.json';
const { SystemProgram, Keypair } = web3;
const baseAccount = Keypair.generate();
const opts = {
    preflightCommitment: "processed"
}
const programID = new PublicKey(idl.metadata.address);



export default function useSolContract() {
    const [value, setValue] = useState('');
    const [dataList, setDataList] = useState([]);
    const [input, setInput] = useState('');
    const wallet = useWallet()
    console.log(wallet, 'wallet')
    async function getProvider() {
        /* create the provider and return it to the caller */
        /* network set to local network for now */
        const network = clusterApiUrl('devnet');

        // const network = "http://127.0.0.1:8899";
        const connection = new Connection(network, opts?.preflightCommitment);

        console.log(connection, 'connection')
        const provider = new Provider(
            connection, wallet, opts.preflightCommitment,
        );
        return provider;
    }

    async function initialize() {
        const provider = await getProvider();
        /* create the program interface combining the idl, program ID, and provider */
        const program = new Program(idl, programID, provider);
        try {
            /* interact with the program via rpc */
            await program.rpc.initialize(
                "Hello World",
                {
                    accounts: {
                        baseAccount: baseAccount.publicKey,
                        user: provider.wallet.publicKey,
                        systemProgram: SystemProgram.programId,
                    },
                    signers: [baseAccount]
                });

            const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
            console.log('account: ', account);
            setValue(account.data.toString());
            setDataList(account.dataList);
        } catch (err) {
            console.log("Transaction error: ", err);
        }
    }


    async function update() {
        if (!input) return
        const provider = await getProvider();
        const program = new Program(idl, programID, provider);
        await program.rpc.update(input, {
            accounts: {
                baseAccount: baseAccount.publicKey
            }
        });

        const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
        console.log('account: ', account);
        setValue(account.data.toString());
        setDataList(account.dataList);
        setInput('');
    }

    useEffect(() => {
        initialize()
    }, [])
    return {
        dataList,
        update,
        wallet
    }
}
