"use client";
import React, {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { authfirebase } from "@/firebase/firebase";
import { appfirebase } from "@/firebase/firebase";
import { Auth, onAuthStateChanged, User } from "firebase/auth";
type userinfotype = {
  userindex: number | undefined;
  loading: boolean;
  userloggedin: boolean;
  currentUser: User | null;
  setuserindex: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const userinfocontext = createContext<userinfotype | null>(null);

export function UserInfoProvider({ children }: { children: ReactNode }) {
  const [userindex, setuserindex] = useState<number | undefined>(undefined);
  const [details, setdetails] = useState();
  const [currentUser, setcurrentUser] = useState<User | null>(null);
  const [userloggedin, setuserloggedin] = useState(false);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const unsubsrice = onAuthStateChanged(authfirebase, Initializeuser);

    return unsubsrice;
  }, []);

  async function Initializeuser(user: User | null) {
    if (user) {
      setcurrentUser({ ...user });
      setuserloggedin(true);
    } else {
      setcurrentUser(null);
      setuserloggedin(false);
    }
    setloading(false);
  }
  return (
    <userinfocontext.Provider
      value={{ userindex, setuserindex, userloggedin, loading, currentUser }}
    >
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
