import create from "zustand";
import store from "store";

const useCreate = create((set, get) => {
  return {
    title: null,
    description: null,
    //    authority:
    //    chaindId
    //tags
    setTitle: (value) => set({ title: value }),
    setDescription: (value) => set({ description: value }),
  };
});

export default useCreate;
