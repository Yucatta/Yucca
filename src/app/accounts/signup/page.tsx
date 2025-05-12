"use client";
import React, { useEffect, useRef, useState } from "react";
import { useUserInfo } from "@/context/userinfo";
import {
  dosginout,
  dosigInWithEmailAndPassword,
  doCreateUserWithEmailAndPassword,
} from "@/firebase/auth";
import { updateProfile } from "firebase/auth";
import { authfirebase } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
const page = () => {
  const [userEmail, setuserEmail] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const emailref = useRef<HTMLInputElement | null>(null);
  const passwordref = useRef<HTMLInputElement | null>(null);
  const displaynameref = useRef<HTMLInputElement | null>(null);
  const { loading, userloggedin, currentUser } = useUserInfo();
  console.log(userloggedin);
  const router = useRouter();
  useEffect(() => {
    if (userloggedin) {
      // router.push("/");
    }
  }, [userloggedin]);
  useEffect(() => {
    console.log(userloggedin);
    console.log(loading);
    console.log(currentUser);
  }, [userloggedin, loading, currentUser]);

  async function handlenickname() {
    if (currentUser) {
      await updateProfile(currentUser, {
        displayName: displaynameref.current?.value,
      });
    }
  }

  const validateEmail = (email: string) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  async function handleCreateUser() {
    if (emailref.current && passwordref.current && displaynameref.current) {
      if (validateEmail(emailref.current.value)) {
        doCreateUserWithEmailAndPassword(
          emailref.current.value,
          passwordref.current.value,
          displaynameref.current.value
        );
      }
    }
  }
  console.log(userloggedin);
  return (
    <>
      <div className="flex justify-center  absolute items-center w-screen h-screen bg-black">
        <div className="flex flex-col items-center  rounded-xl w-1/3 h-2/3 bg-neutral-900">
          <input
            className="w-2/3 h-15 bg-[rgb(40,40,40)] rounded-md border-1 border-neutral-500 mt-25 text-white"
            type="email"
            placeholder=" email"
            ref={emailref}
          ></input>
          <input
            className="w-2/3 h-15 bg-[rgb(40,40,40)] rounded-md border-1 border-neutral-500 mt-6 text-white"
            type="password"
            placeholder=" password"
            ref={passwordref}
          ></input>
          <input
            className="w-2/3 h-15 bg-[rgb(40,40,40)] rounded-md border-1 border-neutral-500 mt-6 text-white"
            type="text"
            placeholder=" Username"
            ref={displaynameref}
          ></input>
          <button
            className="w-30 h-15 rounded-2xl mt-20  bg-gray-500 cursor-pointer"
            onClick={handleCreateUser}
          >
            submit
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
