import create from "zustand";

const getRandomColor = () => "#03dac6";

const useWindow = create((set, get) => {
  return {
    tabs: 0,
    setTab: (value) => set({ tabs: value }),
    //
    isEditWindow: false,
    setEditWindow: (value) => set({ isEditWindow: value }),
    //
    colorBg: getRandomColor(),
    setColorBg: (value) => set({ colorBg: value }),
    colorText: "white",
    setColorText: (value) => set({ colorText: value }),
    //
    reply: null,
    replyTo: (value) => set({ reply: value }),
  };
});

export default useWindow;
