import create from "zustand";

const useStore = create((set, get) => {
  return {
    darkMode: false,

    // node utils
    currentNodeWindow: null,
    addNodeWindow: (value) => set({ currentNodeWindow: value }),
    resetNodeWindow: () => set({ currentNodeWindow: null }),

    //
    currentFlows: [],
    addFlow: (value) =>
      set(({ currentFlows }) => ({ currentFlows: currentFlows.concat(value) })),

    lock: false,
    setLock: () => set({ lock: false }),
    setUnlock: () => set({ lock: true }),
    //
    router: {},
    user: null,
    events: null,
    setEvents: (events) => {
      set({ events });
    },
    defaultModels: null,
    currentModels: [],
    parseBuffer: null,
    search: "",
    order: "alphabetic",
  };
});

export default useStore;
