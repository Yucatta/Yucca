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

export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string,
  DisplayName: string
) => {
  try {
    const a = await createUserWithEmailAndPassword(
      authfirebase,
      email,
      password
    );
    console.log("if its wrong you cant se", a);
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
