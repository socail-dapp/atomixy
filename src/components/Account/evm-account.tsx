import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";
import { injected } from "@/helpers/evm/connectors";
import useENSName from "@/helpers/hooks/useENSName";
import useMetaMaskOnboarding from "@/helpers/hooks/useMetaMaskOnboarding";
import { formatEtherscanLink, shortenHex } from "@/helpers/utils/evm";
import Button from "../Button";
import { getNetworkName } from "@/helpers/utils/networks";

type AccountProps = {
  triedToEagerConnect: boolean;
  chainid: string | number;
};

const Account = ({ triedToEagerConnect, chainid: reservedChainId }: AccountProps) => {
  const { active, error, activate, chainId, account, setError } =
    useWeb3React();

  const {
    isMetaMaskInstalled,
    isWeb3Available,
    startOnboarding,
    stopOnboarding,
  } = useMetaMaskOnboarding();

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      stopOnboarding();
    }
  }, [active, error, stopOnboarding]);

  const ENSName = useENSName(account);

  if (error) {
    return null;
  }

  if (!triedToEagerConnect) {
    return null;
  }

  if (typeof account !== "string") {
    return (
      <div>
        {isWeb3Available ? (
          <Button
            disabled={connecting}
            onClick={() => {
              setConnecting(true);

              activate(injected, undefined, true).catch((error) => {
                // ignore the error if it's a user rejected request
                if (error instanceof UserRejectedRequestError) {
                  setConnecting(false);
                } else {
                  setError(error);
                }
              });
            }}
          >
            {isMetaMaskInstalled ? "Connect to MetaMask" : "Connect to Wallet"}
          </Button>
        ) : (
          <Button onClick={startOnboarding}>Install Metamask </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex m-2 row align-middle ">
      {console.log(getNetworkName(chainId), chainId, `getNetworkName(chainId)`, reservedChainId)}

      {!!reservedChainId ?
        Number(reservedChainId) === chainId ?
          <div className="h-3 mt-1 mr-2 w-3 bg-green-300 rounded-full" /> :
          <div className="h-3 mt-1 mr-2  w-3 bg-red-700 rounded-full" /> :
        <div />
      }

      {!!reservedChainId ? `Connect to ${getNetworkName(Number(reservedChainId))}` : `Current Network: ${getNetworkName(chainId)}`}

      &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp;

      &nbsp;
      {/* check network metamask === with current flow network */}
      <a
        {...{
          href: formatEtherscanLink("Account", [chainId, account]),
          target: "_blank",
          rel: "noopener noreferrer",
        }}
      >
        {ENSName || `${shortenHex(account, 4)}`}
      </a>
    </div>
  );
};

export default Account;
