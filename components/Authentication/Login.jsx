"use client";
import React, { useRef, useState } from "react";
import axios from "./axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Spinner from "../Spinner";
function Login() {
  const [email, setEmail] = useState("");
  const [errMsg, SetErrMsg] = useState("");

  const { auth, setAuth } = useAuth();
  const errRef = useRef();

  const [logining, setLogining] = useState(false);
  const [password, setPassword] = useState("");
  const LOGIN_URL = "/login";
  const navigate = useRouter();
  const onHandleSubmit = async (e) => {
    e.preventDefault();
    setLogining(true);
    try {
      const response = await axios.post(
        LOGIN_URL,

        JSON.stringify({ email, password }),

        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const result = response?.data;
      const { accessToken, user } = result;

      const id = user?.id;
      navigate.push(`/Dashboard/${id}`, { scroll: false });
      setAuth({
        user,
        accessToken,
      });
    } catch (err) {
      setLogining(false);
      SetErrMsg(err.response.data.error);
    }
  };

  return (
    <section>
      <section className="flex justify-center items-center w-full font-Montserrat">
        <div className="flex flex-col items-center w-full max-w-md p-4 bg-white rounded shadow-md">
          <h3 className="text-center text-[3.2rem] font-bold mb-6">Sign In</h3>
          <form
            className="flex flex-col gap-4 w-full"
            onSubmit={onHandleSubmit}
          >
            <p
              ref={errRef}
              className={
                errMsg ? "errmsg text-red-500 text-center" : "offscreen"
              }
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1">
                Email
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
            <div className="flex gap-2 items-center mt-6">
              <button className="bg-gradient-to-r from-[#25CFC6] to-[#FF3131] flex flex-col items-center rounded-md w-40 text-center py-2 text-white cursor-pointer drop-shadow-lg hover:scale-105 transition ease-in-out duration-200">
                {!logining ? "Sign In" : <Spinner />}
              </button>
              <button className="text-blue-500 hover:underline">
                Sign Up &rarr;
              </button>
            </div>
          </form>
        </div>
      </section>
    </section>
  );
}

export default Login;
