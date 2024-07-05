"use client";

import Layout from "@/app/Auth/page";
import React, { useState } from "react";
import axios from "./axios";
import { useRouter } from "next/navigation";
import Spinner from "../Spinner";
import Link from "next/link";

function Signup() {
  const [fullname, setFullName] = useState("");
  const [Signining, setSignining] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mtpassword, setMtpassword] = useState("");

  const navigate = useRouter();

  const LOGIN_URL = "/users";

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,

        JSON.stringify({
          email,
          password,
          full_name: fullname,
          confirmPassword: mtpassword,
        }),

        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const result = response?.data;
      const { token: accessToken, user } = result;

      const id = user?.id;
      navigate.push(`/Auth/Login`, { scroll: false });
      setAuth({
        user,

        accessToken,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <section className="flex justify-center items-center w-full font-Montserrat bg-[#FEFAFA] dark:bg-[#0D0D0D]">
        <div className="flex flex-col items-center w-full max-w-md p-4  rounded shadow-md">
          <h3 className="text-center text-[3.2rem] font-bold mb-6">Sign Up</h3>
          <form
            className="flex flex-col gap-4 w-full bg-[#FEFAFA] dark:bg-[#0D0D0D]"
            onSubmit={onHandleSubmit}
          >
            <div className="flex flex-col">
              <label htmlFor="fullname" className="mb-1">
                Full Name<span className="text-red-500"> *</span>
              </label>
              <input
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Full Name..."
                id="fullname"
                type="text"
                className="outline-none border-b-2 p-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1">
                Email<span className="text-red-500"> *</span>
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address..."
                id="email"
                type="email"
                className="outline-none border-b-2 p-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-1">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="***********"
                id="password"
                type="password"
                className="outline-none border-b-2 p-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="repeatPassword" className="mb-1">
                Repeat Password
              </label>
              <input
                value={mtpassword}
                onChange={(e) => setMtpassword(e.target.value)}
                placeholder="***********"
                id="repeatPassword"
                type="password"
                className="outline-none border-b-2 p-2"
              />
            </div>
            <div className="flex items-center gap-2 mt-4">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms" className="text-sm">
                I agree to the <span className=" font-bold">Terms of Use</span>
              </label>
            </div>
            <div className="flex gap-2 items-center mt-6">
              <button
                type="submit"
                disabled={Signining}
                className="bg-gradient-to-r from-[#25CFC6] to-[#FF3131] flex flex-col items-center rounded-md w-40 text-center py-2 text-white cursor-pointer drop-shadow-lg hover:scale-105 transition ease-in-out duration-200"
              >
                {!Signining ? "Sign Up" : <Spinner />}
              </button>
              <Link href="/Auth/Login">
                <button className="text-blue-500 hover:underline">
                  Sign In &rarr;
                </button>
              </Link>
            </div>
          </form>
        </div>
      </section>
    </section>
  );
}

export default Signup;
