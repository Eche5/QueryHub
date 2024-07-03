"use client";
import { useEffect, useState } from "react";
import { BiSolidConversation } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";
import SeminarModal from "./SeminarModal";
import Seminar from "./Seminar";
import axios, { axiosPrivate } from "../Authentication/axios";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import PersistLogin from "../PersistLogin";
import useRefreshToken from "@/hooks/useRefreshToken";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const { auth } = useAuth();
  const [seminars, setSeminars] = useState([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

    document.body.style.overflow = "auto";
  };
  const SEMINAR_URL = `/seminars/${id}`;
  const fetchSeminars = async () => {
    try {
      const response = await axiosPrivate.get(SEMINAR_URL);
      setSeminars(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSeminars();
  }, []);

  return (
    <PersistLogin>
      <nav className="hidden xl:flex top-0 w-full bg-[white] shadow-md fixed z-[9999] justify-between mac:flex items-center h-[100px] pr-8 ml-0 font-Montserrat">
        <h3 className="text-center text-[36px] font-bold">Dashboard</h3>
        <div className="font-bold flex items-center gap-2 font-Montserrat">
          <input
            type="search"
            className=" w-[616px] rounded-[14px] h-[40px]"
            placeholder="Search Seminar"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
        <div className=" flex items-center gap-2">
          <p>{auth?.user?.full_name}</p>
          <RxAvatar className="h-[40px] w-[40px]" />
        </div>
      </nav>
      <section className=" pt-40 flex flex-col items-center gap-8">
        <h3 className=" text-black text-2xl  ">
          Echefula&apos;s Active Seminar
        </h3>
        <div className=" flex items-center gap-2">
          <p className=" font-bold">Create a QueryHub</p>
          <button
            onClick={handleOpenModal}
            className="bg-gradient-to-r from-[#25CFC6] to-[#FF3131] rounded-md h-6 w-6 hover:w-8 transition-all"
          >
            +
          </button>
        </div>
        {seminars?.map((seminar) => {
          return (
            <Link
              href={`/Question/${seminar.id}`}
              key={seminar.id}
              className=" cursor-pointer bg-slate-100 hover:bg-slate-500 shadow-md h-[74px] w-[916px] flex justify-between items-center rounded-[4px]  px-10   "
            >
              <div className=" ">
                <div className=" flex items-center gap-4">
                  <h3>{seminar.name}</h3>
                  <p>#{seminar.api_key}</p>
                </div>
                <p>June 20 - june 22</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                />
              </svg>
            </Link>
          );
        })}{" "}
        {seminars?.length === 0 && (
          <>
            <h4>You currently have no active Seminar!!!</h4>
          </>
        )}
        <SeminarModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          className="z-[999]"
        >
          <Seminar onClose={handleCloseModal} fetchSeminars={fetchSeminars} s />
        </SeminarModal>
      </section>
    </PersistLogin>
  );
}
