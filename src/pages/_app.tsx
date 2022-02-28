import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ReactFlowProvider } from "react-flow-renderer";
import useStore from "@/helpers/store";
import { Toaster } from "react-hot-toast";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { FC, useMemo } from "react";
import { Web3Provider } from "../helpers/Web3Context";
import Layout from "@/components/Layout";

// Use require instead of import since order matters
require("@solana/wallet-adapter-react-ui/styles.css");
require("../styles/globals.css");


const targetNetwork = "localhost";



function MyApp({ Component, pageProps }: AppProps) {
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);

  return (
    <Web3Provider network={targetNetwork}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <ModalProvider>
              <ReactFlowProvider>
                <Toaster position="bottom-center" reverseOrder={false} />
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </ReactFlowProvider>
            </ModalProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </Web3Provider>
  );
}

export default MyApp;

const ModalProvider = ({ children }) => {
  const { Component } = useStore();

  return (
    <>
      {!!Component && (
        <div className="absolute w-full h-screen backdrop-blur-sm p-5 grid place-items-center z-50">
          {Component}
        </div>
      )}
      {children}
    </>
  );
};
