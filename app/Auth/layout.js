import NavBar from "@/components/Home/NavBar";
import Image from "next/image";
import React from "react";
import bg from "@/public/98y_8dnmspj5e9imsor55ko32.jpg";

export default function page({children}) {
  return (
    <div className="bg-white dark:bg-[#0D0D0D] h-screen">
      <NavBar />
      <div className=" flex items-center justify-center px-8 mt-20 xl:mt-0 bg-[#FEFAFA] dark:bg-[#0D0D0D]">
        <Image
          src={bg}
          alt="bg"
          className=" xl:w-[1000px] h-[492px] xl:block hidden"
        />
        {children}
      </div>
    </div>
  );
}
