import React from "react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
export default function AccountSolana() {
  return (
    <div className="flex row gap-4 ">
      <WalletMultiButton />
      <WalletDisconnectButton />

      {/* Network testnet ? */}
    </div>
  );
}
