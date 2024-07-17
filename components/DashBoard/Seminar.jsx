"use client";

import React, { useState } from "react";
import axios, { axiosPrivate } from "../Authentication/axios";
import { useParams } from "next/navigation";
import Spinner from "../Spinner";

export default function Seminar({ onClose, fetchSeminars }) {
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);
  const SEMINAR_URL = "/seminar";
  const { id } = useParams();
  const onHandleSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const response = await axiosPrivate.post(
        SEMINAR_URL,

        JSON.stringify({ name, user_id: id })
      );
      if (response.status == 201) {
        fetchSeminars();
        onClose();
        setName("");
        setCreating(false);
      }
    } catch (error) {
      setCreating(false);
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={onHandleSubmit}
      className="flex flex-col items-center gap-4 xl:w-[500px] h-[230px] font-Montserrat"
    >
      <h3 className=" font-bold">What is your seminar about?</h3>
      <div className="w-full">
        <label className="block">Seminar Name</label>
        <input
          className="w-full outline-1 border-2 h-[34px] pl-2"
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <p className="italic">Seminar event will expire after two days</p>
      <div className="flex items-center gap-4 px-4 text-white">
        <button
          className="bg-[#FF3131] flex flex-col items-center rounded-md w-40 text-center py-2 text-white cursor-pointer drop-shadow-lg hover:scale-105 transition ease-in-out duration-200"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={
            !creating
              ? "bg-[#25CFC6] flex flex-col items-center rounded-md w-40 text-center py-2 text-black cursor-pointer drop-shadow-lg hover:scale-105 transition ease-in-out duration-200"
              : "flex flex-col items-center w-[136px]"
          }
        >
          {!creating ? "Create Seminar" : <Spinner />}
        </button>
      </div>
    </form>
  );
}
