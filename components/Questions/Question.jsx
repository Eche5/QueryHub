"use client";
import { useAuth } from "@/context/AuthContext";
import moment from "moment";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiSolidConversation } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";
import axios from "../Authentication/axios";

function Question() {
  const [isFocused, setIsFocused] = useState(false);

  const { seminar } = useAuth();
  const [question, setQuestion] = useState("");
  const { questions, setQuestions } = useAuth();
  const { id } = useParams();

  const QUESTION_URL = `/question/${id}`;

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        QUESTION_URL,
        JSON.stringify({ question })
      );

      setQuestion(""); // Clear the input field after submitting
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let socket;
    const connect = () => {
      socket = new WebSocket(`wss://queryhub.adaptable.app/v1/question/${id}`);

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (Array.isArray(data)) {
          setQuestions((prevQuestions) => [
            ...prevQuestions,
            ...data.filter((q) => !prevQuestions.some((pq) => pq.id === q.id)),
          ]);
        } else if (data.question) {
          setQuestions((prevQuestions) => [...prevQuestions, data]);
        } else {
          console.error("Unexpected data format:", data);
        }
      };

      socket.onerror = (error) => {
        console.error("WebSocket Error:", error);
      };

      socket.onclose = () => {
        console.log("WebSocket connection closed, attempting to reconnect...");
        setTimeout(connect, 1000); // Attempt to reconnect after 1 second
      };
    };

    connect();

    return () => {
      socket.close();
    };
  }, [id, setQuestions]);

  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString); // Your date
    const formattedDate = moment(date).fromNow();

    return formattedDate;
  }

  return (
    <div className=" xl:px-0 flex flex-col gap-8 pb-10">
      <nav className="hidden xl:flex top-0 w-full bg-[white] px-4 shadow-md fixed z-[9999] justify-between mac:flex items-center h-[100px] pr-8 ml-0 font-Montserrat">
        <h3 className="text-center xl:text-[36px] font-bold">
          {seminar[0]?.name}
        </h3>
        <div className="font-bold flex items-center gap-2">
          <p>Questions</p>
          <BiSolidConversation />
        </div>
        <RxAvatar className="h-[40px] w-[40px]" />
      </nav>
      <nav className=" flex xl:hidden top-0 w-full bg-[#FEFAFA] dark:bg-[#0D0D0D] shadow-md fixed z-[9999] justify-between mac:flex items-center h-[100px] pr-8 ml-0 font-Montserrat">
        <h3 className="text-center   dark:text-white font-bold">
          {seminar[0]?.name}
        </h3>
        <div className="font-bold flex items-center gap-2">
          <p>Questions</p>
          <BiSolidConversation />
        </div>
        <RxAvatar className="h-[40px] w-[40px]" />
      </nav>

      <div className="pt-40 flex flex-col items-center gap-8">
        <h3 className=" text-[22px] font-bold">
          Welcome to the Questions page!
        </h3>
        <p className="text-center text-lg mb-4  xl:w-[768px]">
          This is where you can ask any questions you have during the seminar.
          Our goal is to provide a platform where you can engage with the
          presenters and get the answers you need.
        </p>
        <form
          onSubmit={onHandleSubmit}
          className={
            !isFocused
              ? "xl:w-[570px] w-full h-[82px]  px-2 border-[4px] border-[#F0F0F0] rounded-[15px] relative input-placeholder"
              : "xl:w-[570px] w-full h-[182px]  px-2 border-[4px] border-[#F0F0F0] rounded-[15px] relative input-placeholder"
          }
        >
          <div className=" flex items-center">
            <RxAvatar className="h-[40px] w-[40px]" />
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="h-[74px] w-full outline-none focus:ring-0 focus:border-black xl:w-[496px] border-0 rounded-[15px] pl-[21px] styled-input"
              placeholder="Type your Question"
              onFocus={() => setIsFocused(true)}
            />
          </div>

          <button
            type="submit"
            className={`bg-gradient-to-r from-[#25CFC6] bottom-2 right-2 absolute to-[#FF3131] rounded-md w-40 text-center py-2 text-white cursor-pointer drop-shadow-lg hover:scale-105 transition ease-in-out duration-200 ${
              isFocused ? "block" : "hidden"
            }`}
          >
            Send
          </button>
        </form>
        <p className=" italic font-light">
          Your question will be sent anonymously to the seminar hosts. They will
          review and answer your questions in real-time.
        </p>

        {questions?.length === 0 && (
          <>
            <h4>There are no questions asked yet!!</h4>
            <BiSolidConversation className="h-[40px] w-[40px]" />

            <p>Be the first to ask a question!!!</p>
          </>
        )}
      </div>
      <ul className=" flex flex-col items-center gap-8 px-4">
        {questions?.map((question) => {
          return (
            <li
              key={question.id}
              className=" cursor-pointer bg-slate-100 hover:bg-slate-500 dark:bg-slate-500 shadow-md h-[84px] xl:w-[916px] w-full flex justify-between items-center rounded-[4px]  xl:px-10 px-2   "
            >
              <div className=" flex items-center gap-3 ">
                <RxAvatar className="h-[40px] w-[40px]" />
                <div>
                  <p className=" italic">Anonymous</p>
                  <p>{formatDateTime(question?.created_at)}</p>
                </div>
              </div>
              <div>
                <div className=" flex items-center gap-4">
                  <h3 className=" font-bold">{question.question}</h3>
                </div>
              </div>
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
                  d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                />
              </svg>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Question;
