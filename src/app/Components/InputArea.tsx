"use client";
import React, { useEffect, useRef } from "react";
interface Props {
  handleSendingMessage: (e: string) => void;
}
const InputArea = ({ handleSendingMessage }: Props) => {
  const inputref = useRef<HTMLInputElement | null>(null);
  const buttonref = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    function controlKey(e: any) {
      if (e.code === "Enter" && buttonref.current) {
        buttonref.current.click();
      }
    }
    addEventListener("keyup", controlKey);

    return () => {
      removeEventListener("keyup", controlKey);
    };
  }, []);
  return (
    <div className="w-full border-2 h-1/12 bg-gray-700 flex items-center justify-between">
      <input
        type="text"
        ref={inputref}
        className="bg-gray-800 rounded-xl h-3/4 w-7/12  ml-30"
      />
      <button
        className="bg-neutral-700 w-1/12 mr-10 h-3/4 cursor-pointer rounded-xl"
        ref={buttonref}
        onClick={() => {
          if (inputref.current && inputref.current.value) {
            handleSendingMessage(inputref.current.value);
            inputref.current.value = "";
          }
        }}
      >
        {">"}
      </button>
    </div>
  );
};

export default InputArea;
