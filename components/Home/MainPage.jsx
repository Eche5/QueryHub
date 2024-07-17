"use client";
import React, { useEffect, useState } from "react";
import input from "../../public/input.png";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import axios from "../Authentication/axios";
import { useRouter } from "next/navigation";
import loader from "@/public/221d6bfc1960ab98a7585fcc2a4d0181.gif";
import Link from "next/link";
function MainPage() {
  const navigate = useRouter();

  const { apiKey, setApiKey, setSeminar } = useAuth();
  const [loading, setIsLoading] = useState(false);
  const SeminarAPI_URL = `/seminar/${apiKey}`;
  const onHandleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.get(SeminarAPI_URL);
      const result = response?.data;
      setSeminar(result);
      const id = result[0]?.id;
      if (response.status == 200) {
        setIsLoading(false);
        navigate.push(`/Question/${id}`, { scroll: false });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
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
    <div className=" flex flex-col items-center gap-10 py-20 mt-20 xl:mt-0 font-Montserrat bg-[#FEFAFA] dark:bg-black  ">
      <h1 className=" xl:text-[4rem] text-[1.8rem] font-bold text-black dark:text-white">
        Welcome to <span className=" text-[#FF3131]">Query</span>Hub
      </h1>
      <p className=" xl:text-[22px] dark:text-white text-black text-center">
        The easiest way to ask questions anonymously at seminars.
      </p>
      <Link href="/Auth">
        <button className=" bg-gradient-to-r from-[#25CFC6] to-[#FF3131] rounded-md w-40 text-center py-2 text-white cursor-pointer drop-shadow-lg hover:scale-105 transition ease-in-out duration-200">
          Get Started
        </button>
      </Link>

      <form className=" flex flex-col items-center" onSubmit={onHandleSubmit}>
        <div className="xl:w-[570px] w-full flex px-2 border-[1px] border-[#F0F0F0] rounded-[15px] relative input-placeholder">
          <input
            value={apiKey}
            required
            onChange={(e) => setApiKey(e.target.value)}
            className="h-[74px] w-full outline-none focus:ring-0 focus:border-black xl:w-[496px] dark:text-white text-black dark:bg-black rounded-[15px] pl-[21px] styled-input"
            type="text"
          />
          <div className="placeholder absolute top-1/2 left-[27px] transform -translate-y-1/2 pointer-events-none text-gray-400">
            <span className="dark:text-white text-black">
              Joining As Participant?
            </span>
            |Enter Seminar Key
          </div>
          {!loading ? (
            <button
              type="submit"
              className="xl:w-[74px] xl:h-[74px] h-[74px] w-[74px]  flex justify-center items-center rounded-[15px]"
            >
              <Image src={input} alt="button icon" />
            </button>
          ) : (
            <Image src={loader} className=" w-[74px] h-[74px]" alt="loader" />
          )}
        </div>
      </form>
    </div>
  );
}

export default MainPage;
