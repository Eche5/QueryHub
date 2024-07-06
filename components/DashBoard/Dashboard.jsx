"use client";
import { useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import SeminarModal from "./SeminarModal";
import Seminar from "./Seminar";
import axios, { axiosPrivate } from "../Authentication/axios";
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import PersistLogin from "../PersistLogin";
import ThemeSwitch from "../ThemeSwitcher";
import QRCode from "react-qr-code";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export default function Dashboard() {
  const [qrIsVisible, setQrIsVisible] = useState(false);
  const [url, setUrl] = useState("");
  const navigate = useRouter();
  const handleQrCodeGenerator = (url) => {
    setUrl(url);
    if (!url) {
      return;
    }
    setQrIsVisible(true);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showdropDown, setShowDropDown] = useState(false);

  const deleteHandler = async (url) => {
    const DELETE_URL = `/seminar/${url}`;
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await axios.delete(DELETE_URL);
        if (response.status == 204) {
          fetchSeminars();
        }
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const { id } = useParams();
  const { auth } = useAuth();
  const [seminars, setSeminars] = useState([]);
  const pathname = usePathname();

  const handleOpenModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setQrIsVisible(false);
    document.body.style.overflow = "auto";
  };

  const [open, setOpen] = useState(false);

  const toggleNavbar = () => {
    setOpen((prev) => !prev);
  };

  const closeNavbar = () => {
    setOpen(false);
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
  const LOGOUT_URL = "/logout";

  const handleLogOut = async () => {
    const response = await axiosPrivate.post(LOGOUT_URL, {
      withCredentials: true,
    });
    if (response.status == 204) {
      navigate.push(`/`);
    }
  };
  return (
    <PersistLogin>
      <nav className="hidden xl:flex top-0 w-full bg-[white] dark:bg-[#0D0D0D] shadow-md fixed z-[9999] justify-between mac:flex items-center h-[100px] pr-8 ml-0 font-Montserrat">
        <h3 className="text-center text-[36px] font-bold">Dashboard</h3>
        <div className="font-bold flex items-center gap-2 font-Montserrat">
          <input
            type="search"
            className=" w-[616px] rounded-[14px] border-2 outline-none border-black pl-2 h-[40px]"
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
        <Menu as="div" className="relative inline-block text-left">
          <div className=" flex items-center gap-4">
            <RxAvatar className="h-[40px] w-[40px]" />
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              {auth?.user?.full_name.split(" ")[0]}
              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 h-5 w-5 text-gray-400"
              />
            </MenuButton>
            <ThemeSwitch />
          </div>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="py-1">
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                >
                  Account settings
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                >
                  Support
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                >
                  License
                </a>
              </MenuItem>
              <form action="#" method="POST">
                <MenuItem>
                  <button
                    onClick={handleLogOut}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    Sign out
                  </button>
                </MenuItem>
              </form>
            </div>
          </MenuItems>
        </Menu>
      </nav>
      <nav className="bg-gray-50 fixed w-full dark:bg-black top-0 md:hidden z-[999] font-Montserrat">
        <div className="relative bg-[#FFFFFF] dark:bg-[#0D0D0D] shadow-md">
          <div className="px-6 md:px-12 container mx-auto py-4">
            <div className="flex items-center justify-between">
              <div className="flex justify-center bg-transparent pt-2 z-[1000]">
                <a href="/">
                  <div className="flex items-center">
                    <h2 className="text-[2rem] font-bold text-black dark:text-white">
                      Dashboard
                    </h2>
                  </div>
                </a>
              </div>
              <div className="flex items-center justify-end">
                <input
                  type="checkbox"
                  name="hamburger"
                  id="hamburger"
                  className="peer"
                  hidden
                  checked={open}
                  onChange={toggleNavbar}
                />
                <label
                  htmlFor="hamburger"
                  className="peer-checked:hamburger block relative z-20 p-6 -mr-6 cursor-pointer xl:hidden"
                >
                  <div
                    aria-hidden="true"
                    className="m-auto h-0.5 w-6 rounded bg-[black] dark:bg-white transition duration-300"
                  ></div>
                  <div
                    aria-hidden="true"
                    className="m-auto mt-2 h-0.5 w-6 rounded bg-[black] dark:bg-white transition duration-300"
                  ></div>
                </label>
                <div
                  className={`${
                    open
                      ? "peer-checked:translate-x-0 fixed inset-0 w-[calc(100%-4.5rem)] translate-x-[-100%] dark:bg-[#0D0D0D] bg-[#FFFFFF] z-[999] shadow-xl transition duration-300 lg:w-auto lg:static xl:shadow-none xl:translate-x-0"
                      : "fixed inset-0 w-[calc(100%-4.5rem)] translate-x-[-100%] bg-[#FFFFFF] dark:bg-[#0D0D0D] z-[999] shadow-xl transition duration-300 lg:w-auto lg:static xl:shadow-none xl:translate-x-0"
                  }`}
                >
                  <div className="flex flex-col h-full justify-between xl:items-center dark:text-white xl:flex-row">
                    <ul className="px-6 pt-32 space-y-8 md:px-12 xl:space-y-0 xl:flex xl:space-x-12 xl:pt-0">
                      <li>
                        <Link
                          onClick={closeNavbar}
                          className="font-semibold text-[#B0B1F3]"
                        >
                          Manage Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={() => handleLogOut()}
                          className="font-semibold text-[#B0B1F3]"
                        >
                          Log out
                        </Link>
                      </li>
                    </ul>
                    <div className="py-8 px-6 md:px-12 md:py-16 lg:py-0 lg:pr-0 lg:pl-6">
                      <ThemeSwitch />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <section
        className=" pt-40 flex flex-col items-center gap-8"
        onClick={() => {
          setShowDropDown(false);
        }}
      >
        <h3 className=" text-black text-2xl dark:text-white  ">
          {auth?.user?.full_name} Active Seminar
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
            <div
              key={seminar.id}
              className="  bg-slate-100  dark:text-black relative shadow-md h-[74px] xl:w-[916px] w-full flex justify-between items-center rounded-[4px]  px-10   "
            >
              <Link href={`/Question/${seminar.id}`}>
                <div className=" ">
                  <div className=" flex items-center gap-4">
                    <h3>{seminar.name}</h3>
                    <p>#{seminar.api_key}</p>
                  </div>
                  <p>June 20 - june 22</p>
                </div>
              </Link>

              <div className="  flex items-center gap-2">
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
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 hover:fill-red-600 cursor-pointer"
                  onClick={() => deleteHandler(seminar?.id)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 cursor-pointer"
                  onClick={() => {
                    handleQrCodeGenerator(seminar?.id);
                    handleOpenModal();
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                  />
                </svg>
              </div>
            </div>
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
          {!qrIsVisible ? (
            <Seminar onClose={handleCloseModal} fetchSeminars={fetchSeminars} />
          ) : (
            <div className="qrcode__download">
              <div className="qrcode__image">
                <QRCode
                  value={`https://seminarq.vercel.app/Question/${url}`}
                  size={300}
                />
              </div>
            </div>
          )}
        </SeminarModal>
      </section>
    </PersistLogin>
  );
}
