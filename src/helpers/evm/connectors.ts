import { InjectedConnector } from "@web3-react/injected-connector";
import { supportedChainIds } from '@/helpers/utils/networks'
export const injected = new InjectedConnector({
  supportedChainIds,
});
