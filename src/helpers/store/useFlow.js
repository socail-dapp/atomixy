/**
 * TODO: move all flows state to here
 */

import create from "zustand";
//  import store from "store";

const useFlow = create((set, get) => {
  return {
    // this key is to identify the smart contract Id
    // get this key from index homepage list of flow-projects
    key: null,
    setKey: (value) => set({ key: value }),

    //  networks
  };
});

export default useFlow;
