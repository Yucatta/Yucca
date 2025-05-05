"use client";
import React, { useState } from "react";
import { useUserInfo } from "@/contexrt/userinfo";
interface Props {
  handleClickingPerson: (e: string) => void;
  list: string[];
}
const Contacts = ({ list, handleClickingPerson }: Props) => {
  const { userindex, setuserindex } = useUserInfo();
  const temp: string[] = [...list];
  if (typeof userindex === "number") {
    temp.splice(userindex, 1);
  }
  return (
    <div className="bg-gray-600 h-full w-1/6 flex flex-col items-center">
      <button
        className="bg bg-neutral-800 w-2/3 h-15 rounded-2xl cursor-pointer"
        onClick={() => {
          setuserindex(undefined);
        }}
      >
        Change Person
      </button>
      <ul className="flex items-center w-2/3 flex-col ">
        {temp.map((person, index) => {
          return (
            <li
              key={index}
              className="w-3/4 border-1 rounded-xl h-10 mt-3 flex justify-center cursor-pointer hover:bg-gray-500 "
              onClick={() => handleClickingPerson(person)}
            >
              {person}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Contacts;
