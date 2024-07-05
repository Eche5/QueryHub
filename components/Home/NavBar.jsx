"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/public/logo_removebg.png";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitch from "../ThemeSwitcher";
function NavBar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const toggleNavbar = () => {
    setOpen((prev) => !prev);
  };

  const closeNavbar = () => {
    setOpen(false);
  };
  return (
    <header>
      <nav className=" xl:flex items-center hidden justify-around font-Montserrat h-[128px]">
        <h2 className="text-[2.8rem] font-bold text-black dark:text-white">
          <span className=" text-[#FF3131]">Query</span>Hub
        </h2>{" "}
        <ul className=" flex items-center justify-around gap-8">
          <Link
            href="/"
            className={
              pathname == "/"
                ? "text-[#FF3131] font-bold "
                : "text-[black] hover:text-[#FF3131]"
            }
          >
            Home
          </Link>
          <Link href="#">Ask A Question</Link>
          <Link href="#">About Us</Link>
          <Link href="#">Contact Us</Link>
        </ul>
        <div className=" flex items-center justify-around gap-8">
          <Link href="/Auth/Login">
            <button>Login</button>
          </Link>
          <Link href="/Auth">
            <button className=" bg-gradient-to-r from-[#25CFC6] to-[#FF3131] rounded-md w-40 text-center py-2 text-white cursor-pointer drop-shadow-lg hover:scale-105 transition ease-in-out duration-200">
              Sign Up
            </button>
          </Link>
          <div className="py-8 px-6 md:px-12 md:py-16 lg:py-0 lg:pr-0 lg:pl-6">
            <ThemeSwitch />
          </div>
        </div>
      </nav>
      <nav className="bg-gray-50 fixed w-full dark:bg-black top-0 md:hidden z-[999] font-Montserrat">
        <div className="relative bg-[#FFFFFF] dark:bg-[#0D0D0D] shadow-md">
          <div className="px-6 md:px-12 container mx-auto py-4">
            <div className="flex items-center justify-between">
              <div className="flex justify-center bg-transparent pt-2 z-[1000]">
                <a href="/">
                  <div className="flex items-center">
                    <h2 className="text-[2rem] font-bold text-black dark:text-white">
                      <span className=" text-[#FF3131]">Query</span>Hub
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
                          className={
                            pathname === "/"
                              ? "font-semibold text-[#24269a]"
                              : ""
                          }
                          href="/"
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={closeNavbar}
                          className={
                            pathname === "/About"
                              ? "font-semibold text-[#24269a]"
                              : ""
                          }
                          href="/About"
                        >
                          About
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <Link href="#">Ask A Question</Link>
                      </li>
                      <li>
                        {" "}
                        <Link href="#">About Us</Link>
                      </li>
                      <li>
                        {" "}
                        <Link href="#">Contact Us</Link>
                      </li>
                      <li>
                        {" "}
                        <Link href="/Auth/Login">
                          <button>Login</button>
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <Link href="/Auth">
                          <button className=" bg-gradient-to-r from-[#25CFC6] to-[#FF3131] rounded-md w-40 text-center py-2 text-white cursor-pointer drop-shadow-lg hover:scale-105 transition ease-in-out duration-200">
                            Sign Up
                          </button>
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
    </header>
  );
}

export default NavBar;
