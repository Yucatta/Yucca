"use client";
import { useUserInfo } from "@/contexrt/userinfo";
import Contacts from "./Components/Contacts";
import TextArea from "./Components/TextArea";
import { useState } from "react";

export default function Home() {
  const [selectedperson, setselectedperson] = useState<string | undefined>(
    undefined
  );
  const { userindex, setuserindex } = useUserInfo();
  const list = [
    "Ahmet",
    "Masum Kedii",
    "Yorgun Kedi",
    "Sıkılmış Kedi",
    "Diğer Yönde Sıkılmış Kedi",
    "Yana Bakan Kedi",
    "Ilgilenen Kedi",
    "Duz Kedi",
    "Yukari Bakan Kedi",
    "Kamerya Bakan Kedi",
    "Utangac Kedi",
  ];

  return (
    <>
      {typeof userindex === "number" ? (
        <>
          <div className="flex flex-row  h-screen w-screen">
            <Contacts
              handleClickingPerson={(e) => {
                setselectedperson(e);
              }}
              list={list}
            ></Contacts>
            <TextArea
              list={list}
              CurrentPerson={selectedperson ? selectedperson : ""}
            ></TextArea>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center w-screen h-screen bg-gray-700">
          <div className="w-1/3 h-2/3 bg-gray-600 flex items-center flex-col justify-center">
            {list.map((person, index) => {
              return (
                <li
                  key={index}
                  className="w-3/4 border-1 rounded-xl h-6 mt-3 flex justify-center cursor-pointer hover:bg-gray-500 "
                  onClick={() => {
                    const thisindex = list.findIndex((li) => {
                      if (person === li) {
                        return li;
                      }
                    });
                    console.log(
                      list.findIndex((li) => {
                        if (person === li) {
                          return li;
                        }
                      })
                    );
                    setuserindex(thisindex);
                  }}
                >
                  {person}
                </li>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
