import React from "react";

function HamburgerButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col justify-center items-center w-8 h-8 bg-transparent border-none cursor-pointer"
    >
      <div className="w-6 h-[2px] bg-white mb-1"></div>
      <div className="w-6 h-[2px] bg-white mb-1"></div>
      <div className="w-6 h-[2px] bg-white"></div>
    </button>
  );
}

export default HamburgerButton;
