import NavBar from "@/components/Home/NavBar";
import Image from "next/image";
import React from "react";
import bg from "@/public/98y_8dnmspj5e9imsor55ko32.jpg";

export default function page({children}) {
  return (
    <div>
      <NavBar />
      <div className=" flex items-center px-8">
        <Image src={bg} alt="bg" className=" w-[1000px] h-[492px]" />
        {children}
      </div>
    </div>
  );
}
