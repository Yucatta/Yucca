"use client";
import React, { useEffect, useRef, useState } from "react";
import { useUserInfo } from "@/context/userinfo";
import { dosigInWithEmailAndPassword } from "@/firebase/auth";
import { updateProfile } from "firebase/auth";
import { authfirebase } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
const page = () => {
  const { loading, userloggedin, currentUser } = useUserInfo();
  const router = useRouter();
  useEffect(() => {
    if (userloggedin) {
      // router.push("/");
    }
  }, [userloggedin]);
  const [userEmail, setuserEmail] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const emailref = useRef<HTMLInputElement | null>(null);
  const passwordref = useRef<HTMLInputElement | null>(null);
  const displaynameref = useRef<HTMLInputElement | null>(null);

  async function handlenickname() {
    if (currentUser) {
      await updateProfile(currentUser, {
        displayName: displaynameref.current?.value,
      });
    }
  }
  // if()
  // console.log(currentUser);
  return (
    <>
      <div className="flex justify-center  absolute items-center w-screen h-screen bg-black">
        <div className="flex flex-col items-center  rounded-xl w-1/3 h-2/3 bg-neutral-900">
          <input
            className="w-2/3 h-15 bg-[rgb(40,40,40)] rounded-md border-1 border-neutral-500 mt-25 text-white"
            type="email"
            placeholder="   email"
            ref={emailref}
          ></input>
          <input
            className="w-2/3 h-15 bg-[rgb(40,40,40)] rounded-md border-1 border-neutral-500 mt-6 text-white"
            type="password"
            placeholder="password"
            ref={passwordref}
          ></input>
          <button
            className="w-30 h-15 rounded-2xl mt-20  bg-gray-500 cursor-pointer"
            onClick={() => {
              if (emailref.current && passwordref.current) {
                dosigInWithEmailAndPassword(
                  emailref.current.value,
                  passwordref.current.value
                );
              }
            }}
          >
            submit
          </button>
          <Link
            href={"/accounts/signup"}
            className="text-gray-300  hover:text-[rgb(55,72,146)] hover:underline "
          >
            Don't Have an account?
          </Link>
        </div>
      </div>
    </>
  );
};

export default page;
