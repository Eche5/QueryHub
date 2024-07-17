"use client";

import React, { useState } from "react";
import Spinner from "../Spinner";

export default function EditSeminar({
  onClose,
  onEdit,
  fetchSeminars,
  editing,
}) {
  const [name, setName] = useState("");
  const onHandleSubmit = async (e) => {
    e.preventDefault();
    onEdit(name);
    setName("")
  };
  return (
    <form
      onSubmit={onHandleSubmit}
      className="flex flex-col items-center gap-4 xl:w-[500px] h-[230px] font-Montserrat"
    >
      <h3 className=" font-bold">Edit Seminar</h3>
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
            !editing
              ? "bg-[#25CFC6] flex flex-col items-center rounded-md w-40 text-center py-2 text-black cursor-pointer drop-shadow-lg hover:scale-105 transition ease-in-out duration-200"
              : "flex flex-col items-center w-[136px]"
          }
        >
          {!editing ? "Edit Seminar" : <Spinner />}
        </button>
      </div>
    </form>
  );
}
