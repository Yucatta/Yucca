"use client";
import React, { useEffect, useRef, useState } from "react";

const page = () => {
  const clues = [0, 0, 1, 2, 0, 2, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0];
  const [currentsetup, setcurrentsetup] = useState<(number | number[])[][]>([
    [[], [], [], []],
    [[], [], [], []],
    [[], [], [], []],
    [[], [], [], []],
  ]);
  const ref = useRef<(number | number[])[][]>([
    [[], [], [], []],
    [[], [], [], []],
    [[], [], [], []],
    [[], [], [], []],
  ]);
  function solvepuzzle(
    clues: number[],
    currentsetup: (number | number[])[][]
  ) {}
  useEffect(() => {
    solvepuzzle(clues, currentsetup);
    // if (typeof currentsetup[0][0] === "number") {
    // }
  }, []);
  const ahmet: string[] | undefined = [];
  return (
    <>
      <div className=" flex justify-center items-center bg-gray-500 w-scren h-screen">
        <div className="flex justify-center items-center w-1/2 h-2/3 flex-col bg-gray-700">
          {currentsetup.map((row, index1) => {
            return (
              <div key={index1} className="mb-5">
                {row.map((item, index2) => {
                  return (
                    <span key={index1 * 4 + index2} className="text-2xl ml-10 ">
                      {item}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default page;
