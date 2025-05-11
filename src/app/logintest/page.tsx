"use client";
import React, { useEffect, useRef, useState } from "react";
import { useUserInfo } from "@/context/userinfo";
import {
  dosginout,
  dosigInWithEmailAndPassword,
  doCreateUserWithEmailAndPassword,
} from "@/firebase/auth";
const page = () => {
  const [userEmail, setuserEmail] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const emailref = useRef<HTMLInputElement | null>(null);
  const passwordref = useRef<HTMLInputElement | null>(null);
  const { loading, userloggedin, currentUser } = useUserInfo();
  console.log(userloggedin);
  useEffect(() => {
    console.log(userloggedin);
    console.log(loading);
    console.log(currentUser);
  }, [userloggedin, loading, currentUser]);
  return (
    <>
      {/* {page} */}
      {!userloggedin ? (
        <div className="flex justify-center  items-center w-screen h-screen">
          <div className="flex flex-col items-center  w-1/3 h-2/3 bg-neutral-600">
            <input
              className="w-2/3 h-15 bg-neutral-300 mt-25 text-black"
              type="email"
              placeholder="email"
              ref={emailref}
            ></input>
            <input
              className="w-2/3 h-15 bg-neutral-300 mt-10 text-black"
              type="password"
              placeholder="password"
              ref={passwordref}
            ></input>
            <button
              className="w-30 h-15 rounded-2xl mt-20  bg-gray-500 cursor-pointer"
              onClick={
                // emailref.current &&
                // emailref.current.value &&
                // passwordref.current &&
                // passwordref.current.value
                //   ?
                () => {
                  // dosigInWithEmailAndPassword(
                  //   emailref.current?.value,
                  //   passwordref.current?.value
                  // );
                  doCreateUserWithEmailAndPassword(
                    emailref.current?.value,
                    passwordref.current?.value
                  );
                }
                // : () => {
                //     console.log(
                //       !!emailref.current,
                //       !!emailref.current.value,
                //       !!passwordref.current,
                //       !!passwordref.current.value
                //     );
                //   }
              }
            >
              submit
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="w-screen h-screen flex justify-center items-center bg-gray-600">
            <div>
              {currentUser && currentUser.displayName
                ? currentUser.displayName
                : currentUser?.email}{" "}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default page;
