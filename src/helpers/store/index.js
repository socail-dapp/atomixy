import create from "zustand";
import store from "store";

const useStore = create((set, get) => {
  return {
    darkMode: false,

    // node utils
    currentNodeWindow: null,
    addNodeWindow: (value) => set({ currentNodeWindow: value }),
    resetNodeWindow: () => set({ currentNodeWindow: null }),

    //
    currentFlow: {},
    addFlow: (value) => set({ currentFlow: value }),
    //add it to storage? so when createion and left, can retrace prev-works

    //
    lock: false,
    setLock: () => set({ lock: false }),
    setUnlock: () => set({ lock: true }),

    // modal
    Component: null,
    showModal: (value) => set({ Component: value }),
    closeModal: () => set({ Component: null }),

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
