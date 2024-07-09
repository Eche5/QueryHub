"use client";
import { useAuth } from "@/context/AuthContext";
import moment from "moment";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiSolidConversation } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";
import axios from "../Authentication/axios";
import { ThemeProvider } from "next-themes";
import ThemeSwitch from "../ThemeSwitcher";

function Question() {
  const [isFocused, setIsFocused] = useState(false);
  const [sending, setIsSending] = useState(false);
  const { seminar } = useAuth();
  const [question, setQuestion] = useState("");
  const { questions, setQuestions } = useAuth();
  const { id } = useParams();

  const QUESTION_URL = `/question/${id}`;

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const response = await axios.post(
        QUESTION_URL,
        JSON.stringify({ question })
      );
      if (response.status == 201) {
        setIsFocused(false);
        setQuestion("");
        setIsSending(false);
      }
    } catch (error) {
      setIsSending(false);

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
            ...data.filter(
              (q) =>
                q.seminar_id === id &&
                !prevQuestions.some((pq) => pq.id === q.id)
            ),
          ]);
        } else if (data.question && data.seminar_id === id) {
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
    <div className=" xl:px-0 flex flex-col gap-8 pb-10 bg-white dark:bg-[#0D0D0D] h-screen dark:text-white text-black">
      <nav className="hidden xl:flex top-0 w-full bg-white dark:bg-[#0D0D0D] dark:text-white text-black px-4 shadow-md fixed z-[9999] justify-between mac:flex items-center h-[100px] pr-8 ml-0 font-Montserrat">
        <h3 className="text-center xl:text-[36px] font-bold">
          {seminar[0]?.name}
        </h3>
        <div className="font-bold flex items-center gap-2">
          <p className=" dark:text-white text-black">Questions</p>
          <BiSolidConversation />
        </div>
        <div className=" flex items-center gap-2">
          <RxAvatar className="h-[40px] w-[40px]" />
          <ThemeSwitch />
        </div>
      </nav>
      <nav className=" flex xl:hidden top-0 w-full bg-[#FEFAFA] dark:bg-[#0D0D0D] shadow-md fixed z-[9999] justify-between mac:flex items-center h-[100px] pr-8 ml-0 font-Montserrat">
        <h3 className="text-center   dark:text-white font-bold">
          {seminar[0]?.name}
        </h3>
        <div className="font-bold flex items-center gap-2">
          <p>Questions</p>
          <BiSolidConversation />
        </div>
        <div className=" flex items-center gap-2">
          <RxAvatar className="h-[40px] w-[40px]" />
          <ThemeSwitch />
        </div>{" "}
      </nav>

      <div className="pt-40 flex flex-col items-center px-2 gap-8 bg-white dark:bg-[#0D0D0D]">
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
              : "xl:w-[570px] w-full h-[182px]  p-2 border-[4px] border-[#F0F0F0] rounded-[15px] relative input-placeholder"
          }
        >
          <div className=" flex items-center gap-2">
            <RxAvatar className="h-[40px] w-[40px]" />
            <input
              value={question}
              required
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
      <ul className=" flex flex-col items-center gap-2 px-4 bg-white dark:bg-[#0D0D0D] ">
        {questions?.map((question) => {
          return (
            <div
              className="chat chat-start  xl:w-[916px] w-full "
              key={question.id}
            >
              <div className="chat chat-start h-[84px] xl:w-[916px] w-full">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <RxAvatar className=" w-[40px] h-[40px]" />
                  </div>
                </div>
                <div className=" flex justify-between items-center  w-[70vw] xl:w-[824px]">
                  <p className=" ">Anonymous</p>
                  <time className="text-md opacity-50">
                    {formatDateTime(question?.created_at)}
                  </time>
                </div>
                <div className="chat-bubble  xl:w-[916px]  w-[80vw] xl:h-[30px]">
                  {question.question}
                </div>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default Question;
