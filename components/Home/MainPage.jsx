
"use client"
import React, { useEffect } from 'react'
import input from "../../public/input.png"
import Image from 'next/image';
function MainPage() {
      useEffect(() => {
        const inputField = document.querySelector(".styled-input");
        const placeholder = document.querySelector(".placeholder");

        inputField.addEventListener("input", () => {
          if (inputField.value) {
            placeholder.style.display = "none";
          } else {
            placeholder.style.display = "block";
          }
        });
      }, []);
  return (
    <div className=" flex flex-col items-center gap-10 pt-20">
      <h1 className=" text-[4rem] font-bold">
        Welcome to <span className=" text-[#FF3131]">Query</span>Hub
      </h1>
      <p className=" text-[22px]">
        The easiest way to ask questions anonymously at seminars.
      </p>
      <button className=" bg-gradient-to-r from-[#25CFC6] to-[#FF3131] rounded-md w-40 text-center py-2 text-white cursor-pointer drop-shadow-lg hover:scale-105 transition ease-in-out duration-200">
        Get Started
      </button>
      <div className=" flex flex-col items-center">
        <div className="xl:w-[570px] w-full flex px-2 border-[1px] border-[#F0F0F0] rounded-[15px] relative input-placeholder">
          <input
            className="h-[74px] w-full outline-none focus:ring-0 focus:border-black xl:w-[496px] rounded-[15px] pl-[21px] styled-input"
            type="text"
          />
          <div className="placeholder absolute top-1/2 left-[27px] transform -translate-y-1/2 pointer-events-none text-gray-400">
            <span className="text-black">Enter Seminar</span> Key |
          </div>
          <button className="xl:w-[74px] xl:h-[74px] h-[74px] w-[74px]  flex justify-center items-center rounded-[15px]">
            <Image src={input} alt="button icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainPage