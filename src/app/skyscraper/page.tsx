"use client";
import { url } from "inspector";
import React, { useEffect, useRef, useState } from "react";

const page = () => {
  const clues = [0, 0, 1, 2, 0, 2, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0];
  const [currentsetup, setcurrentsetup] = useState<(number | number[])[][]>([
    [
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
    ],
    [
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
    ],
    [
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
    ],
    [
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
    ],
  ]);
  const ref = useRef<(number | number[])[][]>([
    [[], [], [], []],
    [[], [], [], []],
    [[], [], [], []],
    [[], [], [], []],
  ]);
  function solvepuzzle(clues: number[], currentsetup: (number | number[])[][]) {
    currentsetup = checkpossiblelocations(currentsetup);
    for (let i = 0; i < 16; i++) {
      if (clues[i] === 1) {
        if (i < 4) {
          currentsetup[0][i] = 4;
        } else if (i < 8) {
          currentsetup[i - 4][3] = 4;
        } else if (i < 12) {
          currentsetup[3][11 - i] = 4;
        } else {
          currentsetup[15 - i][0] = 4;
        }
      }
    }
    currentsetup = checkpossiblelocations(currentsetup);

    for (let i = 0; i < 16; i++) {
      if (clues[i]) {
        // const snapshot = structuredClone(currentsetup); // Modern and safe deep clone
        // console.log("asdas;dkqwl;eqwkjleqwSnapshot:", snapshot);
        currentsetup = checkiswrong(currentsetup, i, clues[i]);
        // console.log(ref.current, i);
      }
    }
    const locations: number[][] = [];
    for (let i = 0; i < 4; i++) {
      // numberofelement;
      if (ref.current) {
      }
    }
    console.log(ref.current);
    // setcurrentsetup([...ref.current]);
    // setcurrentsetup(ref.current.map((row) => [...row]));
    currentsetup = checkpossiblelocations(currentsetup);
    // setcurrentsetup(ref.current.map((row) => [...row]));
    setcurrentsetup([...currentsetup]);

    // checkiswrong(currentsetup,if,cl)
    // currentsetup[1][3] = [1, 2, 3];
    // sertcurrentsetup([...currentsetup]);
  }
  function checkiswrong(
    currentsetup: (number | number[])[][],
    i: number,
    clue: number
  ) {
    if (i < 4) {
      for (let j = 0; j < clue - 1; j++) {
        if (Array.isArray(currentsetup[j][i])) {
          for (let k = 4; k > 4 - clue; k--) {
            currentsetup[j][i] = (currentsetup[j][i] as number[]).filter(
              (item) => item !== k
            );
          }
          //   for(let k = 0 ; k>4)
        }
      }
    } else if (i < 8) {
      for (let j = 0; j < clue - 1; j++) {
        if (Array.isArray(currentsetup[i - 4][3])) {
          for (let k = 4; k > 5 - clue; k--) {
            console.log(currentsetup[i - 4][3 - j]);
            // currentsetup[i - 4][3 - j] = 52;
            currentsetup[i - 4][3 - j] = (
              currentsetup[i - 4][3 - j] as number[]
            ).filter((item) => item !== k);
            // currentsetup[i - 4] = [...currentsetup[]];
            // console.log(currentsetup[i - 4]);
            console.log(currentsetup[i - 4][3 - j], currentsetup, i - 4, 3 - j);
            // console.log(currentsetup, k, i - 4, 3 - j);
          }
        }
      }
    } else if (i < 12) {
      for (let j = 0; j < clue - 1; j++) {
        if (Array.isArray(currentsetup[3][11 - i])) {
          for (let k = 4; k > 5 - clue; k--) {
            currentsetup[3 - j][11 - i] = (
              currentsetup[3 - j][11 - i] as number[]
            ).filter((item) => item !== k);
          }
        }
      }
    } else {
      for (let j = 0; j < clue - 1; j++) {
        if (Array.isArray(currentsetup[15 - i][0])) {
          for (let k = 4; k > 5 - clue; k--) {
            currentsetup[15 - i][j] = (
              currentsetup[15 - i][j] as number[]
            ).filter((item) => item !== k);
          }
        }
      }
    }
    // console.log(currentsetup);
    // const snapshot = structuredClone(currentsetup); // Modern and safe deep clone
    // console.log("Snapshot:", snapshot);

    return currentsetup;
  }
  function checkpossiblelocations(currentsetup: (number | number[])[][]) {
    const locations1: number[][] = [];
    const locations2: number[][] = [];
    const locations3: number[][] = [];
    const locations4: number[][] = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (
          Array.isArray(currentsetup[i][j]) &&
          (currentsetup[i][j] as number[]).length === 1
        ) {
          currentsetup[i][j] = (currentsetup[i][j] as number[])[0];
        }
        if (currentsetup[i][j] === 1) {
          locations1.push([i, j]);
        } else if (currentsetup[i][j] === 2) {
          locations2.push([i, j]);
        } else if (currentsetup[i][j] === 3) {
          locations3.push([i, j]);
        } else if (currentsetup[i][j] === 4) {
          locations4.push([i, j]);
        }
      }
    }
    const allLocations: number[][][] = [
      locations1,
      locations2,
      locations3,
      locations4,
    ];

    return currentsetup;
  }

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

// if (currentsetup.findIndex((row) => {}) + 1) {
//   for (let i = 0; i < 16; i++) {
// if (clues[i] === 1) {
//   if (i < 4) {
//     currentsetup[0][i] = 4;
//   } else if (i < 8) {
//     currentsetup[i - 4][4] = 4;
//   } else if (i < 12) {
//     currentsetup[4][11 - i] = 4;
//   } else {
//     currentsetup[15 - i][0] = 4;
//   }
// }
//     if (clues[i] === 4) {
//       if (i < 4) {
//         for (let j = 0; j < 4; j++) {
//           currentsetup[j][i] = j + 1;
//         }
//       } else if (i < 8) {
//         for (let j = 0; j < 4; j++) {
//           currentsetup[i - 4][3 - j] = j + 1;
//         }
//       } else if (i < 12) {
//         for (let j = 0; j < 4; j++) {
//           currentsetup[3 - j][11 - i] = j + 1;
//         }
//         // currentsetup[4][12 - i] = 4;
//       } else {
//         for (let j = 0; j < 4; j++) {
//           currentsetup[15 - j][j] = j + 1;
//         }
//         currentsetup[15 - i][0] = 4;
//       }
//     }
//   }
// }

// for (let i = 0; i < 4; i++) {
//   currentsetup = markpossiblity(currentsetup, allLocations[i], i);
// }

// function markpossiblity(
//   currentsetup: (number | number[])[][],
//   onelocations: number[][],
//   theone: number
// ) {
//   for (let i = 0; i < 4; i++) {
//     if (onelocations.some((location) => location[0] === i)) {
//       continue;
//     }
//     for (let j = 0; j < 4; j++) {
//       if (onelocations.some((location) => location[1] === j)) {
//         continue;
//       } else {
//         if (
//           Array.isArray(currentsetup[i][j]) &&
//           (currentsetup[i][j] as number[])[0] &&
//           !(currentsetup[i][j] as number[]).includes(theone + 1)
//         ) {
//           (currentsetup[i][j] as number[]).push(theone + 1);
//         }
//       }
//     }
//   }
//   return currentsetup;
// }
