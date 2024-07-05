"use client";
import React, { useContext, useEffect } from "react";

const SeminarModal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const modalClass = isOpen
    ? "fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter z-[999] bg-opacity-50 bg-black  overflow-auto"
    : "hidden";

  return (
    <div
      className={modalClass}
      onClick={() => {
        onClose();
      }}
    >
      <div
        onClick={handleClick}
        className="absolute bg-white dark:bg-[#0D0D0D] md:p-8 p-12 mx-1 rounded-lg shadow-xl z-[999] max-w-screen-xl"
        role="dialog"
        aria-modal="true"
      >
        <div>{children}</div>
      </div>
    </div>
  );
};

export default SeminarModal;
