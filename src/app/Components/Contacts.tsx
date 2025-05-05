"use client";
import React, { useState } from "react";
import { useUserInfo } from "@/contexrt/userinfo";
interface Props {
  handleClickingPerson: (e: string | undefined) => void;
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
          handleClickingPerson(undefined);
        }}
      >
        Change Person
      </button>
      <ul className="flex items-center w-full flex-col  ">
        {temp.map((person, index) => {
          return (
            <li
              key={index}
              className="w-11/12 border-1 rounded-xl h-15 mt-1 flex justify-center cursor-pointer py-1 hover:bg-gray-500"
              onClick={() => handleClickingPerson(person)}
            >
              <img
                src={`/kediiii/kedi${
                  index + 1 > userindex! ? index + 1 : index
                }.jpg`}
                className="w-auto h-auto max-w-15 max-h-15 rounded-full left-1"
              ></img>
              {person}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Contacts;
