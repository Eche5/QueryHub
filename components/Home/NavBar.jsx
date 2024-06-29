import Image from 'next/image'
import React from 'react'
import logo from "../../public/Logo.png"
function NavBar() {
  return (
    <header>
      <nav className=" flex items-center justify-around">
        <Image src={logo} alt="logo" className=" w-32" />
        <ul className=" flex items-center justify-around gap-8">
          <li>Home</li>
          <li>Ask A Question</li>
          <li>About Us</li>
          <li>Contact Us</li>
        </ul>
        <div className=" flex items-center justify-around gap-8">
          <button>Login</button>
          <button className=" bg-gradient-to-r from-[#25CFC6] to-[#FF3131] rounded-md w-40 text-center py-2 text-white cursor-pointer drop-shadow-lg hover:scale-105 transition ease-in-out duration-200">
            Sign Up
          </button>
        </div>
      </nav>
    </header>
  );
}

export default NavBar