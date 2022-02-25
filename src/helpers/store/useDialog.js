import create from "zustand";

const useDialog = create((set, get) => {
  return {
    isOpen: false,
    // setIsOpen: (value) => set({ isOpen: true }),
    openModal: (value) => set({ isOpen: true }),
    closeModal: (value) => set({ isOpen: false }),
    title: `TITLE`,
    desc: `DESCRIPTION DIALOG HERE...`,
    confirmText: `Confirm`,
    hasCancel: true,

    reply: null,
    replyTo: (value) => set({ reply: value }),
  };
});

export default useDialog;
