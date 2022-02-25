import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ReactFlowProvider } from "react-flow-renderer";
import useStore from "@/helpers/store";
import toast, { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ModalProvider>
      <ReactFlowProvider>
        {/* <Toaster /> */}
        <Toaster
          position="bottom-center"
          reverseOrder={false}
        />
        <Component {...pageProps} />
      </ReactFlowProvider>
    </ModalProvider>
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
