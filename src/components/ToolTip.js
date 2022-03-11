import React from "react";

export default function ToolTip({ children, isTop = true, isLeft = false }) {
  return (
    <span
      className={`tooltip bg-gray-800/40 backdrop-grayscale-0 border text-white text-xs p-2 rounded-md  overflow-visible${
        isTop && `-mt-10 `
      }
        ${isLeft && `-ml-20`}`}
    >
      {children}
    </span>
  );
}
