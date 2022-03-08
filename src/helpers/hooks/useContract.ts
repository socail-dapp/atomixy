import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";

export default function useContract<T extends Contract = Contract>(
  address: string,
  ABI: any
): T | null {
  const { library, account, chainId } = useWeb3React();
  // console.log(`current chainId: ${chainId}`,
  //   `address: ${address}`,
  //   `library: ${library}`,
  //   library?.getSigner(account),
  //   `liaccountbrary: ${account}`,
  // )

  // console.log(ABI)
  // console.log(account, '--account $$CONS')

  return useMemo(() => {
    if (!address || !ABI || !library || !chainId) {
      return null;
    }

    try {
      return new Contract(address, ABI, library.getSigner(account));
    } catch (error) {
      console.error("Failed To Get Contract", error);

      return null;
    }
  }, [address, ABI, library, account]) as T;
}
