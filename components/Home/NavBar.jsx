"use client";
import Image from "next/image";
import React from "react";
import logo from "@/public/logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
function NavBar() {
  const pathname = usePathname();
  
  return (
    <header>
      <nav className=" flex items-center justify-around font-Montserrat">
        <Image src={logo} alt="logo" className=" w-32" />
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
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
