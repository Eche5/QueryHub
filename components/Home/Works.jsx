import Image from "next/image";
import React from "react";
import qr_code from "@/public/QR_Code.webp";
import answer from "@/public/DALL·E 2024-07-05 13.00.48 - An illustration showing a seminar setting with a host at the front, looking at a large screen displaying a list of questions in real-time. The host is.webp";
import submit from "@/public/DALL·E 2024-07-05 12.58.11 - An illustration of a smartphone screen showing a text area where users can enter their questions. The background of the smartphone is white with a sim.webp";
function Works() {
  return (
    <section className=" font-Montserrat flex flex-col items-center gap-20 px-10 pb-20">
      <h2 className=" xl:text-[2.3rem] text-[1.4rem] font-semibold">
        How It Works
      </h2>
      <div className=" xl:grid grid-cols-3 flex flex-col items-center">
        <div className=" xl:w-[500px] flex flex-col items-center gap-2">
          <svg
            aria-hidden="true"
            className="e-font-icon-svg e-far-dot-circle"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
          >
            <path d="M256 56c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m0-48C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 168c-44.183 0-80 35.817-80 80s35.817 80 80 80 80-35.817 80-80-35.817-80-80-80z"></path>
          </svg>
          <h3 className=" text-center font-bold">Scan the QR Code</h3>
          <p>
            Use your phone&apos;s camera to scan the code displayed at the
            seminar.
          </p>
          <Image
            src={qr_code}
            alt="qrcode"
            className=" w-[400px] h-[400px] rounded-md"
          />
        </div>
        <div className=" xl:w-[500px] flex flex-col items-center gap-2">
          <svg
            aria-hidden="true"
            className="e-font-icon-svg e-far-dot-circle"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
          >
            <path d="M256 56c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m0-48C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 168c-44.183 0-80 35.817-80 80s35.817 80 80 80 80-35.817 80-80-35.817-80-80-80z"></path>
          </svg>
          <h3 className=" text-center font-bold">Submit Your Question</h3>
          <p>Enter your question in the text area and hit submit.</p>
          <Image
            src={submit}
            alt="submit"
            className=" w-[400px] h-[400px] rounded-md"
          />
        </div>
        <div className=" xl:w-[500px] flex flex-col items-center gap-2">
          <svg
            aria-hidden="true"
            className="e-font-icon-svg e-far-dot-circle"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
          >
            <path d="M256 56c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m0-48C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 168c-44.183 0-80 35.817-80 80s35.817 80 80 80 80-35.817 80-80-35.817-80-80-80z"></path>
          </svg>
          <h3 className=" text-center font-bold">Get Answers</h3>
          <p>Hosts will see your questions in real-time and provide answers.</p>
          <Image
            src={answer}
            alt="answer"
            className=" w-[400px] h-[400px] rounded-md"
          />
        </div>
      </div>
      <section className=" flex flex-col items-center gap-4">
        <h2 className=" font-semibold text-[26px]">Ready to Get Started?</h2>
        <button className=" bg-gradient-to-r from-[#25CFC6] to-[#FF3131] rounded-md w-40 text-center py-2 text-white cursor-pointer drop-shadow-lg hover:scale-105 transition ease-in-out duration-200">
          Sign Up Now
        </button>
      </section>
    </section>
  );
}

export default Works;
