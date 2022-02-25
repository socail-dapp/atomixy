import React from "react";

export default function ToolTip({ children, isTop = true }) {
  return (
    <span
      className={`tooltip bg-gray-800/40 backdrop-grayscale-0 border text-white text-xs p-2 rounded-md ${
        isTop && `-mt-10 `
      }`}
    >
      {children}
    </span>
  );
}
