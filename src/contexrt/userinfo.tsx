"use client";
import React, { useContext, createContext, useState, ReactNode } from "react";

type userinfotype = {
  userindex: number | undefined;
  setuserindex: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const userinfocontext = createContext<userinfotype | null>(null);

export function UserInfoProvider({ children }: { children: ReactNode }) {
  const [userindex, setuserindex] = useState<number | undefined>(undefined);
  return (
    <userinfocontext.Provider value={{ userindex, setuserindex }}>
      {children}
    </userinfocontext.Provider>
  );
}

export function useUserInfo() {
  const context = useContext(userinfocontext);
  if (!context) {
    throw new Error("aaaaaaa");
  }
  return context;
}
