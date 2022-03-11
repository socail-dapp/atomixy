import create from "zustand";

const useComment = create((set, get) => {
  return {
    reply: null,
    replyTo: (value) => set({ reply: value }),
  };
});

export default useComment;
