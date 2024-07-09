"use client";

import React, { useState } from "react";

export default function EditSeminar({ onClose, onEdit, fetchSeminars }) {
  const [name, setName] = useState("");

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    onEdit(name);
    fetchSeminars();
    onClose();
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
        <button className="text-red-600 h-[40px] rounded-md" onClick={onClose}>
          Cancel
        </button>
        <button
          type="submit"
          className="bg-green-600 w-[136px] h-[40px] rounded-md"
        >
          Edit Seminar
        </button>
      </div>
    </form>
  );
}
