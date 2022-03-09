import React from "react";

import Account from "@/components/Account/evm-account";
import AccountSolana from "../Account/solana-account";
import useEagerConnect from "@/helpers/hooks/useEagerConnect";

export default function Layout({ children }) {
  return (
    <div>
      <HeaderWallet />
      {children}
    </div>
  );
}

export const HeaderWallet = ({ minimize = false }) => {
  const triedToEagerConnect = useEagerConnect();

  if (minimize) {
    return (
      <div className="relative m-2 backdrop-blur-sm border rounded-md text-gray-400">
        {/* based on network will shows the selected wallet? */}
        {/* todo: reponsive mobile */}
        <Account triedToEagerConnect={triedToEagerConnect} />
      </div>
    );
  } else {
    return (
      <div
        className={`w-full p-2 bg-rose-300 flex row gap-4 justify-between ${
          minimize && "absolute"
        }`}
      >
        <AccountSolana />
        <div>
          <Account triedToEagerConnect={triedToEagerConnect} />
        </div>
      </div>
    );
  }
};
