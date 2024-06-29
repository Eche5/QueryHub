import Image from "next/image";
import React from "react";
import logo from "../../public/Logo.png";

function Footer() {
  return (
    <footer className=" flex justify-between pt-20 px-10 bg-[#D2D2D2]">
      <Image src={logo} alt="logo" className=" w-32" />
      <div className=" grid grid-cols-4 gap-4">
        <ul className=" flex flex-col gap-4">
          <li>Home</li>
          <li>Ask a Question</li>
          <li>About Us</li>
          <li>Contact</li>
        </ul>

        <ul className=" flex flex-col gap-4">
          <li>Email: contact@queryhub.com</li>
          <li>Phone: 123-456-7890</li>
        </ul>
        <ul className=" flex flex-col gap-4">
          <li href="#">Facebook</li>
          <li href="#">Twitter</li>
          <li href="#">LinkedIn</li>
        </ul>
        <ul className=" flex flex-col gap-4">
          <li href="#">Privacy Policy</li>
          <li href="#">Terms of Service</li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
