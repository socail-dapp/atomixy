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
import { FC, useEffect, useMemo } from "react";
import Layout from "@/components/Layout";
import { Web3ReactProvider } from "@web3-react/core";
import getLibrary from "@/helpers/evm/getLibrary";
import ProgressBar from "@badrap/bar-of-progress";
import { useRouter } from "next/router";

const progress = new ProgressBar({
  size: 3,
  color: "#2e298b",
  delay: 100,
  className: "progress",
});

// Use require instead of import since order matters
require("@solana/wallet-adapter-react-ui/styles.css");
// require("../styles/globals.css");

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", progress.start);
    router.events.on("routeChangeComplete", progress.finish);
    router.events.on("routeChangeError", progress.finish);
  }, [router.events]);

  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <ModalProvider>
              <ReactFlowProvider>
                <Toaster position="bottom-center" reverseOrder={false} />
                <Component {...pageProps} />
              </ReactFlowProvider>
            </ModalProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </Web3ReactProvider>
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
