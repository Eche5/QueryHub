"use client";

import React, { useState } from "react";
import axios, { axiosPrivate } from "../Authentication/axios";
import { useParams } from "next/navigation";

export default function Seminar({ onClose, fetchSeminars }) {
  const [name, setName] = useState();
  const SEMINAR_URL = "/seminar";
  const { id } = useParams();
  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      axiosPrivate.post(
        SEMINAR_URL,

        JSON.stringify({ name, user_id: id })
      );
      fetchSeminars()
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={onHandleSubmit}
      className="flex flex-col items-center gap-4 w-[500px] h-[230px] font-Montserrat"
    >
      <h3 className=" font-bold">What is your seminar about?</h3>
      <div className="w-full">
        <label className="block">Seminar Name</label>
        <input
          className="w-full h-[34px] pl-2"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <p className="italic">Seminar event will expire after two days</p>
      <div className="flex items-center gap-4 px-4 text-white">
        <button className="text-red-600 h-[40px] rounded-md">Cancel</button>
        <button
          type="submit"
          className="bg-green-600 w-[136px] h-[40px] rounded-md"
        >
          Create Seminar
        </button>
      </div>
    </form>
  );
}
