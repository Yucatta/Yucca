import firebase from "firebase/compat/app";
import { authfirebase } from "./firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { error } from "console";
import { useAPIcalls } from "@/hooks/APICalls";
const { AddUser } = useAPIcalls();
export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string,
  DisplayName: string
) => {
  try {
    // const a = await createUserWithEmailAndPassword(
    //   authfirebase,
    //   email,
    //   password
    // );
    AddUser({
      UID: "1c38390c-651f-47ea-acde-a8b459c08835",
      Displayname: DisplayName,
    });
    if (authfirebase.currentUser) {
      // updateProfile(authfirebase.currentUser, { displayName: DisplayName });
    }
    // console.log("if its wrong you cant se", a);
  } catch (error) {
    console.log(error);
  }
};

export const dosigInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return signInWithEmailAndPassword(authfirebase, email, password);
};

export const dosginout = async () => {
  return signOut(authfirebase);
};
